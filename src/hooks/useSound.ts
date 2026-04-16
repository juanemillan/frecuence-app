import { useRef } from 'react';

export function useSound() {
  const ctx = useRef<AudioContext | null>(null);

  const go = () => {
    if (!ctx.current) {
      ctx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return ctx.current;
  };

  const beep = (freq = 440, dur = 0.12, type: OscillatorType = 'sine', gain = 0.25, delay = 0) => {
    try {
      const c = go();
      const o = c.createOscillator();
      const g = c.createGain();
      o.connect(g);
      g.connect(c.destination);
      o.type = type;
      o.frequency.value = freq;
      const t = c.currentTime + delay;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(gain, t + 0.025);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.start(t);
      o.stop(t + dur + 0.06);
    } catch {}
  };

  return {
    contract: () => { beep(660, 0.14, 'sine', 0.28); beep(880, 0.1, 'sine', 0.18, 0.14); },
    rest:     () => { beep(440, 0.18, 'sine', 0.2); beep(330, 0.14, 'sine', 0.14, 0.18); },
    tick:     () => beep(900, 0.05, 'square', 0.08),
    lastTick: () => { beep(1050, 0.07, 'square', 0.14); beep(1300, 0.07, 'square', 0.14, 0.1); },
    complete: () => { [0, 0.14, 0.28, 0.46].forEach((d, i) => beep([523, 659, 784, 1047][i], 0.22, 'sine', 0.28, d)); },
    coin:     () => { beep(987, 0.08, 'sine', 0.28); beep(1318, 0.12, 'sine', 0.24, 0.09); },
    levelUp:  () => { [0, 0.12, 0.24, 0.38, 0.5].forEach((d, i) => beep([392, 494, 587, 698, 880][i], 0.18, 'sine', 0.24, d)); },
  };
}

export type SoundEngine = ReturnType<typeof useSound>;
