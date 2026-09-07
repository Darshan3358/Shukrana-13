import React from 'react';

const exchangeListings = [
  { name: 'Binance', logo: '/images/logo/1839.png', isOffset: false },
  { name: 'Kucoin', logo: '/images/logo/logo-sm.png', isOffset: true },
  { name: 'Gate.io', logo: '/images/logo/1875.png', isOffset: false },
  { name: 'Bybit', logo: '/images/logo/38442.png', isOffset: true },
  { name: 'OKX', logo: '/images/logo/3897.png', isOffset: false },
  { name: 'Mexc', logo: '/images/coin.png', isOffset: true }
];

export const ConfirmedListings = () => {
  return (
    <div className="relative w-full py-12 lg:py-32 overflow-hidden">
      <img
        alt=""
        className="absolute right-0 h-full w-full object-cover rounded-3xl blur-xl opacity-30 pointer-events-none"
        src="/images/QzNWdM6U2kxda5ouY6KVdYHhT28.avif"
      />
      <img
        alt=""
        className="absolute top-0 left-0 blur-xl opacity-70 filter-white pointer-events-none"
        src="/images/square-pattern_g7lgt6.webp"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="rounded-4xl p-3 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 relative">
          <div
            className="absolute bg-[url('/images/square-pattern_g7lgt6.webp')] w-[320px] sm:w-105 md:w-130 right-25 top-0 aspect-square bg-cover z-1 opacity-80 filter-white pointer-events-none"
          ></div>

          {/* Left Title */}
          <div className="col-span-2 px-3 sm:px-8 md:px-12 flex justify-center flex-col text-center lg:text-left z-10">
            <h2 className="text-4xl md:text-5xl text-white font-bold leading-tight">
              Top Exchange Listings <br /> Confirmed
            </h2>
            <p className="text-lg text-white mt-3 sm:mt-4 max-w-lg leading-relaxed">
              Shukrana 13 is officially confirmed for launch on major global exchanges including: Binance, Kucoin, Gate.io, Bybit, OKX, Mexc
            </p>
          </div>

          {/* Right Grid of Staggered Cards */}
          <div className="grid grid-cols-2 lg:absolute lg:right-7.5 lg:top-1/2 transform lg:-translate-y-1/2 gap-3 sm:gap-5 z-10">
            {exchangeListings.map((item, idx) => (
              <div
                key={idx}
                className={`bg-[#191919] rounded-4xl flex flex-col items-center justify-center p-4 md:p-6 shadow-md hover:scale-105 transition-transform duration-300 h-28 sm:h-36 w-36 sm:w-44 border border-[#0050a220] ${
                  item.isOffset ? '-mt-2.5 sm:-mt-5' : 'mt-2.5 sm:mt-5'
                }`}
              >
                <img
                  alt={item.name}
                  loading="lazy"
                  className="h-8 md:h-10 object-contain mb-1.5"
                  src={item.logo}
                />
                <span className="text-xs font-semibold text-white/90">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedListings;
