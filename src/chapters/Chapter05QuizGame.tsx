import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, CheckCircle2, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { quizQuestions, quizFeedbacks } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter05QuizGameProps {
  onNext: () => void;
}

export const Chapter05QuizGame: React.FC<Chapter05QuizGameProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = quizQuestions.length;
  const currentQ = quizQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing after pick
    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  // Find feedback for final score
  const feedback =
    quizFeedbacks.find((f) => score >= f.minScore && score <= f.maxScore) ||
    quizFeedbacks[quizFeedbacks.length - 1];

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full px-4 text-center">
      {/* Badge Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/25 text-xs text-sky-300 font-medium mb-2">
          <Gamepad2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Mini Game 1</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Tes kecil dulu.</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
          Seberapa yakin kamu kalau aku benar-benar memperhatikan kamu?
        </p>
      </motion.div>

      {/* Main Quiz Box */}
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-sky-400/30 w-full shadow-2xl"
          >
            {/* Progress counter */}
            <div className="flex items-center justify-between text-xs text-sky-300 font-mono mb-4 border-b border-sky-400/20 pb-2">
              <span>Pertanyaan {currentIndex + 1} / {totalQuestions}</span>
              <span>Skor Sementara: {score}</span>
            </div>

            {/* Question title */}
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isPicked = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let btnStyle = 'glass-panel border-sky-400/20 hover:border-sky-400/50 text-slate-200';

                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-400/60 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)]';
                  } else if (isPicked && !isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-400/60 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
                  } else {
                    btnStyle = 'opacity-50 glass-panel border-transparent text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm transition-all duration-300 flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {selectedOption !== null && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-3.5 rounded-2xl bg-blue-950/70 border border-sky-400/30 text-xs text-sky-200 text-left leading-relaxed"
              >
                <p className="font-semibold text-white mb-0.5">Catatan:</p>
                <p>{currentQ.sweetExplanation}</p>
              </motion.div>
            )}

            {/* Next button */}
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex justify-end"
              >
                <BirthdayButton
                  onClick={handleNextQuestion}
                  size="sm"
                  variant="primary"
                  iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {currentIndex < totalQuestions - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Tes'}
                </BirthdayButton>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Result Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-sky-400/30 w-full shadow-2xl flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-[0_0_25px_rgba(56,189,248,0.4)]">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-sky-300 font-mono">
              Skor Kamu: {score} dari {totalQuestions}
            </span>

            <h3 className="text-2xl font-serif font-bold text-white mt-2">
              {feedback.title}
            </h3>

            <p className="text-sm text-slate-200 mt-2 max-w-sm leading-relaxed">
              {feedback.message}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <button
                onClick={handleRestart}
                className="px-4 py-3 rounded-full glass-panel text-slate-300 hover:text-white border border-sky-400/20 text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Coba Lagi</span>
              </button>

              <BirthdayButton
                onClick={onNext}
                variant="glow"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Aku mau lihat kejutan berikutnya
              </BirthdayButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
