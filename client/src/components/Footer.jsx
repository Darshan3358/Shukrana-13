import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="relative text-white pt-12 md:pt-24 pb-8 overflow-hidden">
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-1 rotate-180 opacity-40"
        src="/images/cta-2323.png"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-wide uppercase">
          JOIN THE SHUKRANA 13 PRESALE INNOVATION
        </h2>

        <p className="mt-4 md:mt-6 max-w-3xl mx-auto text-white/70 leading-relaxed text-sm md:text-base">
          A next-generation Web3 ecosystem powered by AI agents, automated trading, and on-chain gaming, designed for intelligent participation.
        </p>

        {/* Legal Policy Links */}
        <div className="flex flex-wrap gap-6 mt-8 md:mt-10 items-center justify-center">
          <Link
            to="/terms"
            className="group relative inline-flex items-center justify-center gap-2 text-sm font-medium text-white border-white overflow-hidden"
          >
            <span className="relative inline-grid overflow-hidden">
              <span className="col-start-1 row-start-1 transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
                Terms of Service
              </span>
              <span className="col-start-1 row-start-1 translate-y-[120%] transition-transform duration-300 ease-out group-hover:translate-y-0 text-center">
                Terms of Service
              </span>
            </span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
          </Link>

          <Link
            to="/cookie"
            className="group relative inline-flex items-center justify-center gap-2 text-sm font-medium text-white border-white overflow-hidden"
          >
            <span className="relative inline-grid overflow-hidden">
              <span className="col-start-1 row-start-1 transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
                Cookie Policy
              </span>
              <span className="col-start-1 row-start-1 translate-y-[120%] transition-transform duration-300 ease-out group-hover:translate-y-0 text-center">
                Cookie Policy
              </span>
            </span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
          </Link>

          <Link
            to="/privacy"
            className="group relative inline-flex items-center justify-center gap-2 text-sm font-medium text-white border-white overflow-hidden"
          >
            <span className="relative inline-grid overflow-hidden">
              <span className="col-start-1 row-start-1 transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
                Privacy Policy
              </span>
              <span className="col-start-1 row-start-1 translate-y-[120%] transition-transform duration-300 ease-out group-hover:translate-y-0 text-center">
                Privacy Policy
              </span>
            </span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>

        {/* Big Shukrana 13 Watermark */}
        <div className="text-5xl md:text-8xl xl:text-[180px] z-10 opacity-40 font-extrabold bg-gradient-to-b from-white/90 via-white/30 to-white/5 bg-clip-text text-transparent relative pointer-events-none select-none text-center my-4 leading-none tracking-tight">
          <span>Shukrana 13</span>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 text-white/60 text-xs md:text-sm leading-relaxed max-w-4xl mx-auto">
          © 2026 Shukrana 13. All Rights Reserved. | Powered by AI & Blockchain | Shukrana 13 is a decentralized platform, and participation in the new crypto presale is at your own risk.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
