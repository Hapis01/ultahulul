import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Star,
  Gift,
  Camera,
  Moon,
  Sparkles,
  HelpCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { memoryGameCards } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter06MemoryGameProps {
  onNext: () => void;
}

export const Chapter06MemoryGame: React.FC<Chapter06MemoryGameProps> = ({ onNext }) => {
  const [openedCardIds, setOpenedCardIds] = useState<number[]>([]);
  const [hasFoundSpecial, setHasFoundSpecial] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return <Heart className="w-6 h-6 text-rose-400 fill-rose-400/30" />;
      case 'star':
        return <Star className="w-6 h-6 text-amber-400 fill-amber-400/30" />;
      case 'gift':
        return <Gift className="w-6 h-6 text-sky-400" />;
      case 'camera':
        return <Camera className="w-6 h-6 text-blue-300" />;
      case 'moon':
        return <Moon className="w-6 h-6 text-indigo-300 fill-indigo-300/30" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-400" />;
    }
  };

  const handleCardClick = (id: number, isSpecial: boolean) => {
    if (!openedCardIds.includes(id)) {
      setOpenedCardIds((prev) => [...prev, id]);
      if (isSpecial) {
        setHasFoundSpecial(true);
      }
    }
  };

  const handleResetGame = () => {
    setOpenedCardIds([]);
    setHasFoundSpecial(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4 text-center">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/25 text-xs text-sky-300 font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Mini Game 2</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Memory Click</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
          Ada satu kartu rahasia di antara 6 kartu di bawah ini. Coba tebak yang mana kartu spesialnya!
        </p>
      </motion.div>

      {/* 6 Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-lg mb-6">
        {memoryGameCards.map((card) => {
          const isOpened = openedCardIds.includes(card.id);

          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(card.id, card.isSpecial)}
              className={`h-36 sm:h-40 rounded-2xl cursor-pointer p-4 flex flex-col items-center justify-center text-center transition-all duration-500 relative select-none ${
                isOpened
                  ? card.isSpecial
                    ? 'glass-panel-glow border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.4)] bg-gradient-to-b from-sky-950/80 to-blue-950/90'
                    : 'glass-panel border-blue-500/30 bg-blue-950/40'
                  : 'glass-panel border-sky-400/20 hover:border-sky-400/60 bg-blue-950/70 shadow-lg'
              }`}
            >
              {isOpened ? (
                <motion.div
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <div className="mb-2">{getIcon(card.iconName)}</div>
                  <p
                    className={`text-[11px] sm:text-xs leading-snug ${
                      card.isSpecial ? 'font-bold text-sky-200' : 'text-slate-300'
                    }`}
                  >
                    {card.message}
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-sky-400/70">
                  <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-sky-400/20 flex items-center justify-center mb-2">
                    <HelpCircle className="w-5 h-5 text-sky-400" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Buka Kartu</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Special Found Banner */}
      <AnimatePresence>
        {hasFoundSpecial && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass-panel-glow p-5 rounded-2xl border border-sky-400/40 max-w-lg w-full mb-6 text-left"
          >
            <div className="flex items-center gap-2 text-sky-300 text-sm font-semibold mb-1">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Kartu Rahasia Terbuka!</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Kamu berhasil menemukan kartu spesial! Sama seperti kamu yang selalu menjadi yang paling istimewa di antara jutaan orang.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {openedCardIds.length > 0 && (
          <button
            onClick={handleResetGame}
            className="px-4 py-2.5 rounded-full glass-panel text-slate-300 hover:text-white border border-sky-400/20 text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tutup Semua</span>
          </button>
        )}

        {hasFoundSpecial ? (
          <BirthdayButton
            onClick={onNext}
            variant="glow"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Lanjut ke intermezzo 😜
          </BirthdayButton>
        ) : (
          <p className="text-xs text-slate-400 italic">
            Klik kartu sampai kamu menemukan tulisan "Ketemu!" ya!
          </p>
        )}
      </div>
    </div>
  );
};
