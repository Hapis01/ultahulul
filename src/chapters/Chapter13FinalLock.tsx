import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, KeyRound, Sparkles } from 'lucide-react';
import { finalLockContent, birthdayConfig } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter13FinalLockProps {
  onNext: () => void;
}

export const Chapter13FinalLock: React.FC<Chapter13FinalLockProps> = ({ onNext }) => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputCode.trim().toLowerCase();
    const targetCode = birthdayConfig.secretCode.trim().toLowerCase();

    if (cleanInput === targetCode) {
      setError(false);
      setIsUnlocking(true);
      setTimeout(() => {
        onNext();
      }, 1400);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-md mx-auto w-full px-4 text-center">
      {/* Locked Box Card */}
      <motion.div
        animate={error ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-sky-400/30 w-full shadow-2xl flex flex-col items-center relative"
      >
        {/* Animated Lock Icon */}
        <motion.div
          animate={isUnlocking ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] } : {}}
          className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 ${
            isUnlocking
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-[0_0_35px_rgba(52,211,153,0.5)]'
              : 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-[0_0_30px_rgba(56,189,248,0.35)]'
          }`}
        >
          {isUnlocking ? (
            <Unlock className="w-10 h-10 animate-pulse" />
          ) : (
            <Lock className="w-10 h-10" />
          )}
        </motion.div>

        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {finalLockContent.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          {finalLockContent.subtitle}
        </p>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                if (error) setError(false);
              }}
              placeholder={finalLockContent.placeholder}
              className="glass-input w-full px-5 py-3.5 pl-11 rounded-2xl text-center text-sm font-medium tracking-wider uppercase placeholder:normal-case placeholder:text-slate-500"
              disabled={isUnlocking}
            />
            <KeyRound className="w-4 h-4 text-sky-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Error notice */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-rose-300 font-medium"
            >
              {finalLockContent.errorMessage}
            </motion.p>
          )}

          {/* Hint */}
          <p className="text-[11px] text-sky-300/70 font-light">
            {finalLockContent.hint}
          </p>

          <div className="pt-2">
            <BirthdayButton
              type="submit"
              variant="glow"
              size="md"
              className="w-full"
              disabled={isUnlocking || !inputCode.trim()}
              icon={isUnlocking ? <Sparkles className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            >
              {isUnlocking ? finalLockContent.unlockingMessage : 'Buka Kotak'}
            </BirthdayButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
