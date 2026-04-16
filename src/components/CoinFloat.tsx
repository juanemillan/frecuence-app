import { useEffect } from 'react';

interface CoinFloatProps {
  x: number;
  y: number;
  val: number;
  onDone: () => void;
}

export function CoinFloat({ x, y, val, onDone }: CoinFloatProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 950);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', left: x, top: y, pointerEvents: 'none', zIndex: 999,
      animation: 'floatUp 0.95s ease-out forwards', fontSize: 13, fontWeight: 800,
      color: '#f7b731', fontFamily: "'Outfit',sans-serif",
      textShadow: '0 0 10px rgba(247,183,49,0.9)',
    }}>
      +{val} ✦
    </div>
  );
}
