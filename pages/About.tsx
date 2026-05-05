import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-smash-brown text-smash-cream flex flex-col">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center z-10">
        <Link to="/" className="group">
          <img 
            src="/Assets/SMASHBlogo-18.svg" 
            alt="Smash B Logo" 
            className="h-12 md:h-16 group-hover:scale-110 transition-transform" 
          />
        </Link>
        <Link to="/" className="font-primary text-sm uppercase tracking-widest border-2 border-smash-red px-6 py-2 rounded-full hover:bg-smash-red transition-all">
          Back Home
        </Link>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-primary text-5xl md:text-7xl text-smash-red uppercase italic tracking-tighter">
            Our Smash Story
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-description text-lg md:text-xl leading-relaxed text-smash-cream/80 space-y-6"
        >
          <p>
            Smash B wasn't born in a kitchen—it was born on the streets. We saw a gap in the burger scene: 
            plenty of "craft" but not enough "soul."
          </p>
          <p>
            We're not just flipping patties; we're redefining the smash burger experience for the UAE. 
            High-grade beef, urban energy, and a commitment to flavor that hits hard.
          </p>
          <p className="text-smash-red font-primary text-2xl md:text-3xl italic">
             BOLD. UNFILTERED. SMASHED.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative w-full aspect-video rounded-[35px] overflow-hidden border-4 border-smash-red/20"
        >
          <img 
            src="/brandcharacter/smashbflyingcharacter.svg" 
            alt="Smash B Mascot" 
            className="w-full h-full object-contain p-12 bg-white/5"
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
