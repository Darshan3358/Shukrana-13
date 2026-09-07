import React from 'react';
import { Check } from 'lucide-react';

const coreAttributes = [
  {
    num: '1',
    title: 'AI-Powered Automation',
    description: 'Shukrana 13 integrates advanced AI agents and automation tools that analyze real-time market data, optimize strategies, and help users make smarter decisions across the ecosystem.'
  },
  {
    num: '2',
    title: 'Prediction Markets',
    description: 'Shukrana 13 enables decentralized prediction markets where users can forecast real-world outcomes using AI insights and data-driven strategies.'
  },
  {
    num: '3',
    title: 'On-Chain Gaming',
    description: 'The ecosystem includes provably fair blockchain-based games where users can play, compete, and earn rewards directly on-chain.'
  },
  {
    num: '4',
    title: 'AI Trading Bot',
    description: 'The Shukrana 13 AI trading bot continuously analyzes market behavior and executes optimized strategies to automate trading opportunities.'
  },
  {
    num: '5',
    title: '$SHUK13 Token Utility',
    description: '$SHUK13 powers the entire ecosystem. It is used for staking, governance, gaming fees, AI upgrades, marketplace access, and ecosystem rewards.'
  },
  {
    num: '6',
    title: 'Decentralized Governance',
    description: 'Token holders can participate in DAO governance, allowing the community to vote on platform upgrades and key ecosystem decisions.'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-24 px-3 lg:px-16 relative overflow-hidden" id="features">
      <img
        alt=""
        className="absolute top-0 -left-32 opacity-70 h-full blur-2xl pointer-events-none"
        src="/images/637359db414cbf51ac571b01_home-hero-p-800.png"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <p className="text-sm text-gray-200 uppercase mb-2">Features</p>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 md:mb-12">
            Core Attributes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {coreAttributes.map((attr) => (
            <div
              key={attr.num}
              className="relative border border-white/20 hover:border-white/60 rounded-3xl p-5 md:p-8 min-h-[240px] backdrop-blur-sm transition-all duration-300 overflow-hidden bg-black/40 hover:-translate-y-1"
            >
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover -z-1 rounded-3xl opacity-60"
                src="/images/cta-2323.png"
              />

              <span className="absolute top-6 right-6 w-7 h-7 rounded-full bg-black flex items-center justify-center border border-white/20">
                <Check size={14} className="text-white" />
              </span>

              {/* Number watermark */}
              <span className="text-7xl md:text-[160px] font-semibold absolute -z-0 -top-3 left-3 md:-left-3 bg-gradient-to-b from-white/90 via-white/40 to-white/5 bg-clip-text text-transparent select-none pointer-events-none">
                {attr.num}
              </span>

              <div className="mt-16 md:mt-24 relative z-10">
                <h4 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
                  {attr.title}
                </h4>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-sm">
                  {attr.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
