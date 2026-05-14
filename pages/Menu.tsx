import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ExternalLink, X } from 'lucide-react';

const MENU_DATA = {
  BURGERS: [
    { name: 'Solo Smash', description: 'Potato bun, single beef patty, cheese, pickle, caramelized onion, sb sauce.', price: 12 },
    { name: 'Duo Smash', description: 'Double beef patty, cheese, pickle, caramelized onion, sb sauce.', price: 17 },
    { name: 'Trio Smash', description: 'Triple beef patty, cheese, pickle, caramelized onion, sb sauce.', price: 23 },
    { name: 'Classic Crunch', description: 'Fried crispy chicken, jalapeno, iceberg lettuce, sb sauce.', price: 12 },
    { name: 'Classic Spice', description: 'Fried crispy chicken, nashville sauce, jalapeno, iceberg lettuce, sb sauce', price: 17 },
  ],
  'LOADED FRIES': [
    { name: 'Crunch Bomb', description: 'Fried chicken, french fries, jalapeno, sb sauce.', price: 10 },
    { name: 'Beefy Bomb', description: 'Smashed beef, french fries, pickle, sb sauce.', price: 12 },
    { name: 'Fire Bomb', description: 'Nashville chicken, french fries, jalapeño, sb sauce.', price: 15 },
  ],
  SANDWICHES: [
    { name: 'Havana', description: 'French baguette, beef patty, roasted beef , mustard sauce, pickle, sb sauce.', price: 13 },
    { name: 'Twisted Chick', description: 'Tortilla wrap, fried chicken, lettuce, jalapeno, cheese, sbsauce.', price: 12 },
  ],
  MILKSHAKES: [
    { name: 'Mango Madness', price: 12 },
    { name: 'Coco Crush', price: 12 },
    { name: 'Lotus Loaded', price: 12 },
    { name: 'Oreo Overload', price: 12 },
    { name: 'Choco Melt', price: 12 },
    { name: 'Smash Berry', price: 13 },
  ],
  MOJITOS: [
    { name: 'Blue Wave', price: 10 },
    { name: 'Pink Rush', price: 10 },
    { name: 'Violet Vibe', price: 10 },
    { name: 'Mint Rush', price: 10 },
    { name: 'Passion Storm', price: 10 },
    { name: 'Midnight Berry', price: 12 },
  ],
  'FRESH JUICE': [
    { name: 'Lemon Mint', price: 10 },
    { name: 'orange', price: 10 },
  ]
};

const Menu: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.title = "Menu | Smash B - Next Level Burgers";
    const hasSeenPopup = localStorage.getItem('smashb_welcome_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000); // Show after 1s
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('smashb_welcome_popup_seen', 'true');
  };

  return (
    <div className="min-h-screen bg-smash-brown text-smash-cream flex flex-col font-description">
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-smash-brown/80 backdrop-blur-sm shadow-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-smash-cream text-smash-brown rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-smash-red overflow-hidden"
            >
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <img src="/SMASHBlogo-18.svg" alt="" className="w-32 h-32 rotate-12" />
              </div>

              <button 
                onClick={closePopup}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-smash-brown/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-smash-red" />
              </button>

              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="font-primary text-4xl md:text-5xl text-smash-red uppercase italic tracking-tighter leading-none mb-2">
                    Hey! Welcome to Smash B 🍔✨
                  </h3>
                </div>

                <div className="space-y-4 text-lg md:text-xl font-description leading-relaxed text-smash-brown/90">
                  <p>
                    We’re so glad you’re here! Whether you’re starving for a massive burger or just need a refreshing mojito to vibe with, we’ve got you.
                  </p>
                  <p>
                    Take a look at the menu—everything from our Trio Smash to those thick Lotus Loaded shakes is a total mood. If you can't decide, just hit us up!
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closePopup}
                  className="w-full py-4 bg-smash-red text-white font-primary text-xl uppercase italic tracking-widest rounded-full shadow-lg hover:shadow-smash-red/40 transition-all border-b-4 border-black/20"
                >
                  Let's Smash!
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="p-4 md:p-6 flex justify-between items-center z-50 sticky top-0 bg-smash-brown/90 backdrop-blur-md border-b border-smash-red/20">
        <Link to="/" className="group">
          <img src="/SMASHBlogo-18.svg" alt="Smash B Logo" className="h-10 md:h-14 group-hover:scale-110 transition-transform" />
        </Link>
        <Link to="/" className="font-primary text-[10px] md:text-xs uppercase tracking-widest border-2 border-smash-red px-4 md:px-6 py-2 rounded-full hover:bg-smash-red transition-all">
          Back Home
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-20 pb-0 flex flex-col items-center justify-center z-20">
        <div className="absolute inset-0 opacity-20 bg-retro-grid pointer-events-none overflow-hidden"></div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center translate-y-12 md:translate-y-16"
        >
          <img 
            src="/brandcharacter/Asset 2.svg" 
            alt="Smash B Menu Character" 
            className="w-72 md:w-[500px] select-none hover:scale-105 transition-transform duration-500 drop-shadow-2xl" 
          />
        </motion.div>
      </header>

      {/* Menu Categories - PDF Styled Card */}
      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-6 py-6 w-full relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-smash-cream rounded-[40px] md:rounded-[80px] p-8 md:p-16 shadow-2xl border-2 border-smash-brown/10 relative"
        >
          {/* Subtle Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-[40px] md:rounded-[80px] overflow-hidden"></div>

          {/* Add-on Sticker */}
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -10 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="absolute -top-8 -right-4 md:-top-16 md:-right-8 z-20"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#96b8a8] drop-shadow-lg">
                <path d="M50 0 L60 10 L75 5 L80 20 L95 25 L90 40 L100 50 L90 60 L95 75 L80 80 L75 95 L60 90 L50 100 L40 90 L25 95 L20 80 L5 75 L10 60 L0 50 L10 40 L5 25 L20 20 L25 5 L40 10 Z" />
              </svg>
              <div className="relative font-primary leading-none text-white p-2">
                <div className="text-[10px] md:text-sm uppercase mb-0.5">Add on</div>
                <div className="text-xs md:text-base uppercase mb-0.5">Soft drinks</div>
                <div className="text-xs md:text-base uppercase flex items-center justify-center gap-1">
                  <span>& fries</span>
                </div>
                <div className="text-2xl md:text-4xl italic mt-1 drop-shadow-sm flex items-center justify-center gap-0.5">
                  6<span className="text-xs md:text-lg not-italic">AED</span>
                </div>
              </div>
            </div>
          </motion.div>

          {Object.entries(MENU_DATA).map(([category, items], catIndex) => (
            <section key={category} className="mb-16 last:mb-0">
              <div className="mb-8">
                <h2 className="font-primary text-4xl md:text-6xl text-smash-brown uppercase tracking-tighter">
                  {category}
                </h2>
              </div>

              <div className="space-y-8">
                {items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col"
                  >
                    <div className="flex justify-between items-baseline gap-4">
                      <h3 className="font-primary text-2xl md:text-3xl text-smash-red uppercase tracking-tight">
                        {item.name}
                      </h3>
                      <div className="flex-1 border-b-2 border-dotted border-smash-brown/20 mx-2 hidden md:block"></div>
                      <span className="font-primary text-2xl md:text-3xl text-smash-brown shrink-0">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm md:text-lg text-smash-brown/70 font-sans font-medium mt-1 pr-12">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </main>

      {/* Contact & Socials Footer Section */}
      <section className="bg-white/5 border-t-4 border-smash-red mt-20 pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="font-primary text-4xl md:text-5xl text-smash-cream uppercase italic tracking-tighter">
              Get In Touch
            </h2>
            <div className="space-y-4">
              <a href="tel:+971563535819" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-smash-red flex items-center justify-center group-hover:bg-smash-red transition-all">
                  <Phone className="w-5 h-5 text-smash-red group-hover:text-white" />
                </div>
                <span className="font-primary text-lg md:text-xl tracking-wider">+971 56 353 5819</span>
              </a>
              <Link to="/location" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-smash-red flex items-center justify-center group-hover:bg-smash-red transition-all">
                  <MapPin className="w-5 h-5 text-smash-red group-hover:text-white" />
                </div>
                <span className="font-primary text-lg md:text-xl tracking-wider uppercase">Ras Al Khaimah</span>
              </Link>
              

            </div>
          </div>

          <div className="space-y-8">
            <h2 className="font-primary text-4xl md:text-5xl text-smash-cream uppercase italic tracking-tighter lg:text-right">
              Social Energy
            </h2>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/smashb.uae/' },
                { name: 'Facebook', url: 'https://www.facebook.com/smashb.uae/' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@smashbuae' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-transparent border-2 border-white/20 rounded-full flex items-center gap-3 hover:border-smash-red hover:bg-smash-red transition-all uppercase font-primary text-xs tracking-widest"
                >
                  <ExternalLink className="w-4 h-4 opacity-50" />
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
