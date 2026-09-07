import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Connect Your Wallet',
    description: 'Use WalletConnect to link any Web3 wallet and get ready to join the crypto presale immediately.',
    image: '/images/buy/buy-step1.png'
  },
  {
    number: '2',
    title: 'Choose Your Currency',
    description: 'Pay with ETH, USDT, BNB, MATIC, USDC - all supported for fast, secure transactions.',
    image: '/images/buy/buy-step2.png'
  },
  {
    number: '3',
    title: 'Enter Amount & Buy',
    description: 'Select your allocation and complete a verified on-chain transaction in seconds.',
    image: '/images/buy/buy-step3.png'
  },
  {
    number: '4',
    title: 'Receive Your $SHUK13 Tokens',
    description: 'Tokens are delivered safely to your wallet after purchase or at the end of the presale.',
    image: '/images/buy/buy-step4.png'
  }
];

export const HowToBuy = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden" id="how-to-buy">
      <img
        alt=""
        className="absolute right-0 h-full object-cover rounded-3xl -z-1 blur-xl opacity-80"
        src="/images/QzNWdM6U2kxda5ouY6KVdYHhT28.avif"
      />
      <img
        alt=""
        className="absolute top-0 left-0 -z-1 blur-xl opacity-70 filter-white"
        src="/images/square-pattern_g7lgt6.webp"
      />

      <div className="max-w-7xl mx-auto px-3 md:px-12 relative">
        <div className="max-w-3xl mb-8 text-white mx-auto text-center">
          <h2 className="text-4xl sm:text-4xl md:text-6xl font-bold text-center">
            Own $SHUK13 in Just 4 Simple Steps
          </h2>
          <p className="text-white/70 mt-4 leading-relaxed">
            Be an early investor in a next-generation AI utility token built for the future of Web3. Transparent smart contracts and a growing ecosystem you can trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-6 group rounded-2xl bg-[#121212] border border-white/10 hover:border-white/20 transition overflow-hidden"
            >
              <span className="flex items-center justify-center absolute top-6 right-6 w-9 h-9 rounded-lg transition-all duration-300 border border-white/40 text-white group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>

              {/* Large numbered watermark */}
              <span className="text-7xl md:text-[160px] font-semibold absolute -z-0 -top-3 left-3 md:-left-3 bg-gradient-to-b from-white/90 via-white/70 to-white/5 bg-clip-text text-transparent select-none pointer-events-none">
                {step.number}
              </span>

              <div className="flex justify-center mb-2 relative z-10">
                <img
                  alt={step.title}
                  className="w-52 md:w-80 rounded-2xl object-contain transition-transform duration-500 group-hover:scale-105"
                  src={step.image}
                />
              </div>

              <div className="mt-4 ml-4 md:ml-8 relative z-10">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
