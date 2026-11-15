import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSmashShapes } from '../utils/smashShapes';

interface LoadingSequenceProps {
  onComplete: () => void;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'exit'>('logo');
  useSmashShapes([]);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1150);

    const doneTimer = setTimeout(() => {
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      role="presentation"
      aria-hidden="true"
      onClick={onComplete}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#432724] overflow-hidden cursor-pointer select-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="smashb-intro-logo"
          initial={{ scale: 1.45, opacity: 0, rotate: -4 }}
          animate={
            phase === 'exit'
              ? { scale: 1.28, opacity: 0, rotate: 0 }
              : { scale: 1, opacity: 1, rotate: 0 }
          }
          transition={{
            duration: phase === 'exit' ? 0.42 : 0.45,
            type: 'spring',
            damping: 14,
            stiffness: 240,
          }}
          className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          {/* Off-White Outline + Red Smash B Logo */}
          <img
            src="/logos/smashb-logo-4.svg"
            alt="Smash B"
            width={280}
            height={280}
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain"
            loading="eager"
            decoding="sync"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'exit' ? 0 : 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.28 }}
            className="mt-5 font-primary text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-[#EBE5D0]"
          >
            Stay <span className="text-[#FF1C00]">Smashin'.</span>
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Non-blocking Skip control for immediate user interaction */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        aria-label="Skip intro"
        data-smash-shape="compact"
        data-smash-stroke="none"
        className="absolute bottom-8 right-6 z-20 smash-btn bg-[#EBE5D0] text-[#432724] font-bold text-xs uppercase px-5 py-2.5 tap-target"
      >
        Skip
      </button>
    </div>
  );
};

export default LoadingSequence;
