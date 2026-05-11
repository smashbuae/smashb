import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';

const Hero: React.FC = () => {
  const [showSocials, setShowSocials] = useState(false);

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

  const socials = [
    { 
      name: 'Instagram', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ), 
      url: 'https://www.instagram.com/smashb.uae/', 
      color: 'hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' 
    },
    { 
      name: 'TikTok', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.6 4.23.73.86 1.68 1.54 2.74 1.97.23.08.46.12.69.14v3.91c-1.31-.02-2.61-.28-3.83-.75-1.07-.43-2.02-1.09-2.83-1.92v6.52c0 2.21-1.07 4.22-2.83 5.46-1.5 1.05-3.33 1.63-5.23 1.63-1.9 0-3.73-.58-5.23-1.63C.565 18.32-.505 16.31-.505 14.1c0-2.21 1.07-4.22 2.83-5.46 1.5-1.05 3.33-1.63 5.23-1.63.19 0 .38 0 .56.02v3.91c-.19-.02-.38-.02-.56-.02-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V0z"/>
        </svg>
      ), 
      url: 'https://www.tiktok.com/@smashbuae', 
      color: 'hover:bg-black' 
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ), 
      url: 'https://www.facebook.com/smashb.uae/', 
      color: 'hover:bg-blue-600' 
    },
    { 
      name: 'Threads', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.5c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zM12 7c-2.481 0-4.5 2.019-4.5 4.5S9.519 16 12 16s4.5-2.019 4.5-4.5S14.481 7 12 7z"/>
        </svg>
      ), 
      url: 'https://www.threads.net/@smashb.uae', 
      color: 'hover:bg-[#000000]' 
    },
    { name: 'WhatsApp', icon: <MessageCircle className="w-6 h-6" />, url: 'https://wa.me/971563535819', color: 'hover:bg-green-500' },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-smash-brown px-6">
      {/* Social Media Popup Modal */}
      <AnimatePresence>
        {showSocials && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSocials(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-smash-cream w-full max-w-sm rounded-[40px] p-8 border-4 border-smash-red shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-smash-red" />
              <button 
                onClick={() => setShowSocials(false)}
                className="absolute top-4 right-4 p-2 bg-smash-red text-white rounded-full hover:scale-110 transition-transform shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-primary text-3xl text-smash-brown text-center uppercase italic tracking-tighter mb-8 pt-4">
                Join the <span className="text-smash-red">Smash Fam</span>
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-4 rounded-full bg-white border-2 border-smash-brown/10 text-smash-brown transition-all ${social.color} hover:text-white group`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-smash-red/10 group-hover:bg-white/20">
                      {social.icon}
                    </div>
                    <span className="font-primary text-xl uppercase tracking-wider">{social.name}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="font-description text-xs text-smash-brown/60 uppercase tracking-widest italic">
                  @smashb.uae • tag us to be featured
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
          <h2 className="font-primary font-bold text-2xl md:text-4xl text-smash-red uppercase italic drop-shadow-lg tracking-tighter">
            Something's about to smash here
          </h2>
        </motion.div>
      </div>

      {/* Center Character Section */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-5xl z-30 py-4 min-h-[300px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: [0, -20, 0, -10, 0],
            x: [0, 8, -8, 4, 0],
          }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { type: "spring", damping: 15, stiffness: 100 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={playSound}
          className="cursor-pointer relative z-40 group"
        >
          <img 
            src="/brandcharacter/smashbflyingcharacter.svg" 
            alt="Flying Character" 
            className="w-[280px] md:w-[450px] lg:w-[550px] h-auto drop-shadow-[0_20px_50px_rgba(234,59,36,0.3)] transform transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Simplified Buttons Section at Bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-20 flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-lg px-4 mb-16"
      >
        <Link to="/menu" className="w-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-5 px-8 bg-smash-red text-white font-primary text-lg md:text-xl border-2 border-white shadow-2xl transition-all uppercase rounded-full tracking-wider text-center cursor-pointer"
          >
            Smashed Menu
          </motion.div>
        </Link>

        <div className="flex w-full gap-4">
          <Link to="/location" className="flex-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 bg-white text-smash-red font-primary text-sm md:text-base border-2 border-smash-red shadow-lg transition-all uppercase rounded-full text-center cursor-pointer"
            >
              Location
            </motion.div>
          </Link>

          <motion.button 
            onClick={() => setShowSocials(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-4 px-6 bg-transparent border-2 border-white text-white font-primary text-sm md:text-base shadow-lg transition-all uppercase rounded-full"
          >
            Social Media
          </motion.button>
        </div>
      </motion.div>

      {/* Footer / Copyright overlay */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center px-10 items-center opacity-40 font-description text-[10px] md:text-xs text-smash-cream uppercase tracking-widest pointer-events-none">
        <span>© 2026 SMASH B</span>
      </div>
    </section>
  );
};

export default Hero;
