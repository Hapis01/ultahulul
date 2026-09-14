import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProgressIndicatorProps {
  currentChapter: number;
  totalChapters: number;
  highestUnlocked: number;
  onPrev?: () => void;
  onNext?: () => void;
  onSelectChapter?: (index: number) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentChapter,
  totalChapters,
  highestUnlocked,
  onPrev,
  onNext,
}) => {
  // Hide progress bar on Chapter 0 (Opening) to maintain mystery
  if (currentChapter === 0) return null;

  const progressPercentage = Math.round(((currentChapter) / (totalChapters - 1)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-3 md:bottom-5 inset-x-0 z-40 flex justify-center px-3 pointer-events-none"
    >
      <div className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-3 md:gap-4 shadow-xl shadow-black/40 border border-sky-400/20 pointer-events-auto backdrop-blur-xl">
        {/* Previous Button (if unlocked) */}
        {onPrev && currentChapter > 1 && (
          <button
            onClick={onPrev}
            aria-label="Kembali ke bagian sebelumnya"
            className="p-1 rounded-full text-slate-400 hover:text-sky-300 hover:bg-sky-950/40 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Progress Bar & Label */}
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-300">
              <span className="tracking-wide">Perjalanan Hadiah</span>
              <span className="text-sky-400 font-mono ml-3">{progressPercentage}%</span>
            </div>
            <div className="w-24 sm:w-36 h-1.5 bg-blue-950/80 rounded-full overflow-hidden border border-blue-800/40">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Chapter numbers */}
        <div className="text-[11px] font-mono text-sky-300/80 pl-1 border-l border-blue-800/40">
          <span>{String(currentChapter + 1).padStart(2, '0')}</span>
          <span className="text-slate-500">/{String(totalChapters).padStart(2, '0')}</span>
        </div>

        {/* Next Button (if already unlocked before) */}
        {onNext && currentChapter < highestUnlocked && (
          <button
            onClick={onNext}
            aria-label="Lanjut ke bagian berikutnya"
            className="p-1 rounded-full text-slate-400 hover:text-sky-300 hover:bg-sky-950/40 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
