import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <div className="h-screen bg-smash-brown text-smash-cream flex flex-col overflow-hidden">
      <nav className="p-4 md:p-6 flex justify-between items-center z-10 shrink-0">
        <Link to="/" className="group">
          <img src="/SMASHBlogo-18.svg" alt="Smash B Logo" className="h-10 md:h-16 group-hover:scale-110 transition-transform" />
        </Link>
        <Link to="/" className="font-primary text-xs md:text-sm uppercase tracking-widest border-2 border-smash-red px-4 md:px-6 py-2 rounded-full hover:bg-smash-red transition-all">
          Back Home
        </Link>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-4 md:py-8 w-full flex items-center overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <h1 className="font-primary text-4xl md:text-6xl lg:text-7xl text-smash-red uppercase italic tracking-tighter">
              Find Us
            </h1>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-smash-red w-6 h-6 md:w-8 md:h-8 mt-1 shrink-0" />
                <div>
                  <h3 className="font-primary text-xl md:text-2xl uppercase tracking-wider mb-1 md:mb-2">Ras Al Khaimah</h3>
                  <p className="font-description text-sm md:text-base opacity-70">Near American University of Ras Al Khaimah (AURAK)<br />Ras Al Khaimah, United Arab Emirates</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-smash-red w-6 h-6 md:w-8 md:h-8 mt-1 shrink-0" />
                <div>
                  <h3 className="font-primary text-xl md:text-2xl uppercase tracking-wider mb-1 md:mb-2">Operating Hours</h3>
                  <p className="font-description text-sm md:text-base opacity-70">Daily: 1:00 PM - 12:00 AM<br />Smashed daily for the late-night crave.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-smash-red w-6 h-6 md:w-8 md:h-8 mt-1 shrink-0" />
                <div>
                  <h3 className="font-primary text-xl md:text-2xl uppercase tracking-wider mb-1 md:mb-2">Contact</h3>
                  <p className="font-description text-sm md:text-base opacity-70">Call: +971 56 353 5819</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/971563535819"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] flex items-center justify-center bg-smash-red text-white font-primary px-4 md:px-8 py-3 md:py-4 rounded-[35px] text-[10px] md:text-xs uppercase tracking-widest border-2 border-white text-center"
              >
                WhatsApp
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://share.google/B4R9Oj37gfchmf9mD"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] flex items-center justify-center bg-white text-smash-red font-primary px-4 md:px-8 py-3 md:py-4 rounded-[35px] text-[10px] md:text-xs uppercase tracking-widest border-2 border-smash-red text-center"
              >
                Get Directions
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://g.page/r/CaIBEx4A1OeZEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] flex flex-col items-center justify-center bg-transparent text-white font-primary px-4 md:px-8 py-3 md:py-4 rounded-[35px] text-[10px] md:text-xs uppercase tracking-widest border-2 border-white/50 text-center gap-1 md:gap-2"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                Review Us
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center relative hidden md:block"
          >
             <div className="w-full h-full bg-white/5 rounded-[35px] border-4 border-smash-red/20 overflow-hidden flex items-center justify-center p-12">
               <img src="/SMASHBlogo-18.svg" alt="Smash B Brand" className="w-full max-w-[300px] drop-shadow-2xl" />
             </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Location;
