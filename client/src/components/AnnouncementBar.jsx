import React from 'react';
import Marquee from 'react-fast-marquee';

const tickerItems = [
  "Trade smarter with real time insights today",
  "Experience cross chain swaps in seconds",
  "Run powerful strategies without coding hassle",
  "Non custodial wallets keep your funds safe",
  "Reliable platform trusted by global traders",
  "Maximize profits using AI powered trading tools",
  "Track portfolios seamlessly across multiple chains",
  "Automated bots run strategies around the clock",
  "Low fee transactions with lightning fast settlement",
  "Advanced analytics for smarter trading decisions"
];

export const AnnouncementBar = () => {
  return (
    <div className="bg-linear-to-tr from-[#000000] to-[#2640ff] text-white w-full fixed top-0 z-40 overflow-hidden flex items-center justify-center">
      <div className="w-full overflow-hidden py-1 flex flex-col">
        <Marquee speed={50} pauseOnHover={true} gradient={false}>
          {tickerItems.map((item, index) => (
            <span key={index} className="inline-block text-white font-medium text-sm md:text-base lg:text-sm mx-1">
              {item}
              <span className="inline-block mx-3 text-blue-400 font-bold">•</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default AnnouncementBar;
