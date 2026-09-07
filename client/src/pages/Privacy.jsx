import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <AnnouncementBar />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="bg-[#0b1220]/80 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-xl shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: September 2026</p>

          <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-2">1. Decentralized & Non-Custodial Architecture</h2>
              <p>
                Shukrana 13 values your privacy. We do not collect private keys, seed phrases, or sensitive personal identity documentation. Transactions are executed directly on public blockchains through your chosen Web3 wallet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">2. Information We Process</h2>
              <p>
                When interacting with the platform, we may temporarily log public blockchain transaction hashes and public wallet addresses necessary to index presale contributions and facilitate token delivery.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">3. Security</h2>
              <p>
                We implement industry-standard encryption and security protocols to safeguard all cached transaction metadata and ensure server integrity.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
