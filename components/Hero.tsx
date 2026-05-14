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
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0f0a09] px-6">
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

      {/* BOXING STAGE BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {/* Floor Canvas with Perspective */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[40%] bg-smash-brown border-t-8 border-smash-red/30 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]"
          style={{
            transform: 'perspective(500px) rotateX(15deg) scale(1.5)',
            transformOrigin: 'bottom'
          }}
        >
          {/* Floor Texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>
          {/* Center Logo Shadow Area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-black/40 blur-3xl rounded-full scale-150"></div>
        </div>

        {/* Spotlights Beams */}
        <div className="absolute inset-0 flex justify-around items-end pointer-events-none opacity-40">
          <div className="w-96 h-[800px] bg-gradient-to-t from-smash-red/20 via-smash-red/5 to-transparent blur-[80px] -rotate-12 translate-y-20 origin-bottom"></div>
          <div className="w-96 h-[800px] bg-gradient-to-t from-smash-red/30 via-smash-red/10 to-transparent blur-[100px] translate-y-20 origin-bottom"></div>
          <div className="w-96 h-[800px] bg-gradient-to-t from-smash-red/20 via-smash-red/5 to-transparent blur-[80px] rotate-12 translate-y-20 origin-bottom"></div>
        </div>

        {/* Ring Ropes (Background) */}
        <div className="absolute top-[40%] left-0 w-full z-0 flex flex-col gap-8 opacity-20 overflow-hidden">
          <div className="w-full h-2 bg-smash-red shadow-[0_0_20px_rgba(234,59,36,0.8)]"></div>
          <div className="w-full h-2 bg-smash-red shadow-[0_0_20px_rgba(234,59,36,0.8)]"></div>
          <div className="w-full h-2 bg-smash-red shadow-[0_0_20px_rgba(234,59,36,0.8)]"></div>
        </div>

        {/* Ambient Smoke/Vapor */}
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-white/5 to-transparent blur-[100px]"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative flex flex-col items-center justify-center h-full w-full z-10 pt-20">
        
        {/* STAY SMASHIN Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 1.5, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 mb-[-40px] md:mb-[-80px]"
        >
          <h1 className="font-primary text-[50px] md:text-[110px] lg:text-[150px] leading-none text-white uppercase italic tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-center">
            STAY <span className="text-smash-red">SMASHIN'</span>
          </h1>
        </motion.div>

        {/* Character Section */}
        <div className="relative flex items-center justify-center w-full max-w-5xl py-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.02, 1],
              y: [0, -15, 0],
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={playSound}
            className="cursor-pointer relative z-30 group"
          >
            <img 
              src="/brandcharacter/smashing.svg" 
              alt="Smashing Character" 
              className="w-[280px] md:w-[450px] lg:w-[580px] h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              loading="eager"
            />
            {/* Spotlight Reflection on Floor */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full h-20 bg-smash-red/20 blur-3xl -z-10 rounded-full scale-y-50"></div>
          </motion.div>
        </div>

        {/* Buttons Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-lg px-4 mt-8 mb-20"
        >
          <Link to="/menu" className="w-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-5 px-8 bg-smash-red text-white font-primary text-xl md:text-2xl border-4 border-white shadow-[0_15px_40px_rgba(234,59,36,0.4)] transition-all uppercase rounded-full tracking-wider text-center cursor-pointer italic font-bold"
            >
              The Menu
            </motion.div>
          </Link>

          <div className="flex w-full gap-4">
            <Link to="/location" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 px-6 bg-white text-smash-red font-primary text-sm md:text-base border-2 border-smash-red shadow-lg transition-all uppercase rounded-full text-center cursor-pointer font-bold"
              >
                Find Us
              </motion.div>
            </Link>

            <motion.button 
              onClick={() => setShowSocials(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-4 px-6 bg-transparent border-2 border-white text-white font-primary text-sm md:text-base shadow-lg transition-all uppercase rounded-full font-bold"
            >
              Socials
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floor Edge Light */}
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-smash-red/50 to-transparent z-40"></div>

      {/* Footer / Copyright overlay */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center px-10 items-center opacity-40 font-description text-[10px] md:text-xs text-smash-cream uppercase tracking-widest pointer-events-none">
        <span>© 2026 SMASH B • ALL RIGHTS RESERVED</span>
      </div>
    </section>
  );

};

export default Hero;
