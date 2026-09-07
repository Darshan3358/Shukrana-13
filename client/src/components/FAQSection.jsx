import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is Shukrana 13?',
    a: 'Shukrana 13 is a next-generation decentralized AI and gaming ecosystem built on Solana. It integrates AI-powered trading tools, decentralized prediction markets, and on-chain gaming into a single high-performance platform.'
  },
  {
    q: 'What is the $SHUK13 token?',
    a: '$SHUK13 is the native utility token powering the Shukrana 13 ecosystem. It is used for platform transactions, staking rewards, governance voting, AI model upgrades, and gaming participation.'
  },
  {
    q: 'What are Shukrana 13 AI Agents?',
    a: 'Shukrana 13 AI Agents are autonomous smart trading algorithms that analyze on-chain data, social sentiment, and market depth 24/7 to execute optimized strategies with zero manual intervention.'
  },
  {
    q: 'What earning opportunities exist in the Shukrana 13 ecosystem?',
    a: 'Users can earn through presale allocation growth, DEX liquidity provisioning, prediction markets, play-to-earn games, and automated AI strategy profit-sharing.'
  },
  {
    q: 'Is the Shukrana 13 presale secure?',
    a: 'Yes. Smart contracts powering the presale and token logic are fully audited by top-tier Web3 security firms. All transactions are transparently recorded on-chain.'
  },
  {
    q: 'When will the Shukrana 13 ecosystem features launch?',
    a: 'Features will roll out according to our phased roadmap starting immediately after the completion of Stage 1 presale and DEX listing.'
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="text-white py-10 md:py-12 xl:py-16 sm:px-4 md:px-16 relative overflow-hidden mb-10 scroll-mt-28" id="faq">
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-1 rounded-3xl opacity-60"
        src="/images/cta-2323.png"
      />

      <div className="px-3 md:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center pb-6 md:pb-10">
          <h2 className="text-4xl sm:text-4xl md:text-6xl font-semibold mb-6">
            Your Questions, Answered
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="rounded-2xl relative z-10 overflow-hidden">
                <div className="border-2 border-[#4C4C4C] border-dotted bg-[#000] absolute inset-0 rounded-[30px] -z-1"></div>

                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left px-4 xl:py-6 py-4 cursor-pointer"
                >
                  <div className="flex items-center space-x-3 sm:space-x-7 pr-4">
                    <div className="w-2 h-2 bg-[#999999] rounded-full shrink-0"></div>
                    <span className="text-white text-base md:text-xl xl:text-2xl font-normal">
                      {faq.q}
                    </span>
                  </div>
                  <div className="bg-brand-gradient p-2 rounded-xl shrink-0">
                    <ChevronDown
                      size={20}
                      className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/5 animate-tab-slide">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
