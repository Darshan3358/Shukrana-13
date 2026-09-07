import React from 'react';

const tokenAllocations = [
  { name: 'Partnerships', percent: '6%', color: 'rgb(255, 156, 242)', textColor: 'text-black', width: '238px' },
  { name: 'Presale', percent: '25%', color: 'rgb(13, 36, 87)', textColor: 'text-white', width: '326.667px' },
  { name: 'Liquidity', percent: '15%', color: 'rgb(255, 156, 242)', textColor: 'text-black', width: '280px' },
  { name: 'Marketing', percent: '10%', color: 'rgb(13, 36, 87)', textColor: 'text-white', width: '256.667px' },
  { name: 'Community', percent: '30%', color: 'rgb(255, 156, 242)', textColor: 'text-black', width: '350px' },
  { name: 'Advisers', percent: '5%', color: 'rgb(13, 36, 87)', textColor: 'text-white', width: '233.333px' },
  { name: 'Team', percent: '5%', color: 'rgb(255, 156, 242)', textColor: 'text-black', width: '233.333px' },
  { name: 'Developments', percent: '4%', color: 'rgb(13, 36, 87)', textColor: 'text-white', width: '228.667px' }
];

export const Tokenomics = () => {
  return (
    <section className="relative py-16 px-3 md:py-24 overflow-hidden" id="tokenomics">
      <img
        alt=""
        className="absolute top-0 h-full -z-1 blur-2xl opacity-50"
        src="/images/637359db414cbf51ac571b01_home-hero-p-800.png"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        {/* Left Info Column */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">TOKENOMICS OVERVIEW</h2>
          <p className="text-gray-400 max-w-md mb-14">
            Transparent and well-balanced token distribution designed for long-term growth and ecosystem stability.
          </p>

          <div className="mb-5 md:mb-10">
            <h3 className="text-7xl font-extrabold text-[#ff9cf2]">100%</h3>
            <p className="uppercase tracking-wide text-gray-300 font-semibold mt-2">Total Token Allocation</p>
          </div>

          <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-4">DISTRIBUTION</h3>
          <p className="text-gray-400 max-w-md mb-8">
            Each category is strategically allocated to ensure healthy liquidity, strong community incentives, and sustainable development.
          </p>
        </div>

        {/* Right Distribution Bars */}
        <div className="relative flex flex-col items-end w-full overflow-hidden">
          {tokenAllocations.map((item, index) => (
            <div
              key={index}
              className={`px-3 md:px-8 py-3 md:py-6 rounded-xl font-bold flex items-center justify-between gap-6 shadow-lg -mt-3 transition-transform hover:scale-105 duration-300 ${item.textColor}`}
              style={{
                backgroundColor: item.color,
                width: item.width,
                maxWidth: '100%'
              }}
            >
              <span className="text-xl md:text-2xl">{item.percent}</span>
              <span className="uppercase text-sm md:text-base">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
