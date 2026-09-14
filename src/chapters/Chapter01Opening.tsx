import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Music } from 'lucide-react';
import { openingContent } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';
import { useAudio } from '../hooks/useAudio';

interface Chapter01OpeningProps {
  onNext: () => void;
  audioHook: ReturnType<typeof useAudio>;
}

export const Chapter01Opening: React.FC<Chapter01OpeningProps> = ({ onNext, audioHook }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1200);
    const timer2 = setTimeout(() => setStep(2), 2800);
    const timer3 = setTimeout(() => setStep(3), 4400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleOpenGift = async () => {
    if (!audioHook?.isPlaying) {
      audioHook?.fadeInPlay?.(0.75, 1500);
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-xl mx-auto px-4 relative">
      <motion.div
        key="opening-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center w-full"
      >
        {/* Soft glowing emblem */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-16 h-16 rounded-full bg-blue-500/10 border border-sky-400/30 flex items-center justify-center mb-8 text-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.25)]"
        >
          <Sparkles className="w-8 h-8 animate-pulse" />
        </motion.div>

        {/* Progressive Text Reveals */}
        <div className="min-h-[160px] flex flex-col items-center justify-center space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 font-light tracking-wide"
          >
            {openingContent.line1}
          </motion.p>

          <AnimatePresence>
            {step >= 1 && (
              <motion.h1
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.9 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-wider text-glow-blue"
              >
                {openingContent.line2}
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-xl sm:text-2xl font-serif italic text-sky-300"
              >
                "{openingContent.line3}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Reveal Button */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <BirthdayButton
                onClick={handleOpenGift}
                variant="glow"
                size="lg"
                icon={<Gift className="w-5 h-5 text-sky-200" />}
              >
                {openingContent.buttonText}
              </BirthdayButton>

              {/* Gentle ambient hint if browser is waiting for first gesture */}
              {!audioHook?.isPlaying && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xs text-sky-300/80 flex items-center gap-1.5 animate-pulse"
                >
                  <Music className="w-3.5 h-3.5 text-sky-400" />
                  <span>Alunan musik akan berputar otomatis saat kamu mulai 🎵</span>
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
