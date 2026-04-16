import { useState } from 'react';
import { EXERCISES } from '../data/exercises';
import { Figure } from './Figure';
import { PelvicSVG } from './PelvicSVG';
import { S } from '../styles/styles';

export function LearnTab() {
  const [open, setOpen] = useState<string | null>(null);

  const topics = [
    { id: 'what',     icon: '🧠', title: '¿Qué es el suelo pélvico?',        color: '#00d4aa', fig: <PelvicSVG animated />, body: 'El suelo pélvico es un grupo de músculos que forma una «hamaca» en la base de la pelvis. En hombres sostiene la vejiga, el intestino delgado y el recto. El músculo principal se llama pubococcígeo (PC) y va desde el hueso púbico hasta el cóccix.' },
    { id: 'benefits', icon: '💪', title: 'Beneficios del entrenamiento',       color: '#6c63ff', fig: null, body: '✅ Control de la vejiga\n✅ Mejora la función eréctil\n✅ Mayor control de la eyaculación\n✅ Erecciones más firmes\n✅ Mayor intensidad del orgasmo\n✅ Recuperación post-cirugía de próstata\n✅ Reduce el dolor pélvico crónico' },
    { id: 'find',     icon: '🔍', title: '¿Cómo encontrar el músculo?',       color: '#f7b731', fig: <Figure pos="standing" phase="contract" size={130} />, body: 'Intenta detener el flujo de orina a mitad de la micción. El músculo que activas es tu músculo PC.\n\nOtra forma: imagina que intentas evitar pasar gas. Sentirás contraerse la zona alrededor del ano.\n\n⚠️ No uses el estómago, glúteos ni muslos.' },
    { id: 'howto',    icon: '📋', title: 'Cómo hacer un ejercicio correcto',  color: '#ff4d8d', fig: <Figure pos="lying" phase="contract" size={160} />, body: '1. Vacía la vejiga antes\n2. Posición cómoda (acostado o sentado)\n3. Contrae los músculos del suelo pélvico\n4. Mantén 3-5 segundos\n5. Relaja completamente 3-5 segundos\n6. Repite 10-15 veces\n7. Haz 2-3 sesiones al día\n\n✨ Respira normalmente siempre' },
    { id: 'mistakes', icon: '⚠️', title: 'Errores comunes',                   color: '#ff6b6b', fig: null, body: '❌ Contraer el abdomen en vez del suelo pélvico\n❌ Contener la respiración\n❌ Hacer ejercicios mientras orinas habitualmente\n❌ Entrenar en exceso (causa fatiga)\n❌ Esperar resultados en días (tarda 6-12 semanas)\n❌ Olvidar los ejercicios inversos' },
    { id: 'timeline', icon: '📅', title: '¿Cuándo ver resultados?',           color: '#00d4aa', fig: null, body: '⏱ Sem. 1-2: Mejor sensación de control muscular\n⏱ Sem. 3-4: Primeras mejoras en control urinario\n⏱ Mes 2-3: Mejoras notables en función sexual\n⏱ Mes 3-6: Resultados completos\n\n📌 La constancia es clave. 10-15 min al día son suficientes.' },
    { id: 'science',  icon: '🔬', title: 'La ciencia detrás',                 color: '#6c63ff', fig: null, body: '• Reduce la disfunción eréctil un 40% tras 6 meses (BJU International)\n• Mejora el control de eyaculación en un 61% de casos\n• Tan efectivo como medicamentos para incontinencia urinaria\n• Reduce el tiempo de recuperación post-prostatectomía\n\nEl músculo PC responde al entrenamiento progresivo como cualquier músculo esquelético.' },
  ];

  return (
    <>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '0 0 13px', lineHeight: 1.5 }}>
        Todo sobre el entrenamiento del suelo pélvico masculino.
      </p>

      {/* Anatomy hero */}
      <div style={{ ...S.hero, marginBottom: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Anatomía Interactiva</div>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 5px', fontSize: 16, fontFamily: 'var(--font-sans)', fontWeight: 700 }}>Suelo Pélvico Masculino</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: 0, lineHeight: 1.5 }}>El músculo PC controla la vejiga y la función sexual.</p>
          </div>
          <div style={{ width: 95, flexShrink: 0 }}><PelvicSVG animated /></div>
        </div>
      </div>

      {/* Exercise atlas */}
      <div style={{ ...S.gl, marginBottom: 13 }}>
        <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 11 }}>Atlas de ejercicios</div>
        <div style={{ display: 'flex', gap: 9, overflowX: 'auto', paddingBottom: 6 }}>
          {EXERCISES.map(ex => (
            <div key={ex.id} style={{ minWidth: 110, background: 'var(--bg-tint)', border: '1px solid var(--border-faint)', borderRadius: 13, padding: '9px 7px', textAlign: 'center', flexShrink: 0 }}>
              <Figure pos={ex.pos} phase="contract" size={84} />
              <div style={{ color: 'var(--text-primary)', fontSize: 10.5, fontWeight: 600, marginTop: 4 }}>{ex.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 9, marginTop: 1 }}>{ex.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion topics */}
      {topics.map(t => (
        <div key={t.id} style={{ ...S.gl, marginBottom: 9, cursor: 'pointer' }} onClick={() => setOpen(open === t.id ? null : t.id)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${t.color}1a`, border: `1.5px solid ${t.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{t.icon}</div>
            <div style={{ flex: 1, color: 'var(--text-primary)', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-sans)' }}>{t.title}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 16, transform: open === t.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>›</div>
          </div>
          {open === t.id && (
            <div className="anim-in" style={{ marginTop: 11, paddingTop: 11, borderTop: '1px solid var(--border-faint)' }}>
              {t.fig && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 11, background: 'var(--bg-tint)', borderRadius: 12, padding: '10px 0' }}>{t.fig}</div>}
              <p style={{ color: 'var(--text-secondary)', fontSize: 12.5, margin: 0, lineHeight: 1.72, whiteSpace: 'pre-line' }}>{t.body}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
