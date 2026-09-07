import React from 'react';
import { Bot, Rocket, Gamepad2 } from 'lucide-react';

export const EcosystemRoadmap = () => {
  return (
    <section className="bg-[#03050d] overflow-hidden relative py-12 md:py-20" id="roadmap">
      <img
        alt=""
        className="absolute right-0 h-full object-cover rounded-3xl blur-xl opacity-60 pointer-events-none"
        src="/images/QzNWdM6U2kxda5ouY6KVdYHhT28.avif"
      />
      <img
        alt=""
        className="absolute top-0 left-0 blur-xl opacity-70 pointer-events-none filter-white"
        src="/images/square-pattern_g7lgt6.webp"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="md:w-[80%] px-3 lg:px-8 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl xl:text-6xl font-bold text-white mb-4 capitalize">
            $6M Raised — The Journey Toward $600M Begins
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto md:mb-6">
            The $6 Million collected from the Shukrana 13 presale ICO is the starting capital for the entire ecosystem. Every dollar is transparently deployed across three revenue-generating segments.
          </p>
        </div>

        {/* Tree Container */}
        <div className="relative max-w-6xl mx-auto px-4 lg:px-6 md:mt-12 mt-6 flex flex-col items-center">
          {/* Top $6M Card */}
          <div className="w-full max-w-4xl relative z-10 overflow-hidden">
            <img alt="" className="absolute top-0 right-0 object-cover rounded-[32px]" src="/images/cta-2323.png" />
            <div className="border border-white/[0.08] rounded-[32px] p-4 md:p-6 gap-8 text-left overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="flex flex-col">
                <div className="flex items-center justify-center">
                  <span className="text-[60px] md:text-[90px] font-semibold text-white tracking-tighter leading-none text-center">
                    $6M
                  </span>
                </div>
                <span className="text-gray-50 text-2xl font-semibold tracking-wide uppercase mt-2 text-center">
                  DEPLOYED ACROSS THE REVENUE SEGMENTS
                </span>
              </div>
              <div>
                <p className="text-xs md:text-sm text-white leading-relaxed capitalize text-center mt-6">
                  Three independent revenue engines — each generating real income, building real users, and feeding permanent liquidity back into the SHUK13 token. Multiple streams mean multiple layers of protection for your investment.
                </p>
              </div>
            </div>
          </div>

          {/* Top Connector Lines */}
          <div className="relative w-full h-12 md:h-28">
            <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#007eff] to-[#007eff]/50 transform -translate-x-1/2 shadow-[0_0_10px_rgba(0,126,255,0.8)]"></div>
            <div className="hidden md:block w-full h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="topCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#007eff"></stop>
                    <stop offset="100%" stopColor="#007eff"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 50,0 L 50,35 Q 50,50 35,50 L 31.66,50 Q 16.66,50 16.66,65 L 16.66,100"
                  fill="none"
                  stroke="url(#topCurveGrad)"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(0, 126, 255, 0.85) 0px 0px 4px)' }}
                ></path>
                <path
                  d="M 50,0 L 50,100"
                  fill="none"
                  stroke="#007eff"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(0, 126, 255, 0.85) 0px 0px 4px)' }}
                ></path>
                <path
                  d="M 50,0 L 50,35 Q 50,50 65,50 L 68.33,50 Q 83.33,50 83.33,65 L 83.33,100"
                  fill="none"
                  stroke="url(#topCurveGrad)"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(0, 126, 255, 0.85) 0px 0px 4px)' }}
                ></path>
              </svg>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="absolute w-8 h-8 rounded-full bg-[#007eff]/20 animate-ping"></div>
                <div className="w-4 h-4 rounded-full bg-white border-[3px] border-[#007eff] shadow-[0_0_15px_#007eff]"></div>
              </div>
            </div>
          </div>

          {/* 3 Segments */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* 1. AI ECOSYSTEM */}
            <div className="group relative bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/[0.08] hover:border-gray-300/60 rounded-[32px] p-6 lg:p-8 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,126,255,0.15)] overflow-hidden cursor-pointer flex flex-col">
              <img alt="" className="absolute top-0 right-0 h-full object-cover rounded-[32px]" src="/images/cta-2323.png" />
              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex items-center justify-center transition-all shadow-md group-hover:bg-gray-300/20 shrink-0">
                    <Bot className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all">
                      AI ECOSYSTEM
                    </h3>
                  </div>
                </div>
                <p className="text-left text-gray-200 text-sm font-semibold leading-relaxed mb-6 border-b border-white/[0.05] pb-2">
                  Trading Bots · AI Agents · Passive Income · Automation
                </p>
                <p className="text-left text-gray-100 text-xs pb-4">
                  Shukrana 13 launches its own Decentralized Exchange on Solana — enabling users to trade SHUK13 and other tokens directly from their wallets, with no middlemen and no withdrawal limits.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">100K+</span>
                    <span className="text-gray-200 text-[10px] font-bold tracking-[0.1em] uppercase mt-1">community</span>
                  </div>
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#eb4795] to-gray-300 tracking-tight">$1.5M</span>
                    <span className="text-gray-200 text-[10px] font-bold tracking-[0.1em] uppercase mt-1">fund raised</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DEX LAUNCH */}
            <div className="group relative bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/[0.08] hover:border-gray-300/60 rounded-[32px] p-6 lg:p-8 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,126,255,0.15)] overflow-hidden cursor-pointer flex flex-col">
              <img alt="" className="absolute top-0 right-0 h-full object-cover rounded-[32px]" src="/images/cta-2323.png" />
              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex items-center justify-center transition-all shadow-md group-hover:bg-gray-300/20 shrink-0">
                    <Rocket className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all">
                      DEX LAUNCH
                    </h3>
                  </div>
                </div>
                <p className="text-left text-gray-200 text-sm font-semibold leading-relaxed mb-6 border-b border-white/[0.05] pb-2">
                  Decentralized Exchange · Solana · Trading Platform
                </p>
                <p className="text-left text-gray-100 text-xs pb-4">
                  The DEX Launch transforms $2.5M of presale capital into a full-fledged decentralized exchange on Solana.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">50K+</span>
                    <span className="text-gray-200 text-[10px] font-bold tracking-[0.1em] uppercase mt-1">community</span>
                  </div>
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#eb4795] to-gray-300 tracking-tight">$2.5M</span>
                    <span className="text-gray-200 text-[10px] font-bold tracking-[0.1em] uppercase mt-1">fund raised</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. GAMING HUB */}
            <div className="group relative bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/[0.08] hover:border-gray-300/60 rounded-[32px] p-6 lg:p-8 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,126,255,0.15)] overflow-hidden cursor-pointer flex flex-col">
              <img alt="" className="absolute top-0 right-0 h-full object-cover rounded-[32px]" src="/images/cta-2323.png" />
              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex items-center justify-center transition-all shadow-md group-hover:bg-gray-300/20 shrink-0">
                    <Gamepad2 className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all">
                      GAMING HUB
                    </h3>
                  </div>
                </div>
                <p className="text-left text-gray-200 text-sm font-semibold leading-relaxed mb-6 border-b border-white/[0.05] pb-2">
                  Prediction Markets · Slots · Play-to-Earn · On-Chain
                </p>
                <p className="text-left text-gray-100 text-xs pb-4">
                  The GameFi Hub transforms $5M of presale capital into a complete gaming ecosystem — combining prediction markets, casino games, and Play-to-Earn mechanics.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">250K+</span>
                    <span className="text-gray-200 text-[10px] font-bold tracking-[0.1em] uppercase mt-1">community</span>
                  </div>
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#eb4795] to-gray-300 tracking-tight">$5.0M</span>
                    <span className="text-gray-200 text-[10px] font-bold tracking-[0.1em] uppercase mt-1">fund raised</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Connector Lines to 600M */}
          <div className="relative w-full h-12 md:h-28">
            <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#eb4795] to-[#e83167] transform -translate-x-1/2 shadow-[0_0_10px_rgba(232,49,103,0.8)]"></div>
            <div className="hidden md:block w-full h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bottomCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#007eff"></stop>
                    <stop offset="100%" stopColor="#eb4795"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 16.66,0 L 16.66,35 Q 16.66,50 31.66,50 L 35,50 Q 50,50 50,65 L 50,100"
                  fill="none"
                  stroke="url(#bottomCurveGrad)"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(235, 71, 149, 0.85) 0px 0px 4px)' }}
                ></path>
                <path
                  d="M 50,0 L 50,100"
                  fill="none"
                  stroke="#eb4795"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(235, 71, 149, 0.85) 0px 0px 4px)' }}
                ></path>
                <path
                  d="M 83.33,0 L 83.33,35 Q 83.33,50 68.33,50 L 65,50 Q 50,50 50,65 L 50,100"
                  fill="none"
                  stroke="url(#bottomCurveGrad)"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(235, 71, 149, 0.85) 0px 0px 4px)' }}
                ></path>
              </svg>
              <div className="absolute left-[16.66%] top-0 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="absolute w-6 h-6 rounded-full bg-[#007eff]/20 animate-ping"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-white border-[3px] border-[#007eff] shadow-[0_0_15px_#007eff]"></div>
              </div>
              <div className="absolute right-[16.66%] top-0 translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="absolute w-6 h-6 rounded-full bg-[#007eff]/20 animate-ping"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-white border-[3px] border-[#007eff] shadow-[0_0_15px_#007eff]"></div>
              </div>
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20 flex items-center justify-center">
                <div className="absolute w-8 h-8 rounded-full bg-[#eb4795]/20 animate-ping"></div>
                <div className="w-4 h-4 rounded-full bg-white border-[3px] border-[#eb4795] shadow-[0_0_15px_#eb4795]"></div>
              </div>
            </div>
          </div>

          {/* 600M Card */}
          <div className="relative w-full overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
              <div className="relative overflow-hidden rounded-[36px] border border-white/20 bg-[#03162d]/75 backdrop-blur-2xl">
                <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" src="/images/cta-2323.png" />
                <div className="relative z-10 grid lg:grid-cols-[420px_1fr]">
                  <div className="flex flex-col justify-center px-3 md:px-8 md:px-14 py-6 md:py-12 border-r border-white/[0.06]">
                    <span className="text-gray-200 text-[11px] tracking-[0.35em] uppercase mb-6">
                      Ecosystem Hardcap Target
                    </span>
                    <div className="flex items-end leading-none">
                      <h2 className="text-7xl lg:text-8xl font-semibold tracking-[-0.06em] text-white">600M</h2>
                    </div>
                    <p className="mt-5 text-gray-200 text-[14px] uppercase tracking-[0.35em]">
                      Maximum Ecosystem Value Reached
                    </p>
                  </div>
                  <div className="px-3 md:px-8 py-3 md:py-8">
                    <h2 className="text-white text-2xl md:text-3xl leading-[1.15] tracking-[-0.03em] max-w-4xl">
                      Three Segments. One Unstoppable Revenue Engine.
                    </h2>
                    <p className="text-gray-200 text-md mt-4 max-w-4xl">
                      When DEX trading fees, Gaming Hub revenue, and AI profit-sharing combine into a single ecosystem, the result is a <span className="text-white font-semibold">$600 Million valuation</span> backed by <span className="text-white font-semibold">real, continuous, on-chain revenue</span>. This is the financial foundation that gives <span className="text-white font-semibold">every token permanent value support</span> and enables the liquidity allocation for presale investors.
                    </p>
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-200 text-[11px] tracking-[0.35em]">$600M Revenue Source Distribution</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden bg-white/[0.04] flex">
                        <div className="w-[30%] bg-[#248bff]"></div>
                        <div className="w-[45%] bg-[#00e5b0]"></div>
                        <div className="w-[25%] bg-[#d85cff]"></div>
                      </div>
                      <div className="flex flex-wrap gap-6 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#248bff]"></div>
                          <span className="text-gray-100 text-[11px]">DEX Trading Fees — 30%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00e5b0]"></div>
                          <span className="text-gray-100 text-[11px]">Gaming Hub Revenue — 45%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#d85cff]"></div>
                          <span className="text-gray-100 text-[11px]">AI Ecosystem Profits — 25%</span>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-5 mt-5">
                        <div className="rounded-2xl border border-[#248bff]/20 bg-[#248bff]/5 backdrop-blur-xl px-6 py-6 shadow-lg">
                          <h3 className="text-[#4aa8ff] text-xl md:text-2xl font-black tracking-tight">$180M</h3>
                          <p className="mt-3 text-gray-50 text-[11px] tracking-[0.3em]">DEX Contribution</p>
                        </div>
                        <div className="rounded-2xl border border-[#00e5b0]/20 bg-[#00e5b0]/5 backdrop-blur-xl px-6 py-6 shadow-lg">
                          <h3 className="text-[#00e5b0] text-xl md:text-2xl font-black tracking-tight">$270M</h3>
                          <p className="mt-3 text-gray-50 text-[11px] tracking-[0.3em]">Gaming Contribution</p>
                        </div>
                        <div className="rounded-2xl border border-[#d85cff]/20 bg-[#d85cff]/5 backdrop-blur-xl p-4 shadow-lg">
                          <h3 className="text-[#e781ff] text-xl md:text-2xl font-black tracking-tight">$150M</h3>
                          <p className="mt-3 text-gray-50 text-[11px] tracking-[0.3em]">AI Contribution</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Connector to $150M */}
          <div className="relative w-full h-12 md:h-28">
            <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#eb4795] to-[#e83167] transform -translate-x-1/2 shadow-[0_0_10px_rgba(232,49,103,0.8)]"></div>
            <div className="hidden md:block w-full h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bottomCurveGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#007eff"></stop>
                    <stop offset="100%" stopColor="#eb4795"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 16.66,0 L 16.66,35 Q 16.66,50 31.66,50 L 35,50 Q 50,50 50,65 L 50,100"
                  fill="none"
                  stroke="url(#bottomCurveGrad2)"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(235, 71, 149, 0.85) 0px 0px 4px)' }}
                ></path>
                <path
                  d="M 50,0 L 50,100"
                  fill="none"
                  stroke="#eb4795"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(235, 71, 149, 0.85) 0px 0px 4px)' }}
                ></path>
                <path
                  d="M 83.33,0 L 83.33,35 Q 83.33,50 68.33,50 L 65,50 Q 50,50 50,65 L 50,100"
                  fill="none"
                  stroke="url(#bottomCurveGrad2)"
                  strokeWidth="2"
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'drop-shadow(rgba(235, 71, 149, 0.85) 0px 0px 4px)' }}
                ></path>
              </svg>
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20 flex items-center justify-center">
                <div className="absolute w-8 h-8 rounded-full bg-[#eb4795]/20 animate-ping"></div>
                <div className="w-4 h-4 rounded-full bg-white border-[3px] border-[#eb4795] shadow-[0_0_15px_#eb4795]"></div>
              </div>
            </div>
          </div>

          {/* $150M Investor Allocation Card */}
          <div className="w-full max-w-6xl relative z-10">
            <div className="relative bg-[#03162d]/70 backdrop-blur-xl border border-white/[0.08] rounded-[32px] px-6 md:px-10 py-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden">
              <img alt="" className="absolute inset-0 h-full w-full object-cover rounded-[32px] opacity-80" src="/images/cta-2323.png" />
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex flex-col">
                  <span className="text-white text-[10px] md:text-xs font-medium tracking-[0.35em] uppercase mb-3">
                    Presale Investor Allocation
                  </span>
                  <h2 className="text-[52px] md:text-[76px] leading-none font-bold tracking-tight text-white">
                    $150M
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base mt-3">Returned to presale investors</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 md:gap-5 text-white max-w-xl">
                  <p className="leading-relaxed text-sm md:text-base">
                    Out of the $600M ecosystem, $150 Million — 25% of the total — is allocated directly to the investors who participated in the Shukrana 13 presale ICO. This money is added to the liquidity pool, giving you the freedom to sell your SHUK13 tokens whenever you choose — at market price, no locks, no delays, no permission required. Your investment. Your exit. Your terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemRoadmap;
