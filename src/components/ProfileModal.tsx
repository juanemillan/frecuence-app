import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { I } from './Icons';
import { S } from '../styles/styles';

export interface AuthUser {
  provider: 'guest' | 'google';
  guest: boolean;
  name: string;
  email?: string;
  picture?: string;
}

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: AuthUser;
  streak: number;
  level: number;
  xp: number;
  routines: number;
}

export function ProfileModal({ open, onClose, onLogout, user, streak, level, xp, routines }: ProfileModalProps) {
  const safeName = (open ? user.name?.trim() : '') || 'Invitado';
  const safeEmail = (open ? user.email?.trim() : '') || '';
  const initials = safeName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.40)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            role="dialog"
            aria-modal="true"
            onClick={e => e.stopPropagation()}
            style={{ background: 'var(--bg-surface)', borderRadius: 18, boxShadow: '0 6px 32px rgba(0,0,0,0.18)', padding: 28, width: 'min(420px, 100%)', position: 'relative', border: '1px solid var(--border-subtle)', backdropFilter: 'blur(20px)' }}
          >
        <button type="button" onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 22, color: 'var(--color-primary)', cursor: 'pointer' }}>{I.close()}</button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 24, background: 'var(--color-primary)', color: '#fff', borderRadius: '50%', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, overflow: 'hidden' }}>
            {user.picture ? (
              <img src={user.picture} alt={safeName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800 }}>{initials || 'VK'}</span>
            )}
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)' }}>{safeName}</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>{safeEmail || (user.provider === 'guest' ? 'Modo invitado' : 'Cuenta conectada')}</div>
          <div style={{ display: 'flex', gap: 18, margin: '12px 0', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{streak} días</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Racha</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Lv {level}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nivel</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{routines}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Rutinas</div></div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>XP total: {xp}</div>
          <button type="button" onClick={onLogout} style={{ ...S.btn, width: '100%', marginTop: 18, background: 'var(--color-accent)', color: '#fff' }}>Cerrar sesión</button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
