import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { S } from '../styles/styles';

export type OnboardingGoal = 'health' | 'sexual' | 'fitness';
export type OnboardingLevel = 'beginner' | 'intermediate' | 'advanced';

// Maps selections to recommended routine IDs
export const GOAL_ROUTINE: Record<OnboardingGoal, Record<OnboardingLevel, string>> = {
  health:   { beginner: 'starter',  intermediate: 'inter',    advanced: 'maintain' },
  sexual:   { beginner: 'starter',  intermediate: 'sexual',   advanced: 'sexual'   },
  fitness:  { beginner: 'inter',    intermediate: 'advanced', advanced: 'advanced' },
};

interface OnboardingScreenProps {
  onComplete: (goal: OnboardingGoal, level: OnboardingLevel, recommendedId: string) => void;
}

const SLIDES = [
  {
    emoji: '💪',
    title: 'Bienvenido a\nVitaKore',
    subtitle: 'El entrenamiento más importante\nque nunca hacías.',
    cta: 'Empezar',
  },
  {
    emoji: '🎯',
    title: '¿Cuál es tu\nobjetivo?',
    subtitle: 'Personalizamos tu programa\nsegún tu meta.',
    cta: null,
  },
  {
    emoji: '📊',
    title: '¿Cuánto\nejercias antes?',
    subtitle: 'Comenzamos desde donde tú estás.',
    cta: null,
  },
  {
    emoji: '🚀',
    title: '¡Todo listo!',
    subtitle: '',
    cta: 'Ir a mi rutina',
  },
];

const GOALS: { id: OnboardingGoal; emoji: string; label: string; desc: string }[] = [
  { id: 'health',  emoji: '🏥', label: 'Salud general',    desc: 'Fortalecer suelo pélvico, control urinario' },
  { id: 'sexual',  emoji: '❤️', label: 'Salud sexual',     desc: 'Mejor erección, control, mayor placer' },
  { id: 'fitness', emoji: '🔥', label: 'Rendimiento',      desc: 'Máxima potencia y resistencia muscular' },
];

const LEVELS: { id: OnboardingLevel; emoji: string; label: string; desc: string }[] = [
  { id: 'beginner',     emoji: '🌱', label: 'Primera vez',    desc: 'Nunca he entrenado el suelo pélvico' },
  { id: 'intermediate', emoji: '💪', label: 'Algo de base',   desc: 'Lo he intentado antes, con poca constancia' },
  { id: 'advanced',     emoji: '⚡', label: 'Entrenado',      desc: 'Practico regularmente, busco más' },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [dir,  setDir]  = useState(1);
  const [goal,  setGoal]  = useState<OnboardingGoal | null>(null);
  const [level, setLevel] = useState<OnboardingLevel | null>(null);

  function next(override?: number) {
    setDir(1);
    setStep(s => override ?? s + 1);
  }
  function back() {
    setDir(-1);
    setStep(s => s - 1);
  }

  function finish() {
    if (!goal || !level) return;
    onComplete(goal, level, GOAL_ROUTINE[goal][level]);
  }

  const recommendedId = goal && level ? GOAL_ROUTINE[goal][level] : null;
  const ROUTINE_NAMES: Record<string, string> = {
    starter:  '🌱 Inicio: 15 min Diarios',
    inter:    '💪 Intermedio: Control Total',
    advanced: '🔥 Avanzado: Potencia Máxima',
    maintain: '♾️ Mantenimiento Permanente',
    sexual:   '❤️ Salud Sexual',
  };

  return (
    <div style={{ ...S.app, justifyContent: 'space-between', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient blobs */}
      <div style={S.bg}><div style={S.b1} /><div style={S.b2} /><div style={S.b3} /></div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 7, justifyContent: 'center', paddingTop: 56, position: 'relative', zIndex: 2 }}>
        {SLIDES.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === step ? 22 : 7, background: i === step ? 'var(--color-primary)' : 'var(--text-muted)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{ height: 7, borderRadius: 4 }}
          />
        ))}
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >
            {/* Slide 0 — Welcome */}
            {step === 0 && (
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.1 }}
                  style={{ fontSize: 88, marginBottom: 24, display: 'block' }}
                >💪</motion.div>
                <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 34, fontWeight: 900, margin: '0 0 14px', lineHeight: 1.15, whiteSpace: 'pre-line', letterSpacing: -1 }}>
                  {'Bienvenido a\nVitaKore'}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.55, margin: '0 auto 32px', maxWidth: 300, whiteSpace: 'pre-line' }}>
                  {'El entrenamiento más importante\nque nunca hacías.'}
                </p>
                {/* Feature pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300, margin: '0 auto 32px' }}>
                  {[
                    { icon: '🎧', text: 'Audio y vibración en cada fase' },
                    { icon: '🏆', text: 'Sistema de logros y niveles' },
                    { icon: '📈', text: 'Progreso visual en tiempo real' },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '11px 14px' }}>
                      <span style={{ fontSize: 20 }}>{icon}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 1 — Goal selector */}
            {step === 1 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{ fontSize: 56, marginBottom: 14 }}>🎯</div>
                  <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 900, margin: '0 0 8px', letterSpacing: -0.5 }}>¿Cuál es tu objetivo?</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0 }}>Personalizamos tu programa según tu meta.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {GOALS.map((g, i) => (
                    <motion.button
                      key={g.id}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => { setGoal(g.id); next(); }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: goal === g.id ? 'var(--color-primary-dim)' : 'var(--bg-surface)',
                        border: `1px solid ${goal === g.id ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                        borderRadius: 18, padding: '16px 18px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                        boxShadow: goal === g.id ? '0 0 20px var(--color-primary-glow)' : 'none',
                        transition: 'box-shadow 0.3s',
                      }}
                    >
                      <span style={{ fontSize: 32 }}>{g.emoji}</span>
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-sans)' }}>{g.label}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 2 }}>{g.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 2 — Level selector */}
            {step === 2 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{ fontSize: 56, marginBottom: 14 }}>📊</div>
                  <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 900, margin: '0 0 8px', letterSpacing: -0.5 }}>¿Cuánto ejercitas?</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0 }}>Comenzamos desde donde tú estás.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {LEVELS.map((l, i) => (
                    <motion.button
                      key={l.id}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => { setLevel(l.id); next(); }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: level === l.id ? 'var(--color-primary-dim)' : 'var(--bg-surface)',
                        border: `1px solid ${level === l.id ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                        borderRadius: 18, padding: '16px 18px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                        boxShadow: level === l.id ? '0 0 20px var(--color-primary-glow)' : 'none',
                        transition: 'box-shadow 0.3s',
                      }}
                    >
                      <span style={{ fontSize: 32 }}>{l.emoji}</span>
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-sans)' }}>{l.label}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 2 }}>{l.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 3 — Ready */}
            {step === 3 && (
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0.4, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.1 }}
                  style={{ fontSize: 80, marginBottom: 20, display: 'block' }}
                >🚀</motion.div>
                <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 30, fontWeight: 900, margin: '0 0 10px', letterSpacing: -0.5 }}>¡Todo listo!</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, lineHeight: 1.55 }}>
                  Basado en tu perfil, te recomendamos empezar con:
                </p>
                {recommendedId && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 340, damping: 26 }}
                    style={{ ...S.hero, marginBottom: 28, textAlign: 'center', padding: '20px 24px' }}
                  >
                    <div style={{ fontSize: 40, marginBottom: 8 }}>
                      {recommendedId === 'starter' ? '🌱' : recommendedId === 'inter' ? '💪' : recommendedId === 'advanced' ? '🔥' : recommendedId === 'maintain' ? '♾️' : '❤️'}
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: 16, fontFamily: 'var(--font-sans)' }}>
                      {ROUTINE_NAMES[recommendedId]}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--color-primary-dim)', border: '1px solid var(--border-medium)', borderRadius: 20, padding: '4px 12px', marginTop: 10 }}>
                      <span style={{ color: 'var(--color-primary)', fontSize: 12, fontWeight: 600 }}>✓ Recomendada para ti</span>
                    </div>
                  </motion.div>
                )}
                {/* Summary chips */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
                  {goal && (
                    <span style={{ ...S.chip, fontSize: 12, padding: '5px 12px' }}>
                      {GOALS.find(g => g.id === goal)?.emoji} {GOALS.find(g => g.id === goal)?.label}
                    </span>
                  )}
                  {level && (
                    <span style={{ ...S.chip, fontSize: 12, padding: '5px 12px' }}>
                      {LEVELS.find(l => l.id === level)?.emoji} {LEVELS.find(l => l.id === level)?.label}
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom actions */}
      <div style={{ padding: '0 24px 44px', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Primary CTA (slides 0 and 3 only) */}
        {(step === 0 || step === 3) && (
          <motion.button
            style={{ ...S.btn, width: '100%', fontSize: 16, padding: '15px 24px', justifyContent: 'center' }}
            onClick={step === 0 ? () => next() : finish}
            whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {step === 0 ? 'Comenzar →' : '¡Ir a mi rutina! 🚀'}
          </motion.button>
        )}

        {/* Back button (slides 2+) */}
        {step >= 2 && (
          <motion.button
            onClick={back}
            whileTap={{ scale: 0.94 }}
            style={{ background: 'none', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '12px 24px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-sans)', width: '100%' }}
          >
            ← Volver
          </motion.button>
        )}

        {/* Skip (slide 0 only) */}
        {step === 0 && (
          <button
            onClick={finish}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-sans)', padding: '4px 0' }}
          >
            Saltar configuración
          </button>
        )}
      </div>
    </div>
  );
}
