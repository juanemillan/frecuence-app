import type { Routine } from '../data/routines';
import { routineMinutes } from '../utils/helpers';
import { I } from './Icons';
import { S } from '../styles/styles';

interface DayLog {
  routineId?: string;
  done?: boolean;
}

interface RoutinesTabProps {
  allR: Routine[];
  onSelect: (id: string) => void;
  onBuild: () => void;
  todayLog: DayLog | null;
}

export function RoutinesTab({ allR, onSelect, onBuild, todayLog }: RoutinesTabProps) {
  return (
    <>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '0 0 13px', lineHeight: 1.5 }}>
        Elige un programa de 4 semanas o crea el tuyo propio.
      </p>
      {allR.map((r, idx) => {
        const mins = routineMinutes(r.exs);
        const done = todayLog?.routineId === r.id && todayLog?.done;
        return (
          <div key={r.id} className="anim-in" style={{ ...S.gl, marginBottom: 11, cursor: 'pointer', borderColor: done ? '#00d4aa44' : undefined, animationDelay: `${idx * 0.05}s` }} onClick={() => onSelect(r.id)}>
            <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 28, minWidth: 40, textAlign: 'center' }}>{r.emoji || '📋'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-sans)' }}>{r.name}</div>
                  {done && <span style={{ color: '#00d4aa', fontSize: 15 }}>✓</span>}
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', margin: '5px 0' }}>
                  <span style={{ ...S.badge, background: `${r.color || '#00d4aa'}22`, color: r.color || '#00d4aa' }}>{r.level}</span>
                  <span style={S.badge}><I.clk />&nbsp;{mins} min</span>
                  {r.weeks > 0 ? <span style={S.badge}>{r.weeks} sem.</span> : <span style={S.badge}>♾️ Permanente</span>}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: 0, lineHeight: 1.4 }}>{r.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
      <button style={{ ...S.gl, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 15, cursor: 'pointer', border: '1px dashed var(--border-faint)', width: '100%', marginTop: 5, color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-sans)', background: 'var(--bg-tint)' }} onClick={onBuild}>
        <I.plus /> Crear mi propia rutina
      </button>
    </>
  );
}
