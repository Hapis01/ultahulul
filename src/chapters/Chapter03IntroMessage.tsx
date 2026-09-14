import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { introMessageContent } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter03IntroMessageProps {
  onNext: () => void;
}

export const Chapter03IntroMessage: React.FC<Chapter03IntroMessageProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto w-full px-4">
      {/* Digital letter card with subtle texture and glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-panel-glow p-7 sm:p-9 rounded-3xl border border-sky-400/30 w-full shadow-2xl relative overflow-hidden"
      >
        {/* Subtle decorative top mail badge */}
        <div className="flex items-center justify-between border-b border-sky-400/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-sky-400" />
            <span className="text-xs uppercase tracking-widest text-sky-300 font-medium">
              Surat Pembuka
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">20.09.2026</span>
        </div>

        {/* Salutation */}
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3"
        >
          {introMessageContent.salutation}
        </motion.h3>

        {/* Lead sentence */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg font-serif italic text-sky-200 mb-6"
        >
          {introMessageContent.firstLine}
        </motion.p>

        {/* Flowing body lines */}
        <div className="space-y-3.5 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
          {introMessageContent.bodyLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Button Lanjut */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="mt-8"
      >
        <BirthdayButton
          onClick={onNext}
          variant="glow"
          size="lg"
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          {introMessageContent.nextButtonText}
        </BirthdayButton>
      </motion.div>
    </div>
  );
};
