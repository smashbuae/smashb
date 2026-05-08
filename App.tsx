import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Location from './pages/Location';
import Menu from './pages/Menu';

const App: React.FC = () => {
  return (
    <Router>
      <main className="min-h-screen w-full bg-smash-cream relative selection:bg-smash-red selection:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <style>{`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
          }
          
          #root {
            height: 100%;
          }
        `}</style>
      </main>
    </Router>
  );
};

export default App;
