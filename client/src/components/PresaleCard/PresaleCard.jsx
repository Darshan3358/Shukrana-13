import React, { useState, useEffect } from 'react';
import { TrendingUp, Wallet, CreditCard, ChevronDown, ArrowUpRight, CheckCircle2, ExternalLink, AlertCircle } from 'lucide-react';
import CryptoModal from './CryptoModal';
import { getPresalePrice } from '../../services/api';
import { useWallet } from '../../context/WalletContext';

export const PresaleCard = () => {
  const {
    account,
    isCorrectNetwork,
    shukBalance,
    bnbBalance,
    usdtBalance,
    bnbPrice,
    connectWallet,
    switchToBsc,
    executePresaleBuy
  } = useWallet();

  const [presaleData, setPresaleData] = useState({
    priceUsd: 0.03633,
    nextPriceUsd: 0.19896,
    totalUsdRaised: 12337211.48,
    targetUsdt: 15125000,
    investors: 19240
  });

  const [payMethod, setPayMethod] = useState('crypto'); // 'crypto' | 'card'
  const [amount, setAmount] = useState('100');
  const [selectedCrypto, setSelectedCrypto] = useState({
    symbol: 'USDTBSC',
    name: 'USDT',
    network: 'bsc',
    icon: '/images/coins/usdtbsc.svg'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [buyStatus, setBuyStatus] = useState('');
  const [lastTxHash, setLastTxHash] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPresaleStats = async () => {
    const res = await getPresalePrice();
    if (res?.data) {
      setPresaleData({
        priceUsd: res.data.priceUsd || 0.03633,
        nextPriceUsd: res.data.nextPriceUsd || 0.19896,
        totalUsdRaised: res.data.totalUsdRaised || 12337211.48,
        targetUsdt: res.data.currentStage?.targetUsdt || res.data.targetUsdt || 15125000,
        investors: res.data.totalInvestors || 19240
      });
    }
  };

  useEffect(() => {
    fetchPresaleStats();
  }, []);

  const price = presaleData.priceUsd || 0.03633;
  const numAmount = parseFloat(amount) || 0;
  const tokensReceived = price > 0 ? Math.floor(numAmount / price) : 0;
  const progressPercent = Math.min(
    100,
    (presaleData.totalUsdRaised / presaleData.targetUsdt) * 100
  );

  const handleBuy = async () => {
    setErrorMessage('');
    setLastTxHash(null);

    // 1. Check wallet connection
    if (!account) {
      await connectWallet();
      return;
    }

    // 2. Check network
    if (!isCorrectNetwork) {
      await switchToBsc();
      return;
    }

    if (numAmount <= 0) {
      setErrorMessage('Please enter an amount greater than 0.');
      return;
    }

    setIsBuying(true);
    setBuyStatus('Requesting approval & transaction in MetaMask...');

    try {
      const paymentMethod = selectedCrypto.symbol === 'BNB' ? 'BNB' : 'USDT';
      setBuyStatus('Broadcasting & confirming on BSC...');
      
      const txHash = await executePresaleBuy(numAmount, paymentMethod, price);
      
      if (txHash) {
        setLastTxHash(txHash);
        setBuyStatus('Confirmed on Binance Smart Chain!');
        // Re-fetch presale totals to reflect updated ledger
        setTimeout(fetchPresaleStats, 1000);
      }
    } catch (err) {
      console.error('Presale purchase error:', err);
      const msg = err?.reason || err?.message || 'Transaction was cancelled or failed.';
      setErrorMessage(msg.length > 90 ? msg.slice(0, 90) + '...' : msg);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="presale-card text-white relative mx-auto max-w-full overflow-x-hidden" id="presale">
      <div className="rounded-3xl border border-white/20">
        <div className="backdrop-blur rounded-3xl px-4 py-4 md:p-4 border border-black bg-black">
          <div className="space-y-3">
            {/* Limited Time Offer header */}
            <div className="flex items-center justify-between md:justify-center gap-2 md:mt-2 text-center">
              <div>
                <h2 className="text-sm md:text-3xl font-medium text-white">Limited Time Offer</h2>
              </div>
              <span className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-400/40 bg-green-400/10 text-green-400 text-[10px] font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                Live
              </span>
            </div>

            {/* Presale Price & Next Price row */}
            <div className="rounded-2xl grid grid-cols-2 bg-[#1d32cd] py-2 px-2 mb-1 text-center relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2"></div>
              <span className="text-white/80 text-sm md:text-md font-normal flex flex-col relative z-10">
                Presale Price
                <span className="text-gray-100 text-lg font-semibold">${price.toFixed(4)}</span>
              </span>
              <span className="text-white/80 text-sm md:text-md font-normal flex flex-col relative z-10">
                Next Price
                <span className="text-gray-100 text-lg font-semibold">${(presaleData.nextPriceUsd || 0.1990).toFixed(4)}</span>
              </span>
            </div>

            {/* Total Raised & Progress Bar */}
            <div className="text-center space-y-1 bg-black pt-3 px-4 rounded-2xl">
              <p className="text-white text-2xl md:text-3xl font-semibold flex items-center justify-center gap-2">
                <TrendingUp size={20} className="text-green-400" />
                ${presaleData.totalUsdRaised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RAISED
              </p>
              <div className="flex items-center justify-between text-xs md:text-sm">
                <p className="text-gray-200 text-[15px] font-semibold capitalize">Stage Target:</p>
                <span className="text-white text-xl font-semibold">${(presaleData.targetUsdt / 1000000).toFixed(2)}M</span>
              </div>
              <div className="relative pt-1">
                <div className="relative h-3 w-full rounded-full overflow-hidden bg-[#0e1b16]">
                  <div className="absolute inset-0 progress-stripes"></div>
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#0d2457] via-[#1c4db6] to-[#4f7cff] transition-[width] duration-[1400ms] ease-[cubic-bezier(.34,1.56,.64,1)] progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <span className="absolute inset-0 progress-shimmer"></span>
                  </div>
                  <div
                    className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-[1400ms] ease-[cubic-bezier(.34,1.56,.64,1)] progress-dot"
                    style={{ left: `calc(${progressPercent}% - 8px)` }}
                  >
                    <span className="block w-4 h-4 rounded-full bg-white shadow-[0_0_14px_rgba(79,124,255,0.9)]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card Wrapper */}
          <div className="relative mt-3">
            <div className="bg-[#191919] rounded-2xl overflow-hidden py-4 px-3 md:px-4">
              {/* Pay Switcher Pill */}
              <div className="pay-switcher">
                <div className={`pay-pill ${payMethod === 'card' ? 'fiat' : ''}`}></div>
                <button
                  className={`pay-tab-btn ${payMethod === 'crypto' ? 'active' : ''}`}
                  onClick={() => setPayMethod('crypto')}
                >
                  <Wallet size={15} />
                  <span className="text-xs lg:text-md">Pay with</span> Crypto
                </button>
                <button
                  className="pay-tab-btn opacity-70 cursor-not-allowed relative"
                  disabled
                >
                  <CreditCard size={15} />
                  <span className="text-xs lg:text-md">Pay with</span> Card
                  <span className="absolute -top-2 -right-2 flex items-center justify-center">
                    <span className="absolute inset-0 bg-yellow-500 rounded-full animate-ping opacity-75"></span>
                    <span className="relative text-[10px] px-2 py-0.5 rounded-full bg-yellow-600 text-white font-semibold">
                      Coming Soon
                    </span>
                  </span>
                </button>
              </div>

              {/* Amount Input & Crypto Selector */}
              <div className="mt-3">
                <div className="space-y-3">
                  {/* Account Balance Row if connected */}
                  {account && (
                    <div className="flex items-center justify-between text-xs px-1 py-1 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-gray-300">
                        Balance:{' '}
                        <strong className="text-white">
                          {selectedCrypto.symbol === 'BNB' ? `${bnbBalance} BNB` : `${usdtBalance} USDT`}
                        </strong>
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        Your SHUK13: {shukBalance}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 items-stretch">
                    {/* Enter Amount */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs md:text-sm text-white/70 block">Enter Amount</span>
                        <div className="flex items-center gap-1">
                          {['100', '500', '1000'].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setAmount(preset)}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 cursor-pointer"
                            >
                              ${preset}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center bg-black border border-white/10 rounded-2xl h-[60px] md:h-[52px] px-3">
                        <span className="text-xl md:text-2xl font-semibold text-white/50 mr-2">US$</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={amount}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9.]/g, '');
                            setAmount(val);
                          }}
                          placeholder="0.00"
                          className="w-full text-2xl md:text-3xl font-semibold bg-transparent placeholder:text-white/20 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Select Crypto */}
                    <div className="w-full">
                      <span className="text-xs md:text-sm text-white/70 mb-1 block">Select Crypto</span>
                      <div className="w-full cursor-pointer">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(true)}
                          className="w-full h-[60px] md:h-[52px] px-4 bg-black border border-white/10 rounded-2xl flex items-center justify-between gap-2 transition-colors cursor-pointer hover:border-white/20"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              alt={selectedCrypto.symbol}
                              className="w-7 h-7 md:w-6 md:h-6 rounded-full object-contain"
                              loading="lazy"
                              src={selectedCrypto.icon}
                              onError={(e) => { e.currentTarget.src = '/images/coin.png'; }}
                            />
                            <div className="flex flex-col text-left min-w-0">
                              <span className="font-semibold text-white text-sm md:text-sm truncate">
                                {selectedCrypto.symbol}
                              </span>
                              <span className="text-xs text-white/50 truncate max-w-20">
                                {selectedCrypto.network}
                              </span>
                            </div>
                          </div>
                          <ChevronDown size={20} className="text-white/50 shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swap Icon Divider */}
                <div className="relative h-0 mt-5">
                  <div className="absolute inset-x-4 border-t border-white/10"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 rounded-xl bg-black border border-white/10 shadow-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="m3 16 4 4 4-4"></path>
                        <path d="M7 20V4"></path>
                        <path d="m21 8-4-4-4 4"></path>
                        <path d="M17 4v16"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* You Receive Section */}
                <div className="pt-3">
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    You Receive
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1">
                      <span className="text-2xl font-semibold text-white">
                        {tokensReceived.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2.5 md:py-2 rounded-xl border border-white/10 bg-black shrink-0">
                      <div className="w-8 h-8 relative shrink-0">
                        <img alt="ICO" className="object-contain w-full h-full" loading="lazy" src="/images/coin.png" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-white text-sm leading-tight">Shukrana 13</span>
                        <span className="text-xs text-white/50 leading-tight">SHUK13</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action / Buy Now Button */}
          <div className="mt-4 w-full space-y-3">
            <button
              id="connectWalletButton"
              onClick={handleBuy}
              disabled={isBuying || (account && isCorrectNetwork && numAmount <= 0)}
              className="group relative flex w-full items-center justify-center gap-4 px-6 h-[56px] rounded-2xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-brand-gradient text-white hover:brightness-110 hover:shadow-[0_0_25px_rgba(232,49,103,0.4)] active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative h-[32px] overflow-hidden leading-none">
                <span className="block text-xl capitalize transition-transform duration-300 group-hover:-translate-y-full">
                  {!account
                    ? 'Connect MetaMask'
                    : !isCorrectNetwork
                    ? 'Switch Network to BSC'
                    : isBuying
                    ? 'Processing...'
                    : `Buy Now with ${selectedCrypto.symbol === 'BNB' ? 'BNB' : 'USDT'}`}
                </span>
                <span className="absolute inset-0 translate-y-full text-xl capitalize transition-transform duration-300 group-hover:translate-y-0">
                  {!account
                    ? 'Connect MetaMask'
                    : !isCorrectNetwork
                    ? 'Switch Network to BSC'
                    : isBuying
                    ? 'Processing...'
                    : `Buy Now with ${selectedCrypto.symbol === 'BNB' ? 'BNB' : 'USDT'}`}
                </span>
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white text-black group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </button>

            {/* In-Flight Status */}
            {isBuying && (
              <div className="flex items-center justify-center gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-300 text-xs animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></span>
                <span>{buyStatus}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-xs">
                <AlertCircle size={16} className="shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Transaction Success Alert */}
            {lastTxHash && (
              <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-left space-y-1.5 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 size={16} />
                  <span>Transaction Confirmed on BSC!</span>
                </div>
                <p className="text-xs text-gray-300">
                  Your purchase was recorded on the presale ledger. SHUK13 tokens will be distributed by the treasury.
                </p>
                <a
                  href={`https://bscscan.com/tx/${lastTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline font-mono pt-1"
                >
                  <span>View on BscScan ({lastTxHash.slice(0, 10)}...{lastTxHash.slice(-8)})</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <CryptoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={setSelectedCrypto}
        selected={selectedCrypto}
      />
    </div>
  );
};

export default PresaleCard;
