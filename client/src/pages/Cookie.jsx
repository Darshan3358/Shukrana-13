import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';

export const Cookie = () => {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <AnnouncementBar />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="bg-[#0b1220]/80 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-xl shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: September 2026</p>

          <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-2">1. Use of Local Storage & Cookies</h2>
              <p>
                Shukrana 13 uses minimal local session storage solely to remember user UI preferences, active currency selections, and connected wallet sessions. We do not use third-party invasive tracking or sell user telemetry.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">2. Managing Preferences</h2>
              <p>
                You can configure your browser to block or alert you about cookies, though certain interactive features of the decentralized application may not function without local session state.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cookie;
