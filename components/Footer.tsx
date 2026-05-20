import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface FooterProps {
  showBrandSection?: boolean;
}

const FOOTER_LANGUAGES = {
  en: {
    smashIt: "Smash it",
    feelIt: "feel it.",
    menu: "Menu",
    locations: "Locations",
    ourStory: "Our Story",
    merch: "Merch",
    smashHappens: "Smash Happens",
    locText: "Location: Near AURAK, Ras Al Khaimah",
    callText: "Call/WhatsApp: +971 56 353 5819",
    rights: "© 2026 SMASH B. ALL RIGHTS RESERVED."
  },
  ar: {
    smashIt: "جربه",
    feelIt: "واستمتع.",
    menu: "المنيو",
    locations: "موقعنا",
    ourStory: "قصتنا",
    merch: "ميرش",
    smashHappens: "سماش بي",
    locText: "الموقع: بالقرب من AURAK، رأس الخيمة",
    callText: "الاتصال / واتساب: +971 56 353 5819",
    rights: "© ٢٠٢٦ سماش بي • جميع الحقوق محفوظة."
  }
};

const Footer: React.FC<FooterProps> = ({ showBrandSection = true }) => {
  const language = 'en' as any;
  const dir = 'ltr' as any;

  return (
    <footer className={`relative bg-smash-red ${showBrandSection ? 'pt-32' : 'pt-12'} pb-12 px-6 overflow-hidden bg-retro-grid`} dir={dir}>
      {/* Red & Cream Dotted Background fade-in effect */}
      <div className="absolute inset-0 z-0 bg-dots opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {showBrandSection && (
          <div className="flex flex-col items-center text-center mb-24">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="mb-8"
            >
              <img 
                src="/SMASHBlogo-19.svg" 
                alt="Smash B Logo" 
                className="h-24 md:h-32 hover:scale-105 transition-transform brightness-0 invert" 
              />
            </motion.div>
            <h2 className={`text-4xl md:text-8xl ${language === 'ar' ? 'font-arabic-heading' : 'font-primary'} text-smash-cream leading-tight uppercase mb-12`}>
              {FOOTER_LANGUAGES[language].smashIt} <br /> <span className="text-white animate-pulse">{FOOTER_LANGUAGES[language].feelIt}</span>
            </h2>

            <div className={`flex flex-wrap justify-center gap-12 ${language === 'ar' ? 'font-arabic-heading text-lg md:text-2xl' : 'font-primary text-sm md:text-lg'}`}>
               {[
                 { name: FOOTER_LANGUAGES[language].menu, path: '/menu', external: false },
                 { name: FOOTER_LANGUAGES[language].locations, path: '/location', external: false },
                 { name: FOOTER_LANGUAGES[language].ourStory, path: '/about', external: false },
                 { name: FOOTER_LANGUAGES[language].merch, path: '#', external: false }
               ].map((link) => (
                 link.external ? (
                   <a 
                     key={link.name} 
                     href={link.path} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-smash-cream hover:text-white transition-colors border-b-4 border-transparent hover:border-white pb-2"
                   >
                     {link.name}
                   </a>
                 ) : (
                   <Link key={link.name} to={link.path} className="text-smash-cream hover:text-white transition-colors border-b-4 border-transparent hover:border-white pb-2">
                     {link.name}
                   </Link>
                 )
               ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t-2 border-smash-cream/20 gap-8">
          <div className="flex space-x-8">
            {[
              { name: 'Instagram', url: 'https://www.instagram.com/smashb.uae/' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@smashbuae' },
              { name: 'Facebook', url: 'https://www.facebook.com/smashb.uae/' },
              { name: 'Threads', url: 'https://www.threads.net/@smashb.uae' },
              { name: 'Snapchat', url: 'https://snapchat.com/t/d5zYuanj' }
            ].map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="font-secondary text-2xl text-smash-cream hover:text-white transition-colors tracking-widest">
                {social.name}
              </a>
            ))}
          </div>

          <div className={`text-center md:text-right space-y-2 ${language === 'ar' ? 'md:text-left' : 'md:text-right'}`}>
            <p className={`${language === 'ar' ? 'font-arabic-heading text-xl' : 'font-primary text-base'} text-white uppercase tracking-widest font-bold mb-2`}>
              {FOOTER_LANGUAGES[language].smashHappens}
            </p>
            <a 
              href="https://share.google/B4R9Oj37gfchmf9mD" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`font-primary text-sm text-smash-cream hover:text-white transition-colors block ${language === 'ar' ? 'font-arabic-desc' : ''}`}
            >
              {FOOTER_LANGUAGES[language].locText}
            </a>
            <a 
              href="tel:+971563535819" 
              className="font-primary text-sm text-smash-cream hover:text-white transition-colors block font-mono"
            >
              {FOOTER_LANGUAGES[language].callText}
            </a>
            <p className={`text-[10px] text-smash-cream/50 pt-2 ${language === 'ar' ? 'font-arabic-desc' : 'font-primary'}`}>
              {FOOTER_LANGUAGES[language].rights}
            </p>
          </div>
        </div>
      </div>

      {/* Retro decorative text */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-5">
         <span className="font-primary text-9xl text-smash-cream uppercase">SB-001</span>
      </div>
    </footer>
  );
};

export default Footer;
