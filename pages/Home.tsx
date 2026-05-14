import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import LoadingSequence from '../components/LoadingSequence';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {isLoading ? (
          <LoadingSequence key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
