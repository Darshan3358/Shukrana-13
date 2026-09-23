// client/src/services/web3Service.js
import { ethers } from "ethers";
import { BSC_CHAINS, CONTRACT_ADDRESSES, DEFAULT_CHAIN_ID, SHUK13_ABI, USDT_ABI } from "../config/web3Config.js";

class Web3Service {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.readOnlyProvider = new ethers.JsonRpcProvider(BSC_CHAINS.MAINNET.rpcUrls[0]);
  }

  clear() {
    this.provider = null;
    this.signer = null;
  }

  getEthereum() {
    if (typeof window === "undefined" || !window.ethereum) return null;
    return window.ethereum;
  }

  isMetaMaskAvailable() {
    return Boolean(this.getEthereum());
  }

  async getAccounts() {
    const eth = this.getEthereum();
    if (!eth) return [];
    try {
      return await eth.request({ method: "eth_accounts" });
    } catch {
      return [];
    }
  }

  async getChainId() {
    const eth = this.getEthereum();
    if (!eth) return DEFAULT_CHAIN_ID;
    try {
      const chainIdHex = await eth.request({ method: "eth_chainId" });
      return parseInt(chainIdHex, 16);
    } catch {
      return DEFAULT_CHAIN_ID;
    }
  }

  async getSigner() {
    const eth = this.getEthereum();
    if (!eth) throw new Error("MetaMask is not available.");
    if (!this.provider) {
      this.provider = new ethers.BrowserProvider(eth);
    }
    this.signer = await this.provider.getSigner();
    return this.signer;
  }

  async switchToBSC() {
    const eth = this.getEthereum();
    if (!eth) throw new Error("MetaMask is not available.");
    const chainConfig = BSC_CHAINS.MAINNET;

    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainConfig.chainIdHex }]
      });
    } catch (switchError) {
      if (switchError.code === 4902 || switchError.data?.originalError?.code === 4902) {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: chainConfig.chainIdHex,
            chainName: chainConfig.chainName,
            nativeCurrency: chainConfig.nativeCurrency,
            rpcUrls: chainConfig.rpcUrls,
            blockExplorerUrls: chainConfig.blockExplorerUrls
          }]
        });
      } else {
        throw switchError;
      }
    }
    this.provider = new ethers.BrowserProvider(eth);
    this.signer = await this.provider.getSigner();
    return true;
  }

  // --- Balance Fetchers ---
  async getNativeBalance(address) {
    if (!address) return "0.0";
    try {
      const runner = this.provider || this.readOnlyProvider;
      const balance = await runner.getBalance(address);
      return parseFloat(ethers.formatEther(balance)).toFixed(4);
    } catch (err) {
      console.warn("Error fetching BNB balance:", err);
      return "0.0000";
    }
  }

  async getShukBalance(address) {
    if (!address) return "0.0";
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESSES.SHUK13_TOKEN, SHUK13_ABI, this.readOnlyProvider);
      const balance = await contract.balanceOf(address);
      return parseFloat(ethers.formatUnits(balance, 18)).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } catch (err) {
      console.warn("Error fetching SHUK13 balance:", err);
      return "0.00";
    }
  }

  async getUsdtBalance(address) {
    if (!address) return "0.0";
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESSES.USDT_TOKEN, USDT_ABI, this.readOnlyProvider);
      const balance = await contract.balanceOf(address);
      return parseFloat(ethers.formatUnits(balance, 18)).toFixed(2);
    } catch (err) {
      console.warn("Error fetching USDT balance:", err);
      return "0.00";
    }
  }

  // --- Core Presale Transaction ---
  async executePresaleBuy(amountUSD, paymentMethod, bnbPrice) {
    const signer = await this.getSigner();
    if (!signer) throw new Error("Wallet not connected");

    const methodUpper = (paymentMethod || 'USDT').toUpperCase();
    let tx;

    if (methodUpper === 'BNB') {
      const rate = bnbPrice > 0 ? bnbPrice : 783.06;
      const bnbCalculated = (parseFloat(amountUSD) / rate).toFixed(6);
      tx = await signer.sendTransaction({
        to: CONTRACT_ADDRESSES.TREASURY,
        value: ethers.parseEther(bnbCalculated)
      });
    } else {
      // Default to USDT (BEP-20 on BSC, 18 decimals)
      const usdtContract = new ethers.Contract(CONTRACT_ADDRESSES.USDT_TOKEN, USDT_ABI, signer);
      const usdtAmount = ethers.parseUnits(parseFloat(amountUSD).toFixed(4), 18);
      tx = await usdtContract.transfer(CONTRACT_ADDRESSES.TREASURY, usdtAmount);
    }

    const receipt = await tx.wait(1);
    return receipt.hash;
  }

  // --- Admin Token Distribution ---
  async distributeTokens(recipientAddress, tokenAmount) {
    const signer = await this.getSigner();
    if (!signer) throw new Error("Treasury wallet not connected");

    const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES.SHUK13_TOKEN, SHUK13_ABI, signer);
    const amountUnits = ethers.parseUnits(parseFloat(tokenAmount).toFixed(6), 18);

    const tx = await tokenContract.transfer(recipientAddress, amountUnits);
    const receipt = await tx.wait(1);
    return receipt.hash;
  }
}

export const web3Service = new Web3Service();

// Standalone connection helper
export const connectWallet = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  if (!accounts || accounts.length === 0) throw new Error("No accounts found in MetaMask.");

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  if (chainId !== BSC_CHAINS.MAINNET.chainIdHex) {
    await web3Service.switchToBSC();
  }

  web3Service.provider = new ethers.BrowserProvider(window.ethereum);
  web3Service.signer = await web3Service.provider.getSigner(accounts[0]);
  return accounts[0];
};

export default web3Service;
