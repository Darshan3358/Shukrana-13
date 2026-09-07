import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, Users, ArrowUpRight } from 'lucide-react';

export const PresaleStats = () => {
  const [calcAmount, setCalcAmount] = useState('100');
  const tokenPrice = 0.03633;
  const listingPrice = 1.50;

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: '06',
    hours: '20',
    minutes: '51',
    seconds: '42'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(now.getTime() + (6 * 24 * 3600 + 20 * 3600 + 51 * 60 + 42) * 1000);
      const diff = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      const d = Math.floor(diff / (24 * 3600));
      const h = Math.floor((diff % (24 * 3600)) / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const numAmount = parseFloat(calcAmount) || 0;
  const tokensReceived = tokenPrice > 0 ? (numAmount / tokenPrice) : 0;
  const listingValue = tokensReceived * listingPrice;
  const roi = numAmount > 0 ? Math.round(((listingValue - numAmount) / numAmount) * 100) : 0;

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <img
        alt=""
        className="absolute right-0 h-full object-cover rounded-3xl -z-1 blur-xl opacity-40"
        src="/images/QzNWdM6U2kxda5ouY6KVdYHhT28.avif"
      />
      <img
        alt=""
        className="absolute top-0 left-0 -z-1 blur-xl opacity-70 filter-white"
        src="/images/square-pattern_g7lgt6.webp"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-white">
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">Live Presale Stats</h2>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Track real-time progress of the Shukrana 13 crypto presale and secure your allocation before the next price increase.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-4">
          {/* Left Grid: 4 Metric Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Total Raised */}
              <div className="relative backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 overflow-hidden">
                <img alt="" className="absolute inset-0 w-full h-full object-cover -z-1 rounded-2xl md:rounded-3xl" src="/images/cta-2323.png" />
                <div className="flex items-center gap-3 mb-4 md:mb-6 relative">
                  <TrendingUp size={18} className="text-white" />
                  <span className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Total Raised</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                  <span>$12,337,211</span>
                </h3>
                <div className="mb-2 md:mb-3 flex justify-between text-xs md:text-sm text-white/60 mt-8 md:mt-12">
                  <span>Phase Progress</span>
                  <span>82%</span>
                </div>
                <div className="space-y-3">
                  <div className="relative h-3 w-full rounded-full overflow-hidden bg-[#0e1b16]">
                    <div className="absolute inset-0 progress-stripes"></div>
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#0d2457] via-[#1c4db6] to-[#4f7cff] transition-[width] duration-[1400ms] ease-[cubic-bezier(.34,1.56,.64,1)] progress-fill"
                      style={{ width: '82%' }}
                    >
                      <span className="absolute inset-0 progress-shimmer"></span>
                    </div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-[1400ms] ease-[cubic-bezier(.34,1.56,.64,1)] progress-dot"
                      style={{ left: 'calc(82% - 10px)' }}
                    >
                      <span className="block w-4 h-4 rounded-full bg-white shadow-[0_0_14px_rgba(79,124,255,0.9)]"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Current Price */}
              <div className="relative backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 overflow-hidden">
                <img alt="" className="absolute inset-0 w-full h-full object-cover rotate-180 -z-1 rounded-2xl md:rounded-3xl" src="/images/cta-2323.png" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <TrendingUp size={18} className="text-white" />
                    <span className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Current Price</span>
                  </div>
                  <div className="flex items-center justify-end gap-2 text-center">
                    <span className="relative inline-flex items-center gap-2 px-2 md:px-3 py-1 rounded-full border border-green-400/40 bg-green-400/10 text-green-400 text-xs font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
                        <span className="relative rounded-full h-2 w-2 bg-green-400"></span>
                      </span>
                      <span>Live</span>
                    </span>
                  </div>
                </div>

                {/* SVG Glow Wave Chart */}
                <svg className="w-full h-16 sm:h-20 md:h-24" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgb(232, 49, 103)"></stop>
                      <stop offset="100%" stopColor="rgb(29, 50, 205)"></stop>
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(232, 49, 103)" stopOpacity="0.4"></stop>
                      <stop offset="100%" stopColor="rgb(29, 50, 205)" stopOpacity="0"></stop>
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur"></feGaussianBlur>
                      <feMerge>
                        <feMergeNode in="blur"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M0,35 C30,35 30,20 50,25 C70,30 75,5 100,5 L100,40 L0,40 Z" fill="url(#areaGradient)"></path>
                  <path d="M0,35 C30,35 30,20 50,25 C70,30 75,5 100,5" fill="none" stroke="url(#chartGradient)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"></path>
                </svg>

                <h3 className="text-3xl sm:text-3xl md:text-4xl font-bold mt-3 md:mt-4">
                  <span>${tokenPrice.toFixed(6)}</span>
                </h3>
                <p className="text-white/60 text-sm">Per $SHUK13 Token</p>
              </div>

              {/* Card 3: Current Phase */}
              <div className="relative backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 overflow-hidden">
                <img alt="" className="absolute inset-0 w-full h-full object-cover -z-1 rounded-2xl md:rounded-3xl" src="/images/cta-2323.png" />
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <Zap size={18} className="text-white" />
                  <span className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Current Phase</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                  <span>1</span>
                </h3>
                <div className="mt-10 flex gap-3 flex-wrap justify-center md:justify-start">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-medium tracking-tight text-white tabular-nums">{timeLeft.days}</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/70 mt-1">DAYS</span>
                      </div>
                      <span className="text-3xl sm:text-4xl font-light text-white/30 mx-2 -mt-1">:</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-medium tracking-tight text-white tabular-nums">{timeLeft.hours}</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/70 mt-1">HOURS</span>
                      </div>
                      <span className="text-3xl sm:text-4xl font-light text-white/30 mx-2 -mt-1">:</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-medium tracking-tight text-white tabular-nums">{timeLeft.minutes}</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/70 mt-1">MINUTES</span>
                      </div>
                      <span className="text-3xl sm:text-4xl font-light text-white/30 mx-2 -mt-1">:</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-medium tracking-tight text-white tabular-nums">{timeLeft.seconds}</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/70 mt-1">SECONDS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Total Investors */}
              <div className="relative backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 overflow-hidden">
                <img alt="" className="absolute inset-0 w-full h-full object-cover -z-1 rounded-2xl md:rounded-3xl" src="/images/cta-2323.png" />
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <Users size={18} className="text-white" />
                  <span className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Total Investors</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                  <span>19,240</span>
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column: Calculate Profit Card */}
          <div className="h-full flex">
            <div className="flex-1">
              <div className="relative border border-white/10 rounded-3xl p-3 sm:p-5 lg:p-6 text-white shadow-xl h-full flex flex-col overflow-hidden">
                <img alt="" className="absolute inset-0 w-full h-full object-cover -z-1 rounded-3xl" src="/images/cta-2323.png" />
                
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl sm:text-2xl lg:text-3xl font-semibold">Calculate profit</h2>
                </div>
                <div className="h-px bg-white/10 mb-4"></div>

                {/* Amount Input */}
                <div className="mb-4">
                  <p className="text-xs text-white/60 tracking-wide mb-2 uppercase">AMOUNT</p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl">$</span>
                    <input
                      className="w-full px-4 py-3 bg-[#1a1b1e] border border-white/10 rounded-2xl pl-8 pr-4 sm:pr-[140px] text-lg sm:text-xl lg:text-2xl font-medium outline-none text-white"
                      type="text"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                    />
                  </div>
                </div>

                {/* Current Token Price */}
                <div className="mb-4">
                  <p className="text-xs text-white/60 tracking-wide mb-2 uppercase">CURRENT TOKEN PRICE</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative w-full sm:w-[170px]">
                      <button className="w-full h-14 bg-[#1a1b1e] border border-white/10 rounded-2xl px-4 flex items-center justify-between text-md text-white">
                        Stage 1
                        <span className="text-white/40 text-xs">▼</span>
                      </button>
                    </div>
                    <div className="flex items-center flex-1 px-4 py-3 bg-[#1a1b1e] border border-white/10 rounded-2xl">
                      <span className="text-white/60 text-xl mr-2">$</span>
                      <input
                        step="0.0001"
                        readOnly
                        className="bg-transparent text-xl font-medium outline-none w-full text-white"
                        type="number"
                        value={tokenPrice}
                      />
                    </div>
                  </div>
                </div>

                {/* Tokens You Receive */}
                <div className="mb-4">
                  <p className="text-xs text-white/60 tracking-wide mb-2 uppercase">TOKENS YOU RECEIVE</p>
                  <div className="relative h-14 flex items-center bg-[#1a1b1e] border border-white/10 rounded-2xl px-4">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-black">
                      <img alt="SHUK13" className="w-7 h-7 object-contain rounded-full" src="/images/coin.png" />
                    </div>
                    <span className="pl-[60px] text-lg sm:text-xl lg:text-2xl font-medium break-all text-white">
                      {tokensReceived.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Listing Value & ROI */}
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mb-4">
                  <div className="sm:col-span-4">
                    <div className="flex justify-between text-xs text-white mb-2">
                      <span>LISTING VALUE</span>
                      <span>1 SHUK13 = ${listingPrice.toFixed(4)}</span>
                    </div>
                    <div className="px-4 py-3 flex items-center bg-[#1a1b1e] border border-white/10 rounded-2xl text-lg sm:text-xl lg:text-2xl font-medium text-white">
                      ${listingValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-white/60 tracking-wide mb-2 uppercase">ROI</p>
                    <div className="h-12 sm:h-14 flex items-center justify-center bg-[#1a1b1e] border border-white/10 rounded-2xl text-lg sm:text-xl font-semibold text-green-400">
                      {roi}%
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="w-full mt-auto pt-4">
                  <a
                    href="#presale"
                    className="group relative flex w-full items-center justify-center gap-4 px-6 h-[56px] rounded-2xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-brand-gradient text-white hover:brightness-110 hover:shadow-[0_0_25px_rgba(232,49,103,0.4)] active:scale-[0.97]"
                  >
                    <span className="relative h-[32px] overflow-hidden leading-none">
                      <span className="block text-xl capitalize transition-transform duration-300 group-hover:-translate-y-full">
                        Buy Now
                      </span>
                      <span className="absolute inset-0 translate-y-full text-xl capitalize transition-transform duration-300 group-hover:translate-y-0">
                        Buy Now
                      </span>
                    </span>
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white text-black group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresaleStats;
