import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';

const HERO_LANGUAGES = {
  en: {
    staySmashin: "SMASH",
    staySmashinRed: "HAPPENS",
    theMenu: "The Menu",
    findUs: "Find Us",
    socials: "Socials",
    joinFam: "Join the",
    joinFamRed: "Smash Fam",
    tagUs: "@smashb.uae • tag us to be featured",
    rights: "© 2026 SMASH B • ALL RIGHTS RESERVED"
  },
  ar: {
    staySmashin: "سماش",
    staySmashinRed: "يحدث",
    theMenu: "المنيو",
    findUs: "موقعنا",
    socials: "حساباتنا",
    joinFam: "انضم إلى",
    joinFamRed: "عائلة سماش",
    tagUs: "smashb.uae.ae • تاق لنا لتظهر معنا",
    rights: "© ٢٠٢٦ سماش بي • جميع الحقوق محفوظة"
  }
};

const Hero: React.FC = () => {
  const language = 'en' as any;
  const dir = 'ltr' as any;
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
    { 
      name: 'Snapchat', 
      icon: (
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
          <path d="M12.002.003c-.22 0-.44.02-.66.06a3.666 3.666 0 0 0-2.3 1.34 7.03 7.03 0 0 0-.85 1.5c-.15.35-.35.53-.59.53a4.57 4.57 0 0 1-1.46-.33c-.32-.15-.6-.15-.81.02a2.43 2.43 0 0 0-.6 1.05c-.12.44-.06.88.17 1.33.22.45.31.86.27 1.25s-.24.73-.61 1c-.38.28-.75.56-1.12.83-.37.28-.59.61-.64.97-.05.37.06.7.32.99.26.29.67.43 1.25.43.27 0 .54-.05.81-.13a7.84 7.84 0 0 1 1.57-.3c.42-.04.75-.02.99.07.24.09.44.27.59.54.15.27.2.66.15 1.15-.05.5-.18.96-.39 1.4s-.47.88-.78 1.3c-.31.42-.65.86-1.01 1.32-.36.46-.57.94-.61 1.44a2.9 2.9 0 0 0 .15 1.28c.16.44.47.79.92 1.05.45.26.97.35 1.57.26 1.14-.17 2.22-.52 3.23-1.04 1.01-.52 1.35-.83 1.03-.94-.32-.11-.84-.13-1.57-.04-1.14.13-2.12.01-2.95-.35-.83-.36-1.1-.96-.82-1.8.1-.31.32-.59.66-.85.34-.26.81-.46 1.42-.61a29 29 0 0 1 3.23-.46c1.17-.08 1.93-.01 2.27.23.33.24.49.62.47 1.14l-.07.98c-.02.32-.01.59.04.81.05.22.18.39.4.5s.49.12.83.02c.34-.1.71-.38 1.11-.84.4-.46.77-.96 1.11-1.5.34-.54.5-.96.47-1.28a1.27 1.27 0 0 0-.3-.89c-.29-.31-.72-.51-1.3-.61-.58-.1-1.28-.1-2.09-.01l-1.03.1c-.24.02-.45-.06-.63-.22a.96.96 0 0 1-.3-.68l-.07-.98c-.02-.32-.11-.59-.27-.81s-.41-.39-.77-.5c-.36-.11-.8-.13-1.33-.04c-.53.09-.99.12-1.38.08-.39-.04-.66-.2-.82-.47-.16-.27-.14-.66.06-1.15.2-.49.52-1.01.95-1.57.43-.56.88-1.08 1.34-1.57s.82-1.03 1.08-1.62c.26-.59.34-1.15.24-1.69-.1-.54-.42-1-.96-1.39a3.7 3.7 0 0 0-2.38-.85h-.112z"/>
        </svg>
      ), 
      url: 'https://snapchat.com/t/d5zYuanj', 
      color: 'hover:bg-[#FFFC00] hover:text-black hover:border-[#FFFC00]' 
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

              <h3 className={`${language === 'ar' ? 'font-arabic-heading text-4xl' : 'font-primary text-3xl'} text-smash-brown text-center uppercase italic tracking-tighter mb-8 pt-4`}>
                {HERO_LANGUAGES[language].joinFam} <span className="text-smash-red">{HERO_LANGUAGES[language].joinFamRed}</span>
              </h3>

              <div className="grid grid-cols-1 gap-4" dir={dir}>
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: dir === 'rtl' ? -5 : 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-4 rounded-full bg-white border-2 border-smash-brown/10 text-smash-brown transition-all ${social.color} hover:text-white group`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-smash-red/10 group-hover:bg-white/20">
                      {social.icon}
                    </div>
                    <span className={`${language === 'ar' ? 'font-arabic-heading text-[17px]' : 'font-primary text-xl'} uppercase tracking-wider`}>{language === 'ar' && social.name === 'Instagram' ? 'إنستغرام' : language === 'ar' && social.name === 'TikTok' ? 'تيك توك' : language === 'ar' && social.name === 'Facebook' ? 'فيسبوك' : language === 'ar' && social.name === 'Snapchat' ? 'سناب شات' : language === 'ar' && social.name === 'WhatsApp' ? 'واتساب' : social.name}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className={`${language === 'ar' ? 'font-arabic-desc' : 'font-description'} text-xs text-smash-brown/60 uppercase tracking-widest italic`}>
                  {HERO_LANGUAGES[language].tagUs}
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
          <h1 className={`${language === 'ar' ? 'font-arabic-heading text-[60px] md:text-[120px] lg:text-[160px]' : 'font-primary text-[50px] md:text-[110px] lg:text-[150px]'} leading-none text-white uppercase italic tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-center`}>
            {HERO_LANGUAGES[language].staySmashin} <span className="text-smash-red">{HERO_LANGUAGES[language].staySmashinRed}</span>
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
          className="flex flex-col justify-center gap-4 w-full max-w-sm px-4 mt-8 mb-20 relative z-30"
          dir={dir}
        >
          <Link to="/menu" className="w-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-5 px-8 bg-smash-red text-white ${language === 'ar' ? 'font-arabic-heading text-2xl' : 'font-primary text-xl md:text-2xl'} border-4 border-white shadow-[0_15px_40px_rgba(234,59,36,0.4)] transition-all uppercase rounded-full tracking-wider text-center cursor-pointer italic font-bold`}
            >
              {HERO_LANGUAGES[language].theMenu}
            </motion.div>
          </Link>

          <div className="flex w-full gap-4">
            <Link to="/location" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 px-6 bg-white text-smash-red ${language === 'ar' ? 'font-arabic-heading text-lg' : 'font-primary text-sm md:text-base'} border-2 border-smash-red shadow-lg transition-all uppercase rounded-full text-center cursor-pointer font-bold`}
              >
                {HERO_LANGUAGES[language].findUs}
              </motion.div>
            </Link>

            <motion.button 
              onClick={() => setShowSocials(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-4 px-6 bg-transparent border-2 border-white text-white ${language === 'ar' ? 'font-arabic-heading text-lg' : 'font-primary text-sm md:text-base'} shadow-lg transition-all uppercase rounded-full font-bold`}
            >
              {HERO_LANGUAGES[language].socials}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floor Edge Light */}
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-smash-red/50 to-transparent z-40"></div>

      {/* Footer / Copyright overlay */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center px-10 items-center opacity-40 font-description text-[10px] md:text-xs text-smash-cream uppercase tracking-widest pointer-events-none">
        <span className={language === 'ar' ? 'font-arabic-desc' : 'font-description'}>{HERO_LANGUAGES[language].rights}</span>
      </div>
    </section>
  );

};

export default Hero;
