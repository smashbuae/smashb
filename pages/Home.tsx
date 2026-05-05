import React from 'react';
import Hero from '../components/Hero';
import VibeSection from '../components/VibeSection';
import AnatomySection from '../components/AnatomySection';
import RepBrandSection from '../components/RepBrandSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <VibeSection />
      <AnatomySection />
      <RepBrandSection />
      <Footer />
    </>
  );
};

export default Home;
