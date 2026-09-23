import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import { useWallet } from '../context/WalletContext';
import api, { getPresalePrice } from '../services/api';
import {
  Wallet,
  ShieldCheck,
  Coins,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  DollarSign,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const Profile = () => {
  const {
    account,
    shukBalance,
    connectWallet,
    disconnectWallet,
    isCorrectNetwork,
    switchToBsc
  } = useWallet();

  const [presaleStats, setPresaleStats] = useState({
    priceUsd: 0.03633,
    listingPriceUsd: 1.5,
    nextPriceUsd: 0.19896
  });

  const [userStats, setUserStats] = useState({
    totalTokens: 0,
    totalUsd: 0,
    pendingTokens: 0,
    distributedTokens: 0,
    totalPurchases: 0,
    payments: []
  });

  const [loading, setLoading] = useState(false);
  const [copiedTx, setCopiedTx] = useState(null);

  // 1. Fetch live presale token price & config
  useEffect(() => {
    const fetchConfig = async () => {
      const res = await getPresalePrice();
      if (res?.data) {
        setPresaleStats({
          priceUsd: res.data.priceUsd || 0.03633,
          listingPriceUsd: res.data.listingPriceUsd || 1.5,
          nextPriceUsd: res.data.nextPriceUsd || 0.19896
        });
      }
    };
    fetchConfig();
  }, []);

  // 2. Fetch user's real payment ledger from MongoDB
  useEffect(() => {
    const fetchUserData = async () => {
      if (!account) return;
      setLoading(true);
      try {
        const res = await api.get(`/payments/user/${account}`);
        const json = res.data;
        if (json.status && json.data) {
          setUserStats({
            totalTokens: json.data.totalTokens || 0,
            totalUsd: json.data.totalUsd || 0,
            pendingTokens: json.data.pendingTokens || 0,
            distributedTokens: json.data.distributedTokens || 0,
            totalPurchases: json.data.totalPurchases || 0,
            payments: json.data.payments || []
          });
        }
      } catch (err) {
        console.error('Error fetching user payment history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [account]);

  // Real on-chain balance parsed from string
  const onChainTokens = parseFloat((shukBalance || '0').replace(/,/g, '')) || 0;
  
  // Total user tokens = On-chain tokens + any recorded presale tokens not yet distributed
  const totalAllocation = Math.max(onChainTokens, userStats.totalTokens);
  
  // Real live current value
  const currentValueUSD = totalAllocation * presaleStats.priceUsd;
  // Potential value at listing ($1.50)
  const listingValueUSD = totalAllocation * presaleStats.listingPriceUsd;

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(id);
    setTimeout(() => setCopiedTx(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#050b12] text-white flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-32 pb-20">
        {!account ? (
          /* Disconnected State */
          <div className="max-w-xl mx-auto my-12 p-8 md:p-12 bg-[#0b1220]/80 border border-white/10 rounded-3xl text-center space-y-6 backdrop-blur-xl shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-gradient/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Wallet size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Investor Vesting Profile</h1>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Connect your MetaMask wallet to view your live SHUK13 allocation, real-time value, and presale transaction history.
              </p>
            </div>
            <button
              onClick={connectWallet}
              className="w-full py-4 rounded-2xl bg-brand-gradient text-white font-semibold text-base hover:brightness-110 shadow-lg active:scale-98 transition cursor-pointer"
            >
              Connect MetaMask
            </button>
          </div>
        ) : (
          /* Connected State: 100% Real Live Data */
          <div className="space-y-8">
            {/* Header Box */}
            <div className="bg-[#0b1220]/90 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    <span>Investor Vesting Profile</span>
                    <Sparkles size={20} className="text-emerald-400" />
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Live on-chain balance and presale purchase ledger for your connected wallet.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {!isCorrectNetwork ? (
                    <button
                      onClick={switchToBsc}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition cursor-pointer"
                    >
                      Switch to BSC
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      BSC Mainnet
                    </span>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                    <span className="text-gray-300">{account.slice(0, 6)}...{account.slice(-4)}</span>
                    <a
                      href={`https://bscscan.com/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                      title="View on BscScan"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* 4 Real Data Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Total Allocation */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-xs uppercase font-semibold">Total Allocation</span>
                    <Coins size={18} className="text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {loading ? 'Loading...' : `${totalAllocation.toLocaleString()} SHUK13`}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    On-chain: {onChainTokens.toLocaleString()} | {userStats.totalPurchases} order(s)
                  </div>
                </div>

                {/* Card 2: Current Value */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-xs uppercase font-semibold">Current Value</span>
                    <TrendingUp size={18} className="text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">
                    ${currentValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    At Presale Price (${presaleStats.priceUsd.toFixed(5)})
                  </div>
                </div>

                {/* Card 3: Listing Potential */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-xs uppercase font-semibold">Listing Value</span>
                    <DollarSign size={18} className="text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">
                    ${listingValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    At Launch Price (${presaleStats.listingPriceUsd.toFixed(2)})
                  </div>
                </div>

                {/* Card 4: Total USD Spent */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-xs uppercase font-semibold">Total Invested</span>
                    <ShieldCheck size={18} className="text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${userStats.totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Recorded in Presale Ledger
                  </div>
                </div>
              </div>

              {/* Vesting Information Banner */}
              <div className="p-5 rounded-2xl bg-blue-950/25 border border-blue-500/25 text-sm text-blue-200/90 leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-semibold text-blue-300">
                  <AlertCircle size={17} />
                  <span>Vesting & Token Release Schedule</span>
                </div>
                <p className="text-xs text-gray-300">
                  All SHUK13 tokens purchased during the presale are securely held and recorded off-chain in the official MongoDB presale ledger.
                  Tokens are distributed directly to your connected wallet by the treasury before/at the Token Generation Event (TGE) on Binance Smart Chain (BSC).
                </p>
                <div className="text-xs font-semibold text-white pt-1">
                  Vesting Status: <span className="text-amber-400">Locked (100%)</span> until TGE launch.
                </div>
              </div>
            </div>

            {/* User Purchase History Table */}
            <div className="bg-[#0b1220]/90 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Your Presale Purchases</h2>
                  <p className="text-xs text-gray-400">Transactions associated with wallet {account.slice(0, 8)}...</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  {userStats.totalPurchases} Transaction(s)
                </span>
              </div>

              {loading ? (
                <div className="py-12 text-center text-gray-400 text-sm">
                  Loading your purchase records...
                </div>
              ) : userStats.payments.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                    <Clock size={20} />
                  </div>
                  <p className="text-gray-400 text-sm">No purchases recorded for this wallet yet.</p>
                  <Link
                    to="/#presale"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gradient text-white text-xs font-semibold hover:brightness-110 transition active:scale-95"
                  >
                    <span>Buy SHUK13 Now</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-black/60 text-gray-400 uppercase text-[11px] tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Paid</th>
                        <th className="py-3 px-4">Tokens Received</th>
                        <th className="py-3 px-4">Payment Tx</th>
                        <th className="py-3 px-4">Distribution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {userStats.payments.map((p) => (
                        <tr key={p._id || p.txHash} className="hover:bg-white/5 transition">
                          <td className="py-3 px-4 text-gray-300 whitespace-nowrap">
                            {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Recent'}
                          </td>
                          <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                            ${Number(p.usdValue || p.amount || 0).toFixed(2)} ({p.currency})
                          </td>
                          <td className="py-3 px-4 font-bold text-purple-400 whitespace-nowrap">
                            {Number(p.tokenAmount || 0).toLocaleString()} SHUK13
                          </td>
                          <td className="py-3 px-4 font-mono">
                            <div className="flex items-center gap-1.5">
                              <a
                                href={`https://bscscan.com/tx/${p.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline inline-flex items-center gap-1"
                              >
                                <span>{p.txHash?.slice(0, 8)}...</span>
                                <ExternalLink size={10} />
                              </a>
                              <button
                                onClick={() => copyText(p.txHash, p.txHash)}
                                className="text-gray-400 hover:text-white"
                                title="Copy Tx Hash"
                              >
                                {copiedTx === p.txHash ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {p.distributed ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Distributed ✓
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Pending Treasury Release
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
