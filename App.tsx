import React, { useState } from 'react';
import Hero from './components/Hero';
import VibeSection from './components/VibeSection';
import AnatomySection from './components/AnatomySection';
import RepBrandSection from './components/RepBrandSection';
import Footer from './components/Footer';
import LoadingSequence from './components/LoadingSequence';

const App: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="h-screen w-full bg-smash-cream overflow-hidden relative">
      {!introComplete && <LoadingSequence onComplete={() => setIntroComplete(true)} />}
      
      <div className={`h-full w-full ${introComplete ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}`}>
        <Hero />
      </div>

      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        
        ::selection {
          background: #ea3b24;
          color: #fff;
        }
      `}</style>
    </main>
  );
};

export default App;
