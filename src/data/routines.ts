export interface RoutineExercise {
  id: string;
  sets: number;
  reps: number;
  hold: number;
  rest: number;
}

export type RoutineCategory = 'pelvic' | 'morning' | 'facial';

export interface Routine {
  id: string;
  name: string;
  emoji: string;
  category: RoutineCategory;
  duration: number;
  level: string;
  freq: string;
  desc: string;
  weeks: number;
  color: string;
  exs: RoutineExercise[];
}

export const CATEGORY_META: Record<RoutineCategory, { label: string; emoji: string; color: string }> = {
  pelvic:  { label: 'Suelo Pélvico', emoji: '🔵', color: '#00d4aa' },
  morning: { label: 'Mañana',        emoji: '🌅', color: '#f97316' },
  facial:  { label: 'Facial',        emoji: '😌', color: '#a78bfa' },
};

export const ROUTINES: Routine[] = [
  // ─── Pelvic floor ────────────────────────────────────────────────────────
  { id:"starter",   category:"pelvic",  name:"Inicio: 15 min Diarios",    emoji:"🌱", duration:15, level:"Principiante", freq:"7 días/sem", desc:"Rutina base para activar y fortalecer el suelo pélvico desde cero.", weeks:4, color:"#00d4aa", exs:[{id:"slow_squeeze",sets:3,reps:10,hold:3,rest:5},{id:"fast_pulse",sets:2,reps:15,hold:1,rest:3},{id:"long_hold",sets:2,reps:5,hold:5,rest:8}] },
  { id:"inter",     category:"pelvic",  name:"Intermedio: Control Total",  emoji:"💪", duration:20, level:"Intermedio",    freq:"5 días/sem", desc:"Combina fuerza, resistencia y control para resultados avanzados.", weeks:4, color:"#6c63ff", exs:[{id:"long_hold",sets:3,reps:8,hold:8,rest:10},{id:"elevator",sets:2,reps:8,hold:4,rest:10},{id:"bridge_kegel",sets:3,reps:10,hold:5,rest:8},{id:"fast_pulse",sets:2,reps:20,hold:1,rest:5}] },
  { id:"advanced",  category:"pelvic",  name:"Avanzado: Potencia Máxima",  emoji:"🔥", duration:25, level:"Avanzado",      freq:"6 días/sem", desc:"Programa intensivo para maximizar rendimiento y control total.", weeks:4, color:"#ff6b6b", exs:[{id:"long_hold",sets:4,reps:10,hold:10,rest:10},{id:"elevator",sets:3,reps:10,hold:4,rest:8},{id:"bridge_kegel",sets:4,reps:12,hold:6,rest:8},{id:"standing_kegel",sets:3,reps:10,hold:5,rest:5},{id:"fast_pulse",sets:3,reps:25,hold:1,rest:5}] },
  { id:"maintain",  category:"pelvic",  name:"Mantenimiento Permanente",   emoji:"♾️", duration:10, level:"Todos",          freq:"Diaria",     desc:"Rutina de mantenimiento para conservar los beneficios a largo plazo.", weeks:0, color:"#f7b731", exs:[{id:"slow_squeeze",sets:2,reps:10,hold:5,rest:5},{id:"fast_pulse",sets:2,reps:15,hold:1,rest:3},{id:"reverse_kegel",sets:2,reps:8,hold:5,rest:5}] },
  { id:"sexual",    category:"pelvic",  name:"Salud Sexual",               emoji:"❤️", duration:18, level:"Intermedio",    freq:"6 días/sem", desc:"Mejora la función eréctil, el control de eyaculación y el placer.", weeks:4, color:"#ff4d8d", exs:[{id:"slow_squeeze",sets:3,reps:12,hold:5,rest:5},{id:"elevator",sets:3,reps:8,hold:4,rest:10},{id:"fast_pulse",sets:3,reps:20,hold:1,rest:5},{id:"reverse_kegel",sets:2,reps:10,hold:5,rest:5}] },

  // ─── Morning activation ──────────────────────────────────────────────────
  { id:"morning_express",     category:"morning", name:"Despertar Express",       emoji:"☀️", duration:5,  level:"Principiante", freq:"Diaria",     desc:"Activa el cuerpo en 5 minutos antes de empezar el día.", weeks:0, color:"#f7b731", exs:[{id:"deep_breathing_am",sets:1,reps:1,hold:10,rest:5},{id:"shoulder_rolls",sets:1,reps:10,hold:1,rest:3},{id:"sun_salutation_stretch",sets:1,reps:5,hold:4,rest:5},{id:"hip_circles",sets:1,reps:10,hold:1,rest:5}] },
  { id:"morning_activation",  category:"morning", name:"Activación Completa",     emoji:"🌅", duration:10, level:"Intermedio",   freq:"5 días/sem", desc:"Rutina de 10 minutos para despertar todo el cuerpo y elevar la energía.", weeks:0, color:"#f97316", exs:[{id:"deep_breathing_am",sets:1,reps:1,hold:10,rest:5},{id:"jumping_jacks",sets:2,reps:1,hold:30,rest:15},{id:"high_knees",sets:2,reps:1,hold:30,rest:10},{id:"cat_cow",sets:2,reps:8,hold:2,rest:5},{id:"hip_circles",sets:1,reps:10,hold:1,rest:5}] },
  { id:"morning_intense",     category:"morning", name:"Mañana Intensa",          emoji:"🔆", duration:15, level:"Avanzado",     freq:"4 días/sem", desc:"Cardio matutino para máxima energía y quema de calorías.", weeks:0, color:"#ef4444", exs:[{id:"deep_breathing_am",sets:1,reps:1,hold:10,rest:3},{id:"jumping_jacks",sets:3,reps:1,hold:30,rest:10},{id:"mountain_climbers",sets:3,reps:1,hold:30,rest:15},{id:"high_knees",sets:3,reps:1,hold:30,rest:10},{id:"cat_cow",sets:2,reps:10,hold:2,rest:5}] },

  // ─── Facial / Face yoga ──────────────────────────────────────────────────
  { id:"face_relax",          category:"facial",  name:"Relajación Facial",       emoji:"😌", duration:5,  level:"Todos",         freq:"Diaria",     desc:"Libera la tensión acumulada en el rostro en solo 5 minutos.", weeks:0, color:"#a78bfa", exs:[{id:"jaw_release",sets:2,reps:6,hold:5,rest:8},{id:"neck_stretch_facial",sets:1,reps:5,hold:10,rest:8},{id:"lion_pose",sets:2,reps:5,hold:5,rest:8}] },
  { id:"face_yoga",           category:"facial",  name:"Yoga Facial Completo",    emoji:"🧖", duration:10, level:"Intermedio",   freq:"5 días/sem", desc:"Tonifica y rejuvenece el rostro con técnicas de face yoga.", weeks:0, color:"#7c3aed", exs:[{id:"lion_pose",sets:3,reps:5,hold:5,rest:8},{id:"fish_face",sets:3,reps:8,hold:5,rest:5},{id:"cheek_puff",sets:3,reps:8,hold:5,rest:5},{id:"brow_lift",sets:3,reps:8,hold:3,rest:5},{id:"smile_hold",sets:3,reps:8,hold:5,rest:5}] },
  { id:"face_tension",        category:"facial",  name:"Anti-Tensión Facial",     emoji:"💆", duration:7,  level:"Todos",         freq:"Diaria",     desc:"Para mandíbula tensa, dolor de cabeza y estrés facial.", weeks:0, color:"#8b5cf6", exs:[{id:"jaw_release",sets:3,reps:6,hold:5,rest:8},{id:"neck_stretch_facial",sets:2,reps:5,hold:10,rest:8},{id:"forehead_smooth",sets:3,reps:8,hold:3,rest:5},{id:"lion_pose",sets:2,reps:5,hold:5,rest:8}] },
];
