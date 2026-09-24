// client/src/config/web3Config.js

export const BSC_CHAINS = {
  MAINNET: {
    chainId: 56,
    chainIdHex: "0x38",
    chainName: "BNB Smart Chain Mainnet",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    rpcUrls: [
      "https://bsc-dataseed.binance.org/",
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  }
};

export const DEFAULT_CHAIN_ID = 56;

export const CONTRACT_ADDRESSES = {
  SHUK13_TOKEN: "0x860d6Ee29C12A0C023Fc03741348Dd3d15596f95",
  USDT_TOKEN: "0x55d398326f99059fF775485246999027B3197955",
  TREASURY: "0x4f2766f649E23BC2db54753c16d22066BeD64baC"
};

export const ADMIN_WALLETS = [
  "0x4f2766f649E23BC2db54753c16d22066BeD64baC",
  "0x65c022998667454CceeE93BE816ed7aeE5541F5D"
];

export const isAdminWallet = (address) => {
  if (!address) return false;
  return ADMIN_WALLETS.some(w => w.toLowerCase() === address.toLowerCase());
};

export const SHUK13_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export const USDT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];
