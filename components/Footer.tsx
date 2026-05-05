import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-smash-cream pt-32 pb-12 px-6 overflow-hidden bg-retro-grid">
      {/* Red & Cream Dotted Background fade-in effect */}
      <div className="absolute inset-0 z-0 bg-dots opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="mb-12"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-smash-red flex items-center justify-center bg-smash-brown transform -rotate-12 hover:rotate-0 transition-transform duration-500 shadow-2xl">
               <img src="/Assets/SMASHBlogo-21.svg" alt="SB Monogram" className="w-3/4 h-3/4 object-contain invert" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-8xl font-primary text-smash-brown leading-tight uppercase mb-12">
            Smash it <br /> <span className="text-smash-red animate-pulse">feel it.</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-12 font-primary text-sm md:text-lg">
             {[
               { name: 'Menu', path: 'https://www.instagram.com/smashb.uae/', external: true },
               { name: 'Locations', path: '/location', external: false },
               { name: 'Our Story', path: '/about', external: false },
               { name: 'Merch', path: '#', external: false }
             ].map((link) => (
               link.external ? (
                 <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer" className="text-smash-brown hover:text-smash-red transition-colors border-b-4 border-transparent hover:border-smash-red pb-2">
                   {link.name}
                 </a>
               ) : (
                 <Link key={link.name} to={link.path} className="text-smash-brown hover:text-smash-red transition-colors border-b-4 border-transparent hover:border-smash-red pb-2">
                   {link.name}
                 </Link>
               )
             ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t-2 border-smash-brown/20 gap-8">
          <div className="flex space-x-8">
            {[
              { name: 'Instagram', url: 'https://www.instagram.com/smashb.uae/' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@smashbuae' },
              { name: 'Facebook', url: 'https://www.facebook.com/smashb.uae/' },
              { name: 'Threads', url: 'https://www.threads.net/@smashb.uae' }
            ].map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="font-secondary text-2xl text-smash-brown hover:text-smash-red transition-colors tracking-widest">
                {social.name}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right space-y-2">
            <p className="font-primary text-[10px] text-smash-brown/50">
              © 2024 SMASH B. ALL RIGHTS RESERVED.
            </p>
            <p className="font-secondary text-xl text-smash-brown">
              Brand developed by <span className="text-smash-red font-bold">Artigen Creative Hub</span>
            </p>
          </div>
        </div>
      </div>

      {/* Retro decorative text */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-5">
         <span className="font-primary text-9xl text-smash-brown uppercase">SB-001</span>
      </div>
    </footer>
  );
};

export default Footer;
