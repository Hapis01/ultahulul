import React from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, ArrowRight, Disc3 } from 'lucide-react';
import { musicConfig } from '../data/birthdayContent';
import { useAudio } from '../hooks/useAudio';
import { BirthdayButton } from '../components/BirthdayButton';

interface Chapter07MusicRevealProps {
  onNext: () => void;
  audioHook: ReturnType<typeof useAudio>;
}

export const Chapter07MusicReveal: React.FC<Chapter07MusicRevealProps> = ({ onNext, audioHook }) => {
  const { isPlaying, togglePlay, hasError } = audioHook;

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto w-full px-4 text-center">
      {/* Vinyl / Music Disc Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-8"
      >
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#020917] via-blue-950 to-sky-900 border-4 border-sky-400/30 flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.3)] relative">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full rounded-full flex items-center justify-center"
          >
            <Disc3 className="w-28 h-28 sm:w-36 sm:h-36 text-sky-400/70" />
          </motion.div>

          {/* Center glowing badge */}
          <div className="absolute w-12 h-12 rounded-full bg-blue-600 border border-sky-300 flex items-center justify-center shadow-lg">
            <Music className={`w-5 h-5 text-white ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>
        </div>
      </motion.div>

      {/* Header & Subtitle */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          Musik untuk Perjalanan Kecil Ini
        </h2>
        <p className="text-sm text-sky-200/90 font-medium">"{musicConfig.title}"</p>
        <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
          Nyalakan musik agar setiap halaman dan kenangan berikutnya terasa lebih hangat dan hidup.
        </p>
      </motion.div>

      {/* Play/Pause Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex flex-col items-center gap-3"
      >
        <BirthdayButton
          onClick={togglePlay}
          variant="glow"
          size="lg"
          icon={isPlaying ? <Pause className="w-5 h-5 text-sky-200" /> : <Play className="w-5 h-5 text-sky-200" />}
        >
          {isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        </BirthdayButton>

        {hasError && (
          <p className="text-xs text-amber-300/80 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-400/20">
            Music belum ditambahkan ke <code className="font-mono text-amber-200">{musicConfig.file}</code>. Kamu tetap bisa lanjut!
          </p>
        )}

        <p className="text-[11px] text-slate-400 max-w-xs mt-1">
          *Musik akan terus mengalun di pojok kanan atas selama kamu membuka kejutan selanjutnya.
        </p>
      </motion.div>

      {/* Next Step */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10"
      >
        <BirthdayButton
          onClick={onNext}
          variant="primary"
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          Lanjut ke cerita berikutnya
        </BirthdayButton>
      </motion.div>
    </div>
  );
};
