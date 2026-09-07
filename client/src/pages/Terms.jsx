import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';

export const Terms = () => {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <AnnouncementBar />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="bg-[#0b1220]/80 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-xl shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: September 2026</p>

          <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-2">1. Agreement to Terms</h2>
              <p>
                By accessing or using Shukrana 13 Presale and associated protocols, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">2. Presale Participation</h2>
              <p>
                Participation in the Shukrana 13 token presale involves high market risks. You confirm that you understand the speculative nature of crypto assets and that purchases are made voluntarily. Shukrana 13 is not an investment vehicle or financial advisor.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">3. Eligibility and Jurisdiction</h2>
              <p>
                You represent and warrant that you are of legal age and that participating in decentralized token generation events is permitted under the applicable laws and regulations of your local jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">4. Disclaimers and Limitations of Liability</h2>
              <p>
                The platform is provided on an "as-is" and "as-available" basis without warranties of any kind. Under no circumstances shall Shukrana 13 be held liable for smart contract exploits, network congestion, or market volatility.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
