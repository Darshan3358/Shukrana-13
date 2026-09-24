// Binance Smart Chain Mainnet Configuration
export const BSC_CHAIN_ID = '0x38'; // 56 in decimal
export const BSC_CHAIN_ID_DECIMAL = 56;
export const BSC_RPC_URLS = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc-dataseed1.defibit.io/',
  'https://bsc-dataseed1.ninicoin.io/'
];
export const BSC_EXPLORER_URL = 'https://bscscan.com';

// Official Shukrana 13 BEP-20 Contract on BSC
export const SHUKRANA13_ADDRESS = '0x860d6Ee29C12A0C023Fc03741348Dd3d15596f95';

// Presale Treasury / Owner Recipient (holds initial 100M tokens)
export const PRESALE_RECIPIENT = '0x4f2766f649E23BC2db54753c16d22066BeD64baC';

// Authorized Admin Wallets
export const ADMIN_WALLETS = [
  '0x4f2766f649E23BC2db54753c16d22066BeD64baC',
  '0x65c022998667454CceeE93BE816ed7aeE5541F5D'
];

export const isAdminWallet = (address) => {
  if (!address) return false;
  return ADMIN_WALLETS.some(w => w.toLowerCase() === address.toLowerCase());
};

// Official Binance-Peg BSC USDT Contract (18 decimals)
export const USDT_BSC_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';

// Minimal ABIs
export const SHUK13_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function owner() view returns (address)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)'
];

export const USDT_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)'
];
