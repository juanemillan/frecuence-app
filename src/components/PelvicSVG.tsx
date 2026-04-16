interface PelvicSVGProps {
  animated?: boolean;
}

export function PelvicSVG({ animated = false }: PelvicSVGProps) {
  return (
    <svg viewBox="0 0 200 145" style={{ width: '100%', maxWidth: 220 }}>
      <defs>
        <radialGradient id="pg2">
          <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6c63ff" stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id="mg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4aa" />
          <stop offset="100%" stopColor="#6c63ff" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="62" rx="36" ry="51" fill="none" stroke="#ffffff15" strokeWidth="2" />
      <ellipse cx="140" cy="62" rx="36" ry="51" fill="none" stroke="#ffffff15" strokeWidth="2" />
      <ellipse cx="100" cy="97" rx="52" ry="23" fill="url(#mg2)" opacity="0.65" className={animated ? 'breathe' : ''} />
      <ellipse cx="100" cy="97" rx="40" ry="16" fill="url(#pg2)" opacity="0.8" />
      <path d="M58 97 Q100 82 142 97" stroke="#00d4aa" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M63 103 Q100 90 137 103" stroke="#6c63ff" strokeWidth="1" fill="none" opacity="0.5" />
      {[20, 35, 50, 65].map(y => (
        <circle key={y} cx="100" cy={y} r="5" fill="#ffffff10" stroke="#ffffff22" strokeWidth="1.5" />
      ))}
      <rect x="96" y="14" width="8" height="56" rx="4" fill="none" stroke="#ffffff22" strokeWidth="1.5" />
      <text x="100" y="120" textAnchor="middle" fill="#00d4aa" fontSize="7" fontFamily="sans-serif" fontWeight="600">
        Músculo Pubococcígeo (PC)
      </text>
      <text x="100" y="131" textAnchor="middle" fill="#ffffff50" fontSize="6" fontFamily="sans-serif">
        Suelo Pélvico Masculino
      </text>
    </svg>
  );
}
