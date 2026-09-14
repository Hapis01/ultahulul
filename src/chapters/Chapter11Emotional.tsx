import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Camera } from 'lucide-react';
import { emotionalMomentData } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter11EmotionalProps {
  onNext: () => void;
}

export const Chapter11Emotional: React.FC<Chapter11EmotionalProps> = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Gentle progressive timing
    const t1 = setTimeout(() => setStep(1), 1000); // "Sebentar..."
    const t2 = setTimeout(() => setStep(2), 2600); // "Aku ingin mengatakan sesuatu..."
    const t3 = setTimeout(() => setStep(3), 4200); // "Terima kasih..."
    const t4 = setTimeout(() => setStep(4), 5800); // 3 thank you bullet lines
    const t5 = setTimeout(() => setStep(5), 7800); // Personal photo with slow zoom
    const t6 = setTimeout(() => setStep(6), 9800); // Final emotional wish & button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full px-4 text-center">
      {/* Intro Lines */}
      <div className="space-y-3 mb-6 min-h-[100px] flex flex-col items-center justify-center">
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-base sm:text-lg font-serif italic text-slate-300"
          >
            {emotionalMomentData.introLines[0]}
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-sm sm:text-base text-slate-300 font-light"
          >
            {emotionalMomentData.introLines[1]}
          </motion.p>
        )}

        {step >= 3 && (
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-white text-glow-blue"
          >
            {emotionalMomentData.introLines[2]}
          </motion.h2>
        )}
      </div>

      {/* Thank You Points */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glass-panel p-6 rounded-3xl border border-sky-400/20 max-w-md w-full mb-8 text-left space-y-3"
          >
            {emotionalMomentData.thankYouLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.4 }}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
              >
                <Heart className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 fill-sky-400/30" />
                <span>{line}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo with slow zoom */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden glass-panel-glow border border-sky-400/30 shadow-2xl relative flex items-center justify-center bg-[#020817]"
          >
            {!imgError ? (
              <motion.img
                src={emotionalMomentData.photo}
                alt="Emotional Memory"
                onError={() => setImgError(true)}
                animate={{ scale: [1, 1.08] }}
                transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="w-full h-full object-cover select-none"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-2">
                  <Camera className="w-7 h-7" />
                </div>
                <p className="text-sm font-serif text-white font-medium">Momen Penuh Arti</p>
                <p className="text-[11px] text-sky-300/80 mt-0.5">
                  Foto di <code className="bg-sky-950 px-1 py-0.5 rounded font-mono">{emotionalMomentData.photo}</code>
                </p>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-4 text-center">
              <span className="text-xs text-sky-200/90 font-serif italic">
                {emotionalMomentData.caption}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closing wish & Next Button */}
      <AnimatePresence>
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8 space-y-6 max-w-md"
          >
            <p className="text-sm sm:text-base font-serif italic text-sky-100 leading-relaxed">
              "{emotionalMomentData.closingLine}"
            </p>

            <BirthdayButton
              onClick={onNext}
              variant="glow"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Lanjut
            </BirthdayButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
