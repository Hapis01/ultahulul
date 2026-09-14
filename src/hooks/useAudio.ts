import { useState, useEffect, useRef, useCallback } from 'react';
import { musicConfig } from '../data/birthdayContent';

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.src = musicConfig.file;
    audio.preload = 'auto';
    audio.volume = volume;
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoaded(true);
      setHasError(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      // Loop the background song automatically
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current) return false;
    try {
      audioRef.current.muted = false;
      await audioRef.current.play();
      setIsPlaying(true);
      setIsMuted(false);
      setHasError(false);
      return true;
    } catch {
      // Autoplay blocked or file not found
      setIsPlaying(false);
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Smooth volume fade-in from 0 to target volume
  const fadeInPlay = useCallback(async (targetVol = 0.75, durationMs = 2000): Promise<boolean> => {
    if (!audioRef.current) return false;

    try {
      audioRef.current.volume = 0;
      audioRef.current.muted = false;
      await audioRef.current.play();
      setIsPlaying(true);
      setIsMuted(false);
      setHasError(false);
    } catch {
      // Browser blocked autoplay without interaction
      setIsPlaying(false);
      return false;
    }

    const steps = 20;
    const stepTime = durationMs / steps;
    const volStep = targetVol / steps;
    let currentVol = 0;

    return new Promise<boolean>((resolve) => {
      const interval = setInterval(() => {
        currentVol = Math.min(targetVol, currentVol + volStep);
        if (audioRef.current) {
          audioRef.current.volume = currentVol;
        }
        setVolumeState(currentVol);
        if (currentVol >= targetVol) {
          clearInterval(interval);
          resolve(true);
        }
      }, stepTime);
    });
  }, []);

  // AUTOMATIC PLAYBACK: Try immediate autoplay on access + seamless fallback on any first user gesture
  useEffect(() => {
    let hasPlayedSuccessfully = false;

    const eventNames = [
      'click',
      'touchstart',
      'touchend',
      'pointerdown',
      'keydown',
      'scroll',
      'wheel',
      'mousedown',
    ];

    const cleanupEvents = () => {
      eventNames.forEach((ev) => {
        window.removeEventListener(ev, handleUserInteraction);
        document.removeEventListener(ev, handleUserInteraction);
      });
    };

    const attemptPlay = async () => {
      if (hasPlayedSuccessfully) return;
      const success = await fadeInPlay(0.75, 1800);
      if (success) {
        hasPlayedSuccessfully = true;
        cleanupEvents();
      }
    };

    const handleUserInteraction = () => {
      if (!hasPlayedSuccessfully) {
        attemptPlay();
      }
    };

    // 1. Attempt immediate autoplay when page loads
    attemptPlay();

    // 2. Keep listening on window and document until the first gesture successfully starts audio
    eventNames.forEach((ev) => {
      window.addEventListener(ev, handleUserInteraction, { passive: true });
      document.addEventListener(ev, handleUserInteraction, { passive: true });
    });

    return () => {
      cleanupEvents();
    };
  }, [fadeInPlay]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((val: number) => {
    const safeVal = Math.max(0, Math.min(1, val));
    setVolumeState(safeVal);
    if (audioRef.current) {
      audioRef.current.volume = safeVal;
      if (safeVal === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.volume = volume > 0 ? volume : 0.5;
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    hasError,
    isLoaded,
    play,
    pause,
    togglePlay,
    fadeInPlay,
    seek,
    setVolume,
    toggleMute,
    title: musicConfig.title,
    artist: musicConfig.artist,
  };
}
