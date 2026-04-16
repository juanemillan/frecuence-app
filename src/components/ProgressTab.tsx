import { ACHIEVEMENTS } from '../data/achievements';
import type { LevelInfo } from '../utils/helpers';
import { Ring } from './Ring';
import { I } from './Icons';
import { S } from '../styles/styles';

interface DayLog {
  ids?: string[];
  done?: boolean;
}

interface ProgressTabProps {
  logs: Record<string, DayLog>;
  streak: number;
  totalDays: number;
  w7: number;
  m30: number;
  coins: number;
  xp: number;
  lv: LevelInfo;
  unlocked: string[];
}

export function ProgressTab({ logs, streak, totalDays, w7, m30, coins, xp, lv, unlocked }: ProgressTabProps) {
  const wkP = Math.round((w7 / 7) * 100);
  const moP = Math.round((m30 / 30) * 100);
  const totEx = Object.values(logs).reduce((a, l) => a + (l.ids?.length || 0), 0);

  // ── Heatmap: last 52 weeks ──────────────────────────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Start on the Monday 51 weeks ago
  const dayOfWeek = (today.getDay() + 6) % 7; // 0=Mon
  const heatStart = new Date(today);
  heatStart.setDate(today.getDate() - dayOfWeek - 51 * 7);

  // Build 52 weeks × 7 days grid
  type HeatCell = { date: string; count: number; level: number };
  const weeks: HeatCell[][] = [];
  let cursor = new Date(heatStart);
  for (let w = 0; w < 52; w++) {
    const week: HeatCell[] = [];
    for (let d = 0; d < 7; d++) {
      const k = cursor.toISOString().split('T')[0];
      const count = logs[k]?.ids?.length ?? (logs[k]?.done ? 1 : 0);
      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
      week.push({ date: k, count, level });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  const heatColors = [
    'rgba(255,255,255,0.05)',      // 0 – no activity
    'rgba(110,231,247,0.2)',       // 1 – light
    'rgba(110,231,247,0.42)',      // 2
    'rgba(110,231,247,0.68)',      // 3
    'rgba(110,231,247,0.95)',      // 4 – full
  ];

  // Month labels: find the first cell of each month to position labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMo = -1;
  weeks.forEach((week, wi) => {
    const mo = new Date(week[0].date).getMonth();
    if (mo !== lastMo) {
      monthLabels.push({ label: new Date(week[0].date).toLocaleDateString('es-ES', { month: 'short' }), col: wi });
      lastMo = mo;
    }
  });

  const todayStr = today.toISOString().split('T')[0];

  return (
    <>
      {/* Level + stats ────────────────────────────────────────────── */}
      <div style={{ ...S.gl, marginBottom: 11 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 10 }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--grad-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 900, color: '#080c14', fontFamily: 'var(--font-sans)', boxShadow: '0 0 18px rgba(251,191,36,0.35)', flexShrink: 0 }}>{lv.level}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: 12 }}>Nivel {lv.level}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{xp} XP</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginTop: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--grad-gold)', borderRadius: 4, width: `${lv.pct}%`, transition: 'width 1s' }} />
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, textAlign: 'center' }}>
          {[
            { v: coins,  l: 'Monedas',    ic: I.sparkles(), c: 'var(--color-gold)' },
            { v: streak, l: 'Racha',      ic: I.flame(),    c: 'var(--color-accent)' },
            { v: totEx,  l: 'Ejercicios', ic: I.zap(),      c: 'var(--color-primary)' },
          ].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 11, padding: '9px 4px' }}>
              <div style={{ color: s.c, display: 'flex', justifyContent: 'center', marginBottom: 3 }}>{s.ic}</div>
              <div style={{ color: s.c, fontWeight: 800, fontSize: 17, fontFamily: 'var(--font-sans)' }}>{s.v}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Consistency rings ───────────────────────────────────────── */}
      <div style={{ ...S.gl, marginBottom: 11 }}>
        <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Consistencia</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Ring pct={wkP} size={72} color="var(--color-primary)" sub="Esta semana" />
          <Ring pct={moP} size={92} color="var(--color-accent)" sub="Últimos 30 días" />
          <Ring pct={Math.min(100, Math.round((streak / 30) * 100))} size={72} color="var(--color-gold)" label={`${streak}🔥`} sub="Racha/30" />
        </div>
      </div>

      {/* GitHub-style heatmap ────────────────────────────────────── */}
      <div style={{ ...S.gl, marginBottom: 11 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>
            Actividad · últimas 52 semanas
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{totalDays} días</div>
        </div>

        {/* Scrollable heatmap container */}
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ minWidth: 52 * 11 + 20 }}>

            {/* Month labels */}
            <div style={{ display: 'flex', marginBottom: 4, paddingLeft: 20 }}>
              {weeks.map((_, wi) => {
                const lbl = monthLabels.find(m => m.col === wi);
                return (
                  <div key={wi} style={{ width: 11, flexShrink: 0, color: 'var(--text-muted)', fontSize: 8, whiteSpace: 'nowrap', overflow: 'visible' }}>
                    {lbl ? lbl.label : ''}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 0 }}>
              {/* Day labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 4, paddingTop: 0 }}>
                {['L', '', 'X', '', 'V', '', 'D'].map((d, i) => (
                  <div key={i} style={{ height: 9, color: 'var(--text-muted)', fontSize: 7, lineHeight: '9px', width: 12, textAlign: 'right' }}>{d}</div>
                ))}
              </div>

              {/* Cells */}
              <div style={{ display: 'flex', gap: 2 }}>
                {weeks.map((week, wi) => (
                  <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {week.map(cell => {
                      const isToday = cell.date === todayStr;
                      return (
                        <div
                          key={cell.date}
                          title={`${cell.date}: ${cell.count} ejercicios`}
                          style={{
                            width: 9, height: 9, borderRadius: 2,
                            background: heatColors[cell.level],
                            boxShadow: isToday ? `0 0 0 1.5px var(--color-primary)` : cell.level > 0 ? `0 0 4px ${heatColors[cell.level]}` : 'none',
                            transition: 'background 0.3s',
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, justifyContent: 'flex-end', paddingRight: 2 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 9 }}>Menos</span>
              {heatColors.map((c, i) => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: 2, background: c }} />
              ))}
              <span style={{ color: 'var(--text-muted)', fontSize: 9 }}>Más</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements grid ───────────────────────────────────────── */}
      <div style={S.gl}>
        <div style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
          {I.trophy()} Logros
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
          {ACHIEVEMENTS.map(a => {
            const ok = unlocked.includes(a.id);
            return (
              <div
                key={a.id}
                style={{
                  background: ok ? 'linear-gradient(135deg,rgba(251,191,36,0.14),rgba(244,114,182,0.09))' : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${ok ? 'rgba(251,191,36,0.38)' : 'var(--border-subtle)'}`,
                  borderRadius: 13, padding: '11px 9px', textAlign: 'center',
                  filter: ok ? 'none' : 'grayscale(1) opacity(0.4)',
                  transition: 'all 0.4s',
                  boxShadow: ok ? '0 0 16px rgba(251,191,36,0.15)' : 'none',
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 4 }}>{a.icon}</div>
                <div style={{ color: ok ? 'var(--color-gold)' : 'var(--text-muted)', fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-sans)' }}>{a.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 10, margin: '2px 0' }}>{a.desc}</div>
                {ok
                  ? <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 4 }}>
                      <span style={{ color: 'var(--color-gold)', fontSize: 10, fontWeight: 700 }}>+{a.coins}🪙</span>
                      <span style={{ color: 'var(--color-primary)', fontSize: 10, fontWeight: 700 }}>+{a.xp}XP</span>
                    </div>
                  : <div style={{ color: 'var(--text-muted)', fontSize: 10, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                      {I.lock()} Bloqueado
                    </div>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
