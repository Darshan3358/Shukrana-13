import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import { Wallet, ShieldCheck, Coins, TrendingUp } from 'lucide-react';

export const Profile = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectMockWallet = () => {
    setWalletAddress('0x71C...49A2');
    setWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <AnnouncementBar />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-32 pb-20">
        <div className="bg-[#0b1220]/80 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Investor Vesting Profile</h1>
              <p className="text-gray-400 mt-2">Manage your presale allocation, claimed tokens, and vesting release schedule.</p>
            </div>

            {!walletConnected ? (
              <button
                onClick={connectMockWallet}
                className="px-6 py-3 rounded-2xl bg-brand-gradient text-white font-semibold flex items-center gap-2 hover:brightness-110 shadow-lg active:scale-95 transition cursor-pointer"
              >
                <Wallet size={18} />
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
                <span className="font-mono text-sm">{walletAddress}</span>
                <button
                  onClick={() => setWalletConnected(false)}
                  className="text-xs text-red-400 hover:text-red-300 ml-2"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <Coins size={18} />
                <span className="text-xs uppercase tracking-wider">Total SHUK13 Allocation</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                {walletConnected ? '55,050 SHUK13' : '—'}
              </div>
              <span className="text-xs text-gray-500 mt-1 block">Purchased in Stage 1</span>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <TrendingUp size={18} />
                <span className="text-xs uppercase tracking-wider">Current Value</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                {walletConnected ? '$2,000.00' : '—'}
              </div>
              <span className="text-xs text-green-400 mt-1 block">Listing Value: $82,575.00</span>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <ShieldCheck size={18} />
                <span className="text-xs uppercase tracking-wider">Vesting Status</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                {walletConnected ? 'Locked (100%)' : '—'}
              </div>
              <span className="text-xs text-gray-500 mt-1 block">TGE Release at Launch</span>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-[#121929]/50 border border-white/5">
            <h3 className="text-lg font-semibold mb-3">Vesting Information</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tokens purchased during the Shukrana 13 Presale are locked under secure smart contract vesting. 
              Upon Token Generation Event (TGE) and DEX listing on Solana, your allocation will be unlockable directly 
              to your connected wallet with no permission needed.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
