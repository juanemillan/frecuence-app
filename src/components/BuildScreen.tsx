import type { Routine, RoutineExercise } from '../data/routines';
import { EXERCISES } from '../data/exercises';
import { routineMinutes } from '../utils/helpers';
import { FontLink } from './FontLink';
import { I } from './Icons';
import { S } from '../styles/styles';

interface NewRoutine {
  name: string;
  exs: RoutineExercise[];
}

interface BuildScreenProps {
  nr: NewRoutine;
  setNr: React.Dispatch<React.SetStateAction<NewRoutine>>;
  onSave: (r: Routine) => void;
  onCancel: () => void;
}

export function BuildScreen({ nr, setNr, onSave, onCancel }: BuildScreenProps) {
  const add = (id: string) => {
    const e = EXERCISES.find(x => x.id === id);
    if (!e) return;
    setNr(p => ({ ...p, exs: [...p.exs, { id, sets: e.sets, reps: e.reps, hold: e.hold, rest: e.rest }] }));
  };
  const rm = (i: number) => setNr(p => ({ ...p, exs: p.exs.filter((_, j) => j !== i) }));
  const upd = (i: number, f: keyof RoutineExercise, v: string) => setNr(p => {
    const e = [...p.exs];
    e[i] = { ...e[i], [f]: Number(v) };
    return { ...p, exs: e };
  });
  const save = () => {
    if (!nr.name.trim() || !nr.exs.length) return;
    onSave({
      id: `c_${Date.now()}`,
      name: nr.name,
      emoji: '📋',
      duration: routineMinutes(nr.exs),
      level: 'Personalizado',
      freq: 'A tu ritmo',
      desc: 'Rutina personalizada.',
      weeks: 0,
      color: '#f7b731',
      exs: nr.exs,
    });
  };

  return (
    <div style={S.app}>
      <FontLink />
      <div style={S.bg}><div style={S.b1} /><div style={S.b2} /><div style={S.b3} /></div>
      <div style={{ ...S.hdr, background: 'rgba(0,0,0,0.5)' }}>
        <button style={S.bk} onClick={onCancel}><I.back /></button>
        <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: 15, fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>Crear Rutina</h2>
        <div style={{ width: 40 }} />
      </div>
      <div className="anim-in" style={S.scroll}>
        {/* Name input */}
        <div style={{ ...S.gl, marginBottom: 13 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 7, textTransform: 'uppercase', letterSpacing: 1 }}>Nombre</div>
          <input
            value={nr.name}
            onChange={e => setNr(p => ({ ...p, name: e.target.value }))}
            placeholder="Ej: Mi rutina matutina..."
            style={S.inp}
          />
        </div>

        {/* Added exercises */}
        {nr.exs.length > 0 && (
          <>
            <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 7 }}>Ejercicios agregados</div>
            {nr.exs.map((ex, i) => {
              const ed = EXERCISES.find(e => e.id === ex.id);
              return (
                <div key={i} style={{ ...S.gl, marginBottom: 9 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                    <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                      <span style={{ fontSize: 19 }}>{ed?.icon}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 13 }}>{ed?.name}</span>
                    </div>
                    <button onClick={() => rm(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-accent)', padding: 3 }}><I.trash /></button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 7 }}>
                    {([{ l: 'Series', f: 'sets' }, { l: 'Reps', f: 'reps' }, { l: 'Hold(s)', f: 'hold' }, { l: 'Rest(s)', f: 'rest' }] as { l: string, f: keyof RoutineExercise }[]).map(({ l, f }) => (
                      <div key={String(f)} style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: 10, marginBottom: 3 }}>{l}</div>
                        <input
                          type="number"
                          min={1}
                          value={ex[f]}
                          onChange={e => upd(i, f, e.target.value)}
                          style={{ ...S.inp, padding: '5px 3px', textAlign: 'center', fontSize: 14, fontWeight: 700 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Catalog */}
        <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, margin: '13px 0 7px' }}>Agregar ejercicios</div>
        {EXERCISES.map(ex => {
          const already = nr.exs.some(e => e.id === ex.id);
          return (
            <div key={ex.id} style={{ ...S.gl, marginBottom: 7, display: 'flex', gap: 9, alignItems: 'center', opacity: already ? 0.48 : 1 }}>
              <span style={{ fontSize: 21 }}>{ex.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 600 }}>{ex.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{ex.benefit}</div>
              </div>
              <button onClick={() => !already && add(ex.id)} style={{ ...S.btn, padding: '5px 11px', fontSize: 11, opacity: already ? 0.4 : 1 }}>
                {already ? '✓' : '+ Add'}
              </button>
            </div>
          );
        })}

        <button style={{ ...S.btn, marginTop: 13, opacity: (!nr.name.trim() || !nr.exs.length) ? 0.38 : 1 }} onClick={save}>
          Guardar Rutina ✓
        </button>
      </div>
    </div>
  );
}
