import type { Routine } from '../data/routines';
import { EXERCISES } from '../data/exercises';
import { routineMinutes } from '../utils/helpers';
import { motion } from 'framer-motion';
import { FontLink } from './FontLink';
import { Figure } from './Figure';
import { I } from './Icons';
import { S } from '../styles/styles';

interface DayLog {
  routineId?: string;
  done?: boolean;
}

interface DetailScreenProps {
  r: Routine;
  onStart: () => void;
  onBack: () => void;
  todayLog: DayLog | null;
}

export function DetailScreen({ r, onStart, onBack, todayLog }: DetailScreenProps) {
  const mins = routineMinutes(r.exs);
  return (
    <div style={S.app}>
      <FontLink />
      <div style={S.bg}><div style={S.b1} /><div style={S.b2} /><div style={S.b3} /></div>
      <div style={{ ...S.hdr, background: 'rgba(0,0,0,0.5)' }}>
        <button style={S.bk} onClick={onBack}><I.back /></button>
        <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: 15, fontFamily: 'var(--font-sans)', fontWeight: 700 }}>{r.name}</h2>
        <div style={{ width: 40 }} />
      </div>
      <div style={S.scroll}>
        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30, delay: 0.06 }}
          style={{ ...S.gl, marginBottom: 13, borderTop: `3px solid ${r.color || '#00d4aa'}` }}
        >
          <div style={{ display: 'flex', gap: 11 }}>
            <span style={{ fontSize: 32 }}>{r.emoji}</span>
            <div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={{ ...S.badge, background: `${r.color}25`, color: r.color }}>{r.level}</span>
                <span style={S.badge}><I.clk />&nbsp;{mins} min</span>
                {r.weeks > 0 ? <span style={S.badge}>{r.weeks} semanas</span> : <span style={S.badge}>♾️ Permanente</span>}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 12.5, margin: 0, lineHeight: 1.45 }}>{r.desc}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}
        >Ejercicios</motion.div>

        {r.exs.map((ex, i) => {
          const ed = EXERCISES.find(e => e.id === ex.id);
          if (!ed) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30, delay: 0.18 + i * 0.07 }}
              style={{ ...S.gl, marginBottom: 11 }}
            >
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: 24, minWidth: 32 }}>{ed.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 700 }}>{ed.name}</span>
                    <div style={{ display: 'flex', gap: 1 }}>{[...Array(ed.diff)].map((_, j) => <span key={j}>{I.star(11)}</span>)}</div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: '3px 0 7px', lineHeight: 1.4 }}>{ed.desc}</p>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <span style={S.chip}>{ex.sets} series</span>
                    <span style={S.chip}>{ex.reps} reps</span>
                    <span style={S.chip}>{ex.hold}s hold</span>
                    <span style={S.chip}>{ex.rest}s rest</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--bg-tint)', borderRadius: 12, padding: '10px 0' }}>
                <Figure pos={ed.pos} phase="contract" size={150} />
              </div>
            </motion.div>
          );
        })}

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30, delay: 0.2 + r.exs.length * 0.07 }}
          whileTap={{ scale: 0.96 }}
          style={{ ...S.btn, width: '100%', marginTop: 11 }}
          onClick={onStart}
        >▶ Comenzar Rutina</motion.button>
        {todayLog?.routineId === r.id && (
          <div style={{ ...S.gl, marginTop: 9, borderColor: '#00d4aa44', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#00d4aa', display: 'flex' }}>{I.check(18)}</span>
            <span style={{ color: '#00d4aa', fontSize: 13 }}>Completado hoy</span>
          </div>
        )}
      </div>
    </div>
  );
}
