import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTINES } from './data/routines';
import type { Routine, RoutineExercise, RoutineCategory } from './data/routines';
import { LibraryTab } from './components/LibraryTab';
import { ACHIEVEMENTS } from './data/achievements';
import { getLevel } from './utils/helpers';
import { useSound } from './hooks/useSound';
import { FontLink } from './components/FontLink';
import { CoinFloat } from './components/CoinFloat';
import { HomeTab } from './components/HomeTab';

import { ProgressTab } from './components/ProgressTab';
import { LearnTab } from './components/LearnTab';
import { BuilderEntry } from './components/BuilderEntry';
import { DetailScreen } from './components/DetailScreen';
import { WorkoutScreen } from './components/WorkoutScreen';
import { BuildScreen } from './components/BuildScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import type { OnboardingGoal, OnboardingLevel } from './components/OnboardingScreen';
import { I } from './components/Icons';
import { S } from './styles/styles';
import { ProfileModal } from './components/ProfileModal';
import { Landing } from './components/Landing';

interface RoutineCompletion {
  routineId: string;
  ids: string[];
  ts: number;
}

interface DayLog {
  completions?: RoutineCompletion[];
  // legacy single-routine fields (kept for backward compat)
  routineId?: string;
  ids?: string[];
  done?: boolean;
  ts?: number;
}

interface NewRoutine {
  name: string;
  exs: RoutineExercise[];
  category: RoutineCategory;
}

interface AuthUser {
  provider: 'guest' | 'google';
  guest: boolean;
  name: string;
  email?: string;
  picture?: string;
}

function normalizeAuthUser(value: AuthUser | null): AuthUser | null {
  if (!value) return null;
  return {
    provider: value.provider === 'google' ? 'google' : 'guest',
    guest: value.provider === 'guest' ? true : Boolean(value.guest),
    name: value.name?.trim() || 'Invitado',
    email: value.email || '',
    picture: value.picture || '',
  };
}

function authUserEquals(a: AuthUser | null, b: AuthUser | null): boolean {
  return a?.provider === b?.provider
    && a?.guest === b?.guest
    && a?.name === b?.name
    && a?.email === b?.email
    && a?.picture === b?.picture;
}

function decodeGoogleJwt(token: string): Partial<Pick<AuthUser, 'name' | 'email' | 'picture'>> | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const padded = payload.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(payload.length / 4) * 4, '=');
    const json = atob(padded);
    return JSON.parse(json) as Partial<Pick<AuthUser, 'name' | 'email' | 'picture'>>;
  } catch {
    return null;
  }
}

export default function App() {
  const TAB_ORDER = ['home', 'routines', 'progress', 'learn', 'builder'];
  const [tab, setTab] = useState('home');
  const prevTabIdx = useRef(0);
  const themeTransitionTimer = useRef<number | undefined>(undefined);
  const [tabDir, setTabDir] = useState(1);
  const [selRoutine, setSelRoutine] = useState<string | null>(null);
  const [workout, setWorkout] = useState<Routine | null>(null);
  const [customR, setCustomR] = useLocalStorage<Routine[]>('vitakore_customR', []);
  const [logs, setLogs] = useLocalStorage<Record<string, DayLog>>('vitakore_logs', {});
  const [coins, setCoins] = useLocalStorage<number>('vitakore_coins', 0);
  const [xp, setXp] = useLocalStorage<number>('vitakore_xp', 0);
  const [unlocked, setUnlocked] = useLocalStorage<string[]>('vitakore_unlocked', []);
  const [onboarded, setOnboarded] = useLocalStorage<boolean>('vitakore_onboarded', false);
  const [, setUserGoal] = useLocalStorage<OnboardingGoal | null>('vitakore_goal', null);
  const [recommendedR, setRecommendedR] = useLocalStorage<string | null>('vitakore_recommended', null);
  const [activeR, setActiveR] = useLocalStorage<string[]>('vitakore_activeR', []);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('vitakore_theme', 'light');
  const [building, setBuilding] = useState(false);
  const [newR, setNewR] = useState<NewRoutine>({ name: '', exs: [], category: 'pelvic' });
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; val: number }[]>([]);
  const [toast, setToast] = useState<typeof ACHIEVEMENTS[0] | null>(null);
  const snd = useSound();
  // Estado de usuario/invitado
  const [user, setUser] = useLocalStorage<AuthUser | null>('vitakore_user', null);
  const [profileOpen, setProfileOpen] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    const normalized = normalizeAuthUser(user);
    if (user && normalized && !authUserEquals(user, normalized)) {
      setUser(normalized);
    }
  }, [user, setUser]);

  const TK = new Date().toISOString().split('T')[0];
  const todayLog = logs[TK] || null;
  const streak = (() => {
    let s = 0;
    for (let i = 0; i < 120; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = d.toISOString().split('T')[0];
      if (logs[k]?.done) s++; else if (i > 0) break;
    }
    return s;
  })();
  const totalDays = Object.values(logs).filter(l => l.done).length;
  const w7 = (() => { let c = 0; for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() - i); if (logs[d.toISOString().split('T')[0]]?.done) c++; } return c; })();
  const m30 = (() => { let c = 0; for (let i = 0; i < 30; i++) { const d = new Date(); d.setDate(d.getDate() - i); if (logs[d.toISOString().split('T')[0]]?.done) c++; } return c; })();
  const allR = [...ROUTINES, ...customR];
  // Active routines: user's selected set. Default to recommended (or starter) if empty.
  const defaultActiveId = recommendedR ?? 'starter';
  const resolvedActiveR = activeR.length > 0 ? activeR : [defaultActiveId];
  const myRoutines = resolvedActiveR.map(id => allR.find(r => r.id === id)).filter(Boolean) as typeof allR;
  const lv = getLevel(xp);

  function chgTab(t: string) {
    const newIdx = TAB_ORDER.indexOf(t);
    setTabDir(newIdx > prevTabIdx.current ? 1 : -1);
    prevTabIdx.current = newIdx;
    setTab(t);
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  function spawnCoins(amt: number, e?: React.MouseEvent) {
    const r = (e?.currentTarget as HTMLElement)?.getBoundingClientRect?.();
    setFloats(f => [...f, { id: Date.now(), x: (r?.left || 160) + ((r?.width || 40) / 2) - 20, y: r?.top || 300, val: amt }]);
    snd.coin();
  }

  function checkAch(td: number, st: number) {
    ACHIEVEMENTS.forEach(a => {
      if (!unlocked.includes(a.id) && a.cond(td, st)) {
        setUnlocked(p => [...p, a.id]);
        setCoins(c => c + a.coins);
        setXp(x => x + a.xp);
        setToast(a);
        snd.levelUp();
        setTimeout(() => setToast(null), 3500);
      }
    });
  }

  function finish(routineId: string, ids: string[], e?: React.MouseEvent) {
    const existing = logs[TK] || {};
    const existingCompletions: RoutineCompletion[] = existing.completions || [];
    // Don't double-count the same routine
    if (!existingCompletions.some(c => c.routineId === routineId)) {
      const nl = {
        ...logs,
        [TK]: {
          ...existing,
          completions: [...existingCompletions, { routineId, ids, ts: Date.now() }],
          done: true,
        },
      };
      setLogs(nl);
      const nd = Object.values(nl).filter(l => l.done).length;
      const dx = ids.length * 25, dc = ids.length * 5 + 10;
      setXp(x => x + dx);
      setCoins(c => c + dc);
      if (e) spawnCoins(dc, e);
      checkAch(nd, streak + 1);
      snd.complete();
    }
  }

  // ─── Unified screen routing ────────────────────────────────────────────────
  const safeUser = normalizeAuthUser(user) ?? { provider: 'guest' as const, guest: true, name: 'Invitado', email: '', picture: '' };
  const guestButtonLabel = onboarded ? 'Continuar como invitado' : 'Iniciar como invitado';
  const selR = selRoutine ? (allR.find(x => x.id === selRoutine) ?? null) : null;

  type ScreenId = 'landing' | 'onboarding' | 'workout' | 'build' | 'detail' | 'main';
  const screenId: ScreenId =
    !user       ? 'landing'    :
    !onboarded  ? 'onboarding' :
    !!workout   ? 'workout'    :
    building    ? 'build'      :
    !!selR      ? 'detail'     :
    'main';

  // Per-screen enter/exit variants
  const sv = {
    landing:    { initial: { opacity: 0, scale: 1.04 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.96 }, transition: { duration: 0.3, ease: 'easeOut' } },
    onboarding: { initial: { y: 48, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -32, opacity: 0 }, transition: { type: 'spring', stiffness: 360, damping: 36 } },
    workout:    { initial: { y: 64, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 48, opacity: 0 }, transition: { type: 'spring', stiffness: 300, damping: 32 } },
    build:      { initial: { x: 64, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -32, opacity: 0 }, transition: { type: 'spring', stiffness: 360, damping: 34 } },
    detail:     { initial: { x: 64, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -32, opacity: 0 }, transition: { type: 'spring', stiffness: 360, damping: 34 } },
    main:       { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.22, ease: 'easeOut' } },
  } as const;

  return (
    <>
      <FontLink />
      {/* Floats and portal overlays live outside AnimatePresence so they survive transitions */}
      {floats.map(f => (
        <CoinFloat key={f.id} x={f.x} y={f.y} val={f.val} onDone={() => setFloats(p => p.filter(x => x.id !== f.id))} />
      ))}
      {user && (
        <ProfileModal
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
          onLogout={() => { setUser(null); setProfileOpen(false); }}
          user={safeUser}
          streak={streak}
          level={lv.level}
          xp={xp}
          routines={allR.length}
        />
      )}

      {/* Toast: position:fixed so it works outside the screen AnimatePresence */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ y: -32, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -24, opacity: 0, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            style={{ position: 'fixed', top: 76, left: '50%', transform: 'translateX(-50%)', zIndex: 998, background: 'linear-gradient(135deg,rgba(251,191,36,0.18),rgba(244,114,182,0.18))', backdropFilter: 'blur(24px) saturate(180%)', border: '1px solid rgba(251,191,36,0.45)', borderRadius: 20, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, maxWidth: 340, boxShadow: '0 8px 48px rgba(0,0,0,0.55)' }}
          >
            <span style={{ fontSize: 32 }}>{toast.icon}</span>
            <div>
              <div style={{ color: 'var(--color-gold)', fontWeight: 800, fontSize: 12, fontFamily: 'var(--font-sans)', letterSpacing: 0.5, textTransform: 'uppercase' }}>¡Logro desbloqueado!</div>
              <div style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 700 }}>{toast.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{toast.desc} · +{toast.coins} coins +{toast.xp}XP</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screenId}
          {...sv[screenId]}
          style={{ width: '100%' }}
        >
          {screenId === 'landing' && (
            <Landing
              onGuest={() => setUser({ provider: 'guest', guest: true, name: 'Invitado', email: '', picture: '' })}
              onGoogleToken={(token) => {
                const profile = decodeGoogleJwt(token);
                setUser({ provider: 'google', guest: false, name: profile?.name || 'Usuario de Google', email: profile?.email || '', picture: profile?.picture || '' });
              }}
              googleClientId={googleClientId}
              guestButtonLabel={guestButtonLabel}
              hasSavedProgress={onboarded}
            />
          )}
          {screenId === 'onboarding' && (
            <OnboardingScreen
              onComplete={(goal: OnboardingGoal, _level: OnboardingLevel, recId: string) => {
                setUserGoal(goal);
                setRecommendedR(recId);
                setActiveR([recId]);
                setOnboarded(true);
              }}
            />
          )}
          {screenId === 'workout' && workout && (
            <WorkoutScreen r={workout} snd={snd} onDone={(ids: string[], e?: React.MouseEvent) => { finish(workout.id, ids, e); setWorkout(null); setSelRoutine(null); }} onExit={() => setWorkout(null)} />
          )}
          {screenId === 'build' && (
            <BuildScreen nr={newR} setNr={setNewR} onSave={r => { setCustomR(p => [...p, r]); setBuilding(false); setNewR({ name: '', exs: [], category: 'pelvic' }); }} onCancel={() => setBuilding(false)} />
          )}
          {screenId === 'detail' && selR && (
            <DetailScreen r={selR} onStart={() => setWorkout(selR)} onBack={() => setSelRoutine(null)} todayLog={todayLog} />
          )}
          {screenId === 'main' && (
          <div style={S.app}>
      <div style={S.bg}><div style={S.b1} /><div style={S.b2} /><div style={S.b3} /></div>

      {/* Header */}
      <div style={S.hdr}>
        <div>
          <div style={{ color: 'var(--text-muted)', fontSize: 10.5, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600 }}>
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-sans)', letterSpacing: -0.4 }}>
            VitaKore
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--color-gold-dim)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 'var(--radius-pill)', padding: '4px 11px' }}>
            <span style={{ color: 'var(--color-gold)', display: 'flex' }}>{I.coins(14)}</span>
            <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: 12 }}>{coins}</span>
          </div>
          {streak > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.28)', borderRadius: 'var(--radius-pill)', padding: '4px 11px' }}>
              <span style={{ color: 'var(--color-red)', display: 'flex' }}>{I.flame()}</span>
              <span style={{ color: 'var(--color-red)', fontWeight: 700, fontSize: 12 }}>{streak}</span>
            </div>
          )}
          <button
            onClick={() => {
              const root = document.documentElement;
              root.classList.add('theme-transitioning');
              setTheme(t => t === 'dark' ? 'light' : 'dark');
              clearTimeout(themeTransitionTimer.current);
              themeTransitionTimer.current = window.setTimeout(() => {
                root.classList.remove('theme-transitioning');
              }, 450);
            }}
            style={{ ...S.bk, width: 36, height: 36, color: 'var(--color-primary)', border: '1px solid var(--border-subtle)' }}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? I.sun() : I.moon()}
          </button>
          <button
            onClick={() => setProfileOpen(true)}
            style={{ ...S.bk, width: 36, height: 36, color: 'var(--color-primary)', border: '1px solid var(--border-subtle)' }}
            title="Perfil"
          >
            {I.user()}
          </button>
        </div>
      </div>

      {/* XP progress bar */}
      <div style={{ height: 2, background: 'var(--bg-tint)', position: 'relative', zIndex: 11 }}>
        <div style={{ height: '100%', background: 'var(--grad-primary)', width: `${lv.pct}%`, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 0 8px var(--color-primary-glow)' }} />
      </div>

      <div style={{ ...S.scroll, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait" initial={false} custom={tabDir}>
          <motion.div
            key={tab}
            custom={tabDir}
            variants={{
              enter: (dir: number) => ({ x: dir * 36, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:  (dir: number) => ({ x: dir * -28, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 340, damping: 32, mass: 0.9 }}
            style={{ paddingBottom: 24 }}
          >
            {tab === 'home'     && <HomeTab logs={logs} streak={streak} totalDays={totalDays} w7={w7} allR={allR} myRoutines={myRoutines} onSelect={setSelRoutine} onStart={setWorkout} todayLog={todayLog} lv={lv} coins={coins} xp={xp} unlocked={unlocked} recommendedId={recommendedR} />}
            {tab === 'routines' && <LibraryTab allR={allR} activeIds={resolvedActiveR} onAdd={(id: string) => setActiveR(p => p.includes(id) ? p : [...p, id])} onRemove={(id: string) => setActiveR(p => p.filter(x => x !== id))} onSelect={setSelRoutine} />}
            {tab === 'progress' && <ProgressTab logs={logs} streak={streak} totalDays={totalDays} w7={w7} m30={m30} coins={coins} xp={xp} lv={lv} unlocked={unlocked} />}
            {tab === 'learn'    && <LearnTab />}
            {tab === 'builder'  && <BuilderEntry onBuild={() => setBuilding(true)} customR={customR} onSelect={setSelRoutine} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div style={S.nav}>
        {([
          { id: 'home',     l: 'Inicio',     Ic: I.home  },
          { id: 'routines', l: 'Biblioteca', Ic: I.book  },
          { id: 'progress', l: 'Progreso',   Ic: I.chart },
          { id: 'learn',    l: 'Aprende',    Ic: I.play  },
          { id: 'builder',  l: 'Crear',      Ic: I.plus  },
        ] as { id: string; l: string; Ic: () => React.ReactElement }[]).map(({ id, l, Ic }) => (
          <motion.button
            key={id}
            onClick={() => chgTab(id)}
            style={{ ...S.nb, ...(tab === id ? S.na : {}) }}
            whileTap={{ scale: 0.82 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          >
            <motion.span
              animate={{ scale: tab === id ? 1.15 : 1, y: tab === id ? -1 : 0 }}
              transition={{ type: 'spring', stiffness: 480, damping: 24 }}
              style={{ display: 'flex' }}
            >
              <Ic />
            </motion.span>
            <span style={{ position: 'relative', fontSize: 11, marginTop: 4, fontWeight: tab === id ? 700 : 500 }}>
              {l}
              {tab === id && (
                <motion.div
                  layoutId="nav-pill"
                  style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 3, borderRadius: 3, background: 'var(--grad-button)', boxShadow: '0 0 8px var(--color-primary-glow)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
