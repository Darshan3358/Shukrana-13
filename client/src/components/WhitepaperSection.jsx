import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const WhitepaperSection = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl text-white py-4 md:py-12">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 md:gap-10 px-3 md:px-8 py-12 md:grid-cols-2 bg-black rounded-3xl border border-white/20">
        <img
          alt=""
          className="absolute left-24 object-cover w-[400px] -z-1 opacity-65 blur-3xl"
          src="/images/637359db414cbf51ac571b01_home-hero-p-800.png"
        />

        {/* Left Content */}
        <div className="relative text-center md:text-left">
          <p className="mb-3 text-sm text-gray-400">Web3’s Gateway to Private Markets</p>
          <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Shukrana 13 <br />
            <span className="italic">Whitepaper</span>
          </h1>
          <p className="max-w-xl text-gray-300 leading-relaxed">
            Explore how Shukrana 13 integrates AI-powered automation, on-chain gaming, prediction markets, and decentralized governance into a unified Web3 ecosystem.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 mt-10">
            <a
              href="#presale"
              className="group relative inline-flex items-center gap-4 px-6 h-[50px] rounded-2xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-brand-gradient text-white hover:brightness-110 hover:shadow-[0_0_25px_rgba(232,49,103,0.4)] active:scale-[0.97]"
            >
              <span className="relative overflow-hidden leading-none">
                <span className="block text-xl capitalize transition-transform duration-300 group-hover:-translate-y-full">
                  Join presale
                </span>
                <span className="absolute inset-0 translate-y-full text-xl capitalize transition-transform duration-300 group-hover:translate-y-0">
                  Join presale
                </span>
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white text-black group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </a>

            <a
              href="#main"
              className="group relative inline-flex items-center gap-4 px-6 h-[50px] rounded-2xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-white text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-[0.97]"
            >
              <span className="relative overflow-hidden leading-none">
                <span className="block text-xl capitalize transition-transform duration-300 group-hover:-translate-y-full">
                  Read whitepaper
                </span>
                <span className="absolute inset-0 translate-y-full text-xl capitalize transition-transform duration-300 group-hover:translate-y-0">
                  Read whitepaper
                </span>
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-brand-gradient text-white group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </div>
        </div>

        {/* Right Visual Graphic */}
        <div className="relative hidden md:flex items-center justify-center">
          <div className="relative w-full max-w-[500px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-contain"
            >
              <source src="/images/svg/shukrana-13-whitepaper.mp4" type="video/mp4" />
              <source src="/images/svg/Shukrana%2013%20Whitepaper.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperSection;
