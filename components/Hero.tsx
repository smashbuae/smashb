import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio context blocked');
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-smash-brown px-6">
      {/* Full Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#1a1110] via-[#2a1a18] to-[#12002b]">
        {/* Animated Radiant Glow */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(234,59,36,0.25)_0%,transparent_60%)]"
        />

        {/* Parallax Clouds Layer - Far */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`cloud-far-${i}`}
            initial={{ x: -400, y: (i * 15) + "%", opacity: 0 }}
            animate={{ x: '120vw', opacity: [0, 0.06, 0] }}
            transition={{ duration: 50 + i * 15, repeat: Infinity, delay: i * 8, ease: "linear" }}
            className="absolute w-[600px] h-[400px] bg-smash-cream rounded-full blur-[150px] pointer-events-none"
          />
        ))}

        {/* Parallax Clouds Layer - Near */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`cloud-near-${i}`}
            initial={{ x: -500, y: (20 + i * 30) + "%", opacity: 0 }}
            animate={{ x: '150vw', opacity: [0, 0.1, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 25 + i * 5, repeat: Infinity, delay: i * 5, ease: "linear" }}
            className="absolute w-[400px] h-[250px] bg-white rounded-full blur-[100px] pointer-events-none"
          />
        ))}

        {/* High-Speed Streaks */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            initial={{ x: -200, y: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ x: '110vw', opacity: [0, 0.5, 0], scaleX: [1, 2, 1] }}
            transition={{ duration: 0.6 + Math.random() * 1, repeat: Infinity, delay: Math.random() * 12, ease: "linear" }}
            className="absolute h-[1px] w-96 bg-gradient-to-r from-transparent via-smash-red/40 to-transparent rotate-[2deg]"
          />
        ))}

        {/* Distant Urban Lights */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            animate={{ opacity: [0, 0.8, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            style={{ left: `${Math.random() * 100}%`, top: `${85 + Math.random() * 15}%` }}
            className="absolute w-1 h-1 bg-smash-cream rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Slogan at Top */}
      <div className="relative z-20 flex flex-col items-center gap-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-primary text-2xl md:text-4xl text-smash-red uppercase italic drop-shadow-lg tracking-tighter">
            Something’s about to smash here…
          </h2>
        </motion.div>
      </div>

      {/* Center Character Section */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-4xl z-10 py-12">
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ 
            scale: 1, 
            rotate: 0, 
            opacity: 1,
            y: [0, -25, 0, -15, 0],
            x: [0, 10, -10, 5, 0],
          }}
          transition={{ 
            scale: { type: "spring", damping: 15, stiffness: 100, delay: 0.8 },
            rotate: { type: "spring", damping: 15, stiffness: 100, delay: 0.8 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={playSound}
          className="cursor-pointer relative group"
        >
          <img 
            src="/brandcharacter/smashbflyingcharacter.svg" 
            alt="Flying Character" 
            className="w-72 md:w-[600px] drop-shadow-[0_45px_100px_rgba(234,59,36,0.4)] transform transition-all duration-700 group-hover:brightness-110 group-hover:drop-shadow-[0_45px_120px_rgba(234,59,36,0.6)]"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Simplified Buttons Section at Bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-20 flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-4xl px-4 mb-16"
      >
        <a 
          href="https://www.instagram.com/smashb.uae/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 min-w-[140px]"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 px-6 bg-smash-red text-white font-primary text-sm md:text-base border-2 border-white shadow-lg transition-all uppercase rounded-[35px]"
          >
            Menu
          </motion.button>
        </a>
        
        <Link to="/about" className="flex-1 min-w-[140px]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 px-6 bg-white text-smash-red font-primary text-sm md:text-base border-2 border-smash-red shadow-lg transition-all uppercase rounded-[35px]"
          >
            About
          </motion.button>
        </Link>

        <Link to="/location" className="flex-1 min-w-[140px]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 px-6 bg-transparent border-2 border-smash-cream text-smash-cream font-primary text-sm md:text-base shadow-lg transition-all uppercase rounded-[35px]"
          >
            Location
          </motion.button>
        </Link>
      </motion.div>

      {/* Footer / Copyright overlay */}
      <div className="absolute bottom-4 left-0 w-full flex justify-between px-10 items-center opacity-40 font-description text-[10px] md:text-xs text-smash-cream uppercase tracking-widest pointer-events-none">
        <span>© 2026 SMASH B • CREATED BY ARTIGEN</span>
        <span>UAE • SMASHING SOON</span>
      </div>
    </section>
  );
};

export default Hero;
