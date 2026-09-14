import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  chapterKey: number | string;
  className?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  chapterKey,
  className = '',
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chapterKey}
        initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 md:py-12 z-10 ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
