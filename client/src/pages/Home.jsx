import React from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import SocialFloatingBar from '../components/SocialFloatingBar';
import Hero from '../components/Hero';
import LiveAuctionTable from '../components/LiveAuctionTable';
import PresaleStats from '../components/PresaleStats';
import EcosystemRoadmap from '../components/EcosystemRoadmap';
import ExchangesListed from '../components/ExchangesListed';
import NetworkNode from '../components/NetworkNode';
import HowToBuy from '../components/HowToBuy';
import Tokenomics from '../components/Tokenomics';
import PlatformSolution from '../components/PlatformSolution';
import WhitepaperSection from '../components/WhitepaperSection';
import ConfirmedListings from '../components/ConfirmedListings';
import FeaturesSection from '../components/FeaturesSection';
import FAQSection from '../components/FAQSection';
import CommunitySection from '../components/CommunitySection';
import Footer from '../components/Footer';

export const Home = () => {
  return (
    <div className="app min-h-screen bg-[#050b12] text-white">
      <AnnouncementBar />
      <Navbar />
      <SocialFloatingBar />

      <main className="main-content relative pt-12 md:pt-14">
        <Hero />
        <LiveAuctionTable />
        <PresaleStats />
        <EcosystemRoadmap />
        <ExchangesListed />
        <NetworkNode />
        <HowToBuy />
        <Tokenomics />
        <PlatformSolution />
        <WhitepaperSection />
        <ConfirmedListings />
        <FeaturesSection />
        <FAQSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
