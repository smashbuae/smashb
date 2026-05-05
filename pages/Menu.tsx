import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  useEffect(() => {
    // Short delay to show the high-energy redirect screen
    const timer = setTimeout(() => {
      window.location.replace('https://www.instagram.com/smashb.uae/');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-smash-brown flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background elements for texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-smash-red via-transparent to-transparent opacity-20"></div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 space-y-8"
      >
        <div className="flex justify-center">
          <motion.img 
            src="/Assets/SMASHBlogo-18.svg" 
            alt="Smash B" 
            className="h-24 md:h-32"
            animate={{ 
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.05, 0.95, 1.05, 1] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="space-y-4">
          <h1 className="font-primary text-4xl md:text-6xl text-smash-red uppercase italic tracking-tighter mix-blend-screen">
            SMASHING THE MENU
          </h1>
          <div className="flex flex-col items-center gap-1">
            <p className="font-primary text-sm md:text-base text-smash-cream tracking-[0.4em] uppercase">
              Redirecting to Instagram
            </p>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div 
                className="h-full bg-smash-red"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-description text-smash-cream/50 text-xs md:text-sm italic"
        >
          If you are not redirected automatically, <a href="https://www.instagram.com/smashb.uae/" className="text-smash-red underline">click here</a>.
        </motion.p>
      </motion.div>

      {/* Brand Watermark */}
      <div className="absolute bottom-8 font-primary text-[10px] text-smash-cream/20 tracking-[1em] uppercase">
        Next Level Burgers
      </div>
    </div>
  );
};

export default Menu;
