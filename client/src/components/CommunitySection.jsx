import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const communityLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61583989307518', icon: '/images/svg/facebook.svg' },
  { name: 'Telegram', url: 'https://t.me/litmexprotocol', icon: '/images/svg/telegram.png' },
  { name: 'Instagram', url: 'https://www.instagram.com/litmexprotocol/', icon: '/images/svg/instagram.svg' },
  { name: 'CoinMarketCap', url: 'https://coinmarketcap.com/community/profile/litmexprotocol/', icon: '/images/svg/cmc.svg' },
  { name: 'Twitter', url: 'https://x.com/Litmexprotocol', icon: '/images/svg/twitter.svg' },
  { name: 'Discord', url: 'https://discord.gg/sXJR2B88rA', icon: '/images/svg/discord.svg' }
];

export const CommunitySection = () => {
  return (
    <section className="w-full py-6 md:py-12" id="community">
      <div className="max-w-7xl mx-auto px-4 md:px-8 bg-black rounded-3xl border border-white/20">
        <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-10 py-6 md:py-10">
          {/* Left Text & Links */}
          <div className="flex flex-col items-start text-left py-4">
            <p className="text-[#B0B0B0] tracking-wide uppercase text-sm md:text-[18px] font-light">
              <span className="text-[#7bd5fb]">[ </span>
              Be Part of Something Bigger — Shape the Future
              <span className="text-[#7bd5fb]"> ]</span>
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-semibold uppercase leading-tight mt-4 text-white">
              JOIN THE $SHUK13 <br /> Community
            </h2>

            <p className="max-w-2xl text-sm md:text-[18px] mt-4 font-light text-white leading-relaxed">
              At Shukrana 13, our following is the nucleus of innovation. Owning $SHUK13 unlocks decision-making privileges, beta access, and collaborative opportunities.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-6">
              {communityLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center hover:scale-110 transition border border-white/20 text-white rounded-xl bg-zinc-900/60"
                  title={item.name}
                >
                  <img alt={item.name} className="h-5 w-5 filter-white" src={item.icon} />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="animated-border w-fit mt-8 rounded-3xl">
              <a
                href="#presale"
                className="group relative inline-flex items-center gap-4 px-6 h-[50px] rounded-2xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-brand-gradient text-white hover:brightness-110 hover:shadow-[0_0_25px_rgba(232,49,103,0.4)] active:scale-[0.97]"
              >
                <span className="relative overflow-hidden leading-none">
                  <span className="block text-xl capitalize transition-transform duration-300 group-hover:-translate-y-full">
                    Join the Auction
                  </span>
                  <span className="absolute inset-0 translate-y-full text-xl capitalize transition-transform duration-300 group-hover:translate-y-0">
                    Join the Auction
                  </span>
                </span>
                <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white text-black group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </div>
          </div>

          {/* Right Visual Feature: Video */}
          <div className="relative w-full h-[280px] md:h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl flex items-center justify-center group">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-3xl"
              src="/images/shukrana-13.mp4"
            >
              <source src="/images/shukrana-13.mp4" type="video/mp4" />
              <source src="/images/Shukrana%2013.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
