import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const [activePopup, setActivePopup] = useState<'menu' | 'social' | null>(null);
  const [mascotAnimation, setMascotAnimation] = useState<any>({});
  const [isPopupLoading, setIsPopupLoading] = useState(false);

  useEffect(() => {
    if (activePopup) {
      setIsPopupLoading(true);
      const timer = setTimeout(() => setIsPopupLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [activePopup]);

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

  const handleMascotClick = () => {
    playSound();
    setMascotAnimation({
      rotate: [0, 15, -15, 360],
      scale: [1, 1.2, 0.8, 1],
      transition: { duration: 0.6 }
    });
    setTimeout(() => setMascotAnimation({}), 700);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-between bg-smash-brown pt-20 pb-12 px-6">
      {/* Sky Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#1a1110] via-[#2a1a18] to-[#12002b]">
        {/* Animated Radiant Glow */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(234,59,36,0.3)_0%,transparent_60%)]"
        />

        {/* Parallax Clouds Layer - Far (Slower) */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`cloud-far-${i}`}
            initial={{ x: -400, y: (i * 15) + "%", opacity: 0 }}
            animate={{ 
              x: '120vw', 
              opacity: [0, 0.05, 0],
            }}
            transition={{ 
              duration: 50 + i * 15, 
              repeat: Infinity, 
              delay: i * 8,
              ease: "linear"
            }}
            className="absolute w-[600px] h-[400px] bg-smash-cream rounded-full blur-[150px] pointer-events-none"
          />
        ))}

        {/* Parallax Clouds Layer - Near (Faster) */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`cloud-near-${i}`}
            initial={{ x: -500, y: (10 + i * 25) + "%", opacity: 0 }}
            animate={{ 
              x: '150vw', 
              opacity: [0, 0.1, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 20 + i * 5, 
              repeat: Infinity, 
              delay: i * 4,
              ease: "linear"
            }}
            className="absolute w-[400px] h-[250px] bg-white rounded-full blur-[100px] pointer-events-none"
          />
        ))}

        {/* High-Speed Streaks (Primary) */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`streak-p-${i}`}
            initial={{ x: -200, y: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ 
              x: '110vw', 
              opacity: [0, 0.5, 0],
              scaleX: [1, 2, 1]
            }}
            transition={{ 
              duration: 0.5 + Math.random() * 1, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute h-[1px] w-96 bg-gradient-to-r from-transparent via-smash-red/50 to-transparent rotate-[2deg]"
          />
        ))}

        {/* Faster Streaks (Accent) */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`streak-a-${i}`}
            initial={{ x: -300, y: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ 
              x: '130vw', 
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 0.3 + Math.random() * 0.5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute h-[2px] w-[500px] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-[4deg]"
          />
        ))}

        {/* Shimmering Air Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
              y: [0, -50, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px] pointer-events-none"
          />
        ))}

        {/* Distant Urban Lights (Flickering) */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.2, 0.8, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${85 + Math.random() * 15}%` 
            }}
            className="absolute w-1 h-1 bg-smash-cream rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Top Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-20 text-center"
      >
        <h2 className="font-primary text-2xl md:text-4xl text-smash-red mb-2 drop-shadow-lg">
          Something’s about to smash here…
        </h2>
      </motion.div>

      {/* Center Character Section */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-4xl z-10">
        <motion.div
          initial={{ scale: 0, rotate: -30, opacity: 0 }}
          animate={{ 
            scale: 1, 
            rotate: 0, 
            opacity: 1,
            y: [0, -25, 0, -15, 0],
            x: [0, 10, -10, 5, 0],
            ...mascotAnimation
          }}
          transition={{ 
            scale: { type: "spring", damping: 15, stiffness: 100, delay: 1.5 },
            rotate: { type: "spring", damping: 15, stiffness: 100, delay: 1.5 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={handleMascotClick}
          className="cursor-pointer relative group"
        >
          <img 
            src="/brandcharacter/smashbflyingcharacter.svg" 
            alt="Flying Character" 
            className="w-64 md:w-[500px] drop-shadow-[0_45px_100px_rgba(234,59,36,0.4)] transform transition-all duration-700 group-hover:brightness-110 group-hover:drop-shadow-[0_45px_120px_rgba(234,59,36,0.6)]"
          />
          
          {/* Action Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute -top-10 -right-10 bg-smash-red text-white py-2 px-6 font-primary text-sm -rotate-12 border-2 border-white shadow-xl"
          >
            COMING SOON!
          </motion.div>
        </motion.div>
      </div>

      {/* Buttons Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-20 flex flex-wrap justify-center gap-4 md:gap-8 w-full max-w-3xl"
      >
        <motion.button
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActivePopup('menu')}
          className="flex-1 min-w-[150px] py-4 px-6 bg-smash-red text-white font-primary text-sm md:text-base border-4 border-white shadow-[6px_6px_0px_#fff] hover:shadow-none transition-all uppercase rounded-[35px]"
        >
          Menu
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActivePopup('social')}
          className="flex-1 min-w-[150px] py-4 px-6 bg-white text-smash-red font-primary text-sm md:text-base border-4 border-smash-red shadow-[6px_6px_0px_#ea3b24] hover:shadow-none transition-all uppercase rounded-[35px]"
        >
          Social Media
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://maps.google.com', '_blank')}
          className="flex-1 min-w-[150px] py-4 px-6 bg-smash-brown border-4 border-smash-cream text-smash-cream font-primary text-sm md:text-base shadow-[6px_6px_0px_#ebe6d3] hover:shadow-none transition-all uppercase rounded-[35px]"
        >
          Map Direction
        </motion.button>
      </motion.div>

      {/* Popups */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActivePopup(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-smash-brown border-4 border-smash-red p-8 md:p-12 max-w-2xl w-full relative rounded-[35px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActivePopup(null)}
                className="absolute top-4 right-4 text-smash-cream hover:text-smash-red font-primary text-2xl transition-colors z-10"
                aria-label="Close"
              >
                ✕
              </button>

              <AnimatePresence mode="wait">
                {isPopupLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-smash-red/20 border-t-smash-red rounded-full"
                    />
                    <p className="mt-4 font-primary text-smash-cream text-sm tracking-widest animate-pulse">SMASHING...</p>
                  </motion.div>
                ) : activePopup === 'menu' ? (
                  <motion.div 
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-8"
                  >
                    <h3 className="font-primary text-4xl text-smash-red uppercase">Our Smash Menu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-smash-cream font-description text-left">
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 className="font-primary text-smash-red text-xl mb-2 italic">OG SMASH</h4>
                        <p className="text-sm opacity-70 leading-relaxed italic">Double patty, smash logic, signature sauce.</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 className="font-primary text-smash-red text-xl mb-2 italic">B URBAN</h4>
                        <p className="text-sm opacity-70 leading-relaxed italic">Caramelized onions, street spices, crispy vibes.</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 className="font-primary text-smash-red text-xl mb-2 italic">VOLCANO B</h4>
                        <p className="text-sm opacity-70 leading-relaxed italic">Spicy smash, habanero dust, ultimate heat.</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 className="font-primary text-smash-red text-xl mb-2 italic">SMASH SIDES</h4>
                        <p className="text-sm opacity-70 leading-relaxed italic">Hand-cut fries, smash-dusted, golden crisp.</p>
                      </div>
                    </div>
                    <button className="px-8 py-3 bg-smash-red text-white font-primary rounded-[35px] uppercase text-sm border-2 border-white">
                      Download Full Menu (PDF)
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="social"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-12 py-4"
                  >
                    <h3 className="font-primary text-4xl text-smash-red uppercase italic">JOIN THE CREW</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: 'Instagram', color: 'bg-[#E1306C]', url: 'https://www.instagram.com/smashb.uae/' },
                        { name: 'TikTok', color: 'bg-black', url: 'https://www.tiktok.com/@smashbuae' },
                        { name: 'Facebook', color: 'bg-[#1877F2]', url: 'https://www.facebook.com/smashb.uae/' },
                        { name: 'Threads', color: 'bg-black', url: 'https://www.threads.net/@smashb.uae' }
                      ].map((platform) => (
                        <motion.a
                          key={platform.name}
                          whileHover={{ y: -5 }}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-3"
                        >
                          <div className={`w-16 h-16 ${platform.color} rounded-[35px] flex items-center justify-center border-2 border-white shadow-lg`}>
                            <span className="font-primary text-white text-xs">{platform.name[0]}</span>
                          </div>
                          <span className="font-secondary text-sm text-smash-cream">{platform.name}</span>
                        </motion.a>
                      ))}
                    </div>
                    <p className="font-description text-smash-cream/50 text-sm tracking-widest italic uppercase">@SmashB_UAE</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Copyright overlay */}
      <div className="absolute bottom-4 left-0 w-full flex justify-between px-10 items-center opacity-40 font-description text-[10px] md:text-xs text-smash-cream uppercase tracking-widest pointer-events-none">
        <span>© 2026 SMASH B • CREATED BY ARTIGEN</span>
        <span>UAE • SMASHING SOON</span>
      </div>
    </section>
  );
};

export default Hero;
