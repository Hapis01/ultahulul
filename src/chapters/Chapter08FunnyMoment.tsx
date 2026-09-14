import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Heart, ArrowRight, HelpCircle } from 'lucide-react';
import { funnySectionData } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter08FunnyMomentProps {
  onNext: () => void;
}

export const Chapter08FunnyMoment: React.FC<Chapter08FunnyMomentProps> = ({ onNext }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonIndex, setNoButtonIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hasAnsweredYes, setHasAnsweredYes] = useState(false);

  const dodgeNoButton = () => {
    // Generate random jump offset within safe bounds
    const randomX = (Math.random() - 0.5) * 180;
    const randomY = (Math.random() - 0.5) * 140;
    setNoButtonPos({ x: randomX, y: randomY });

    setNoButtonIndex((prev) =>
      prev < funnySectionData.noButtonTexts.length - 1 ? prev + 1 : prev
    );
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full px-4 text-center">
      {/* Badge Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/25 text-xs text-sky-300 font-medium mb-2">
          <Smile className="w-3.5 h-3.5 text-sky-400" />
          <span>Intermezzo</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          {funnySectionData.title}
        </h2>
      </motion.div>

      {/* Pop-up Humor Cards */}
      <div className="space-y-2.5 w-full max-w-md mb-8">
        {funnySectionData.cards.map((cardText, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.4, type: 'spring', stiffness: 260, damping: 20 }}
            className="glass-panel py-3 px-5 rounded-2xl text-xs sm:text-sm text-slate-200 border border-sky-400/20 shadow-md font-medium"
          >
            {cardText}
          </motion.div>
        ))}
      </div>

      {/* Question trigger button or Question container */}
      <AnimatePresence mode="wait">
        {!showQuestion ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.2 }}
          >
            <BirthdayButton
              onClick={() => setShowQuestion(true)}
              variant="glow"
              size="md"
              icon={<HelpCircle className="w-4 h-4" />}
            >
              Aku punya satu pertanyaan...
            </BirthdayButton>
          </motion.div>
        ) : !hasAnsweredYes ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-sky-400/30 w-full max-w-md shadow-2xl relative"
          >
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-6">
              {funnySectionData.question}
            </h3>

            <div className="relative min-h-[120px] flex items-center justify-center gap-4">
              {/* YES Button */}
              <BirthdayButton
                onClick={() => setHasAnsweredYes(true)}
                variant="glow"
                size="md"
                className="z-10"
              >
                {funnySectionData.yesButtonText}
              </BirthdayButton>

              {/* Dodging NO Button */}
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                onMouseEnter={dodgeNoButton}
                onClick={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                className="px-5 py-2.5 rounded-full bg-slate-800/80 border border-slate-600 text-xs sm:text-sm text-slate-300 hover:bg-rose-950/60 hover:text-rose-200 hover:border-rose-400/40 cursor-pointer select-none transition-colors"
              >
                {funnySectionData.noButtonTexts[noButtonIndex]}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Sweet Confirmation */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-sky-400/30 max-w-md w-full shadow-2xl flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
              <Heart className="w-7 h-7 fill-rose-400 animate-pulse" />
            </div>

            <h3 className="text-xl font-serif font-bold text-white mb-2">Tentu Saja!</h3>
            <p className="text-xs sm:text-sm text-sky-200 leading-relaxed max-w-xs">
              {funnySectionData.finalNoResponse}
            </p>

            <div className="mt-6">
              <BirthdayButton
                onClick={onNext}
                variant="primary"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Lanjut ke potret spesial
              </BirthdayButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
