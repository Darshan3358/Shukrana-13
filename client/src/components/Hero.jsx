import React from 'react';
import PresaleCard from './PresaleCard/PresaleCard';

export const Hero = () => {
  return (
    <section className="relative bg-[#050b12] overflow-hidden" id="main">
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        src="/images/image (99).png"
      />
      <div className="relative z-10 max-w-7xl mx-auto md:px-6 pb-6 pt-16 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="px-3 my-auto">
            <h1 className="text-[34px] md:text-[90px] leading-[1.2] font-extrabold text-white mt-12 md:mt-8 text-center md:text-left">
              STAGE 1 PRESALE IS <span className="text-[#ff81e0]">LIVE</span>
            </h1>
            <p className="mt-3 md:mt-8 tracking-widest text-sm text-white/70 text-center md:text-left hidden md:block">
              Join the most promising Presale, The token powered by Ai and Gaming Ecosystem
            </p>
          </div>
          <div className="pt-1 md:pt-8 max-w-3xl md:w-[480px] mx-auto">
            <PresaleCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
