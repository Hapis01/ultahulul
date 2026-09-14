import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Mail, Calendar } from 'lucide-react';
import { finalSurpriseData } from '../data/birthdayContent';
import { ConfettiCelebration } from '../components/ConfettiCelebration';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter14FinalSurpriseProps {
  onNext: () => void;
}

export const Chapter14FinalSurprise: React.FC<Chapter14FinalSurpriseProps> = ({ onNext }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2000);
    const t3 = setTimeout(() => setStep(3), 3200);
    const t4 = setTimeout(() => setStep(4), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4 text-center relative py-6">
      {/* Confetti effect */}
      <ConfettiCelebration />

      {/* Floating ambient hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-20, -120], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
          className="absolute left-8 bottom-12 text-sky-400"
        >
          <Heart className="w-5 h-5 fill-sky-400/40" />
        </motion.div>
        <motion.div
          animate={{ y: [-10, -140], opacity: [0, 0.5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5, ease: 'easeOut' }}
          className="absolute right-10 bottom-16 text-blue-300"
        >
          <Heart className="w-6 h-6 fill-blue-300/40" />
        </motion.div>
      </div>

      {/* Ribbon Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500/20 via-blue-500/30 to-indigo-500/20 border border-sky-400/40 text-xs sm:text-sm text-sky-200 font-semibold mb-6 shadow-[0_0_25px_rgba(56,189,248,0.3)]"
      >
        <Sparkles className="w-4 h-4 text-sky-400 animate-spin-slow" />
        <span>{finalSurpriseData.congratsTitle}</span>
      </motion.div>

      {/* Full Name & Nicknames */}
      <div className="space-y-3 mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-wide text-glow-blue"
        >
          {finalSurpriseData.highlightName}
        </motion.h1>

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl font-serif font-medium text-sky-300 italic"
          >
            "{finalSurpriseData.nickname}"
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl sm:text-2xl font-serif text-slate-200"
          >
            {finalSurpriseData.petName}
          </motion.p>
        )}
      </div>

      {/* Date Pill */}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-panel px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono text-sky-300 flex items-center gap-2 border border-sky-400/30 mb-6"
        >
          <Calendar className="w-4 h-4 text-sky-400" />
          <span>{finalSurpriseData.birthdayDateFormatted}</span>
        </motion.div>
      )}

      {/* Wishing text */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-sky-400/30 max-w-lg w-full mb-8 shadow-2xl"
        >
          <p className="text-sm sm:text-base text-slate-100 font-light leading-relaxed">
            "{finalSurpriseData.wishingText}"
          </p>
        </motion.div>
      )}

      {/* Button to read final letter */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BirthdayButton
            onClick={onNext}
            variant="glow"
            size="lg"
            icon={<Mail className="w-5 h-5 text-sky-200" />}
          >
            Baca pesan terakhir
          </BirthdayButton>
        </motion.div>
      )}
    </div>
  );
};
