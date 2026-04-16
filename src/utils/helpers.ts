import type { RoutineExercise } from '../data/routines';

export function routineMinutes(exs: RoutineExercise[]): number {
  return Math.ceil(
    exs.reduce((a, e) => a + (e.hold + e.rest) * e.reps * e.sets + 15 * (e.sets - 1), 0) / 60
  );
}

export interface LevelInfo {
  level: number;
  pct: number;
  nextXp: number;
}

export function getLevel(xp: number): LevelInfo {
  const lvls = [0, 100, 250, 500, 900, 1500, 2500, 4000, 6000, 9000, 13000];
  let lv = 1;
  for (let i = 0; i < lvls.length; i++) {
    if (xp >= lvls[i]) lv = i + 1;
  }
  const nx = lvls[lv] || lvls[lvls.length - 1];
  const cr = lvls[lv - 1] || 0;
  return { level: lv, pct: Math.min(100, Math.round(((xp - cr) / (nx - cr)) * 100)), nextXp: nx };
}
