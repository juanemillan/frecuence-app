import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { I } from './Icons';
import { S } from '../styles/styles';

interface LandingProps {
  onGuest: () => void;
  onGoogleToken: (token: string) => void;
  googleClientId?: string;
  guestButtonLabel: string;
  hasSavedProgress: boolean;
}

export function Landing({ onGuest, onGoogleToken, googleClientId, guestButtonLabel, hasSavedProgress }: LandingProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0 },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <motion.div variants={item} transition={{ type: 'spring', stiffness: 380, damping: 28 }} style={{ fontSize: 54, color: 'var(--color-primary)', marginBottom: 12 }}>{I.sparkles()}</motion.div>
      <motion.h1 variants={item} transition={{ type: 'spring', stiffness: 380, damping: 28 }} style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 32, color: 'var(--color-primary)', margin: 0 }}>VitaKore</motion.h1>
      <motion.div variants={item} transition={{ type: 'spring', stiffness: 340, damping: 30 }} style={{ color: 'var(--text-secondary)', fontSize: 16, margin: '10px 0 28px', textAlign: 'center', maxWidth: 340 }}>
        Tu bitácora de hábitos y salud del core.<br />Entrena, registra y mejora tu bienestar.
      </motion.div>
      {hasSavedProgress && (
        <motion.div variants={item} transition={{ type: 'spring', stiffness: 340, damping: 30 }} style={{ width: 260, marginBottom: 16, padding: '10px 14px', borderRadius: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: 12, textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
          Tu progreso quedó guardado en este dispositivo.
        </motion.div>
      )}
      <motion.button variants={item} transition={{ type: 'spring', stiffness: 340, damping: 28 }} whileTap={{ scale: 0.95 }} style={{ ...S.btn, width: 220, marginBottom: 14 }} onClick={onGuest}>{guestButtonLabel}</motion.button>
      {googleClientId ? (
        <motion.div variants={item} transition={{ type: 'spring', stiffness: 340, damping: 28 }} style={{ width: 220, display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            width="220"
            size="large"
            theme="outline"
            text="signin_with"
            shape="rectangular"
            onSuccess={(response) => {
              if (response.credential) onGoogleToken(response.credential);
            }}
            onError={() => {
              alert('No se pudo iniciar sesión con Google.');
            }}
          />
        </motion.div>
      ) : (
        <motion.button variants={item} transition={{ type: 'spring', stiffness: 340, damping: 28 }} style={{ ...S.btn, width: 220, background: '#fff', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0.72 }} disabled>
          <span style={{ fontSize: 20, verticalAlign: 'middle' }}>G</span> Iniciar sesión con Google
        </motion.button>
      )}
      {!googleClientId && (
        <motion.div variants={item} transition={{ duration: 0.3 }} style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 10, textAlign: 'center', maxWidth: 320 }}>
          Falta configurar <span style={{ fontWeight: 700 }}>VITE_GOOGLE_CLIENT_ID</span> para activar el login real.
        </motion.div>
      )}
      <motion.div variants={item} transition={{ duration: 0.3 }} style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 22 }}>© 2026 VitaKore</motion.div>
    </motion.div>
  );
}
