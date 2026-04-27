import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHARACTERS = [
  'SMASH B Social-24.svg',
  'SMASH B Social-25.svg',
  'SMASH B Social-26.svg',
  'SMASH B Social-27.svg',
  'SMASH B Social-28.svg',
  'SMASH B Social-29.svg',
  'SMASH B Social-30.svg',
  'SMASH B Social-31.svg',
  'SMASH B Social-33.svg',
  'SMASH B Social-34.svg',
  'SMASH B Social-35.svg',
  'SMASH B Social-36.svg',
  'SMASH B Social-37.svg',
  'SMASH B Social-38.svg',
  'SMASH B Social-39.svg',
  'SMASH B Social-40.svg',
];

interface LoadingSequenceProps {
  onComplete: () => void;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'shuffling' | 'zoom' | 'logo' | 'blast' | 'complete'>('shuffling');
  const [currentCharacter, setCurrentCharacter] = useState<string>(CHARACTERS[0]);

  useEffect(() => {
    if (phase === 'shuffling') {
      let count = 0;
      const interval = setInterval(() => {
        setCurrentCharacter(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
        count++;
        if (count > 15) {
          clearInterval(interval);
          setPhase('zoom');
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'zoom') {
      const timer = setTimeout(() => {
        setPhase('logo');
      }, 800);
      return () => clearTimeout(timer);
    }
    if (phase === 'logo') {
      const timer = setTimeout(() => {
        setPhase('blast');
      }, 1200);
      return () => clearTimeout(timer);
    }
    if (phase === 'blast') {
      const timer = setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'shuffling' && (
          <motion.div
            key="shuffle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-64 h-64 md:w-96 md:h-96"
          >
            <img 
              src={`/brandcharacter/${currentCharacter}`} 
              alt="Character" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}

        {phase === 'zoom' && (
          <motion.div
            key="zoom"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 h-64 md:w-96 md:h-96"
          >
            <img 
              src={`/brandcharacter/${currentCharacter}`} 
              alt="Character" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}

        {(phase === 'logo' || phase === 'blast') && (
          <motion.div
            key="logo-phase"
            className="relative flex items-center justify-center"
          >
            <motion.img
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ 
                scale: phase === 'blast' ? 5 : 1, 
                rotate: 0, 
                opacity: phase === 'blast' ? 0 : 1 
              }}
              transition={{ 
                duration: phase === 'blast' ? 0.8 : 0.6, 
                ease: "circOut" 
              }}
              src="/Assets/SMASHBlogo-18.svg"
              alt="Smash B Logo"
              className="w-64 md:w-[500px]"
            />
            
            {phase === 'blast' && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-smash-red rounded-full"
              />
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-20 text-white font-primary text-xl md:text-3xl tracking-widest whitespace-nowrap"
            >
              Smash happens.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen flash on blast */}
      {phase === 'blast' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white z-[110]"
        />
      )}
    </div>
  );
};

export default LoadingSequence;
