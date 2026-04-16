import { useState } from 'react';
import type { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Routine, RoutineCategory } from '../data/routines';
import { CATEGORY_META } from '../data/routines';
import { routineMinutes } from '../utils/helpers';
import { I } from './Icons';
import { S } from '../styles/styles';

interface LibraryTabProps {
  allR: Routine[];
  activeIds: string[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
}

const CATEGORIES: { id: 'all' | RoutineCategory; label: string; emoji: string }[] = [
  { id: 'all',     label: 'Todas',         emoji: '✨' },
  { id: 'pelvic',  label: 'Suelo Pélvico', emoji: '🔵' },
  { id: 'morning', label: 'Mañana',        emoji: '🌅' },
  { id: 'facial',  label: 'Facial',        emoji: '😌' },
];

export function LibraryTab({ allR, activeIds, onAdd, onRemove, onSelect }: LibraryTabProps) {
  const [cat, setCat] = useState<'all' | RoutineCategory>('all');

  const filtered = cat === 'all' ? allR : allR.filter(r => r.category === cat);

  return (
    <>
      {/* Header blurb */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: 17, fontFamily: 'var(--font-sans)', letterSpacing: -0.3 }}>
          Biblioteca de Rutinas
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '4px 0 0', lineHeight: 1.5 }}>
          Agrega las rutinas que quieras seguir. Puedes cambiarlas cuando quieras.
        </p>
      </div>

      {/* My routines pill counter */}
      <div style={{ ...S.gl, marginBottom: 14, padding: '12px 16px', background: 'var(--color-primary-dim)', borderColor: 'var(--border-medium)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>📋</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 13 }}>Mis rutinas activas</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
            {activeIds.length === 0
              ? 'No tienes rutinas activas'
              : `${activeIds.length} rutina${activeIds.length > 1 ? 's' : ''} en tu plan diario`}
          </div>
        </div>
        <div style={{ background: 'var(--color-primary)', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, fontFamily: 'var(--font-sans)' }}>
          {activeIds.length}
        </div>
      </div>

      {/* Category filter tabs */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            style={{
              border: cat === c.id ? '1.5px solid var(--color-primary)' : '1px solid var(--border-subtle)',
              background: cat === c.id ? 'var(--color-primary-dim)' : 'var(--bg-surface)',
              color: cat === c.id ? 'var(--color-primary)' : 'var(--text-secondary)',
              borderRadius: 20,
              padding: '6px 13px',
              fontSize: 12,
              fontWeight: cat === c.id ? 700 : 500,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.18s ease',
              flexShrink: 0,
            }}
          >
            <span>{c.emoji}</span> {c.label}
          </button>
        ))}
      </div>

      {/* Routine cards */}
      <AnimatePresence mode="popLayout">
        {filtered.map((r, idx) => {
          const isActive = activeIds.includes(r.id);
          const mins = routineMinutes(r.exs);
          const catMeta = CATEGORY_META[r.category];
          return (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, delay: idx * 0.03 }}
              style={{
                ...S.gl,
                marginBottom: 11,
                borderColor: isActive ? `${r.color}55` : undefined,
                borderWidth: isActive ? 1.5 : 1,
              }}
            >
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <div
                  style={{ fontSize: 28, minWidth: 44, textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => onSelect(r.id)}
                >
                  {r.emoji || '📋'}
                </div>
                <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => onSelect(r.id)}>
                  {/* Category badge + title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 10, background: `${catMeta.color}22`, color: catMeta.color, borderRadius: 10, padding: '2px 7px', fontWeight: 700, letterSpacing: 0.3 }}>
                      {catMeta.emoji} {catMeta.label}
                    </span>
                    {isActive && (
                      <span style={{ fontSize: 10, background: '#00d4aa22', color: '#00d4aa', borderRadius: 10, padding: '2px 7px', fontWeight: 700 }}>
                        ✓ Activa
                      </span>
                    )}
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-sans)' }}>{r.name}</div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', margin: '5px 0' }}>
                    <span style={{ ...S.badge, background: `${r.color}22`, color: r.color }}>{r.level}</span>
                    <span style={S.badge}><I.clk />&nbsp;{mins} min</span>
                    {r.weeks > 0 ? <span style={S.badge}>{r.weeks} sem.</span> : <span style={S.badge}>♾️ Libre</span>}
                    <span style={S.badge}>{r.freq}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: 0, lineHeight: 1.4 }}>{r.desc}</p>
                </div>
              </div>

              {/* Add / Remove button */}
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button
                  onClick={() => onSelect(r.id)}
                  style={{ ...S.bk, flex: 1, height: 36, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', borderRadius: 10 }}
                >
                  Ver detalles
                </button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => isActive ? onRemove(r.id) : onAdd(r.id)}
                  style={{
                    flex: 1,
                    height: 36,
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 12,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    background: isActive ? 'rgba(239,68,68,0.12)' : 'var(--grad-button)',
                    color: isActive ? '#ef4444' : 'var(--btn-text)',
                    border: isActive ? '1px solid rgba(239,68,68,0.3)' : 'none',
                    boxShadow: isActive ? 'none' : '0 4px 14px rgba(110,231,247,0.25)',
                    transition: 'all 0.2s ease',
                  } as CSSProperties}
                >
                  {isActive ? (
                    <><I.close /> Quitar</>
                  ) : (
                    <><I.plus /> Agregar</>
                  )}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px 0', fontSize: 13 }}>
          No hay rutinas en esta categoría
        </div>
      )}
    </>
  );
}
