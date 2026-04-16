interface FigureProps {
  pos: string;
  phase: string;
  size?: number;
}

export function Figure({ pos, phase, size = 180 }: FigureProps) {
  const isC = phase === 'contract';

  // Flat-illustration palette (matches reference image style)
  const SKIN   = '#f5c5a3';
  const SKIN_D = '#dfa882';
  const SKIN_L = '#fddec8';
  const SHIRT  = '#5b9bd5';
  const SHIRT_D= '#3a7abf';
  const SHIRT_L= '#82bce8';
  const SHORTS = '#1a1a2e';
  const SHORTS_L = '#2c2c46';
  const SHOE   = '#1c1c30';
  const SHOE_H = '#3e3e60';
  const HAIR   = '#1a0e07';

  const glow = isC ? 'rgba(0,212,170,0.6)' : 'rgba(108,99,255,0.2)';
  const gR   = isC ? 'rgba(255,255,255,0.5)' : 'transparent';

  // Pulsing kegel highlight
  const Glow = ({ cx, cy, rx, ry }: { cx:number;cy:number;rx:number;ry:number }) => (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={glow}
        style={{filter:'blur(4px)', transition:'fill 0.4s'}}/>
      {isC && <ellipse cx={cx} cy={cy} rx={rx*0.4} ry={ry*0.4} fill={gR} className="breathe"/>}
      {isC && [1,2,3].map(i=>(
        <ellipse key={i} cx={cx} cy={cy} rx={rx*i*0.38} ry={ry*i*0.38} fill="none"
          stroke="rgba(0,212,170,0.28)" strokeWidth="1"
          style={{animation:`breathe ${1+i*0.3}s ease-in-out infinite`, animationDelay:`${i*0.15}s`}}/>
      ))}
    </g>
  );

  // Particles: 8 dots burst outward from glow center on contract phase (SMIL)
  const Particles = ({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) => {
    if (!isC) return null;
    const dirs: [number, number][] = [
      [0, -1], [0.71, -0.71], [1, 0], [0.71, 0.71],
      [0, 1], [-0.71, 0.71], [-1, 0], [-0.71, -0.71],
    ];
    return (
      <>
        {dirs.map(([dx, dy], i) => (
          <circle key={i} cx={cx} cy={cy} r={2} fill="var(--color-primary)" opacity={0}>
            <animate attributeName="opacity" from="0.75" to="0"
              dur="1.5s" repeatCount="indefinite" begin={`${i * 0.19}s`} />
            <animateTransform attributeName="transform" type="translate"
              from="0 0" to={`${+(dx * rx * 1.8).toFixed(1)} ${+(dy * ry * 1.8).toFixed(1)}`}
              dur="1.5s" repeatCount="indefinite" begin={`${i * 0.19}s`} additive="sum" />
          </circle>
        ))}
      </>
    );
  };

  // ── Side-profile head (for all lying/side poses) ────────────────────────────
  // Facing right by default. cx,cy = center, r = base radius
  const HeadSide = ({cx, cy, r=19}: {cx:number;cy:number;r?:number}) => (
    <g>
      {/* ear */}
      <ellipse cx={cx+r*0.84} cy={cy+r*0.2} rx={r*0.23} ry={r*0.32} fill={SKIN_D}/>
      <ellipse cx={cx+r*0.84} cy={cy+r*0.2} rx={r*0.11} ry={r*0.18} fill={SKIN}/>
      {/* head base */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r*1.06} fill={SKIN}/>
      {/* hair – covers top + back of head */}
      <path d={`
        M ${cx-r*0.72} ${cy-r*0.55}
        C ${cx-r*0.84} ${cy-r*1.45} ${cx+r*0.22} ${cy-r*1.5} ${cx+r*0.82} ${cy-r*0.92}
        C ${cx+r*1.02} ${cy-r*0.62} ${cx+r*0.74} ${cy-r*0.1} ${cx+r*0.62} ${cy+r*0.12}
        C ${cx+r*0.22} ${cy-r*0.12} ${cx-r*0.36} ${cy-r*0.28} ${cx-r*0.72} ${cy-r*0.55}
        Z
      `} fill={HAIR}/>
      {/* eyebrow */}
      <path d={`M ${cx+r*0.14} ${cy-r*0.3} Q ${cx+r*0.5} ${cy-r*0.47} ${cx+r*0.74} ${cy-r*0.3}`}
        fill="none" stroke={HAIR} strokeWidth={r*0.092} strokeLinecap="round"/>
      {/* eye white */}
      <ellipse cx={cx+r*0.42} cy={cy-r*0.14} rx={r*0.19} ry={r*0.13} fill="white"/>
      {/* pupil */}
      <circle cx={cx+r*0.48} cy={cy-r*0.14} r={r*0.09} fill="#18100a"/>
      {/* eye gleam */}
      <circle cx={cx+r*0.51} cy={cy-r*0.18} r={r*0.038} fill="white"/>
      {/* nose */}
      <path d={`M ${cx+r*0.62} ${cy+r*0.1} C ${cx+r*0.76} ${cy+r*0.28} ${cx+r*0.7} ${cy+r*0.42} ${cx+r*0.5} ${cy+r*0.45}`}
        fill="none" stroke={SKIN_D} strokeWidth={r*0.092} strokeLinecap="round"/>
      {/* mouth */}
      <path d={`M ${cx+r*0.28} ${cy+r*0.64} Q ${cx+r*0.55} ${cy+r*0.76} ${cx+r*0.72} ${cy+r*0.62}`}
        fill="none" stroke="#d07858" strokeWidth={r*0.1} strokeLinecap="round"/>
      {/* chin shadow */}
      <path d={`M ${cx+r*0.28} ${cy+r*0.88} Q ${cx} ${cy+r*1.06} ${cx-r*0.18} ${cy+r*0.98}`}
        fill="none" stroke={SKIN_D} strokeWidth={r*0.07} opacity="0.6"/>
    </g>
  );

  // ── Front-facing head (seated / standing) ──────────────────────────────────
  const HeadFront = ({cx, cy, r=18}: {cx:number;cy:number;r?:number}) => (
    <g>
      {/* head */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r*1.08} fill={SKIN}/>
      {/* hair */}
      <ellipse cx={cx} cy={cy-r*0.52} rx={r} ry={r*0.65} fill={HAIR}/>
      <path d={`M ${cx-r} ${cy-r*0.18} C ${cx-r*1.06} ${cy-r*1.12} ${cx} ${cy-r*1.32} ${cx+r} ${cy-r*0.18}`} fill={HAIR}/>
      {/* ears */}
      <ellipse cx={cx-r*0.97} cy={cy+r*0.1} rx={r*0.15} ry={r*0.25} fill={SKIN_D}/>
      <ellipse cx={cx+r*0.97} cy={cy+r*0.1} rx={r*0.15} ry={r*0.25} fill={SKIN_D}/>
      {/* eyebrows */}
      <path d={`M ${cx-r*0.54} ${cy-r*0.22} Q ${cx-r*0.28} ${cy-r*0.37} ${cx-r*0.04} ${cy-r*0.22}`}
        fill="none" stroke={HAIR} strokeWidth={r*0.092} strokeLinecap="round"/>
      <path d={`M ${cx+r*0.04} ${cy-r*0.22} Q ${cx+r*0.28} ${cy-r*0.37} ${cx+r*0.54} ${cy-r*0.22}`}
        fill="none" stroke={HAIR} strokeWidth={r*0.092} strokeLinecap="round"/>
      {/* eye whites */}
      <ellipse cx={cx-r*0.3} cy={cy-r*0.04} rx={r*0.18} ry={r*0.14} fill="white"/>
      <ellipse cx={cx+r*0.3} cy={cy-r*0.04} rx={r*0.18} ry={r*0.14} fill="white"/>
      {/* pupils */}
      <circle cx={cx-r*0.3} cy={cy-r*0.04} r={r*0.1} fill="#18100a"/>
      <circle cx={cx+r*0.3} cy={cy-r*0.04} r={r*0.1} fill="#18100a"/>
      <circle cx={cx-r*0.26} cy={cy-r*0.09} r={r*0.04} fill="white"/>
      <circle cx={cx+r*0.34} cy={cy-r*0.09} r={r*0.04} fill="white"/>
      {/* nose */}
      <path d={`M ${cx-r*0.08} ${cy+r*0.12} C ${cx-r*0.12} ${cy+r*0.32} ${cx+r*0.12} ${cy+r*0.32} ${cx+r*0.08} ${cy+r*0.12}`}
        fill="none" stroke={SKIN_D} strokeWidth={r*0.082}/>
      {/* nostrils */}
      <circle cx={cx-r*0.12} cy={cy+r*0.32} r={r*0.06} fill={SKIN_D} opacity="0.7"/>
      <circle cx={cx+r*0.12} cy={cy+r*0.32} r={r*0.06} fill={SKIN_D} opacity="0.7"/>
      {/* mouth */}
      <path d={`M ${cx-r*0.22} ${cy+r*0.52} Q ${cx} ${cy+r*0.67} ${cx+r*0.22} ${cy+r*0.52}`}
        fill="none" stroke="#d07858" strokeWidth={r*0.1} strokeLinecap="round"/>
      {/* face highlight */}
      <path d={`M ${cx-r*0.4} ${cy-r*0.5} Q ${cx-r*0.5} ${cy-r*0.1} ${cx-r*0.42} ${cy+r*0.3}`}
        fill="none" stroke={SKIN_L} strokeWidth={r*0.08} opacity="0.6"/>
    </g>
  );

  // ── Athletic shoe (side view) ───────────────────────────────────────────────
  // cx,cy = center, l = length, h = height, flip = toe faces left
  const Shoe = ({cx,cy,l=30,h=13,flip=false}: {cx:number;cy:number;l?:number;h?:number;flip?:boolean}) => {
    const d = flip ? -1 : 1;
    return (
    <g>
      {/* main shoe body */}
      <path d={`
        M ${cx - d*l*0.52} ${cy + h*0.35}
        C ${cx - d*l*0.52} ${cy - h*0.15} ${cx - d*l*0.28} ${cy - h*0.85} ${cx} ${cy - h*0.75}
        C ${cx + d*l*0.28} ${cy - h*0.65} ${cx + d*l*0.54} ${cy - h*0.2} ${cx + d*l*0.54} ${cy + h*0.35}
        Z
      `} fill={SHOE}/>
      {/* sole */}
      <path d={`
        M ${cx - d*l*0.54} ${cy + h*0.35}
        C ${cx - d*l*0.54} ${cy + h*0.62} ${cx + d*l*0.54} ${cy + h*0.62} ${cx + d*l*0.54} ${cy + h*0.35}
      `} fill={SHOE_H}/>
      {/* toe cap accent */}
      <ellipse cx={cx + d*l*0.32} cy={cy - h*0.5} rx={l*0.18} ry={h*0.26} fill={SHOE_H} opacity="0.55"/>
    </g>
  )};

  // ─── LYING DOWN  (lying, long_hold) ─────────────────────────────────────────
  // Person lying on back, both knees bent upward – like the reference illustration
  if (pos === 'lying' || pos === 'long_hold') {
    return (
      <svg viewBox="0 0 340 155" width={size} height={Math.round(size*155/340)}>
        {/* mat shadow */}
        <ellipse cx="175" cy="149" rx="155" ry="5" fill="rgba(0,0,0,0.2)"/>
        {/* mat */}
        <rect x="8" y="143" width="324" height="9" rx="4.5" fill="#1e1e40"/>
        <rect x="8" y="143" width="324" height="4" rx="2" fill="#2e2e5a"/>

        {/* ── BACKGROUND LEG (lighter, behind) ── */}
        {/* bg thigh – from hip going diagonally up-right to knee */}
        <path d="M 186,132 C 188,120 198,96 220,68 C 225,63 233,63 237,66 C 230,78 220,102 212,132 Z"
          fill={SHORTS_L}/>
        {/* bg shin – from knee back down to foot */}
        <path d="M 220,68 C 225,63 233,63 237,66 C 248,88 260,112 263,132 L 252,136 C 248,118 236,90 222,70 Z"
          fill={SHORTS_L}/>
        {/* bg shoe + top highlight */}
        <Shoe cx={268} cy={136} l={27} h={11}/>

        {/* ── HIPS / SHORTS BASE ── */}
        <path d="M 166,104 C 174,100 205,100 212,108 C 214,120 208,138 194,140 C 178,140 164,130 164,118 Z"
          fill={SHORTS}/>

        {/* ── SHIRT / TORSO ── */}
        <path d="
          M 60,107 C 60,100 67,96 78,96
          L 172,96 C 184,96 188,100 188,107
          L 188,132 C 188,137 184,140 176,140
          L 70,140 C 64,140 60,137 60,132 Z
        " fill={SHIRT}/>
        {/* shirt top highlight */}
        <path d="M 80,98 C 106,93 146,93 170,98"
          fill="none" stroke={SHIRT_L} strokeWidth="2.5" strokeLinecap="round"/>
        {/* shirt bottom shadow */}
        <path d="M 60,132 C 60,137 64,140 70,140 L 176,140 C 184,140 188,137 188,132"
          fill="none" stroke={SHIRT_D} strokeWidth="2" opacity="0.45"/>
        {/* center seam */}
        <line x1="124" y1="98" x2="124" y2="138" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>

        {/* left sleeve cap */}
        <path d="M 60,107 C 58,103 53,101 50,102 L 40,108 C 38,110 38,116 40,119 L 50,121 C 55,123 60,120 60,116 Z"
          fill={SHIRT_D}/>
        {/* right sleeve cap */}
        <path d="M 188,107 C 190,103 195,101 198,102 L 208,108 C 210,110 210,116 208,119 L 198,121 C 193,123 188,120 188,116 Z"
          fill={SHIRT_D}/>

        {/* left arm resting on mat */}
        <path d="M 42,118 C 40,122 38,130 40,136 C 43,140 56,140 60,136 C 62,130 60,122 56,118 Z"
          fill={SKIN}/>
        <ellipse cx="46" cy="137" rx="9" ry="5.5" fill={SKIN}/>
        <path d="M 38,135 Q 47,131 55,135" fill="none" stroke={SKIN_D} strokeWidth="1.5"/>

        {/* right arm resting */}
        <path d="M 198,118 C 200,122 202,130 200,136 C 197,140 186,140 184,136 C 183,130 184,122 188,118 Z"
          fill={SKIN_D}/>
        <ellipse cx="196" cy="137" rx="9" ry="5.5" fill={SKIN_D}/>

        {/* neck */}
        <path d="M 54,104 C 52,108 50,114 52,120 C 55,122 64,122 66,118 C 68,114 66,106 62,104 Z"
          fill={SKIN}/>

        {/* ── FOREGROUND LEG (front, darker, on top) ── */}
        {/* fg thigh – from hip going up to knee */}
        <path d="M 174,136 C 174,124 184,98 206,68 C 210,62 218,61 224,64 C 217,78 207,104 202,136 Z"
          fill={SHORTS}/>
        {/* fg shin – from knee back down */}
        <path d="M 206,68 C 210,62 218,61 224,64 C 236,88 250,114 254,136 L 242,141 C 236,120 222,92 208,70 Z"
          fill={SHORTS}/>
        {/* fg leg inner highlight */}
        <path d="M 176,134 C 178,118 190,88 210,66"
          fill="none" stroke={SHORTS_L} strokeWidth="1.5" opacity="0.55"/>
        {/* fg shoe */}
        <Shoe cx={256} cy={140} l={31} h={13}/>

        {/* kegel glow */}
        <Glow cx={176} cy={136} rx={29} ry={10}/>
        <Particles cx={176} cy={136} rx={29} ry={10}/>

        {/* neck shadow / connection to shirt */}
        <path d="M 56,104 C 54,107 52,110 52,114 C 52,116 54,118 58,118 C 62,118 64,116 64,112 C 64,108 62,106 60,104 Z"
          fill={SKIN}/>

        {/* head */}
        <HeadSide cx={36} cy={118} r={19}/>

        {isC && (
          <text x="176" y="154" textAnchor="middle" fontSize="9" fill="var(--color-primary)"
            fontFamily="sans-serif" fontWeight="700" className="pulse-a">● CONTRAER</text>
        )}
      </svg>
    );
  }

  // ─── BRIDGE  (bridge, bridge_kegel) ─────────────────────────────────────────
  if (pos === 'bridge' || pos === 'bridge_kegel') {
    const lift = isC ? 28 : 14;
    const hy   = 112 - lift; // hip apex Y
    return (
      <svg viewBox="0 0 340 170" width={size} height={Math.round(size*170/340)}>
        {/* mat shadow */}
        <ellipse cx="175" cy="160" rx="150" ry="5" fill="rgba(0,0,0,0.2)"/>
        <rect x="8" y="154" width="324" height="9" rx="4.5" fill="#1e1e40"/>
        <rect x="8" y="154" width="324" height="4" rx="2" fill="#2e2e5a"/>

        {/* head on mat */}
        <HeadSide cx={36} cy={138} r={17}/>
        {/* neck */}
        <path d="M 26,144 C 26,150 30,154 40,155 C 50,156 62,154 64,150 C 60,144 52,140 42,140 Z"
          fill={SKIN}/>

        {/* upper back / shoulders flat */}
        <path d="
          M 62,140 C 62,135 67,132 75,132 L 132,132 C 138,132 142,136 142,140
          L 142,154 C 138,157 132,158 126,158 L 70,158 C 66,158 62,155 62,152 Z
        " fill={SHIRT}/>
        <path d="M 76,134 C 96,130 120,130 136,134"
          fill="none" stroke={SHIRT_L} strokeWidth="2" strokeLinecap="round"/>

        {/* arms on mat */}
        {/* left */}
        <path d="M 64,148 C 58,149 52,149 48,147 C 46,151 46,158 50,160 C 56,162 70,162 74,158 C 74,153 70,148 66,148 Z"
          fill={SKIN}/>
        <ellipse cx="50" cy="160" rx="8" ry="5" fill={SKIN}/>
        {/* right */}
        <path d="M 130,148 C 136,149 142,149 146,147 C 148,151 148,158 144,160 C 138,162 124,162 120,158 C 120,153 124,148 128,148 Z"
          fill={SKIN_D}/>
        <ellipse cx="144" cy="160" rx="8" ry="5" fill={SKIN_D}/>

        {/* torso bridging upward as arc */}
        <path d={`
          M 140,142
          C 148,140 158,${hy+22} 170,${hy+8}
          C 176,${hy+3} 184,${hy+1} 190,${hy+6}
          C 200,${hy+16} 206,${hy+32} 208,${hy+44}
          L 198,${hy+48} C 194,${hy+36} 188,${hy+20} 180,${hy+14}
          C 170,${hy+8} 160,${hy+22} 150,${hy+44}
          L 140,${hy+40} C 140,${hy+22} 140,${hy+14} 140,142 Z
        `} fill={SHIRT} style={{transition:'all 0.45s ease'}}/>
        {/* shirt arc highlight */}
        <path d={`M 144,142 C 154,138 165,${hy+18} 174,${hy+10}`}
          fill="none" stroke={SHIRT_L} strokeWidth="2" strokeLinecap="round" style={{transition:'all 0.45s ease'}}/>

        {/* hips/shorts at apex */}
        <ellipse cx={190} cy={hy+6} rx="32" ry="19"
          fill={SHORTS} style={{transition:'all 0.45s ease'}}/>
        <ellipse cx={190} cy={hy+6} rx="32" ry="9"
          fill={SHORTS_L} opacity="0.35" style={{transition:'all 0.45s ease'}}/>

        {/* back shin goes down to mat */}
        <path d={`
          M 198,${hy+22} C 202,${hy+38} 212,140 218,152
          L 208,156 C 201,144 192,${hy+40} 188,${hy+24} Z
        `} fill={SHORTS_L} style={{transition:'all 0.45s ease'}}/>
        <Shoe cx={214} cy={155} l={26} h={10}/>

        {/* front shin goes down to mat */}
        <path d={`
          M 188,${hy+24} C 192,${hy+40} 200,140 206,152
          L 196,158 C 188,146 180,${hy+42} 176,${hy+26} Z
        `} fill={SHORTS} style={{transition:'all 0.45s ease'}}/>
        <Shoe cx={202} cy={157} l={28} h={11}/>

        {/* glow */}
        <Glow cx={190} cy={hy+6} rx={28} ry={12}/>
        <Particles cx={190} cy={hy+6} rx={28} ry={12}/>

        {isC && (
          <g style={{transition:'all 0.45s ease'}}>
            <line x1={190} y1={hy-22} x2={190} y2={hy-6}
              stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="3,2"/>
            <polygon points={`184,${hy-4} 196,${hy-4} 190,${hy-16}`} fill="var(--color-primary)" opacity="0.9"/>
            <text x={190} y={hy-28} textAnchor="middle" fontSize="9" fill="var(--color-primary)"
              fontFamily="sans-serif" fontWeight="700">↑ ELEVAR</text>
          </g>
        )}
      </svg>
    );
  }

  // ─── SIDE  (side, pillow_squeeze) ────────────────────────────────────────────
  if (pos === 'side' || pos === 'pillow_squeeze') {
    return (
      <svg viewBox="0 0 330 152" width={size} height={Math.round(size*152/330)}>
        {/* mat */}
        <ellipse cx="165" cy="145" rx="148" ry="5" fill="rgba(0,0,0,0.2)"/>
        <rect x="8" y="140" width="314" height="9" rx="4.5" fill="#1e1e40"/>
        <rect x="8" y="140" width="314" height="4" rx="2" fill="#2e2e5a"/>

        {/* ── BOTTOM LEG straight on mat ── */}
        <path d="M 178,132 C 210,129 244,129 266,132 L 266,141 C 244,141 210,141 178,141 Z"
          fill={SHORTS_L}/>
        <Shoe cx={278} cy={136} l={26} h={10}/>

        {/* ── HIPS ── */}
        <ellipse cx="176" cy="126" rx="24" ry="18" fill={SHORTS}/>

        {/* ── TORSO / SHIRT ── */}
        <path d="
          M 58,117 C 58,110 65,107 76,107
          L 178,107 C 188,107 192,111 192,117
          L 192,136 C 192,140 188,142 180,142
          L 68,142 C 62,142 58,140 58,136 Z
        " fill={SHIRT}/>
        <path d="M 78,109 C 106,105 150,105 174,109"
          fill="none" stroke={SHIRT_L} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="125" y1="109" x2="125" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        <path d="M 58,136 C 58,140 62,142 68,142 L 180,142 C 188,142 192,140 192,136"
          fill="none" stroke={SHIRT_D} strokeWidth="2" opacity="0.4"/>

        {/* left sleeve (bottom) */}
        <path d="M 60,117 C 56,114 52,113 48,114 L 40,120 C 38,122 38,128 40,130 L 48,133 C 54,134 60,132 60,128 Z"
          fill={SHIRT_D}/>
        {/* right sleeve (top) */}
        <path d="M 190,117 C 194,114 198,113 202,114 L 210,120 C 212,122 212,128 210,130 L 202,133 C 196,134 190,132 190,128 Z"
          fill={SHIRT_D}/>

        {/* bottom arm resting on mat */}
        <path d="M 42,128 C 40,133 40,139 44,141 L 62,141 C 63,137 62,130 60,128 Z"
          fill={SKIN}/>
        <ellipse cx="47" cy="140" rx="9" ry="5" fill={SKIN}/>

        {/* top arm (raised, resting in front) */}
        <path d="M 200,120 C 206,118 212,118 216,120 L 220,110 C 222,104 220,96 216,92 C 212,88 206,90 203,94 L 198,104 C 196,110 196,118 200,120 Z"
          fill={SKIN_D}/>
        <ellipse cx="215" cy="90" rx="8" ry="6" fill={SKIN}/>

        {/* ── PILLOW between knees ── */}
        <rect x="196" y="110" width="50" height="24" rx="12" fill="#e8c07a"/>
        <rect x="198" y="112" width="46" height="20" rx="10" fill="#f2d89a"/>
        <path d="M 204,120 Q 222,116 240,120" fill="none" stroke="rgba(155,108,0,0.3)" strokeWidth="1.5"/>
        <path d="M 204,124 Q 222,120 240,124" fill="none" stroke="rgba(155,108,0,0.2)" strokeWidth="1.2"/>

        {/* ── TOP LEG (front, slightly bent, knee on pillow) ── */}
        {/* thigh – hip to knee going forward */}
        <path d="M 173,115 C 180,111 204,109 222,111 L 222,121 C 204,121 180,121 174,125 Z"
          fill={SHORTS}/>
        {/* shin – knee to foot */}
        <path d="M 222,111 L 222,121 C 242,121 258,126 270,130 L 270,120 C 258,114 242,109 222,111 Z"
          fill={SHORTS}/>
        <path d="M 175,118 C 196,113 220,113 222,114"
          fill="none" stroke={SHORTS_L} strokeWidth="1.5" opacity="0.55"/>
        <Shoe cx={280} cy={124} l={28} h={11}/>

        {/* neck */}
        <path d="M 60,118 C 56,120 52,125 52,130 C 52,133 55,135 60,135 C 64,135 66,132 64,128 Z"
          fill={SKIN}/>

        {/* kegel glow */}
        <Glow cx={180} cy={128} rx={25} ry={9}/>
        <Particles cx={180} cy={128} rx={25} ry={9}/>

        {/* head */}
        <HeadSide cx={33} cy={124} r={18}/>

        {isC && (
          <g>
            <text x="222" y="98" textAnchor="middle" fontSize="9" fill="var(--color-primary)"
              fontFamily="sans-serif" fontWeight="700">● APRETAR</text>
            <line x1="222" y1="100" x2="222" y2="110" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="2,2"/>
          </g>
        )}
      </svg>
    );
  }

  // ─── SEATED  (seated, slow_squeeze, fast_pulse, elevator, reverse_kegel) ────
  if (
    pos === 'seated' || pos === 'slow_squeeze' || pos === 'fast_pulse' ||
    pos === 'elevator' || pos === 'reverse_kegel'
  ) {
    const dy = isC ? -4 : 0;
    return (
      <svg viewBox="0 0 210 218" width={size} height={Math.round(size*218/210)}>
        {/* chair seat */}
        <path d="M 44,125 C 44,121 48,119 54,119 L 156,119 C 162,119 166,121 166,125 L 166,132 C 166,136 162,138 156,138 L 54,138 C 48,138 44,136 44,132 Z"
          fill="#252548"/>
        <path d="M 52,120 C 80,117 132,117 158,120"
          fill="none" stroke="#35355a" strokeWidth="1.5" strokeLinecap="round"/>
        {/* chair legs */}
        <rect x="128" y="138" width="9" height="54" rx="4.5" fill="#1c1c38"/>
        <rect x="73" y="138" width="9" height="54" rx="4.5" fill="#1c1c38"/>
        {/* chair back post */}
        <rect x="44" y="72" width="9" height="54" rx="4.5" fill="#222240"/>
        <rect x="48" y="72" width="5" height="28" rx="2.5" fill="#30305a" opacity="0.6"/>

        {/* shoes */}
        <path d="M 62,183 C 56,179 56,192 62,193 C 74,195 90,193 92,188 C 93,183 86,179 78,179 Z"
          fill={SHOE}/>
        <path d="M 58,188 C 64,192 76,193 90,191" fill="none" stroke={SHOE_H} strokeWidth="1.2"/>
        <ellipse cx="70" cy="186" rx="5" ry="3.5" fill={SHOE_H} opacity="0.55"/>

        <path d="M 118,183 C 112,179 112,192 118,193 C 130,195 146,193 148,188 C 149,183 142,179 134,179 Z"
          fill={SHOE}/>
        <path d="M 114,188 C 120,192 132,193 146,191" fill="none" stroke={SHOE_H} strokeWidth="1.2"/>
        <ellipse cx="126" cy="186" rx="5" ry="3.5" fill={SHOE_H} opacity="0.55"/>

        {/* lower legs */}
        <path d="M 62,138 C 57,138 55,140 55,143 L 56,182 C 59,185 66,186 73,184 C 79,182 82,178 83,176 L 86,143 C 84,140 80,138 75,138 Z"
          fill={SHORTS}/>
        <path d="M 118,138 C 113,138 110,140 110,143 L 108,176 C 109,180 113,184 120,184 C 127,184 133,180 135,176 L 135,143 C 135,140 132,138 127,138 Z"
          fill={SHORTS}/>
        {/* calf inner highlight */}
        <path d="M 60,142 C 60,162 61,172 62,180" fill="none" stroke={SHORTS_L} strokeWidth="1.5" opacity="0.45"/>
        <path d="M 150,142 C 150,162 149,172 148,180" fill="none" stroke={SHORTS_L} strokeWidth="1.5" opacity="0.45"/>

        {/* thighs */}
        <path d="M 54,119 C 50,119 48,121 48,125 L 48,138 L 80,138 C 84,134 86,128 84,124 C 82,120 78,119 74,119 Z"
          fill={SHORTS}/>
        <path d="M 126,119 C 122,119 118,120 116,124 C 114,128 116,134 120,138 L 152,138 C 157,138 158,133 158,127 C 158,122 156,119 152,119 Z"
          fill={SHORTS}/>

        {/* ── TORSO / SHIRT ── */}
        <path d={`
          M 67,${68+dy} C 67,${62+dy} 73,${58+dy} 81,${58+dy}
          L 129,${58+dy} C 137,${58+dy} 143,${62+dy} 143,${68+dy}
          L 143,${121+dy} C 143,${126+dy} 139,${129+dy} 133,${129+dy}
          L 77,${129+dy} C 71,${129+dy} 67,${126+dy} 67,${121+dy} Z
        `} fill={SHIRT} style={{transition:'all 0.3s'}}/>
        <path d={`M 83,${60+dy} C 99,${56+dy} 111,${56+dy} 127,${60+dy}`}
          fill="none" stroke={SHIRT_L} strokeWidth="2.5" strokeLinecap="round" style={{transition:'all 0.3s'}}/>
        <line x1="105" y1={62+dy} x2="105" y2={127+dy} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        <path d={`M 67,${121+dy} C 67,${126+dy} 71,${129+dy} 77,${129+dy} L 133,${129+dy} C 139,${129+dy} 143,${126+dy} 143,${121+dy}`}
          fill="none" stroke={SHIRT_D} strokeWidth="2" opacity="0.4"/>

        {/* sleeves */}
        <path d={`M 67,${72+dy} C 61,${70+dy} 55,${70+dy} 51,${72+dy} L 43,${79+dy} C 39,${83+dy} 39,${92+dy} 43,${96+dy} L 51,${100+dy} C 57,${102+dy} 65,${100+dy} 67,${96+dy} Z`}
          fill={SHIRT_D} style={{transition:'all 0.3s'}}/>
        <path d={`M 143,${72+dy} C 149,${70+dy} 155,${70+dy} 159,${72+dy} L 167,${79+dy} C 171,${83+dy} 171,${92+dy} 167,${96+dy} L 159,${100+dy} C 153,${102+dy} 145,${100+dy} 143,${96+dy} Z`}
          fill={SHIRT_D} style={{transition:'all 0.3s'}}/>

        {/* forearms */}
        <path d={`M 43,${94+dy} C 40,${99+dy} 38,${110+dy} 38,${118+dy} C 38,${124+dy} 42,${128+dy} 48,${128+dy} C 54,${128+dy} 58,${124+dy} 58,${118+dy} C 57,${108+dy} 54,${98+dy} 51,${94+dy} Z`}
          fill={SKIN} style={{transition:'all 0.3s'}}/>
        <ellipse cx="48" cy={126+dy} rx="10" ry="7" fill={SKIN} style={{transition:'all 0.3s'}}/>

        <path d={`M 167,${94+dy} C 170,${99+dy} 172,${110+dy} 172,${118+dy} C 172,${124+dy} 168,${128+dy} 162,${128+dy} C 156,${128+dy} 152,${124+dy} 152,${118+dy} C 152,${108+dy} 156,${98+dy} 159,${94+dy} Z`}
          fill={SKIN_D} style={{transition:'all 0.3s'}}/>
        <ellipse cx="162" cy={126+dy} rx="10" ry="7" fill={SKIN_D} style={{transition:'all 0.3s'}}/>

        {/* kegel glow */}
        <Glow cx={105} cy={123} rx={29} ry={10}/>
        <Particles cx={105} cy={123} rx={29} ry={10}/>

        {/* head */}
        <HeadFront cx={105} cy={37+dy} r={19}/>
        {/* neck */}
        <path d={`M 96,${55+dy} C 96,${60+dy} 100,${63+dy} 105,${63+dy} C 110,${63+dy} 114,${60+dy} 114,${55+dy} L 112,${50+dy} C 110,${46+dy} 100,${46+dy} 98,${50+dy} Z`}
          fill={SKIN} style={{transition:'all 0.3s'}}/>

        {isC && (
          <text x="105" y="213" textAnchor="middle" fontSize="9" fill="var(--color-primary)"
            fontFamily="sans-serif" fontWeight="700" className="pulse-a">● CONTRAER</text>
        )}
      </svg>
    );
  }

  // ─── STANDING  (default / standing_kegel) ────────────────────────────────────
  const tensed = isC ? 'scaleY(0.96)' : 'scaleY(1)';
  return (
    <svg viewBox="0 0 210 250" width={size} height={Math.round(size*250/210)}>
      {/* ground shadow */}
      <ellipse cx="105" cy="244" rx="36" ry="5" fill="rgba(0,0,0,0.28)"/>

      {/* shoes */}
      <path d="M 66,229 C 60,226 56,229 57,234 C 58,240 70,243 84,241 C 96,239 100,234 97,230 C 93,225 82,225 74,227 Z"
        fill={SHOE}/>
      <path d="M 59,233 C 62,239 74,242 86,240" fill="none" stroke={SHOE_H} strokeWidth="1.2"/>
      <ellipse cx="70" cy="233" rx="6" ry="3.5" fill={SHOE_H} opacity="0.55"/>

      <path d="M 144,229 C 150,226 154,229 153,234 C 152,240 140,243 126,241 C 114,239 110,234 113,230 C 117,225 128,225 136,227 Z"
        fill={SHOE}/>
      <path d="M 151,233 C 148,239 136,242 124,240" fill="none" stroke={SHOE_H} strokeWidth="1.2"/>
      <ellipse cx="140" cy="233" rx="6" ry="3.5" fill={SHOE_H} opacity="0.55"/>

      {/* lower legs */}
      <path d="M 66,186 C 60,186 56,188 56,192 L 58,228 C 62,231 70,232 76,230 C 82,228 84,223 86,217 L 88,192 C 86,188 80,186 72,186 Z"
        fill={SHORTS}/>
      <path d="M 124,186 C 130,186 134,188 136,192 L 138,217 C 140,223 142,228 148,230 C 154,232 162,231 166,228 L 168,192 C 166,188 162,186 156,186 Z"
        fill={SHORTS}/>
      {/* shin highlights */}
      <path d="M 62,192 C 63,210 64,220 62,228" fill="none" stroke={SHORTS_L} strokeWidth="1.5" opacity="0.5"/>
      <path d="M 148,192 C 147,210 146,220 148,228" fill="none" stroke={SHORTS_L} strokeWidth="1.5" opacity="0.5"/>

      {/* thighs */}
      <path d="M 60,138 C 54,138 50,140 50,145 L 52,186 C 55,191 63,192 71,190 C 79,188 83,183 85,178 L 88,145 C 86,140 80,138 72,138 Z"
        fill={SHORTS}/>
      <path d="M 150,138 C 156,138 160,140 162,145 L 165,178 C 167,183 171,188 179,190 C 187,192 195,191 198,186 L 200,145 C 200,140 196,138 190,138 Z"
        fill={SHORTS}/>
      {/* kneecap roundness */}
      <ellipse cx="70" cy="186" rx="13" ry="9" fill={SHORTS_L}/>
      <ellipse cx="140" cy="186" rx="13" ry="9" fill={SHORTS_L}/>

      {/* ── TORSO ── */}
      <g style={{transform:tensed, transformOrigin:'105px 139px', transition:'transform 0.35s'}}>
        <path d="M 65,88 C 65,82 71,78 79,78 L 131,78 C 139,78 145,82 145,88 L 145,138 C 145,144 139,148 131,148 L 79,148 C 71,148 65,144 65,138 Z"
          fill={SHIRT}/>
        <path d="M 79,80 C 97,76 113,76 131,80"
          fill="none" stroke={SHIRT_L} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="105" y1="82" x2="105" y2="146" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        <path d="M 65,138 C 65,144 71,148 79,148 L 131,148 C 139,148 145,144 145,138"
          fill="none" stroke={SHIRT_D} strokeWidth="2" opacity="0.4"/>
      </g>

      {/* sleeves */}
      <path d="M 65,92 C 59,90 53,90 49,92 L 39,101 C 35,106 35,116 39,121 L 49,125 C 55,127 63,125 65,120 Z"
        fill={SHIRT_D}/>
      <path d="M 145,92 C 151,90 157,90 161,92 L 171,101 C 175,106 175,116 171,121 L 161,125 C 155,127 147,125 145,120 Z"
        fill={SHIRT_D}/>

      {/* arms */}
      <path d="M 40,119 C 36,124 34,134 36,144 C 38,152 44,156 50,156 C 56,156 60,152 60,145 C 60,136 58,124 54,119 Z"
        fill={SKIN}/>
      <ellipse cx="46" cy="153" rx="10" ry="7" fill={SKIN}/>

      <path d="M 170,119 C 174,124 176,134 174,144 C 172,152 166,156 160,156 C 154,156 150,152 150,145 C 150,136 152,124 156,119 Z"
        fill={SKIN_D}/>
      <ellipse cx="164" cy="153" rx="10" ry="7" fill={SKIN_D}/>

      {/* kegel glow */}
      <Glow cx={105} cy={143} rx={29} ry={10}/>
      <Particles cx={105} cy={143} rx={29} ry={10}/>

      {/* head */}
      <HeadFront cx={105} cy={55} r={20}/>
      {/* neck */}
      <path d="M 96,73 C 96,77 100,81 105,81 C 110,81 114,77 114,73 L 112,68 C 110,64 100,64 98,68 Z"
        fill={SKIN}/>

      {isC && (
        <text x="105" y="249" textAnchor="middle" fontSize="9" fill="var(--color-primary)"
          fontFamily="sans-serif" fontWeight="700" className="pulse-a">● CONTRAER</text>
      )}
    </svg>
  );
}
