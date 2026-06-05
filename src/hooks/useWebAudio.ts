"use client";

import { useEffect, useRef, useState } from "react";

export function useWebAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  // Function to create a spacey pad chord
  const startSynth = () => {
    if (audioCtxRef.current) return;

    // Create audio context
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Main volume gain
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0, ctx.currentTime);
    // Smooth ramp in to prevent clicks
    mainGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.0);
    mainGain.connect(ctx.destination);
    mainGainRef.current = mainGain;

    // Lowpass filter for the cyber warmth
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);
    filter.connect(mainGain);

    // Filter LFO to make it "breathe"
    const filterLFO = ctx.createOscillator();
    filterLFO.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow: 1 cycle per ~12s
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(200, ctx.currentTime);
    filterLFO.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    filterLFO.start();
    oscillatorsRef.current.push(filterLFO);

    // Create 3 basic nodes for minor/major chord progression
    const freqs = [110, 165, 220, 330]; // A2, E3, A3, E4 base chord
    const oscillators = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      // Alternating waveforms for rich harmonics
      osc.type = i % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.02, ctx.currentTime);
      
      // Slow pan effect
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner) {
        panner.pan.setValueAtTime(i % 2 === 0 ? -0.5 : 0.5, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(panner);
        panner.connect(filter);
      } else {
        osc.connect(oscGain);
        oscGain.connect(filter);
      }

      osc.start();
      return osc;
    });

    oscillatorsRef.current.push(...oscillators);

    // Telemetry scan beep function (simulates radar scanner)
    const playTelemetryPulse = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;
      const now = audioCtxRef.current.currentTime;
      
      // Pitch sweeps
      const osc = audioCtxRef.current.createOscillator();
      const gainNode = audioCtxRef.current.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 1.2);
      
      gainNode.gain.setValueAtTime(0.005, now);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);
      
      osc.connect(gainNode);
      gainNode.connect(mainGain);
      osc.start();
      osc.stop(now + 1.3);
    };

    // Synthesized chord sequence: shifts harmonies over time
    let step = 0;
    const chords = [
      [110, 165, 220, 330], // Am (A, E, A, E)
      [116.54, 174.61, 233.08, 349.23], // A# / Bb (Bb, F, Bb, F)
      [98, 146.83, 196, 293.66], // G (G, D, G, D)
      [110, 165, 220, 329.63] // Am
    ];

    const chordInterval = setInterval(() => {
      if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;
      step = (step + 1) % chords.length;
      const nextChord = chords[step];
      const now = audioCtxRef.current.currentTime;
      
      // Map base oscillators to new frequencies smoothly
      oscillators.forEach((osc, idx) => {
        if (nextChord[idx]) {
          osc.frequency.exponentialRampToValueAtTime(nextChord[idx], now + 2.0);
        }
      });

      // Play telemetry sound on transition
      if (Math.random() > 0.4) {
        playTelemetryPulse();
      }
    }, 8000);

    intervalsRef.current.push(chordInterval);

    // Initial pulse
    playTelemetryPulse();
  };

  const stopSynth = () => {
    if (mainGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      mainGainRef.current.gain.cancelScheduledValues(now);
      mainGainRef.current.gain.setValueAtTime(mainGainRef.current.gain.value, now);
      mainGainRef.current.gain.linearRampToValueAtTime(0, now + 0.5);

      setTimeout(() => {
        intervalsRef.current.forEach(clearInterval);
        intervalsRef.current = [];
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch { /* ignore */ }
        });
        oscillatorsRef.current = [];
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
        audioCtxRef.current = null;
        mainGainRef.current = null;
      }, 600);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch { /* ignore */ }
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return { isPlaying, toggleMusic };
}
