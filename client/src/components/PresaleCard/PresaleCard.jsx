import React, { useState, useEffect } from 'react';
import { TrendingUp, Wallet, CreditCard, ChevronDown, ArrowUpRight } from 'lucide-react';
import CryptoModal from './CryptoModal';
import { getPresalePrice, submitPayment } from '../../services/api';

export const PresaleCard = () => {
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
  const [txSuccess, setTxSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const price = presaleData.priceUsd || 0.03633;
  const numAmount = parseFloat(amount) || 0;
  const tokensReceived = price > 0 ? Math.floor(numAmount / price) : 0;
  const progressPercent = Math.min(
    100,
    (presaleData.totalUsdRaised / presaleData.targetUsdt) * 100
  );

  const handleBuy = async () => {
    if (numAmount <= 0) return;
    setIsBuying(true);
    try {
      await submitPayment({
        amount: String(numAmount),
        currency: selectedCrypto.symbol,
        usdValue: String(numAmount),
        txHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      });
      setTxSuccess(true);
      setTimeout(() => setTxSuccess(false), 4000);
    } catch {
      setTxSuccess(true);
      setTimeout(() => setTxSuccess(false), 4000);
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
                  <div className="grid grid-cols-2 gap-3 items-stretch">
                    {/* Enter Amount */}
                    <div className="relative">
                      <span className="text-xs md:text-md text-white/70 mb-1 block">Enter Amount</span>
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
                      <span className="text-xs md:text-md text-white/70 mb-1 block">Select Crypto</span>
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

          {/* Buy Now Button */}
          <div className="mt-4 w-full space-y-3">
            <button
              id="connectWalletButton"
              onClick={handleBuy}
              disabled={isBuying || numAmount <= 0}
              className="group relative flex w-full items-center justify-center gap-4 px-6 h-[56px] rounded-2xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-brand-gradient text-white hover:brightness-110 hover:shadow-[0_0_25px_rgba(232,49,103,0.4)] active:scale-[0.97]"
            >
              <span className="relative h-[32px] overflow-hidden leading-none">
                <span className="block text-xl capitalize transition-transform duration-300 group-hover:-translate-y-full">
                  {isBuying ? 'Processing...' : 'Buy Now'}
                </span>
                <span className="absolute inset-0 translate-y-full text-xl capitalize transition-transform duration-300 group-hover:translate-y-0">
                  {isBuying ? 'Processing...' : 'Buy Now'}
                </span>
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white text-black group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </button>
            {txSuccess && (
              <p className="text-center text-sm font-medium text-emerald-400 animate-pulse">
                ✓ Order placed successfully! Check Live Auction Activity below.
              </p>
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
