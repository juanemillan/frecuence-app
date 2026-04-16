import { motion } from 'framer-motion';
import type { Routine } from '../data/routines';
import { CATEGORY_META } from '../data/routines';
import type { LevelInfo } from '../utils/helpers';
import { routineMinutes } from '../utils/helpers';
import { ACHIEVEMENTS } from '../data/achievements';
import { I } from './Icons';
import { PelvicSVG } from './PelvicSVG';
import { S } from '../styles/styles';

interface RoutineCompletion {
  routineId: string;
  ids: string[];
  ts: number;
}

interface DayLog {
  completions?: RoutineCompletion[];
  // legacy
  routineId?: string;
  done?: boolean;
}

interface HomeTabProps {
  logs: Record<string, DayLog>;
  streak: number;
  totalDays: number;
  w7: number;
  allR: Routine[];
  myRoutines: Routine[];
  onSelect: (id: string) => void;
  onStart: (r: Routine) => void;
  todayLog: DayLog | null;
  lv: LevelInfo;
  coins: number;
  xp: number;
  unlocked: string[];
  recommendedId?: string | null;
}

function isRoutineDoneToday(r: Routine, todayLog: DayLog | null): boolean {
  if (!todayLog) return false;
  if (todayLog.completions?.some(c => c.routineId === r.id)) return true;
  if (todayLog.routineId === r.id && todayLog.done) return true;
  return false;
}

export function HomeTab({ logs, streak, totalDays, w7, myRoutines, onSelect, onStart, todayLog, lv, coins, xp, unlocked }: HomeTabProps) {
  const doneTodayCount = myRoutines.filter(r => isRoutineDoneToday(r, todayLog)).length;
  const allDoneToday = myRoutines.length > 0 && doneTodayCount === myRoutines.length;

  return (
    <>
      {/* Level card */}
      <div style={{ ...S.gl, marginBottom: 13, background: 'linear-gradient(135deg,rgba(251,191,36,0.1),rgba(244,114,182,0.07))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--grad-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, fontWeight: 900, color: '#080c14', fontFamily: 'var(--font-sans)', boxShadow: '0 0 20px rgba(251,191,36,0.4)', flexShrink: 0 }}>{lv.level}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: 12 }}>Nivel {lv.level}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{xp} XP</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginTop: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--grad-gold)', borderRadius: 4, width: `${lv.pct}%`, transition: 'width 1s' }} />
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
              {I.coins(12)} {coins} monedas · {unlocked.length}/{ACHIEVEMENTS.length} logros
            </div>
          </div>
        </div>
      </div>

      {/* ── Today's plan ──────────────────────────────────────────────────── */}
      <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.1, fontWeight: 600, marginBottom: 9 }}>
        Plan de hoy · {doneTodayCount}/{myRoutines.length} completadas
      </div>

      {allDoneToday ? (
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ ...S.gl, marginBottom: 13, borderColor: 'rgba(110,231,247,0.4)', background: 'var(--color-primary-dim)', display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <span style={{ fontSize: 30 }}>🎉</span>
          <div>
            <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 14 }}>¡Todo completado hoy!</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Completaste las {myRoutines.length} rutinas. ¡Excelente día!</div>
          </div>
        </motion.div>
      ) : (
        <div style={{ marginBottom: 13, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {myRoutines.map((r, idx) => {
            const done = isRoutineDoneToday(r, todayLog);
            const mins = routineMinutes(r.exs);
            const catMeta = CATEGORY_META[r.category];
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
                style={{
                  ...S.gl,
                  padding: '13px 14px',
                  borderColor: done ? `${r.color}44` : undefined,
                  opacity: done ? 0.72 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                {/* Colored side bar */}
                <div style={{ width: 4, height: 44, borderRadius: 4, background: done ? r.color : `${r.color}44`, flexShrink: 0 }} />
                <div style={{ fontSize: 24, flexShrink: 0 }}>{r.emoji}</div>
                <div onClick={() => onSelect(r.id)} style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 10, color: catMeta.color, fontWeight: 700 }}>{catMeta.emoji} {catMeta.label}</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{mins} min · {r.freq}</div>
                </div>
                {done ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: '50%', background: `${r.color}22`, color: r.color, flexShrink: 0 }}>
                    {I.check(16)}
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onStart(r)}
                    style={{ background: r.color, border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: 11, fontFamily: 'var(--font-sans)', padding: '7px 12px', cursor: 'pointer', flexShrink: 0, boxShadow: `0 4px 14px ${r.color}44` }}
                  >
                    ▶ Start
                  </motion.button>
                )}
              </motion.div>
            );
          })}

          {myRoutines.length === 0 && (
            <div style={{ ...S.gl, textAlign: 'center', padding: '24px 16px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Sin rutinas activas</div>
              <div style={{ fontSize: 12 }}>Ve a Biblioteca para agregar tus rutinas</div>
            </div>
          )}
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 13 }}>
        {[
          { l: 'Racha',  v: streak,    ic: () => I.flame(),    c: 'var(--color-accent)' },
          { l: 'Semana', v: w7,        ic: () => I.calendar(), c: 'var(--color-primary)' },
          { l: 'Total',  v: totalDays, ic: () => I.trophy(),   c: 'var(--color-gold)' },
        ].map(s => (
          <div key={s.l} style={{ ...S.gl, textAlign: 'center', padding: '12px 6px' }}>
            <div style={{ fontSize: 17, marginBottom: 3, display: 'flex', justifyContent: 'center', color: s.c }}>{s.ic()}</div>
            <div style={{ color: s.c, fontSize: 21, fontWeight: 800, fontFamily: 'var(--font-sans)' }}>{s.v}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* 7-day activity dots */}
      <div style={{ ...S.gl, marginBottom: 13 }}>
        <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 9, textTransform: 'uppercase', letterSpacing: 1 }}>Últimos 7 días</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[...Array(7)].map((_, i) => {
            const d = new Date(); d.setDate(d.getDate() - (6 - i));
            const k = d.toISOString().split('T')[0];
            const done = logs[k]?.done;
            const isT = i === 6;
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 9, marginBottom: 4 }}>
                  {d.toLocaleDateString('es-ES', { weekday: 'short' }).slice(0, 2).toUpperCase()}
                </div>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: done ? 'var(--grad-primary)' : isT ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)',
                  border: isT && !done ? '2px solid rgba(255,255,255,0.22)' : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto', boxShadow: done ? '0 0 10px rgba(110,231,247,0.3)' : 'none', transition: 'all 0.3s',
                }}>
                  {done ? I.check(13) : <span style={{ color: isT ? 'var(--text-secondary)' : 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>{d.getDate()}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Did you know */}
      <div style={S.gl}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ width: 88, flexShrink: 0 }}><PelvicSVG animated /></div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>¿Sabías que?</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: 0, lineHeight: 1.6 }}>
              El músculo <strong style={{ color: 'var(--color-primary)' }}>PC</strong> se puede entrenar en cualquier lugar. Nadie nota cuando lo haces. 10–15 min al día son suficientes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
