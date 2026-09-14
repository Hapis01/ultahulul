import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ultah_journey_chapter';
const HIGHEST_UNLOCKED_KEY = 'ultah_journey_highest';

export const TOTAL_CHAPTERS = 14; // 0 to 13

export function useBirthdayProgress() {
  const [currentChapter, setCurrentChapter] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < TOTAL_CHAPTERS) {
          return parsed;
        }
      }
    } catch {
      // Local storage unavailable or error
    }
    return 0;
  });

  const [highestUnlocked, setHighestUnlocked] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(HIGHEST_UNLOCKED_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < TOTAL_CHAPTERS) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return 0;
  });

  // Keep highestUnlocked updated
  useEffect(() => {
    if (currentChapter > highestUnlocked) {
      setHighestUnlocked(currentChapter);
      try {
        localStorage.setItem(HIGHEST_UNLOCKED_KEY, currentChapter.toString());
      } catch {
        // ignore
      }
    }
    try {
      localStorage.setItem(STORAGE_KEY, currentChapter.toString());
    } catch {
      // ignore
    }
  }, [currentChapter, highestUnlocked]);

  const nextChapter = useCallback(() => {
    setCurrentChapter((prev) => {
      const next = Math.min(prev + 1, TOTAL_CHAPTERS - 1);
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const prevChapter = useCallback(() => {
    setCurrentChapter((prev) => {
      const p = Math.max(prev - 1, 0);
      return p;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToChapter = useCallback((targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < TOTAL_CHAPTERS) {
      setCurrentChapter(targetIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const resetProgress = useCallback(() => {
    setCurrentChapter(0);
    setHighestUnlocked(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(HIGHEST_UNLOCKED_KEY);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    currentChapter,
    highestUnlocked,
    totalChapters: TOTAL_CHAPTERS,
    nextChapter,
    prevChapter,
    goToChapter,
    resetProgress,
  };
}
