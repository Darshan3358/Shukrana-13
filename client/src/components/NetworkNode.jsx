import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const NetworkNode = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black py-16 md:py-24">
      {/* Background Grid and Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(255, 255, 255) 1px, transparent 1px), linear-gradient(rgb(255, 255, 255) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            transform: 'rotateX(65deg) scale(2) translateY(0px)',
            transformOrigin: 'center top'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        <div
          className="absolute left-1/2 top-1/2 rounded-full bg-blue-500/10 blur-[180px]"
          style={{ width: '1000px', height: '1000px', opacity: 0.8, transform: 'translateX(-50%) translateY(-50%)' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Node Heading */}
        <div className="flex flex-col items-center text-center px-4 mb-6">
          <span className="text-[11px] tracking-[0.5em] text-blue-500 uppercase font-bold">NETWORK NODE 01</span>
          <h3 className="text-white text-3xl md:text-4xl font-bold mt-3">Buy Before the Price Rises</h3>
        </div>

        {/* Large Background Titles */}
        <div className="relative w-full flex flex-col items-center justify-center my-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none opacity-90">
              Already
            </h1>
            <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none italic opacity-90">
              listed
            </h1>
          </div>

          {/* Binance Web3 Feature Card */}
          <a
            href="https://bscscan.com/token/0x860d6Ee29C12A0C023Fc03741348Dd3d15596f95"
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 rounded-[3rem] overflow-hidden bg-white/5 border border-white/20 p-3 group cursor-pointer block max-w-full shadow-2xl transition-transform hover:scale-[1.02]"
            style={{ width: '600px', maxHeight: '420px' }}
          >
            <div className="absolute left-0 z-20 h-px w-full bg-blue-500/50 shadow-[0_0_20px_#3b82f6] pointer-events-none top-[15%]"></div>
            <div className="relative w-full h-72 md:h-80 rounded-[2.5rem] overflow-hidden">
              <img
                alt="analytics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/images/Bnb-list.png"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                <div className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold tracking-widest uppercase text-sm backdrop-blur-md shadow-2xl flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                  Open Binance Web3
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Bottom Callout Box */}
        <div className="max-w-4xl mx-auto text-center px-6 mt-12">
          <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <p className="text-white text-xl md:text-2xl font-bold leading-tight">
              Not like other's just launching presale, We already listed and tradeble on
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eb4795] to-[#007eff] capitalize">
                {' '}binance Dex, okx, gate.io
              </span>
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium">
              You’re not simply buying $SHUK13 — you’re positioning yourself in the future of AI-powered Web3.
            </p>
            <div className="pt-2 flex justify-center">
              <a
                href="#presale"
                className="group relative inline-flex items-center gap-4 px-6 h-[50px] rounded-2xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-brand-gradient text-white hover:brightness-110 hover:shadow-[0_0_25px_rgba(232,49,103,0.4)] active:scale-[0.97]"
              >
                <span className="relative overflow-hidden leading-none">
                  <span className="block text-xl capitalize transition-transform duration-300 group-hover:-translate-y-full">
                    Buy Presale
                  </span>
                  <span className="absolute inset-0 translate-y-full text-xl capitalize transition-transform duration-300 group-hover:translate-y-0">
                    Buy Presale
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
    </section>
  );
};

export default NetworkNode;
