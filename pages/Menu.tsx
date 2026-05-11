import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ExternalLink, X, Download } from 'lucide-react';

const MENU_DATA = {
  Burgers: [
    { name: 'Solo Smash', description: 'Single Beef Patty, Cheese, Pickle, Caramelized Onion, Sauce', price: 12 },
    { name: 'Duo Smash', description: 'Double Beef Patty, Cheese, Pickle, Caramelized Onion, Sauce', price: 17 },
    { name: 'Trio Smash', description: 'Triple Beef Patty, Cheese, Pickle, Caramelized Onion, Sauce', price: 23 },
    { name: 'Classic Crunch', description: 'Lettuce, Jalapeno, Sauce, Fried Crispy Chicken', price: 12 },
    { name: 'Classic Spice', description: 'Spicy Sauce, Pickle, Sauce', price: 17 },
  ],
  Loaded: [
    { name: 'Crunch Bomb', description: 'Fried Chicken, French Fries, Sauce', price: 10 },
    { name: 'Beefy Bomb', description: 'Smashed Beef, French Fries, Sauce', price: 12 },
    { name: 'Fire Bomb', description: 'Nashville Chicken, Jalapeño, Lettuce, Sauce', price: 15 },
  ],
  Sandwiches: [
    { name: 'Havana', description: 'Roasted beef , Mustard sauce, Sauce', price: 13 },
    { name: 'Twisted chick', description: 'Fried Chicken, Lettuce, Jalapeno, Sauce', price: 12 },
  ],
  Milkshakes: [
    { name: 'Mango madness', price: 12 },
    { name: 'Coco crush', price: 12 },
    { name: 'Lotus Loaded', price: 12 },
    { name: 'Oreo overload', price: 12 },
    { name: 'Smash berry', price: 13 },
    { name: 'Choco melt', price: 12 },
  ],
  Mojitos: [
    { name: 'Blue wave', price: 10 },
    { name: 'Pink rush', price: 10 },
    { name: 'Violet vibe', price: 10 },
    { name: 'Mint rush', price: 10 },
    { name: 'Passion storm', price: 10 },
    { name: 'Midnight berry', price: 12 },
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
                <img src="/SMASHBlogo-18.svg" alt="" className="w-32 h-32 rotate-12 invert" />
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
      <nav className="p-4 md:p-6 flex justify-between items-center z-10 sticky top-0 bg-smash-brown/90 backdrop-blur-md border-b border-smash-red/20">
        <Link to="/" className="group">
          <img src="/SMASHBlogo-18.svg" alt="Smash B Logo" className="h-10 md:h-14 group-hover:scale-110 transition-transform" />
        </Link>
        <Link to="/" className="font-primary text-[10px] md:text-xs uppercase tracking-widest border-2 border-smash-red px-4 md:px-6 py-2 rounded-full hover:bg-smash-red transition-all">
          Back Home
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="relative py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden border-b-4 border-smash-red">
        <div className="absolute inset-0 opacity-10 bg-retro-grid pointer-events-none"></div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10"
        >
          <h1 className="font-primary text-6xl md:text-8xl lg:text-9xl text-smash-red uppercase italic tracking-tighter leading-none mb-2">
            The Menu
          </h1>
          <p className="font-secondary font-bold text-2xl md:text-3xl text-smash-cream/80 -rotate-2">
            Something's about to smash here
          </p>
        </motion.div>
      </header>

      {/* Menu Categories */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full space-y-20">
        {Object.entries(MENU_DATA).map(([category, items], catIndex) => (
          <section key={category}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-primary text-4xl md:text-5xl text-smash-red uppercase tracking-tighter italic">
                {category}
              </h2>
              <div className="h-1 flex-1 bg-smash-red/20 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white/5 border border-white/10 p-6 rounded-[25px] hover:border-smash-red/50 transition-all hover:shadow-[0_0_30px_rgba(234,59,36,0.1)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="font-primary text-xl md:text-2xl uppercase tracking-wider group-hover:text-smash-red transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-primary text-lg text-smash-red shrink-0">
                        {item.price} AED
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm md:text-base opacity-60 font-description leading-snug">
                        {item.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Decorative dot */}
                  <div className="mt-4 flex justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-smash-red group-hover:scale-150 transition-transform"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
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
              
              <motion.a 
                href="/SmashB_Menu.pdf" 
                download="SmashB_Menu.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 group bg-smash-red/10 border-2 border-smash-red/30 p-4 rounded-3xl hover:bg-smash-red hover:border-smash-red transition-all mt-6"
              >
                <div className="w-12 h-12 rounded-full bg-smash-red flex items-center justify-center text-white">
                  <Download className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-primary text-lg tracking-wider text-smash-cream group-hover:text-white uppercase italic">Download Menu</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-50 text-smash-cream group-hover:text-white/80">PDF Format (1.2 MB)</span>
                </div>
              </motion.a>
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
