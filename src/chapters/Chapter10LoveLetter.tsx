import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Heart } from 'lucide-react';
import { loveLetterData, birthdayConfig } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter10LoveLetterProps {
  onNext: () => void;
}

export const Chapter10LoveLetter: React.FC<Chapter10LoveLetterProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full px-4 text-center">
      {/* Letter Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/25 text-xs text-sky-300 font-medium mb-2">
          <Mail className="w-3.5 h-3.5 text-sky-400" />
          <span>Surat Romantis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Surat Kecil untuk {birthdayConfig.petName}
        </h2>
      </motion.div>

      {/* Parchment / Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel-glow p-7 sm:p-10 rounded-3xl border border-sky-400/30 w-full shadow-2xl text-left relative overflow-hidden"
      >
        {/* Subtle decorative heart watermark */}
        <div className="absolute right-4 bottom-4 pointer-events-none opacity-5">
          <Heart className="w-48 h-48 text-sky-400 fill-sky-400" />
        </div>

        {/* Salutation */}
        <p className="text-xl sm:text-2xl font-serif font-bold text-white mb-5 border-b border-sky-400/20 pb-3">
          {loveLetterData.salutation}
        </p>

        {/* Paragraphs */}
        <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-light">
          {loveLetterData.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.15 }}
              className="whitespace-pre-line"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Signoff */}
        <div className="mt-8 pt-4 border-t border-sky-400/20 text-right">
          <p className="text-xs text-slate-400 italic mb-1">{loveLetterData.signoff}</p>
          <p className="text-base sm:text-lg font-serif font-semibold text-sky-300">
            Seseorang yang selalu menyayangimu
          </p>
        </div>
      </motion.div>

      {/* Button to proceed */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8"
      >
        <BirthdayButton
          onClick={onNext}
          variant="glow"
          size="lg"
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          Lanjut
        </BirthdayButton>
      </motion.div>
    </div>
  );
};
