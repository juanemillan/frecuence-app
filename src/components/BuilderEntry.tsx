import type { Routine } from '../data/routines';
import { EXERCISES } from '../data/exercises';
import { Figure } from './Figure';
import { I } from './Icons';
import { S } from '../styles/styles';

interface BuilderEntryProps {
  onBuild: () => void;
  customR: Routine[];
  onSelect: (id: string) => void;
}

export function BuilderEntry({ onBuild, customR, onSelect }: BuilderEntryProps) {
  return (
    <>
      <div style={{ ...S.gl, marginBottom: 13, textAlign: 'center' }}>
        <div style={{ fontSize: 38, marginBottom: 7 }}>🛠️</div>
        <h3 style={{ color: 'var(--text-primary)', margin: '0 0 5px', fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>Crea tu rutina</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '0 0 13px', lineHeight: 1.5 }}>
          Selecciona ejercicios del catálogo y define tus series, reps y tiempos.
        </p>
        <button style={S.btn} onClick={onBuild}>+ Nueva Rutina</button>
      </div>

      {customR.length > 0 && (
        <>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 7 }}>Mis Rutinas</div>
          {customR.map(r => (
            <div key={r.id} style={{ ...S.gl, marginBottom: 9, cursor: 'pointer' }} onClick={() => onSelect(r.id)}>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 13 }}>{r.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>{r.exs.length} ejercicios</div>
            </div>
          ))}
        </>
      )}

      <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, margin: '13px 0 7px' }}>
        Catálogo de ejercicios
      </div>
      {EXERCISES.map(ex => (
        <div key={ex.id} style={{ ...S.gl, marginBottom: 9 }}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 9 }}>
            <span style={{ fontSize: 22 }}>{ex.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 13 }}>{ex.name}</span>
                <div style={{ display: 'flex', gap: 1 }}>{[...Array(ex.diff)].map((_, j) => <span key={j}>{I.star(10)}</span>)}</div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 11, margin: '3px 0 6px', lineHeight: 1.4 }}>{ex.desc}</p>
              <span style={S.chip}>{ex.benefit}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--bg-tint)', borderRadius: 11, padding: '8px 0' }}>
            <Figure pos={ex.pos} phase="contract" size={110} />
          </div>
        </div>
      ))}
    </>
  );
}
