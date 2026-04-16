interface RingProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
  sub?: string;
}

export function Ring({ pct, size = 80, stroke = 7, color = '#00d4aa', label, sub }: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" style={{ stroke: 'var(--ring-track)' }} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size > 80 ? 16 : 12, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>{label || `${pct}%`}</span>
        {sub && <span style={{ fontSize: 7.5, color: 'var(--text-muted)', marginTop: 1, textAlign: 'center', maxWidth: size - 12 }}>{sub}</span>}
      </div>
    </div>
  );
}
