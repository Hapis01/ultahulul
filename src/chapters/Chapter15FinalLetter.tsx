import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Heart, Sparkles, Moon } from 'lucide-react';
import { finalLetterData, birthdayConfig } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter15FinalLetterProps {
  onRestart: () => void;
}

export const Chapter15FinalLetter: React.FC<Chapter15FinalLetterProps> = ({ onRestart }) => {
  const [stayedHere, setStayedHere] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4 text-center pb-12 pt-4">
      {/* Intimate Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="glass-panel-glow p-8 sm:p-12 rounded-3xl border border-sky-400/30 w-full shadow-2xl text-left relative overflow-hidden"
      >
        {/* Soft watermark */}
        <div className="absolute top-4 right-4 text-sky-400/10 pointer-events-none">
          <Moon className="w-32 h-32" />
        </div>

        {/* Salutation */}
        <p className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 border-b border-sky-400/20 pb-4">
          {finalLetterData.salutation}
        </p>

        {/* Letter Paragraphs */}
        <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-light">
          {finalLetterData.paragraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.12 }}
              className="whitespace-pre-line"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Closing Signature */}
        <div className="mt-10 pt-6 border-t border-sky-400/20 text-right">
          <p className="text-xs text-slate-400 italic mb-1">{finalLetterData.closing}</p>
          <p className="text-lg sm:text-xl font-serif font-bold text-sky-300">
            {birthdayConfig.petName}
          </p>
        </div>
      </motion.div>

      {/* Stayed Here Ambient Modal / Box */}
      <AnimatePresence>
        {stayedHere && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-6 glass-panel-glow p-6 rounded-3xl border border-sky-400/40 max-w-md w-full text-center shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <p className="text-sm sm:text-base font-serif italic text-white whitespace-pre-line leading-relaxed">
              "{finalLetterData.stayHereMessage}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <BirthdayButton
          onClick={onRestart}
          variant="secondary"
          size="md"
          icon={<RotateCcw className="w-4 h-4" />}
        >
          Mulai lagi dari awal
        </BirthdayButton>

        {!stayedHere ? (
          <button
            onClick={() => setStayedHere(true)}
            className="px-5 py-3 rounded-full glass-panel text-sky-300 hover:text-white border border-sky-400/25 hover:border-sky-400/50 text-xs sm:text-sm font-medium flex items-center gap-2 transition cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
            <span>Tetap di sini</span>
          </button>
        ) : (
          <button
            onClick={() => setStayedHere(false)}
            className="text-xs text-slate-400 hover:text-slate-200 transition"
          >
            Tutup pesan
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-400/80 font-light flex items-center justify-center gap-1.5 select-none">
        <span>Made especially for {birthdayConfig.nickname}</span>
        <span>•</span>
        <span>20 September 2026</span>
      </footer>
    </div>
  );
};
