import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, MapPin, Sparkles } from 'lucide-react';
import type { MemoryItem } from '../types/birthday';

interface MemoryCardProps {
  memory: MemoryItem;
  index: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-panel-glow rounded-3xl overflow-hidden border border-sky-400/25 max-w-lg w-full mx-auto shadow-2xl flex flex-col"
    >
      {/* Photo Container */}
      <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-blue-950/80 to-[#030b1e] overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <>
            {/* Blur backdrop while loading */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-950/60 backdrop-blur-md">
                <Sparkles className="w-8 h-8 text-sky-400 animate-pulse" />
              </div>
            )}
            <motion.img
              src={memory.image}
              alt={memory.title}
              onLoad={() => setIsLoaded(true)}
              onError={() => setImgError(true)}
              initial={{ filter: 'blur(10px)', scale: 1.05 }}
              animate={{
                filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
                scale: isLoaded ? 1 : 1.05,
              }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover select-none"
              loading="lazy"
            />
          </>
        ) : (
          /* High-aesthetic elegant fallback card when image hasn't been uploaded yet */
          <div className="flex flex-col items-center justify-center text-center p-8 w-full h-full bg-gradient-to-br from-blue-950/90 via-slate-900/80 to-[#030b1e] border-b border-sky-500/20">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-3 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <Camera className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-slate-200">Foto akan muncul di sini</p>
            <p className="text-xs text-sky-300/80 mt-1 max-w-xs">
              Simpan file di <code className="bg-sky-950/80 px-1.5 py-0.5 rounded text-[11px] font-mono">{memory.image}</code>
            </p>
          </div>
        )}

        {/* Date Pill Tag */}
        <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full text-xs font-medium text-sky-200 flex items-center gap-1.5 border border-sky-400/30 shadow-md">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          <span>{memory.date}</span>
        </div>

        {/* Location Pill (optional) */}
        {memory.location && (
          <div className="absolute bottom-4 left-4 glass-panel px-3 py-1 rounded-full text-xs text-slate-200 flex items-center gap-1.5 border border-sky-400/20">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{memory.location}</span>
          </div>
        )}
      </div>

      {/* Caption & Story Body */}
      <div className="p-6 flex flex-col gap-2.5">
        <h3 className="text-lg md:text-xl font-serif font-bold text-white tracking-wide">
          {memory.title}
        </h3>
        <p className="text-sm text-sky-200/90 leading-relaxed italic">
          "{memory.caption}"
        </p>
        {memory.story && (
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mt-1 pt-2 border-t border-blue-900/40">
            {memory.story}
          </p>
        )}
      </div>
    </motion.div>
  );
};
