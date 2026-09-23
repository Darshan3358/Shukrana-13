import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  Wallet,
  Check,
  Copy,
  ExternalLink,
  LogOut,
  ChevronDown,
  AlertTriangle,
  User as UserIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

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
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const {
    account,
    isCorrectNetwork,
    shukBalance,
    connectWallet,
    disconnectWallet,
    switchToBsc,
    isConnecting
  } = useWallet();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setWalletDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            {!account ? (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="group relative inline-flex items-center gap-2.5 px-5 h-[48px] rounded-xl text-[14px] font-semibold text-white bg-brand-gradient hover:brightness-110 hover:shadow-[0_0_22px_rgba(232,49,103,0.45)] transition-all active:scale-[0.97] cursor-pointer"
              >
                <Wallet size={17} />
                <span>{isConnecting ? 'Connecting...' : 'Connect MetaMask'}</span>
              </button>
            ) : !isCorrectNetwork ? (
              <button
                onClick={switchToBsc}
                className="inline-flex items-center gap-2 px-4 h-[48px] rounded-xl text-[13px] font-semibold text-yellow-300 bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 transition-all cursor-pointer"
              >
                <AlertTriangle size={16} />
                <span>Switch to BSC</span>
              </button>
            ) : (
              <>
                {/* 👤 Profile icon — only visible when wallet is connected */}
                <Link
                  to="/profile"
                  className="group flex items-center justify-center w-[48px] h-[48px] rounded-xl bg-black/80 border border-white/15 hover:border-emerald-400/50 hover:bg-emerald-500/10 text-white transition-all shadow-lg"
                  title="My Investor Profile"
                >
                  <UserIcon 
                    size={20} 
                    className="text-gray-300 group-hover:text-emerald-400 transition-colors" 
                  />
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                    className="flex items-center gap-2.5 px-3.5 h-[48px] rounded-xl bg-black/80 border border-white/15 hover:border-white/30 text-white transition-all cursor-pointer shadow-lg"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-xs text-emerald-400 font-semibold">{shukBalance} SHUK13</span>
                      <span className="text-[12px] font-mono text-gray-300">
                        {account.slice(0, 6)}...{account.slice(-4)}
                      </span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400 ml-1" />
                  </button>

                  {walletDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-[#0d121f] border border-white/15 rounded-2xl p-4 shadow-2xl z-50 text-white animate-fade-in">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-gray-400 uppercase font-semibold">Connected Wallet</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-medium">
                          BSC Mainnet
                        </span>
                      </div>

                      <div className="py-3 space-y-2 border-b border-white/10">
                        <div className="flex items-center justify-between bg-black/50 p-2 rounded-xl border border-white/5">
                          <span className="font-mono text-xs text-gray-300 truncate max-w-[170px]">
                            {account}
                          </span>
                          <button
                            onClick={copyAddress}
                            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition"
                            title="Copy Address"
                          >
                            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>
                        </div>

                        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                          <div className="text-[11px] text-gray-400">SHUK13 Balance</div>
                          <div className="text-base font-bold text-emerald-400">{shukBalance} SHUK13</div>
                        </div>
                      </div>

                      <div className="pt-3 space-y-2 text-xs">
                        <Link
                          to="/profile"
                          onClick={() => setWalletDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold transition"
                        >
                          <span>👤 My Investor Profile</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      {account?.toLowerCase() === '0x4f2766f649e23bc2db54753c16d22066bed64bac' && (
                        <Link
                          to="/admin"
                          onClick={() => setWalletDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-semibold transition"
                        >
                          <span>👑 Admin Dashboard</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      )}
                      <a
                        href={`https://bscscan.com/address/${account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition"
                      >
                        <span>View on BscScan</span>
                        <ExternalLink size={14} />
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          disconnectWallet();
                          setWalletDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-red-500/10 text-red-400 transition cursor-pointer"
                      >
                        <span>Disconnect</span>
                        <LogOut size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <a
            href="#presale"
            onClick={(e) => scrollToSection(e, '#presale')}
            className="group relative inline-flex items-center gap-4 px-6 h-[48px] rounded-xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 bg-white text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-[0.97]"
          >
            <span className="relative overflow-hidden leading-none">
              <span className="block text-lg capitalize transition-transform duration-300 group-hover:-translate-y-full">
                Buy Now
              </span>
              <span className="absolute inset-0 translate-y-full text-lg capitalize transition-transform duration-300 group-hover:translate-y-0">
                Buy Now
              </span>
            </span>
            <span className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300 bg-brand-gradient text-white group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-2">
          {!account ? (
            <button
              onClick={connectWallet}
              className="bg-brand-gradient text-white font-semibold text-xs py-2 px-3 rounded-xl active:scale-95"
            >
              Connect
            </button>
          ) : !isCorrectNetwork ? (
            <button
              onClick={switchToBsc}
              className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 font-semibold text-xs py-2 px-2.5 rounded-xl"
            >
              Switch BSC
            </button>
          ) : (
            <>
              <span className="font-mono text-xs text-emerald-400 bg-black/60 px-2.5 py-1.5 rounded-xl border border-white/10">
                {account.slice(0, 4)}...{account.slice(-3)}
              </span>

              {/* 👤 Mobile profile icon */}
              <Link
                to="/profile"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-black/60 border border-white/10 text-gray-300 hover:text-emerald-400 active:scale-95 transition-colors"
                title="My Profile"
              >
                <UserIcon size={16} />
              </Link>
            </>
          )}

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
              {account && (
                <div className="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1">
                  <div className="text-xs text-gray-400">Wallet Connected:</div>
                  <div className="font-mono text-xs text-white break-all">{account}</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">{shukBalance} SHUK13</div>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 block w-full text-center py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 font-semibold text-xs transition"
                  >
                    📊 Open User Dashboard
                  </Link>
                  {account?.toLowerCase() === '0x4f2766f649e23bc2db54753c16d22066bed64bac' && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-2 block w-full text-center py-2 px-3 rounded-xl bg-purple-600/25 hover:bg-purple-600/35 border border-purple-500/30 text-purple-300 font-semibold text-xs transition"
                    >
                      👑 Open Admin Dashboard
                    </Link>
                  )}
                </div>
              )}
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block w-full text-left text-white text-lg border-b border-white/10 pb-3 hover:text-blue-400 transition"
                >
                  {link.label}
                </button>
              ))}
              {!account ? (
                <button
                  onClick={() => {
                    connectWallet();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center text-lg font-semibold text-white bg-brand-gradient rounded-xl px-4 py-3 hover:brightness-110 transition-all"
                >
                  Connect MetaMask
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    disconnectWallet();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center text-base font-semibold text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 cursor-pointer"
                >
                  Disconnect Wallet
                </button>
              )}
              <a
                href="#presale"
                onClick={(e) => scrollToSection(e, '#presale')}
                className="block w-full text-center mt-4 bg-white text-black font-semibold text-lg py-3 rounded-xl hover:bg-white/90 transition-all"
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
