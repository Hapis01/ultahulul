import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight, Images } from 'lucide-react';
import { memoriesContent } from '../data/birthdayContent';
import { MemoryCard } from '../components/MemoryCard';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter04MemoriesProps {
  onNext: () => void;
}

export const Chapter04Memories: React.FC<Chapter04MemoriesProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalMemories = memoriesContent.length;
  const currentMemory = memoriesContent[currentIndex];

  const handleNextPhoto = () => {
    if (currentIndex < totalMemories - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full px-4 text-center">
      {/* Chapter header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/25 text-xs text-sky-300 font-medium mb-3">
          <Images className="w-3.5 h-3.5 text-sky-400" />
          <span>Galeri Kenangan Kita</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Momen yang Selalu Membekas
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Kenangan ke-{currentIndex + 1} dari {totalMemories}
        </p>
      </motion.div>

      {/* Card Display with slide transition */}
      <div className="w-full relative min-h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 25, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -25, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <MemoryCard memory={currentMemory} index={currentIndex} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {memoriesContent.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Buka foto ke-${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? 'w-7 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]'
                : 'w-2 bg-blue-900/60 hover:bg-sky-600/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 mt-8">
        {currentIndex > 0 && (
          <button
            onClick={handlePrevPhoto}
            className="px-4 py-3 rounded-full glass-panel text-slate-300 hover:text-white border border-sky-400/20 text-sm flex items-center gap-1.5 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>
        )}

        {currentIndex < totalMemories - 1 ? (
          <BirthdayButton
            onClick={handleNextPhoto}
            variant="glow"
            iconRight={<ChevronRight className="w-4 h-4" />}
          >
            Kenangan berikutnya
          </BirthdayButton>
        ) : (
          <BirthdayButton
            onClick={onNext}
            variant="glow"
            size="lg"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Lanjut ke tes kecil 🎮
          </BirthdayButton>
        )}
      </div>
    </div>
  );
};
