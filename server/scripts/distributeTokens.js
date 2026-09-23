import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { Payment } from '../models/Payment.js';

dotenv.config();

const SHUKRANA13_ADDRESS = '0x860d6Ee29C12A0C023Fc03741348Dd3d15596f95';
const BSC_RPC = process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org/';

const TOKEN_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)'
];

async function main() {
  await connectDB();

  console.log('\n--- Shukrana 13 Token Distribution Manager ---');
  
  // Find all pending payments with walletAddress
  const pendingPayments = await Payment.find({
    distributed: { $ne: true },
    walletAddress: { $ne: null, $exists: true }
  }).sort({ createdAt: 1 });

  console.log(`Found ${pendingPayments.length} pending distribution(s).\n`);

  if (pendingPayments.length === 0) {
    console.log('No pending distributions found.');
    process.exit(0);
  }

  // Display summary table
  console.table(
    pendingPayments.map(p => ({
      ID: String(p._id).slice(-6),
      Buyer: p.walletAddress,
      Tokens: p.tokenAmount,
      USD: `$${p.usdValue}`,
      PaymentTx: p.txHash.slice(0, 14) + '...'
    }))
  );

  const privateKey = process.env.OWNER_PRIVATE_KEY;
  if (!privateKey) {
    console.log('\nℹ️  Notice: OWNER_PRIVATE_KEY not set in .env.');
    console.log('To automatically distribute on-chain, add OWNER_PRIVATE_KEY to server/.env.');
    console.log('Otherwise, use the recipient list above to transfer tokens via BscScan or MetaMask.');
    process.exit(0);
  }

  console.log('\nConnecting to BSC RPC and preparing distribution wallet...');
  const provider = new ethers.JsonRpcProvider(BSC_RPC);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(SHUKRANA13_ADDRESS, TOKEN_ABI, wallet);

  const ownerBalance = await contract.balanceOf(wallet.address);
  console.log(`Owner address: ${wallet.address}`);
  console.log(`Owner SHUK13 balance: ${ethers.formatUnits(ownerBalance, 18)} SHUK13\n`);

  for (const p of pendingPayments) {
    try {
      console.log(`Sending ${p.tokenAmount} SHUK13 to ${p.walletAddress}...`);
      const tokenUnits = ethers.parseUnits(parseFloat(p.tokenAmount).toFixed(6), 18);
      
      const tx = await contract.transfer(p.walletAddress, tokenUnits);
      console.log(`Tx broadcasted: https://bscscan.com/tx/${tx.hash}`);
      await tx.wait(1);

      p.distributed = true;
      p.distributionTxHash = tx.hash;
      await p.save();
      console.log(`✓ Confirmed and marked as distributed!\n`);
    } catch (err) {
      console.error(`✗ Error distributing to ${p.walletAddress}:`, err.message);
    }
  }

  console.log('All distributions finished.');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
