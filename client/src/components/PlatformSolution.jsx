import React from 'react';
import { Layers, Bot, Network, TrendingDown, DollarSign } from 'lucide-react';

const problems = [
  {
    icon: Layers,
    title: 'Complex Web3 Tools',
    description: 'Most blockchain platforms require technical expertise. Shukrana 13 simplifies the experience with AI-powered tools designed for both beginners and advanced users.'
  },
  {
    icon: Bot,
    title: 'Lack of Intelligent Automation',
    description: 'Traditional Web3 platforms rely heavily on manual strategies. Shukrana 13 introduces AI agents and automated trading systems that help users make smarter decisions.'
  },
  {
    icon: Network,
    title: 'Fragmented Ecosystems',
    description: 'Users often need multiple platforms for trading, gaming, predictions, and staking. Shukrana 13 integrates these experiences into one unified ecosystem.'
  },
  {
    icon: TrendingDown,
    title: 'Inefficient Strategies & Decision Making',
    description: 'Without intelligent insights, users rely on guesswork. Shukrana 13 uses AI-driven analytics to optimize strategies and improve performance.'
  },
  {
    icon: DollarSign,
    title: 'Limited Passive Earning Opportunities',
    description: 'Most platforms require constant active participation. Shukrana 13 enables automated earning through AI agents, prediction markets, and on-chain gaming.'
  }
];

export const PlatformSolution = () => {
  return (
    <section className="w-full py-12 md:py-16 relative px-3 md:my-12" id="solution">
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-1 rounded-3xl"
        src="/images/cta-2323.png"
      />

      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-11 gap-6 lg:gap-10">
        {/* Left Title Column (Sticky) */}
        <div className="relative lg:col-span-5">
          <div className="lg:sticky top-36">
            <h2 className="text-3xl md:text-4xl xl:text-6xl font-bold text-white leading-tight">
              The Problem We’re Solving
            </h2>
            <p className="text-gray-100 mt-4 text-base md:text-lg leading-relaxed">
              Shukrana 13 is designed to simplify and optimize the Web3 experience by combining AI intelligence, automation, and a unified ecosystem to make blockchain participation more efficient, accessible, and rewarding.
            </p>
          </div>
        </div>

        {/* Right Cards with Vertical Connector */}
        <div className="relative flex flex-col gap-6 lg:col-span-6">
          <span className="absolute left-[46px] top-1/2 -translate-y-1/2 h-[90%] w-px bg-gradient-to-b from-white/40 via-white/20 to-transparent hidden md:block"></span>

          {problems.map((p, index) => {
            const Icon = p.icon;
            return (
              <div
                key={index}
                className="group relative flex items-start gap-4 rounded-2xl p-4 md:p-5 transition-all duration-300 bg-[#0d0d10] border border-white/10 hover:bg-white/5 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="relative z-10 h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-[0_12px_30px_rgba(0,80,162,0.35)] bg-white/5 border border-white/10">
                  <Icon className="h-7 w-7 text-white" />
                  <span className="absolute inset-0 rounded-2xl bg-white/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformSolution;
