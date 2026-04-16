import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SoundEngine } from '../hooks/useSound';
import { EXERCISES } from '../data/exercises';
import { FontLink } from './FontLink';
import { Figure } from './Figure';
import { Ring } from './Ring';
import { I } from './Icons';
import { S } from '../styles/styles';
import type { Routine } from '../data/routines';

// ─── Haptic patterns ─────────────────────────────────────────────────────────
const HAP = {
  contract: [40, 30, 60],
  rest:     [80],
  between:  [20],
  complete: [60, 40, 60, 40, 100],
  tick:     [10],
};

function vibrate(pattern: number[]) {
  try { navigator.vibrate?.(pattern); } catch {}
}

// ─── Phase config ─────────────────────────────────────────────────────────────
const phaseConfig = {
  ready:    { color: 'var(--color-primary)', colorRaw: '#6ee7f7', bg: 'rgba(110,231,247,0.04)', label: 'LISTO', labelColor: 'var(--color-primary)' },
  contract: { color: 'var(--color-primary)', colorRaw: '#6ee7f7', bg: 'rgba(110,231,247,0.09)', label: 'CONTRAE', labelColor: 'var(--color-primary)' },
  rest:     { color: 'var(--color-accent)',  colorRaw: '#f472b6', bg: 'rgba(244,114,182,0.07)', label: 'DESCANSA', labelColor: 'var(--color-accent)' },
  between:  { color: '#818cf8',              colorRaw: '#818cf8', bg: 'rgba(129,140,248,0.07)', label: 'PAUSA', labelColor: '#818cf8' },
  done:     { color: 'var(--color-gold)',    colorRaw: '#fbbf24', bg: 'rgba(251,191,36,0.07)',  label: '¡LISTO!', labelColor: 'var(--color-gold)' },
};

interface WorkoutScreenProps {
  r: Routine;
  snd: SoundEngine;
  onDone: (ids: string[], e?: React.MouseEvent) => void;
  onExit: () => void;
}

export function WorkoutScreen({ r, snd, onDone, onExit }: WorkoutScreenProps) {
  const [ci, setCi]   = useState(0);             // current exercise index
  const [cs, setCs]   = useState(1);             // current set
  const [ph, setPh]   = useState<'ready' | 'contract' | 'rest' | 'between' | 'done'>('ready');
  const [tm, setTm]   = useState(0);             // timer countdown
  const [run, setRun] = useState(false);
  const [done, setDone] = useState<string[]>([]); // completed exercise ids
  const [fp, setFp]   = useState<'rest' | 'contract'>('rest'); // figure phase

  const ex = r.exs[ci];
  const exDef = EXERCISES.find(e => e.id === ex?.id);
  const cfg = phaseConfig[ph];

  // Total reps across all exercises × sets (for progress bar)
  const totalReps = r.exs.reduce((a, e) => a + e.sets * e.reps, 0);
  const doneReps  = r.exs.slice(0, ci).reduce((a, e) => a + e.sets * e.reps, 0)
                  + (cs - 1) * (ex?.reps ?? 0);
  const progressPct = totalReps > 0 ? Math.round((doneReps / totalReps) * 100) : 0;

  // ─── Timer tick ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!run || ph === 'ready' || ph === 'done') return;
    if (tm <= 0) return;
    const id = setInterval(() => {
      setTm(t => {
        if (t <= 1) { clearInterval(id); return 0; }
        if (t <= 4) { snd.tick(); vibrate(HAP.tick); }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [run, ph, tm, snd]);

  // ─── Phase transitions ────────────────────────────────────────────────────
  const advance = useCallback(() => {
    if (!ex) return;
    if (ph === 'contract') {
      // go to rest
      snd.rest(); vibrate(HAP.rest);
      setPh('rest'); setTm(ex.rest); setFp('rest');
    } else if (ph === 'rest') {
      if (cs < ex.sets) {
        // next set
        snd.contract(); vibrate(HAP.contract);
        setCs(s => s + 1); setPh('contract'); setTm(ex.hold); setFp('contract');
      } else {
        // exercise done
        const newDone = [...done, ex.id];
        setDone(newDone);
        if (ci + 1 < r.exs.length) {
          // between exercises
          vibrate(HAP.between);
          const nextEx = r.exs[ci + 1];
          setCi(c => c + 1); setCs(1);
          setPh('between'); setTm(nextEx.rest); setFp('rest');
        } else {
          // workout done
          snd.complete(); vibrate(HAP.complete);
          setPh('done');
        }
      }
    } else if (ph === 'between') {
      snd.contract(); vibrate(HAP.contract);
      setPh('contract'); setTm(r.exs[ci].hold); setFp('contract');
    }
  }, [ph, cs, ci, ex, done, r.exs, snd]);

  useEffect(() => {
    if (tm === 0 && run && ph !== 'ready' && ph !== 'done') advance();
  }, [tm, run, ph, advance]);

  const handleStart = () => {
    snd.contract(); vibrate(HAP.contract);
    setPh('contract'); setTm(ex?.hold ?? 5); setRun(true); setFp('contract');
  };

  const handleToggle = () => setRun(r => !r);

  const handleSkip = () => {
    setTm(0);
    setRun(true);
  };

  const ringPct = ph === 'ready' ? 0
    : ph === 'done'    ? 100
    : tm === 0         ? 0
    : ph === 'contract' ? Math.round((tm / (ex?.hold ?? 1)) * 100)
    : ph === 'rest'     ? Math.round((tm / (ex?.rest ?? 1)) * 100)
    :                     Math.round((tm / (ex?.rest ?? 1)) * 100);

  const nextEx = ci + 1 < r.exs.length ? r.exs[ci + 1] : null;
  const nextExDef = nextEx ? EXERCISES.find(e => e.id === nextEx.id) : null;

  // ─── Done screen ──────────────────────────────────────────────────────────
  if (ph === 'done') {
    return (
      <div style={{ ...S.app, justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}>
        <FontLink />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', width: '100%' }}>
          <motion.div
            initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            style={{ fontSize: 72, marginBottom: 12 }}
          >🏆</motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ color: 'var(--color-gold)', fontSize: 28, fontFamily: "'Outfit',sans-serif", fontWeight: 900, margin: '0 0 6px', letterSpacing: -0.5 }}
          >¡Rutina Completa!</motion.h2>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ color: 'var(--text-secondary)', fontSize: 14, margin: '0 0 28px' }}
          >{r.name}</motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
            {[
              { label: 'Ejercicios', value: done.length, icon: '💪' },
              { label: 'Series', value: r.exs.reduce((a, e) => a + e.sets, 0), icon: '🔄' },
              { label: '+XP', value: done.length * 10, icon: '⚡' },
              { label: 'Monedas', value: done.length * 5, icon: '🪙' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 220, damping: 18 }}
                style={{ ...S.gl, textAlign: 'center', padding: '16px 10px' }}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ color: 'var(--color-primary)', fontSize: 24, fontWeight: 900, fontFamily: "'Outfit',sans-serif" }}>{s.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            whileTap={{ scale: 0.96 }}
            style={{ ...S.btn, width: '100%', fontSize: 15, padding: '14px 22px' }}
            onClick={e => onDone(done, e)}
          >Ver resultados →</motion.button>
        </motion.div>
      </div>
    );
  }

  // ─── Main workout screen ──────────────────────────────────────────────────
  return (
    <div style={{ ...S.app, position: 'relative' }}>
      <FontLink />

      {/* Ambient phase background */}
      <motion.div
        animate={{ background: `radial-gradient(ellipse at 50% 30%, ${cfg.colorRaw}18 0%, transparent 70%)` }}
        transition={{ duration: 0.6 }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Header */}
      <div style={{ ...S.hdr, zIndex: 10 }}>
        <motion.button whileTap={{ scale: 0.9 }} style={S.bk} onClick={onExit}>
          {I.back()}
        </motion.button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 13, fontFamily: "'Outfit',sans-serif" }}>{r.name}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>
            Ejercicio {ci + 1} de {r.exs.length}
          </div>
        </div>
        <div style={{ ...S.badge, fontSize: 12, padding: '4px 10px' }}>
          S {cs}/{ex?.sets ?? 1}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', position: 'relative', zIndex: 10 }}>
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'var(--grad-primary)', borderRadius: 2 }}
        />
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 20px 100px', position: 'relative', zIndex: 1 }}>

        {/* Exercise name */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`name-${ci}`}
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28 }}
            style={{ textAlign: 'center', marginBottom: 20 }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{exDef?.icon ?? '💪'}</div>
            <h2 style={{ color: 'var(--text-primary)', fontSize: 18, fontFamily: "'Outfit',sans-serif", fontWeight: 800, margin: 0, letterSpacing: -0.2 }}>
              {exDef?.name ?? ex?.id}
            </h2>
            {exDef?.muscle && (
              <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>{exDef.muscle}</div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Figure + Ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
          <motion.div
            animate={{
              boxShadow: `0 0 ${ph === 'contract' ? 28 : 10}px ${cfg.colorRaw}60`,
              borderColor: cfg.colorRaw,
            }}
            transition={{ duration: 0.5 }}
            style={{ borderRadius: 16, border: '2px solid', overflow: 'hidden', flexShrink: 0 }}
          >
            <Figure pos={exDef?.pos ?? 'seated'} phase={fp} size={130} />
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <Ring pct={ringPct} size={118} stroke={9} color={cfg.colorRaw} label={String(tm)} sub={ph === 'ready' ? 'seg' : ph === 'between' ? 'pausa' : ph === 'contract' ? 'contrae' : 'descanso'} />

            {/* Phase label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`phase-${ph}`}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.22 }}
                style={{ color: cfg.labelColor, fontSize: 12, fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase' }}
              >
                {cfg.label}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { l: 'Serie', v: `${cs}/${ex?.sets}` },
            { l: 'Reps', v: ex?.reps },
            { l: 'Hold', v: `${ex?.hold}s` },
            { l: 'Rest', v: `${ex?.rest}s` },
          ].map(p => (
            <div key={p.l} style={{ ...S.badge, flexDirection: 'column', gap: 0, padding: '6px 12px', textAlign: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 }}>{p.l}</span>
              <span style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 800, fontFamily: "'Outfit',sans-serif" }}>{p.v}</span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {ph === 'ready' ? (
            <motion.button whileTap={{ scale: 0.94 }} style={{ ...S.btn, fontSize: 15, padding: '14px 36px' }} onClick={handleStart}>
              {I.playBtn()} Comenzar
            </motion.button>
          ) : (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                style={{ ...S.bk, width: 48, height: 48 }}
                onClick={handleSkip}
                aria-label="Saltar"
              >
                {I.skip(16)}
              </motion.button>

              <AnimatePresence mode="wait">
                {run ? (
                  <motion.button
                    key="pause"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                    whileTap={{ scale: 0.94 }}
                    style={{ ...S.btn, width: 64, height: 64, borderRadius: '50%', padding: 0 }}
                    onClick={handleToggle}
                    aria-label="Pausar"
                  >
                    {I.pause()}
                  </motion.button>
                ) : (
                  <motion.button
                    key="play"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                    whileTap={{ scale: 0.94 }}
                    style={{ ...S.btn, width: 64, height: 64, borderRadius: '50%', padding: 0 }}
                    onClick={handleToggle}
                    aria-label="Reanudar"
                  >
                    {I.playBtn()}
                  </motion.button>
                )}
              </AnimatePresence>

              <div style={{ width: 48 }} />
            </>
          )}
        </div>

        {/* Next up card */}
        {nextExDef && ph !== 'ready' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ ...S.gl, width: '100%', marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ fontSize: 20 }}>{nextExDef.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Siguiente</div>
              <div style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700 }}>{nextExDef.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{nextEx?.sets} series · {nextEx?.reps} reps · {nextEx?.hold}s</div>
            </div>
            <div style={{ color: 'var(--text-muted)' }}>{I.chevronRight(14)}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
