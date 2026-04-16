import type { CSSProperties } from 'react';

type Styles = Record<string, CSSProperties>;

export const S: Styles = {
  /* ─── App shell ──────────────────────────────────────────────────────────── */
  app:   { minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', fontFamily: 'var(--font-sans)', maxWidth: 430, margin: '0 auto', width: '100%' },

  /* ─── Ambient background blobs ───────────────────────────────────────────── */
  bg:    { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' },
  b1:    { position: 'absolute', top: -120, left: -90, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, var(--blob-1) 0%, transparent 68%)' },
  b2:    { position: 'absolute', top: 240, right: -110, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, var(--blob-2) 0%, transparent 68%)' },
  b3:    { position: 'absolute', bottom: 60, left: '18%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, var(--blob-3) 0%, transparent 68%)' },

  /* ─── Header ─────────────────────────────────────────────────────────────── */
  hdr:   { padding: '14px 18px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, background: 'var(--nav-glass)', backdropFilter: 'blur(28px) saturate(180%)', borderBottom: '1px solid var(--border-subtle)' },

  /* ─── Scroll area ────────────────────────────────────────────────────────── */
  scroll:{ flex: 1, overflowY: 'auto', padding: '14px 14px 100px', position: 'relative', zIndex: 1 },

  /* ─── Glass card ─────────────────────────────────────────────────────────── */
  gl:    { background: 'var(--bg-surface)', backdropFilter: 'var(--blur-glass)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', padding: 16, position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-card)' },

  /* ─── Hero gradient card ─────────────────────────────────────────────────── */
  hero:  { background: 'linear-gradient(145deg, rgba(110,231,247,0.12) 0%, rgba(129,140,248,0.1) 50%, rgba(244,114,182,0.1) 100%)', backdropFilter: 'var(--blur-glass)', border: '1px solid var(--border-medium)', borderRadius: 22, padding: 18, position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-card)' },

  /* ─── Primary button ─────────────────────────────────────────────────────── */
  btn:   { background: 'var(--grad-button)', border: 'none', borderRadius: 14, color: 'var(--btn-text)', fontWeight: 800, fontSize: 14, padding: '12px 22px', cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, letterSpacing: 0.2, transition: 'opacity 0.2s, transform 0.15s', boxShadow: '0 4px 20px rgba(110,231,247,0.3)' },

  /* ─── Badge / chip ───────────────────────────────────────────────────────── */
  badge: { display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--bg-surface-alt)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', padding: '3px 9px', fontSize: 11, fontWeight: 600, border: '1px solid var(--border-subtle)' },
  chip:  { background: 'var(--color-primary-dim)', color: 'var(--color-primary)', borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 600, display: 'inline-block', border: '1px solid var(--border-medium)' },

  /* ─── Bottom navigation ──────────────────────────────────────────────────── */
  nav:   { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: 'var(--nav-glass)', backdropFilter: 'blur(32px) saturate(200%)', borderTop: '1px solid var(--border-subtle)', display: 'flex', padding: '10px 0 14px', zIndex: 20 },
  nb:    { flex: 1, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5px 0', fontFamily: 'var(--font-sans)', fontSize: 11, transition: 'color 0.22s ease', position: 'relative' },
  na:    { color: 'var(--color-primary)' },

  /* ─── Back button ────────────────────────────────────────────────────────── */
  bk:    { background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-primary)', backdropFilter: 'blur(12px)' },

  /* ─── Input ──────────────────────────────────────────────────────────────── */
  inp:   { width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 14, padding: '12px 14px', fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' },
};

