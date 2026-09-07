import React from 'react';

const socials = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61583989307518',
    icon: '/images/svg/facebook.svg'
  },
  {
    name: 'Telegram',
    url: 'https://t.me/litmexprotocol',
    icon: '/images/svg/telegram.png'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/litmexprotocol/',
    icon: '/images/svg/instagram.svg'
  },
  {
    name: 'CoinMarketCap',
    url: 'https://coinmarketcap.com/community/profile/litmexprotocol/',
    icon: '/images/svg/cmc.svg'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/Litmexprotocol',
    icon: '/images/svg/twitter.svg'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/sXJR2B88rA',
    icon: '/images/svg/discord.svg'
  }
];

export const SocialFloatingBar = () => {
  return (
    <div className="hidden md:block fixed top-1/2 right-4 -translate-y-1/2 z-50">
      <div className="flex flex-col items-center py-6 gap-3">
        {socials.map((s, idx) => (
          <a
            key={idx}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.name}
            className="group bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-blue-500/50 p-3 rounded-2xl transition-all shadow-2xl hover:scale-105"
          >
            <img
              alt={s.name}
              loading="lazy"
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 filter-white opacity-70 group-hover:opacity-100"
              src={s.icon}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialFloatingBar;
