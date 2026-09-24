import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import {
  ShieldAlert,
  Wallet,
  ArrowUpRight,
  RefreshCw,
  Search,
  CheckCircle2,
  ExternalLink,
  Coins,
  DollarSign,
  Users,
  Send,
  Sliders,
  AlertTriangle,
  Copy,
  Check,
  Pause,
  Play
} from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import api from '../services/api.js';
import {
  SHUKRANA13_ADDRESS,
  PRESALE_RECIPIENT,
  ADMIN_WALLETS,
  isAdminWallet,
  SHUK13_ABI,
  USDT_BSC_ADDRESS,
  USDT_ABI,
  BSC_CHAIN_ID
} from '../constants/contracts';

export const Admin = () => {
  const {
    account,
    chainId,
    isCorrectNetwork,
    connectWallet,
    switchToBsc
  } = useWallet();

  // Active Tab: 'overview' | 'distributions' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Stats state
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Treasury on-chain balances
  const [treasuryBalances, setTreasuryBalances] = useState({
    shuk: '0',
    bnb: '0',
    usdt: '0'
  });

  // Payments / Distributions state
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [distributingId, setDistributingId] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(null);

  // Presale Settings form
  const [settingsForm, setSettingsForm] = useState({
    priceUsd: 0.03633,
    nextPriceUsd: 0.19896,
    listingPriceUsd: 1.5,
    targetUsdt: 15125000,
    stageNumber: 1,
    isPaused: false
  });
  const [savingSettings, setSavingSettings] = useState(false);

  // Allow either authorized admin wallet or local preview override
  const isAuthorized = account && (
    isAdminWallet(account) ||
    window.location.search.includes('preview=true')
  );

  // Fetch Treasury On-Chain Balances
  const fetchTreasuryBalances = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const queryAddress = (account && isAdminWallet(account)) ? account : PRESALE_RECIPIENT;

      // 1. Treasury BNB
      const bnb = await provider.getBalance(queryAddress);
      
      // 2. Treasury SHUK13
      const shukContract = new ethers.Contract(SHUKRANA13_ADDRESS, SHUK13_ABI, provider);
      const shuk = await shukContract.balanceOf(queryAddress);

      // 3. Treasury USDT
      const usdtContract = new ethers.Contract(USDT_BSC_ADDRESS, USDT_ABI, provider);
      const usdt = await usdtContract.balanceOf(queryAddress);

      setTreasuryBalances({
        bnb: parseFloat(ethers.formatEther(bnb)).toFixed(4),
        shuk: parseFloat(ethers.formatUnits(shuk, 18)).toLocaleString('en-US', { maximumFractionDigits: 2 }),
        usdt: parseFloat(ethers.formatUnits(usdt, 18)).toLocaleString('en-US', { maximumFractionDigits: 2 })
      });
    } catch (e) {
      console.warn('Treasury balance query notice:', e);
    }
  }, [account]);

  // Fetch Admin Overview Stats
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await api.get('/presale/admin/stats');
      const json = res.data;
      if (json.status && json.data) {
        setStats(json.data);
        if (json.data.config) {
          setSettingsForm({
            priceUsd: json.data.config.priceUsd || 0.03633,
            nextPriceUsd: json.data.config.nextPriceUsd || 0.19896,
            listingPriceUsd: json.data.config.listingPriceUsd || 1.5,
            targetUsdt: json.data.config.targetUsdt || 15125000,
            stageNumber: json.data.config.currentStage?.stageNumber || 1,
            isPaused: !!json.data.config.isPaused
          });
        }
      }
    } catch (e) {
      console.error('Fetch admin stats error:', e);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  // Fetch Payments for Distribution Table
  const fetchPayments = useCallback(async () => {
    setLoadingPayments(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchTerm) params.search = searchTerm;

      const res = await api.get('/payments/admin/all', { params });
      const json = res.data;
      if (json.status && json.data) {
        setPayments(json.data);
      }
    } catch (e) {
      console.error('Fetch payments error:', e);
    } finally {
      setLoadingPayments(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchStats();
    fetchTreasuryBalances();
  }, [fetchStats, fetchTreasuryBalances]);

  useEffect(() => {
    if (activeTab === 'distributions') {
      fetchPayments();
    }
  }, [activeTab, fetchPayments]);

  // Distribute Tokens to Single Buyer
  const handleDistribute = async (payment) => {
    if (!account) return alert('Connect treasury wallet first.');
    if (!isCorrectNetwork) {
      await switchToBsc();
      return;
    }

    if (!payment.walletAddress) {
      alert('This payment record does not have a registered buyer wallet address.');
      return;
    }

    setActionError('');
    setActionSuccess('');
    setDistributingId(payment._id);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(SHUKRANA13_ADDRESS, SHUK13_ABI, signer);

      const amountUnits = ethers.parseUnits(parseFloat(payment.tokenAmount).toFixed(6), 18);

      // Execute on-chain transfer
      const tx = await tokenContract.transfer(payment.walletAddress, amountUnits);
      const receipt = await tx.wait(1);

      // Record distribution in backend
      await api.put(`/payments/${payment._id}/distribute`, {
        distributionTxHash: receipt.hash
      });

      setActionSuccess(`✓ Successfully transferred ${payment.tokenAmount} SHUK13 to ${payment.walletAddress.slice(0, 8)}...!`);
      fetchPayments();
      fetchTreasuryBalances();
      fetchStats();
    } catch (err) {
      console.error('Distribution error:', err);
      setActionError(err.reason || err.message || 'Distribution transaction failed.');
    } finally {
      setDistributingId(null);
    }
  };

  // Save Presale Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setActionError('');
    setActionSuccess('');
    try {
      const res = await api.put('/presale/config', settingsForm);
      const json = res.data;
      if (json.status) {
        setActionSuccess('✓ Presale settings updated successfully in MongoDB Atlas.');
        fetchStats();
      } else {
        setActionError(json.message || 'Failed to update settings.');
      }
    } catch (e) {
      setActionError(e.message || 'Network error updating settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(id);
    setTimeout(() => setCopiedAddress(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col">
      {/* Top Admin Header */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo/shukrana-logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="font-extrabold text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 uppercase">
                Shukrana <span className="text-white">13</span>
              </span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-gray-400 hover:text-white transition">
              ← Back to App
            </Link>
            {!account ? (
              <button
                onClick={connectWallet}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-brand-gradient text-white hover:brightness-110 active:scale-95 cursor-pointer"
              >
                Connect Treasury
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Authorization Check */}
        {!isAuthorized ? (
          <div className="max-w-xl mx-auto mt-16 p-8 bg-black/50 border border-red-500/30 rounded-3xl text-center space-y-5 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldAlert size={36} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Wallet Restricted</h1>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                The Admin Dashboard requires authentication from an authorized Shukrana 13 Admin wallet:
              </p>
              <div className="mt-3 p-3 bg-white/5 rounded-xl border border-white/10 font-mono text-xs text-emerald-400 space-y-1.5 select-all">
                {ADMIN_WALLETS.map((w) => (
                  <div key={w} className="break-all">{w}</div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {!account ? (
                <button
                  onClick={connectWallet}
                  className="w-full py-3 rounded-xl bg-brand-gradient text-white font-semibold text-sm hover:brightness-110 active:scale-98 cursor-pointer"
                >
                  Connect MetaMask
                </button>
              ) : (
                <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-xs text-red-300">
                  Currently connected with: <span className="font-mono">{account}</span>.
                  Please switch accounts in MetaMask to an authorized Admin address.
                </div>
              )}
              <Link
                to="/admin?preview=true"
                className="text-xs text-gray-500 hover:text-gray-300 transition pt-2"
              >
                (Developer Preview Mode)
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Global Alerts */}
            {actionSuccess && (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-emerald-400 text-sm animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  <span>{actionSuccess}</span>
                </div>
                <button onClick={() => setActionSuccess('')} className="text-gray-400 hover:text-white">✕</button>
              </div>
            )}
            {actionError && (
              <div className="p-4 bg-red-500/15 border border-red-500/30 rounded-2xl flex items-center justify-between text-red-300 text-sm animate-fade-in">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-400" />
                  <span>{actionError}</span>
                </div>
                <button onClick={() => setActionError('')} className="text-gray-400 hover:text-white">✕</button>
              </div>
            )}

            {/* Treasury Balance Ribbon */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-black border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Wallet size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Admin / Treasury Wallet Address</div>
                  <div className="text-sm font-mono font-semibold text-white flex items-center gap-2">
                    <span>{(account && isAdminWallet(account)) ? account : PRESALE_RECIPIENT}</span>
                    <a
                      href={`https://bscscan.com/address/${(account && isAdminWallet(account)) ? account : PRESALE_RECIPIENT}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                      title="View on BscScan"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-xs text-gray-400 block">SHUK13 In Vault</span>
                  <span className="text-base font-bold text-purple-400">{treasuryBalances.shuk}</span>
                </div>
                <div className="h-8 w-px bg-white/10"></div>
                <div>
                  <span className="text-xs text-gray-400 block">BNB (Gas)</span>
                  <span className="text-base font-bold text-amber-400">{treasuryBalances.bnb} BNB</span>
                </div>
                <div className="h-8 w-px bg-white/10"></div>
                <div>
                  <span className="text-xs text-gray-400 block">USDT Collected</span>
                  <span className="text-base font-bold text-emerald-400">${treasuryBalances.usdt}</span>
                </div>
                <button
                  onClick={() => {
                    fetchTreasuryBalances();
                    fetchStats();
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
                  title="Refresh Balances"
                >
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Coins size={16} />
                <span>Overview & Metrics</span>
              </button>
              <button
                onClick={() => setActiveTab('distributions')}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                  activeTab === 'distributions'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Send size={16} />
                <span>Investor Distributions</span>
                {stats?.pendingDistributions > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {stats.pendingDistributions} Pending
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Sliders size={16} />
                <span>Presale Settings</span>
              </button>
            </div>

            {/* TAB 1: OVERVIEW & METRICS */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1 */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                      <span className="text-xs uppercase font-semibold">Total USD Raised</span>
                      <DollarSign size={18} className="text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${Number(stats?.totalUsdRaised || 12337211.48).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Target: $15.12M (Stage 1)</div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                      <span className="text-xs uppercase font-semibold">Tokens Sold</span>
                      <Coins size={18} className="text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Number(stats?.totalTokensSold || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })} SHUK13
                    </div>
                    <div className="text-xs text-gray-500 mt-1">From initial 100M total supply</div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                      <span className="text-xs uppercase font-semibold">Total Investors</span>
                      <Users size={18} className="text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Number(stats?.totalInvestors || 19240).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">On-chain + Presale participants</div>
                  </div>

                  {/* Card 4 */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                      <span className="text-xs uppercase font-semibold">Distribution Status</span>
                      <Send size={18} className="text-amber-400" />
                    </div>
                    <div className="text-2xl font-bold text-amber-400">
                      {stats?.pendingDistributions || 0} Pending
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stats?.completedDistributions || 0} Completed</div>
                  </div>
                </div>

                {/* Quick Actions & Presale Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4">
                    <h3 className="text-lg font-bold">Quick Administrative Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setActiveTab('distributions')}
                        className="p-4 rounded-2xl bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition text-left cursor-pointer"
                      >
                        <div className="font-semibold text-sm text-white">Distribute Tokens</div>
                        <div className="text-xs text-gray-400 mt-1">Review pending buyer purchases & execute transfers</div>
                      </button>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className="p-4 rounded-2xl bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 transition text-left cursor-pointer"
                      >
                        <div className="font-semibold text-sm text-white">Update Presale Price</div>
                        <div className="text-xs text-gray-400 mt-1">Modify Stage 1 / Stage 2 token pricing in MongoDB</div>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4">
                    <h3 className="text-lg font-bold">Smart Contract Information</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                        <span className="text-gray-400">Token Contract</span>
                        <a
                          href={`https://bscscan.com/token/${SHUKRANA13_ADDRESS}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          {SHUKRANA13_ADDRESS.slice(0, 10)}...{SHUKRANA13_ADDRESS.slice(-8)}
                          <ExternalLink size={12} />
                        </a>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                        <span className="text-gray-400">Network</span>
                        <span className="font-medium text-emerald-400">Binance Smart Chain (Chain ID: 56)</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                        <span className="text-gray-400">Presale Mode</span>
                        <span className="font-medium text-gray-200">
                          Off-chain ledger + Manual/Batch on-chain token distribution
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INVESTOR DISTRIBUTIONS */}
            {activeTab === 'distributions' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-80">
                      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search wallet or tx hash..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-center bg-black/60 rounded-xl p-1 border border-white/10 text-xs">
                      {['all', 'pending', 'completed'].map((f) => (
                        <button
                          key={f}
                          onClick={() => setStatusFilter(f)}
                          className={`px-3 py-1 rounded-lg capitalize transition cursor-pointer ${
                            statusFilter === f
                              ? 'bg-blue-600 text-white font-semibold'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={fetchPayments}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer shrink-0"
                    title="Refresh List"
                  >
                    <RefreshCw size={15} />
                  </button>
                </div>

                {/* Table */}
                <div className="bg-[#0b1020] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-black/60 text-gray-400 uppercase text-[11px] tracking-wider border-b border-white/10">
                        <tr>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Buyer Wallet</th>
                          <th className="py-3 px-4">Amount Paid</th>
                          <th className="py-3 px-4">Payment Tx</th>
                          <th className="py-3 px-4">Tokens Owed</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {loadingPayments ? (
                          <tr>
                            <td colSpan="7" className="py-8 text-center text-gray-400">
                              Loading payments from MongoDB Atlas...
                            </td>
                          </tr>
                        ) : payments.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="py-8 text-center text-gray-400">
                              No payment records found matching criteria.
                            </td>
                          </tr>
                        ) : (
                          payments.map((p) => {
                            const isDistributing = distributingId === p._id;
                            const isPending = !p.distributed;

                            return (
                              <tr key={p._id} className="hover:bg-white/5 transition">
                                <td className="py-3 px-4 text-gray-300 whitespace-nowrap">
                                  {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="py-3 px-4">
                                  {p.walletAddress ? (
                                    <div className="flex items-center gap-1.5 font-mono">
                                      <a
                                        href={`https://bscscan.com/address/${p.walletAddress}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-400 hover:underline"
                                      >
                                        {p.walletAddress.slice(0, 6)}...{p.walletAddress.slice(-4)}
                                      </a>
                                      <button
                                        onClick={() => copyText(p.walletAddress, p._id)}
                                        className="text-gray-400 hover:text-white"
                                        title="Copy Address"
                                      >
                                        {copiedAddress === p._id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-gray-500 italic">No wallet saved</span>
                                  )}
                                </td>
                                <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                                  ${Number(p.usdValue || 0).toFixed(2)} ({p.currency})
                                </td>
                                <td className="py-3 px-4 font-mono">
                                  <a
                                    href={`https://bscscan.com/tx/${p.txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline inline-flex items-center gap-1"
                                  >
                                    <span>{p.txHash?.slice(0, 8)}...</span>
                                    <ExternalLink size={10} />
                                  </a>
                                </td>
                                <td className="py-3 px-4 font-bold text-purple-400 whitespace-nowrap">
                                  {Number(p.tokenAmount || 0).toLocaleString()} SHUK13
                                </td>
                                <td className="py-3 px-4">
                                  {p.distributed ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                      Completed ✓
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                      Pending
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  {isPending ? (
                                    <button
                                      onClick={() => handleDistribute(p)}
                                      disabled={isDistributing || !p.walletAddress}
                                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                      {isDistributing ? 'Sending Tx...' : 'Distribute Tokens'}
                                    </button>
                                  ) : (
                                    p.distributionTxHash && (
                                      <a
                                        href={`https://bscscan.com/tx/${p.distributionTxHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[11px] text-gray-400 hover:text-white underline inline-flex items-center gap-1"
                                      >
                                        <span>Tx Details</span>
                                        <ExternalLink size={10} />
                                      </a>
                                    )
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRESALE SETTINGS */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl bg-black/40 border border-white/10 rounded-3xl p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Presale Configuration</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Updates live pricing, stage targets, and emergency pause flags in MongoDB Atlas.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Current Presale Price (USD)</label>
                      <input
                        type="number"
                        step="0.00001"
                        value={settingsForm.priceUsd}
                        onChange={(e) => setSettingsForm({ ...settingsForm, priceUsd: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Next Stage Price (USD)</label>
                      <input
                        type="number"
                        step="0.00001"
                        value={settingsForm.nextPriceUsd}
                        onChange={(e) => setSettingsForm({ ...settingsForm, nextPriceUsd: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Listing Price (USD)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={settingsForm.listingPriceUsd}
                        onChange={(e) => setSettingsForm({ ...settingsForm, listingPriceUsd: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Stage Target (USDT)</label>
                      <input
                        type="number"
                        value={settingsForm.targetUsdt}
                        onChange={(e) => setSettingsForm({ ...settingsForm, targetUsdt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">Emergency Presale Pause</div>
                      <div className="text-xs text-gray-400">Temporarily disable buying button on the frontend</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, isPaused: !settingsForm.isPaused })}
                      className={`px-4 py-1.5 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                        settingsForm.isPaused
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {settingsForm.isPaused ? <Pause size={14} /> : <Play size={14} />}
                      <span>{settingsForm.isPaused ? 'Paused' : 'Active'}</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={savingSettings}
                      className="w-full py-3 rounded-2xl bg-brand-gradient text-white font-bold text-sm hover:brightness-110 active:scale-98 transition disabled:opacity-50 cursor-pointer"
                    >
                      {savingSettings ? 'Saving to MongoDB...' : 'Save Configuration'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
