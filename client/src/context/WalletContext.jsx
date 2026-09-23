// client/src/context/WalletContext.jsx
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_CHAIN_ID } from "../config/web3Config.js";
import web3Service, { connectWallet as rawConnectWallet } from "../services/web3Service.js";
import api from "../services/api.js";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(DEFAULT_CHAIN_ID);
  const [connecting, setConnecting] = useState(false);
  const [bnbPrice, setBnbPrice] = useState(783.06);
  const [balances, setBalances] = useState({ bnb: "0.0000", shuk: "0.00", usdt: "0.00" });

  const isConnected = Boolean(account);
  const isCorrectChain = chainId === 56;
  const isCorrectNetwork = isCorrectChain;

  // Fetch live BNB Price from Binance API
  useEffect(() => {
    let isMounted = true;
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
        const data = await res.json();
        if (isMounted && data?.price) {
          setBnbPrice(parseFloat(data.price));
        }
      } catch (e) {
        // Fallback already preset
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Refresh all balances
  const refreshBalances = useCallback(async (targetAccount = account) => {
    if (!targetAccount) {
      setBalances({ bnb: "0.0000", shuk: "0.00", usdt: "0.00" });
      return;
    }
    const [bnb, shuk, usdt] = await Promise.all([
      web3Service.getNativeBalance(targetAccount),
      web3Service.getShukBalance(targetAccount),
      web3Service.getUsdtBalance(targetAccount)
    ]);
    setBalances({ bnb, shuk, usdt });
  }, [account]);

  // Connect Wallet
  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      const connectedAccount = await rawConnectWallet();
      setAccount(connectedAccount);
      const cid = await web3Service.getChainId();
      setChainId(cid);
      await refreshBalances(connectedAccount);

      // ✅ Save wallet address to MongoDB
      try {
        await api.post('/users/register', {
          walletAddress: connectedAccount,
          chainId: cid
        });
        console.log('✓ Wallet registered:', connectedAccount);
      } catch (err) {
        console.warn('Wallet register notice:', err?.message);
      }

      return connectedAccount;
    } catch (err) {
      console.error("Wallet connection error:", err);
      throw err;
    } finally {
      setConnecting(false);
    }
  }, [refreshBalances]);

  // Disconnect Wallet
  const disconnect = useCallback(() => {
    setAccount(null);
    setBalances({ bnb: "0.0000", shuk: "0.00", usdt: "0.00" });
  }, []);

  // Switch Network to BSC
  const switchToBSC = useCallback(async () => {
    try {
      await web3Service.switchToBSC();
      const cid = await web3Service.getChainId();
      setChainId(cid);
      if (account) await refreshBalances(account);
    } catch (err) {
      console.error("Switch to BSC error:", err);
      throw err;
    }
  }, [account, refreshBalances]);

  // Presale Buy & Record Payment
  const executePresaleBuy = useCallback(async (amountUSD, paymentMethod, currentPrice) => {
    if (!account) {
      await connect();
      return null;
    }

    if (!isCorrectChain) {
      await switchToBSC();
      return null;
    }

    // 1. Execute on-chain transaction
    const txHash = await web3Service.executePresaleBuy(amountUSD, paymentMethod, bnbPrice);

    // 2. Save payment in MongoDB Atlas
    const tokenPrice = currentPrice || 0.03633;
    const tokensBought = (parseFloat(amountUSD) / tokenPrice).toFixed(8);
    const methodUpper = (paymentMethod || 'USDT').toUpperCase();

    try {
      await api.post('/payments', {
        amount: String(amountUSD),
        currency: methodUpper === 'BNB' ? 'BNB' : 'USDTBSC',
        usdValue: String(amountUSD),
        txHash: txHash,
        walletAddress: account, // Real wallet address
        tokenAmount: tokensBought
      });

      // Update user record to mark as investor
      try {
        await api.put(`/users/${account}/mark-investor`, {
          additionalUsd: parseFloat(amountUSD),
          additionalTokens: parseFloat(tokensBought)
        });
      } catch (userErr) {
        console.warn('User update notice:', userErr?.message);
      }
    } catch (apiErr) {
      console.warn("Backend payment ledger notification:", apiErr);
    }

    // 3. Refresh user balances
    await refreshBalances(account);
    return txHash;
  }, [account, isCorrectChain, bnbPrice, connect, switchToBSC, refreshBalances]);

  // Listeners & Auto-detect existing connection
  useEffect(() => {
    async function checkAuth() {
      if (web3Service.isMetaMaskAvailable()) {
        const accounts = await web3Service.getAccounts();
        const cid = await web3Service.getChainId();
        setChainId(cid);
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          refreshBalances(accounts[0]);

          // ✅ Register the returning wallet silently
          try {
            await api.post('/users/register', {
              walletAddress: accounts[0],
              chainId: cid
            });
          } catch (err) {
            console.warn('Silent register notice:', err?.message);
          }
        }
      }
    }
    checkAuth();

    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accs) => {
        if (accs && accs.length > 0) {
          setAccount(accs[0]);
          refreshBalances(accs[0]);
        } else {
          disconnect();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [disconnect, refreshBalances]);

  return (
    <WalletContext.Provider
      value={{
        // Primary API
        account,
        address: account,
        chainId,
        isConnected,
        isCorrectChain,
        connecting,
        balances,
        bnbPrice,
        connect,
        disconnect,
        switchToBSC,
        refreshBalances,
        executePresaleBuy,

        // Backward compatibility aliases
        isCorrectNetwork,
        isConnecting: connecting,
        shukBalance: balances.shuk,
        bnbBalance: balances.bnb,
        usdtBalance: balances.usdt,
        connectWallet: connect,
        disconnectWallet: disconnect,
        switchToBsc: switchToBSC,
        fetchBalances: refreshBalances
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Backward compatibility export
export const useWeb3 = useWallet;
export const Web3Provider = WalletProvider;

export default WalletContext;
