import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Camera,
  BookOpen,
} from 'lucide-react';
import { timelineEvents } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';
import { getAssetUrl } from '../utils/assetUrl';

interface Chapter12TimelineProps {
  onNext: () => void;
}

export const Chapter12Timeline: React.FC<Chapter12TimelineProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imgError, setImgError] = useState(false);

  const totalSlides = timelineEvents.length;
  const currentEvent = timelineEvents[currentIndex];
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;

  // Change slide with directional animation
  const goToSlide = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= totalSlides) return;
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
    setImgError(false);
  };

  const handleNext = () => {
    if (!isLastSlide) {
      goToSlide(currentIndex + 1);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (!isFirstSlide) {
      goToSlide(currentIndex - 1);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isLastSlide, isFirstSlide]);

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.25, ease: 'easeIn' as const },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto w-full px-4 text-center">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/25 text-xs text-sky-300 font-medium mb-2">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Jejak Waktu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Perjalanan Cerita Kita
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
          Setiap momen dan langkah kecil kita yang membawa kita sampai ke hari ini ✨
        </p>
      </motion.div>

      {/* Top Timeline Pills / Selector */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {timelineEvents.map((evt, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => goToSlide(idx)}
                className={`flex-1 py-2.5 px-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'glass-panel-glow border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] bg-blue-900/60'
                    : 'glass-panel border-sky-400/20 text-slate-400 hover:text-slate-200 hover:border-sky-400/40'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-serif font-bold text-sky-300 font-mono">
                    {evt.year}
                  </span>
                  {isSelected && <Sparkles className="w-3 h-3 text-sky-400 animate-spin-slow" />}
                </div>
                <span className="text-[11px] sm:text-xs truncate max-w-[90px] sm:max-w-[130px]">
                  {evt.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Slide Counter Pill */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/70 border border-sky-400/20 text-[11px] text-sky-300 font-mono">
          <BookOpen className="w-3 h-3 text-sky-400" />
          Momen {currentIndex + 1} dari {totalSlides}
        </span>
      </div>

      {/* Carousel Frame with Navigation Arrows */}
      <div className="relative w-full max-w-lg flex items-center justify-center">
        {/* Left Arrow Button (Previous Slide) */}
        <motion.button
          whileHover={{ scale: !isFirstSlide ? 1.15 : 1 }}
          whileTap={{ scale: !isFirstSlide ? 0.9 : 1 }}
          onClick={handlePrev}
          disabled={isFirstSlide}
          aria-label="Momen Sebelumnya"
          className={`absolute -left-3 sm:-left-6 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isFirstSlide
              ? 'opacity-20 cursor-not-allowed bg-blue-950/40 border border-slate-700/30 text-slate-500'
              : 'glass-panel border border-sky-400/40 text-sky-200 hover:text-white hover:bg-sky-500/20 hover:border-sky-300 shadow-lg shadow-black/40'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {/* Right Arrow Button (Next Slide) */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          aria-label={isLastSlide ? 'Menuju Kejutan Terakhir' : 'Momen Selanjutnya'}
          className={`absolute -right-3 sm:-right-6 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg shadow-black/40 ${
            !isLastSlide
              ? 'glass-panel-glow border border-sky-400 text-sky-100 bg-sky-500/20 hover:bg-sky-500/30 hover:border-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] animate-pulse'
              : 'glass-panel border border-sky-400/40 text-sky-200 hover:text-white hover:bg-sky-500/20'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {/* Main Event Card */}
        <div className="w-full overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentEvent.year}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass-panel-glow p-6 sm:p-7 rounded-3xl border border-sky-400/30 w-full text-left shadow-2xl flex flex-col gap-3.5 relative"
            >
              {/* Event Header */}
              <div className="flex items-center justify-between border-b border-sky-400/20 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span className="text-xs text-sky-300 font-medium">{currentEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/70 border border-sky-400/30 px-2 py-0.5 rounded-full">
                    {currentEvent.year}
                  </span>
                </div>
              </div>

              {/* Event Title */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {currentEvent.title}
              </h3>

              {/* Photo Area */}
              {currentEvent.image && (
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-blue-950/50 border border-sky-400/25 relative flex items-center justify-center shadow-inner">
                  {!imgError ? (
                    <img
                      key={currentEvent.image}
                      src={getAssetUrl(currentEvent.image)}
                      alt={currentEvent.title}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center p-4">
                      <Camera className="w-7 h-7 text-sky-400 mb-1 animate-pulse" />
                      <span className="text-xs text-slate-300">Foto momen {currentEvent.year}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Story Description */}
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                {currentEvent.story}
              </p>

              {/* Caption */}
              <p className="text-xs text-sky-300 italic pt-2 border-t border-sky-400/10">
                "{currentEvent.caption}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {timelineEvents.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Buka slide ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              currentIndex === idx
                ? 'w-7 h-2 bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                : 'w-2 h-2 bg-blue-900/60 hover:bg-sky-400/50'
            }`}
          />
        ))}
      </div>

      {/* Dynamic Action Buttons */}
      <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-md">
        <div className="flex items-center justify-center gap-3 w-full">
          {!isFirstSlide && (
            <BirthdayButton
              onClick={handlePrev}
              variant="secondary"
              size="md"
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Sebelumnya
            </BirthdayButton>
          )}

          {!isLastSlide ? (
            <BirthdayButton
              onClick={handleNext}
              variant="glow"
              size="lg"
              className="flex-1"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Cerita Selanjutnya ({currentIndex + 2}/{totalSlides})
            </BirthdayButton>
          ) : (
            <BirthdayButton
              onClick={onNext}
              variant="glow"
              size="lg"
              className="flex-1"
              iconRight={<Sparkles className="w-4 h-4 text-sky-200" />}
            >
              Menuju Kejutan Terakhir 🎁
            </BirthdayButton>
          )}
        </div>

        {/* Optional Skip to Final Surprise if on slide 1 or 2 */}
        {!isLastSlide && (
          <button
            onClick={onNext}
            className="text-xs text-slate-400 hover:text-sky-300 transition underline decoration-dotted cursor-pointer pt-1"
          >
            Lewati langsung ke kejutan terakhir ❯
          </button>
        )}
      </div>
    </div>
  );
};
