import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { id: 'how-to-buy', label: 'How to Buy', href: '#how-to-buy' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'tokenomics', label: 'Tokenomics', href: '#tokenomics' },
  { id: 'roadmap', label: 'Roadmap', href: '#roadmap' },
  { id: 'community', label: 'Community', href: '#community' },
  { id: 'faq', label: 'FAQ', href: '#faq' }
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="h-16 md:h-20 fixed top-0 left-0 right-0 z-40">
      <nav>
        {/* Navigation bar container */}
        <div className="max-w-[1440px] mx-auto flex items-center mt-8 md:mt-9 justify-between md:py-1.5 px-3 md:px-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              alt="Shukrana 13 Logo" 
              className="h-10 md:h-11 w-auto object-contain rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:scale-105 transition-transform duration-300" 
              src="/images/logo/shukrana-logo.png" 
            />
            <span className="font-extrabold text-lg md:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 uppercase font-sans">
              Shukrana <span className="text-white">13</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <ul className="flex gap-1 items-center">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="group px-3 py-2 text-[14px] font-medium text-white cursor-pointer"
                  >
                    <span className="relative h-[1.3em] overflow-hidden block">
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span className="absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full">
                        {link.label}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/profile"
              className="px-5 py-2 rounded-xl text-[14px] font-semibold text-white bg-brand-gradient hover:brightness-110 hover:shadow-[0_0_20px_rgba(232,49,103,0.4)] transition-all active:scale-[0.97]"
            >
              Sign In
            </Link>
            <a
              href="#presale"
              onClick={(e) => scrollToSection(e, '#presale')}
              className="group relative inline-flex items-center gap-4 px-6 h-[50px] rounded-2xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-white text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-[0.97]"
            >
              <span className="relative overflow-hidden leading-none">
                <span className="block text-xl capitalize transition-transform duration-300 group-hover:-translate-y-full">
                  Buy Now
                </span>
                <span className="absolute inset-0 translate-y-full text-xl capitalize transition-transform duration-300 group-hover:translate-y-0">
                  Buy Now
                </span>
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-brand-gradient text-white group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#presale"
              onClick={(e) => scrollToSection(e, '#presale')}
              className="bg-brand-gradient text-white font-semibold text-md py-1 px-4 rounded-xl hover:shadow-[0_0_20px_rgba(232,49,103,0.4)] transition-all active:scale-95"
            >
              Buy Now
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 relative text-white"
              aria-label="Toggle menu"
            >
              <div className="relative py-1.5">
                <svg stroke="#fff" fill="#fff" strokeWidth="0" viewBox="0 0 24 24" height="1.9em" width="1.9em" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-black to-gray-900 border-l border-white/10 transition-transform duration-300 z-50 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                <img alt="Shukrana 13" className="h-9 w-auto rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)]" src="/images/logo/shukrana-logo.png" />
                <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 uppercase">
                  Shukrana <span className="text-white">13</span>
                </span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-bold p-1">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block w-full text-left text-white text-lg border-b border-white/10 pb-3 hover:text-blue-400 transition"
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left text-lg font-semibold text-white bg-brand-gradient rounded-xl px-4 py-3 hover:brightness-110 hover:shadow-[0_0_20px_rgba(232,49,103,0.4)] transition-all"
              >
                Sign In
              </Link>
              <a
                href="#presale"
                onClick={(e) => scrollToSection(e, '#presale')}
                className="block w-full text-center mt-6 bg-brand-gradient text-white font-semibold text-lg py-4 rounded-xl hover:shadow-[0_0_25px_rgba(232,49,103,0.4)] transition-all"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
