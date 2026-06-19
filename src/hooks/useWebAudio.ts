"use client";

import { useEffect, useRef, useState } from "react";

export function useWebAudio() {
  // Start with isPlaying as true by default so it shows as active in the UI
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startMusic = async () => {
    if (!audioRef.current) return;

    try {
      // Create Web Audio context if not already done, for smooth crossfades and volume control
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Source node from audio element
        const source = ctx.createMediaElementSource(audioRef.current);
        const gainNode = ctx.createGain();
        
        gainNode.connect(ctx.destination);
        source.connect(gainNode);
        gainNodeRef.current = gainNode;
      }

      const ctx = audioCtxRef.current;
      const gainNode = gainNodeRef.current;

      // Resume context if suspended (browser security policy)
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Start playing the audio element
      isPlayingRef.current = true;
      setIsPlaying(true);
      await audioRef.current.play();

      // Smooth fade-in over 2.0 seconds to 0.15 volume (low and professional background level)
      if (gainNode) {
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2.0);
      }
    } catch (err) {
      console.warn("Autoplay block or playback error: will retry on first user interaction.", err);
      // Fallback: play directly through Audio element if Web Audio context fails
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.15;
          isPlayingRef.current = true;
          setIsPlaying(true);
          await audioRef.current.play();
        }
      } catch (fallbackErr) {
        // This is expected if browser blocks autoplay before user interaction
      }
    }
  };

  const stopMusic = () => {
    if (!audioRef.current) return;

    isPlayingRef.current = false;
    setIsPlaying(false);

    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;

    if (ctx && gainNode) {
      // Smooth fade-out over 0.8 seconds
      gainNode.gain.cancelScheduledValues(ctx.currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);

      setTimeout(() => {
        // Only pause if the user didn't hit play again during the fade-out
        if (audioRef.current && !isPlayingRef.current) { 
          audioRef.current.pause();
        }
      }, 850);
    } else {
      audioRef.current.pause();
    }
  };

  const toggleMusic = () => {
    if (isPlayingRef.current) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Initialize and handle autoplay
  useEffect(() => {
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0; // Hand over volume control to Web Audio GainNode
    audioRef.current = audio;

    // 1. Try to start music immediately (may be blocked by browser autoplay policy)
    startMusic();

    // 2. Setup one-time interaction listeners to trigger playback on first click/scroll/keypress
    const handleFirstInteraction = () => {
      if (isPlayingRef.current && audioRef.current && audioRef.current.paused) {
        startMusic();
      }
      // Remove listeners after first interaction
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("wheel", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("wheel", handleFirstInteraction);

    return () => {
      audio.pause();
      removeListeners();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return { isPlaying, toggleMusic };
}
