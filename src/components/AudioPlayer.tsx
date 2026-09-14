import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface AudioPlayerProps {
  audioHook: ReturnType<typeof useAudio>;
  isVisible?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioHook, isVisible = true }) => {
  if (!isVisible) return null;
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    hasError,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    title,
  } = audioHook;

  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {/* Mini Toggle Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-full p-1.5 pr-3 flex items-center gap-2 shadow-lg shadow-black/30 border border-sky-400/25"
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-900/40 hover:scale-105 transition cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Dancing Wave / Music Title */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="flex items-end gap-0.5 h-3.5 px-0.5">
            <span
              className={`w-0.5 bg-sky-400 rounded-full transition-all duration-300 ${
                isPlaying ? 'h-3.5 animate-pulse' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-blue-400 rounded-full transition-all duration-300 ${
                isPlaying ? 'h-2.5 animate-pulse' : 'h-1.5'
              }`}
              style={{ animationDelay: '0.2s' }}
            />
            <span
              className={`w-0.5 bg-sky-300 rounded-full transition-all duration-300 ${
                isPlaying ? 'h-4 animate-pulse' : 'h-1'
              }`}
              style={{ animationDelay: '0.4s' }}
            />
          </div>

          <span className="text-xs font-medium text-slate-200 max-w-[100px] sm:max-w-[140px] truncate group-hover:text-sky-300 transition">
            {title}
          </span>

          <span className="text-slate-400 group-hover:text-white transition">
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </div>
      </motion.div>

      {/* Expanded Control Box */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass-panel-glow w-72 sm:w-80 mt-2 p-4 rounded-2xl shadow-2xl border border-sky-400/30 flex flex-col gap-3"
          >
            {/* Header / Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-sky-400 animate-spin-slow" />
                <span className="text-xs text-sky-200 font-medium">Latar Musik</span>
              </div>
              {hasError ? (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-300/90">
                  <AlertCircle className="w-3 h-3" /> File belum ada
                </span>
              ) : (
                <span className="text-[11px] text-slate-400 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              )}
            </div>

            {/* Error / Placeholder Notice */}
            {hasError && (
              <div className="p-2.5 bg-blue-950/70 border border-sky-400/20 rounded-xl text-[11px] text-slate-300 leading-relaxed">
                Music belum ditambahkan. Masukkan file lagu ke{' '}
                <code className="text-sky-300 bg-sky-950/60 px-1 py-0.5 rounded">
                  /public/music/birthday.mp3
                </code>{' '}
                kapan saja untuk memutar lagumu!
              </div>
            )}

            {/* Scrubber Bar */}
            {!hasError && (
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => seek(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-blue-950/90 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
                <div className="w-full bg-blue-900/30 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Controls (Play, Volume) */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="px-3 py-1.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer border border-sky-500/30"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3" /> Jeda
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" /> Putar
                    </>
                  )}
                </button>
              </div>

              {/* Volume Slider & Mute */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  aria-label="Toggle mute"
                  className="text-slate-400 hover:text-sky-300 transition cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-blue-950 rounded appearance-none cursor-pointer accent-sky-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
