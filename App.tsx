import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Home from './pages/Home';
import About from './pages/About';
import Location from './pages/Location';
import Menu from './pages/Menu';
import LoadingSequence from './components/LoadingSequence';
import { LanguageProvider } from './LanguageContext';

const AnimatedRoutes: React.FC<{ onHomeLoad: () => void }> = ({ onHomeLoad }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Check if we've already seen the loader in this session
    const hasLoaded = sessionStorage.getItem('smashb_initial_load_complete');
    if (hasLoaded) {
      setIsInitialLoading(false);
    }
    
    // Explicitly set the favicon to avoid browser caching issues or overrides
    const setFavicon = () => {
      const links = document.querySelectorAll("link[rel*='icon']");
      const iconUrl = "/SMASHBlogo-19.svg";
      
      if (links.length > 0) {
        links.forEach(link => {
          (link as HTMLLinkElement).href = iconUrl;
        });
      } else {
        const link = document.createElement('link');
        link.type = 'image/svg+xml';
        link.rel = 'icon';
        link.href = iconUrl;
        document.head.appendChild(link);
      }
    };
    
    setFavicon();
  }, []);

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
    sessionStorage.setItem('smashb_initial_load_complete', 'true');
  };

  return (
    <LanguageProvider>
      <Router>
        <main className="min-h-screen w-full bg-[#0f0a09] relative selection:bg-smash-red selection:text-white">
          <AnimatePresence>
            {isInitialLoading ? (
              <LoadingSequence key="global-loader" onComplete={handleLoadingComplete} />
            ) : (
              <AnimatedRoutes onHomeLoad={() => {}} />
            )}
          </AnimatePresence>

          <style>{`
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              background-color: #0f0a09;
            }
            
            #root {
              height: 100%;
            }
          `}</style>
        </main>
      </Router>
    </LanguageProvider>
  );
};

export default App;
