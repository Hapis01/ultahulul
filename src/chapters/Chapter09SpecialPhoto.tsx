import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowRight, Sparkles, Video } from 'lucide-react';
import { specialPhotoData } from '../data/birthdayContent';
import { BirthdayButton } from '../components/BirthdayButton';
import { getAssetUrl } from '../utils/assetUrl';

interface Chapter09SpecialPhotoProps {
  onNext: () => void;
}

export const Chapter09SpecialPhoto: React.FC<Chapter09SpecialPhotoProps> = ({ onNext }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVideo = specialPhotoData.image.match(/\.(mp4|webm|mov|ogg)$/i);

  // Ensure video plays continuously like a GIF once loaded
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [isRevealed]);

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full px-4 text-center">
      {/* Cinematic Preface */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 space-y-2"
      >
        <p className="text-sm sm:text-base text-slate-300 font-light tracking-wide">
          {specialPhotoData.prefaceLines[0]}
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sky-200 italic text-glow-blue">
          "{specialPhotoData.prefaceLines[1]}"
        </h2>
      </motion.div>

      {/* Cinematic Media Box - Dynamically adapts to video's natural dimensions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden glass-panel-glow border border-sky-400/30 shadow-2xl flex items-center justify-center bg-[#020817] p-2 sm:p-3"
      >
        {!mediaError ? (
          <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl">
            {isVideo ? (
              <motion.video
                ref={videoRef}
                src={getAssetUrl(specialPhotoData.image)}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                onError={() => setMediaError(true)}
                animate={{
                  filter: isRevealed ? 'blur(0px) brightness(1)' : 'blur(18px) brightness(0.4)',
                  scale: isRevealed ? 1 : 1.05,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-auto max-w-full max-h-[65vh] h-auto object-contain rounded-2xl select-none shadow-lg"
              />
            ) : (
              <motion.img
                src={getAssetUrl(specialPhotoData.image)}
                alt="Special Moment"
                onError={() => setMediaError(true)}
                animate={{
                  filter: isRevealed ? 'blur(0px) brightness(1)' : 'blur(18px) brightness(0.4)',
                  scale: isRevealed ? 1 : 1.05,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-auto max-w-full max-h-[65vh] h-auto object-contain rounded-2xl select-none"
              />
            )}

            {/* Dark overlay before reveal */}
            <motion.div
              animate={{ opacity: isRevealed ? 0 : 0.6 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-blue-950/60 pointer-events-none rounded-2xl"
            />

            {/* Floating prompt before reveal */}
            {!isRevealed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10"
              >
                <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <BirthdayButton
                  onClick={() => setIsRevealed(true)}
                  variant="glow"
                  size="md"
                  icon={<Eye className="w-4 h-4" />}
                >
                  {specialPhotoData.buttonText}
                </BirthdayButton>
              </motion.div>
            )}
          </div>
        ) : (
          /* High-aesthetic fallback when video isn't yet uploaded */
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center w-full min-h-[280px]">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-3 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <Video className="w-8 h-8" />
            </div>
            <p className="text-base font-serif text-white font-semibold">Video Kenangan (Auto-loop MP4)</p>
            <p className="text-xs text-sky-300/80 mt-1 max-w-xs leading-relaxed">
              Simpan file video di{' '}
              <code className="bg-sky-950 px-1.5 py-0.5 rounded text-[11px] font-mono text-sky-200">
                {specialPhotoData.image}
              </code>
            </p>
            <p className="text-[11px] text-slate-400 mt-2 italic">
              Video akan berulang otomatis tanpa henti (loop) layaknya GIF dengan rasio alami sesuai videomu!
            </p>
          </div>
        )}
      </motion.div>

      {/* Post Reveal Emotional Texts */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 space-y-2 max-w-md"
          >
            <p className="text-base sm:text-lg font-serif italic text-white">
              "{specialPhotoData.postRevealLines[0]}"
            </p>
            <p className="text-xs sm:text-sm text-slate-300">
              {specialPhotoData.postRevealLines[1]}
            </p>

            <div className="pt-6">
              <BirthdayButton
                onClick={onNext}
                variant="primary"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Buka surat kecil untukmu
              </BirthdayButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
