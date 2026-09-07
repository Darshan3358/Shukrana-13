import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

const exchanges = [
  {
    name: "Binance",
    logo: "/images/logo/1839.png",
    description: "World’s largest crypto exchange by volume.",
    link: "https://web3.binance.com/en-IN/token/sol/Bm2y8RLPLeZuvUfQ7m3UKRiHGewTpzYt7pX8ZpzimM7d?utm_source=hometokensearch&utm_medium=binance",
    btnText: "Trade Now"
  },
  {
    name: "CoinMarketCap",
    logo: "/images/logo/38442.png",
    description: "Track crypto prices, market caps, and trends.",
    link: "https://coinmarketcap.com/currencies/litmex/",
    btnText: "Explore Now"
  },
  {
    name: "OKX",
    logo: "/images/logo/3897.png",
    description: "Advanced crypto trading & Web3 platform.",
    link: "/",
    btnText: "Trade Now"
  },
  {
    name: "Gate.io",
    logo: "/images/logo/1875.png",
    description: "Global crypto exchange with diverse trading options.",
    link: "/",
    btnText: "Trade Now"
  }
];

export const ExchangesListed = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "Bm2y8RLPLeZuvUfQ7m3UKRiHGewTpzYt7pX8ZpzimM7d";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 md:py-16 bg-black relative">
      <div
        className="absolute bg-[url('/images/square-pattern_g7lgt6.webp')] w-[320px] sm:w-105 md:w-130 right-25 top-0 aspect-square bg-cover z-1 opacity-80 filter-white pointer-events-none"
      ></div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 relative z-10">
        <h2 className="text-white text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-center md:w-[75%] mx-auto">
          Already Listed On Top Tier Exchanges.
        </h2>

        {/* Contract Address Box */}
        <div className="flex flex-col items-center justify-center gap-3 p-4 mb-6">
          <p className="text-lg md:text-xl text-white font-semibold text-center">Contract Address</p>
          <div className="flex items-center gap-3 bg-[#12061f] border border-white/30 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(168,85,247,0.25)] max-w-full">
            <span className="text-white font-semibold break-all text-center text-sm md:text-base">
              {contractAddress}
            </span>
            <button
              onClick={handleCopy}
              className="text-white/70 hover:text-purple-400 transition-colors shrink-0 p-1 cursor-pointer"
              aria-label="Copy contract address"
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
          </div>
          {copied && (
            <span className="text-xs text-green-400 font-medium animate-pulse">
              Contract address copied to clipboard!
            </span>
          )}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {exchanges.map((ex, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[28px] border border-white/30 bg-gradient-to-br from-[#0B1020] to-[#060816] p-[1px] hover:border-[#4c6fff]/40 transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)]"></div>
              <div className="relative rounded-[28px] backdrop-blur-xl px-6 py-6 h-full overflow-hidden">
                <img alt="" className="absolute inset-0 w-full h-full object-cover -z-1 rounded-3xl" src="/images/cta-2323.png" />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-18 h-18 min-w-[72px] rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center shadow-[0_0_25px_rgba(29,50,205,0.15)] group-hover:scale-105 transition-transform duration-500">
                      <img alt={ex.name} className="w-12 h-12 object-contain" src={ex.logo} />
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-semibold mb-1">{ex.name}</h3>
                      <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">{ex.description}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-medium">
                    Live
                  </div>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-white/80 text-xs">Trading Available</span>
                  </div>
                  <a
                    href={ex.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1d32cd] hover:bg-[#1d32cd]/60 text-white font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <button className="group relative inline-flex items-center justify-center gap-2 text-sm font-medium text-white border-white overflow-hidden cursor-pointer">
                      <span className="relative inline-grid overflow-hidden">
                        <span className="col-start-1 row-start-1 transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
                          {ex.btnText}
                        </span>
                        <span className="col-start-1 row-start-1 translate-y-[120%] transition-transform duration-300 ease-out group-hover:translate-y-0 text-center">
                          {ex.btnText}
                        </span>
                      </span>
                      <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </a>
                </div>

                <div className="absolute inset-0 rounded-[28px] border border-white/5 group-hover:border-[#4c6fff]/30 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExchangesListed;
