import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'count' | 'logo' | 'blast' | 'complete'>('count');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase === 'count') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('logo'), 300);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }

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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0f0a09] overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'count' && (
          <motion.div
            key="count-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-smash-red"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-primary text-6xl text-white italic font-black tracking-tighter">
              {Math.min(progress, 100)}%
            </div>
            <div className="text-smash-red font-primary text-sm uppercase tracking-[0.3em] font-bold">
              Preparing for impact
            </div>
          </motion.div>
        )}

        {(phase === 'logo' || phase === 'blast') && (
          <motion.div
            key="logo-phase"
            className="relative flex flex-col items-center justify-center"
          >
            {/* Impact Shockwaves */}
            {phase === 'logo' && (
              <>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute w-96 h-96 border-4 border-smash-red/20 rounded-full"
                />
                <motion.div 
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1.2, 1.5, 1.2], opacity: [0.1, 0, 0.1] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
                  className="absolute w-[500px] h-[500px] border-2 border-smash-red/10 rounded-full"
                />
              </>
            )}

            <motion.img
              initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
              animate={{ 
                scale: phase === 'blast' ? 10 : 1, 
                opacity: phase === 'blast' ? 0 : 1,
                rotate: 0
              }}
              transition={{ 
                duration: phase === 'blast' ? 0.4 : 0.8, 
                type: "spring",
                damping: 12,
                stiffness: 120
              }}
              src="/SMASHBlogo-19.svg"
              alt="Smash B Logo"
              className="w-64 md:w-[450px] relative z-10 drop-shadow-[0_0_30px_rgba(234,59,36,0.5)]"
              loading="eager"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: phase === 'blast' ? 0 : 1,
                scale: 1
              }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-white font-primary text-3xl md:text-5xl tracking-tighter italic uppercase font-black"
            >
              READY? <span className="text-smash-red underline">SMASH.</span>
            </motion.div>

            {phase === 'blast' && (
              <motion.div
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 10, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 bg-smash-red rounded-full blur-[100px]"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extreme Flash */}
      {phase === 'blast' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white z-[210] mix-blend-overlay"
        />
      )}
    </div>
  );
};

export default LoadingSequence;
