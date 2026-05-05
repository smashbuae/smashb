import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';
import Footer from '../components/Footer';

const Location: React.FC = () => {
  return (
    <div className="min-h-screen bg-smash-brown text-smash-cream flex flex-col">
      <nav className="p-6 flex justify-between items-center z-10">
        <Link to="/" className="group">
          <img src="/Assets/SMASHBlogo-18.svg" alt="Smash B Logo" className="h-12 md:h-16 group-hover:scale-110 transition-transform" />
        </Link>
        <Link to="/" className="font-primary text-sm uppercase tracking-widest border-2 border-smash-red px-6 py-2 rounded-full hover:bg-smash-red transition-all">
          Back Home
        </Link>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h1 className="font-primary text-5xl md:text-7xl text-smash-red uppercase italic tracking-tighter">
              Find Us
            </h1>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-smash-red w-8 h-8 mt-1 shrink-0" />
                <div>
                  <h3 className="font-primary text-2xl uppercase tracking-wider mb-2">Abu Dhabi HQ</h3>
                  <p className="font-description opacity-70">Coming soon to the heart of the capital.<br />UAE United Arab Emirates</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-smash-red w-8 h-8 mt-1 shrink-0" />
                <div>
                  <h3 className="font-primary text-2xl uppercase tracking-wider mb-2">Operating Hours</h3>
                  <p className="font-description opacity-70">Daily: 12:00 PM - 02:00 AM<br />Smashing late for the urban crew.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-smash-red w-8 h-8 mt-1 shrink-0" />
                <div>
                  <h3 className="font-primary text-2xl uppercase tracking-wider mb-2">Contact</h3>
                  <p className="font-description opacity-70">Enquiries: info@smashb.ae</p>
                </div>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-smash-red text-white font-primary px-10 py-4 rounded-[35px] uppercase tracking-widest border-2 border-white"
            >
              Get Directions
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-[500px] bg-white/5 rounded-[35px] border-4 border-smash-red/20 overflow-hidden relative"
          >
             {/* Placeholder for map */}
             <div className="absolute inset-0 flex items-center justify-center grayscale opacity-30">
               <img src="/Assets/SMASHBlogo-18.svg" alt="Map Overlay" className="w-48" />
             </div>
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116139.73663738096!2d54.3039121!3d24.453884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc7cc2e9341971407!2sAbu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1714240000000!5m2!1sen!2sae" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="grayscale contrast-125"
             ></iframe>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Location;
