import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const ConfettiCelebration: React.FC = () => {
  useEffect(() => {
    // Custom blue-themed confetti burst
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#38bdf8', '#60a5fa', '#93c5fd', '#ffffff', '#fbbf24'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
};
