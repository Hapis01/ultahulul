import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Heart, Clock } from 'lucide-react';
import { birthdayConfig, countdownContent } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter02CountdownProps {
  onNext: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTodayOrPast: boolean;
}

export const Chapter02Countdown: React.FC<Chapter02CountdownProps> = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTodayOrPast: true,
  });

  const [counterValue, setCounterValue] = useState(0);

  useEffect(() => {
    const targetTimestamp = new Date(birthdayConfig.targetDateTime).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isTodayOrPast: true,
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isTodayOrPast: false,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth counter animation from 0 to age (20)
  useEffect(() => {
    let current = 0;
    const stepInterval = setInterval(() => {
      current++;
      setCounterValue(current);
      if (current >= birthdayConfig.age) {
        clearInterval(stepInterval);
      }
    }, 60);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto text-center px-4">
      {/* Date Pill Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-sky-300 flex items-center gap-2 border border-sky-400/30 mb-6"
      >
        <Calendar className="w-4 h-4 text-sky-400" />
        <span>{countdownContent.targetDateLabel}</span>
      </motion.div>

      {/* Main Title & Animated Age */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide leading-tight mb-2"
      >
        Happy <span className="text-sky-400 font-mono text-glow-blue">{counterValue}th</span> Birthday,
        <br />
        <span className="text-sky-200">{birthdayConfig.nickname}</span>
      </motion.h2>

      {/* Status: Today is your day vs Countdown */}
      {timeLeft.isTodayOrPast ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel-glow p-6 sm:p-8 rounded-3xl mt-6 border border-sky-400/30 max-w-md w-full"
        >
          <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <Heart className="w-6 h-6 text-sky-300 fill-sky-300/30 animate-pulse" />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white">
            {countdownContent.todayIsYourDayText}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            {countdownContent.todaySubtitle}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-3xl mt-6 border border-sky-400/25 max-w-md w-full"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-sky-300 mb-4 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{countdownContent.countdownSubtitle}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'Hari', val: timeLeft.days },
              { label: 'Jam', val: timeLeft.hours },
              { label: 'Menit', val: timeLeft.minutes },
              { label: 'Detik', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-blue-950/60 p-2.5 rounded-2xl border border-sky-400/20 flex flex-col"
              >
                <span className="text-xl sm:text-2xl font-mono font-bold text-sky-300">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Button to proceed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <BirthdayButton
          onClick={onNext}
          variant="primary"
          size="lg"
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          {countdownContent.nextButtonText}
        </BirthdayButton>
      </motion.div>
    </div>
  );
};
