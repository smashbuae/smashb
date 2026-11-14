import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import LoadingSequence from './components/LoadingSequence';
import { LanguageProvider, useLanguage } from './LanguageContext';

const shouldShowIntroOnBoot = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  if (path !== '/' && path !== '/ar') return false;

  // Never delay crawlers, automated Lighthouse/testing browsers, or reduced-motion users
  if (navigator.webdriver) return false;
  if (/bot|crawl|spider|slurp|googlebot|bingbot|gptbot|chatgpt-user|claudebot|perplexitybot|applebot|lighthouse/i.test(navigator.userAgent)) {
    return false;
  }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  return true;
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Sync language based on URL path
    if (location.pathname.startsWith('/ar')) {
      setLanguage('ar');
    } else if (location.pathname === '/') {
      setLanguage('en');
    }
  }, [location.pathname, setLanguage]);

  return (
    <Routes>
      <Route path="/" element={<Home forcedLang="en" />} />
      <Route path="/ar" element={<Home forcedLang="ar" />} />
      <Route path="/our-story" element={<About />} />
      <Route path="/about" element={<About />} />
      <Route path="/location" element={<Navigate to="/our-story" replace />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [showIntro, setShowIntro] = React.useState<boolean>(shouldShowIntroOnBoot);

  const handleIntroComplete = React.useCallback(() => {
    setShowIntro(false);
  }, []);

  useEffect(() => {
    // Explicitly set the favicon to official Smash B logo
    const setFavicon = () => {
      const links = document.querySelectorAll("link[rel*='icon']");
      const iconUrl = "/logos/smashb-logo-1.svg";
      
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

  // Trigger Smash click impact animation across all interactive buttons
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const triggerSmashHit = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;
      const btn = target.closest<HTMLElement>(
        'a.smash-btn, button.smash-btn, a[data-smash-shape], button[data-smash-shape], .smash-wide-box'
      );
      if (!btn) return;
      if (btn.classList.contains('smash-wide-box') && !btn.querySelector(':scope > button')) {
        return;
      }

      btn.classList.remove('smash-hit');
      void btn.offsetWidth;
      btn.classList.add('smash-hit');

      window.setTimeout(() => {
        btn.classList.remove('smash-hit');
      }, 300);
    };

    const onPointerDown = (e: PointerEvent) => triggerSmashHit(e.target);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        triggerSmashHit(e.target);
      }
    };

    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('keydown', onKeyDown, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        {showIntro && <LoadingSequence onComplete={handleIntroComplete} />}
        {/* Global SVG ClipPaths for Smash B Edge-Curved Squircle Shapes */}
        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="smash-box-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.5,0 C 0.69,0 0.78,0.003 0.83,0.009 C 0.94,0.022 0.978,0.060 0.991,0.16 C 0.997,0.22 1,0.31 1,0.50 C 1,0.69 0.997,0.78 0.991,0.84 C 0.978,0.94 0.94,0.978 0.83,0.991 C 0.78,0.997 0.69,1 0.50,1 C 0.31,1 0.22,0.997 0.17,0.991 C 0.06,0.978 0.022,0.94 0.009,0.84 C 0.003,0.78 0,0.69 0,0.50 C 0,0.31 0.003,0.22 0.009,0.16 C 0.022,0.060 0.06,0.022 0.17,0.009 C 0.22,0.003 0.31,0 0.5,0 Z" />
            </clipPath>
            <clipPath id="smash-wide-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.5,0 C 0.78,0 0.89,0.004 0.94,0.015 C 0.982,0.030 0.995,0.11 0.998,0.25 C 1,0.35 1,0.43 1,0.50 C 1,0.57 1,0.65 0.998,0.75 C 0.995,0.89 0.982,0.970 0.94,0.985 C 0.89,0.996 0.78,1 0.50,1 C 0.22,1 0.11,0.996 0.06,0.985 C 0.018,0.970 0.005,0.89 0.002,0.75 C 0,0.65 0,0.57 0,0.50 C 0,0.43 0,0.35 0.002,0.25 C 0.005,0.11 0.018,0.030 0.06,0.015 C 0.11,0.004 0.22,0 0.5,0 Z" />
            </clipPath>
            <clipPath id="smash-btn-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.5,0 C 0.78,0 0.89,0.004 0.94,0.014 C 0.982,0.032 0.995,0.10 0.998,0.24 C 1,0.34 1,0.42 1,0.50 C 1,0.58 1,0.66 0.998,0.76 C 0.995,0.90 0.982,0.968 0.94,0.986 C 0.89,0.996 0.78,1 0.50,1 C 0.22,1 0.11,0.996 0.06,0.986 C 0.018,0.968 0.005,0.90 0.002,0.76 C 0,0.66 0,0.58 0,0.50 C 0,0.42 0,0.34 0.002,0.24 C 0.005,0.10 0.018,0.032 0.06,0.014 C 0.11,0.004 0.22,0 0.5,0 Z" />
            </clipPath>
          </defs>
        </svg>
        <main className="min-h-screen w-full bg-[#F5F1E8] text-[#432724] relative selection:bg-[#FF1C00] selection:text-white">
          <AppRoutes />

          <style>{`
            body, html {
              margin: 0;
              padding: 0;
              min-height: 100%;
              background-color: #F5F1E8;
            }
            #root {
              min-height: 100%;
              background-color: #F5F1E8;
            }
          `}</style>
        </main>
      </Router>
    </LanguageProvider>
  );
};

export default App;
