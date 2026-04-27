import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'blast' | 'complete'>('logo');

  useEffect(() => {
    if (phase === 'logo') {
      const timer = setTimeout(() => {
        setPhase('blast');
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (phase === 'blast') {
      const timer = setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {(phase === 'logo' || phase === 'blast') && (
          <motion.div
            key="logo-phase"
            className="relative flex flex-col items-center justify-center gap-12"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: phase === 'blast' ? 5 : 1, 
                opacity: phase === 'blast' ? 0 : 1 
              }}
              transition={{ 
                duration: phase === 'blast' ? 0.6 : 0.8, 
                ease: "circOut" 
              }}
              src="/Assets/SMASHBlogo-18.svg"
              alt="Smash B Logo"
              className="w-48 md:w-96"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: phase === 'blast' ? 0 : 1,
                y: 0 
              }}
              transition={{ delay: 0.4 }}
              className="text-white font-primary text-2xl md:text-4xl tracking-tighter italic uppercase"
            >
              Smash happens.
            </motion.div>

            {phase === 'blast' && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-smash-red rounded-full blur-xl"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen flash on transition */}
      {phase === 'blast' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-white z-[110]"
        />
      )}
    </div>
  );
};

export default LoadingSequence;
