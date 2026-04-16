export interface Exercise {
  id: string;
  name: string;
  icon: string;
  diff: number;
  benefit: string;
  sets: number;
  reps: number;
  hold: number;
  rest: number;
  pos: string;
  desc: string;
  muscle: string;
}

export const EXERCISES: Exercise[] = [
  { id:"slow_squeeze",  name:"Contracción Lenta",    icon:"🔵", diff:1, benefit:"Control y fuerza base",     sets:3, reps:10, hold:5,  rest:5,  pos:"seated",   desc:"Contrae el suelo pélvico lentamente y mantén la posición.", muscle:"Músculo pubococcígeo (PC)" },
  { id:"fast_pulse",    name:"Pulso Rápido",          icon:"⚡", diff:1, benefit:"Velocidad de respuesta",    sets:3, reps:20, hold:1,  rest:1,  pos:"seated",   desc:"Contracciones rápidas y cortas en sucesión.", muscle:"Fibras tipo I y II" },
  { id:"long_hold",     name:"Retención Prolongada",  icon:"🔒", diff:2, benefit:"Resistencia muscular",      sets:3, reps:8,  hold:10, rest:10, pos:"lying",    desc:"Contrae y mantén por 10 segundos completos.", muscle:"Músculo PC profundo" },
  { id:"bridge_kegel",  name:"Puente con Kegel",      icon:"🌉", diff:2, benefit:"Fuerza integrada",          sets:3, reps:10, hold:5,  rest:8,  pos:"bridge",   desc:"Eleva las caderas en puente mientras contraes el suelo pélvico.", muscle:"PC + glúteos + core" },
  { id:"elevator",      name:"El Ascensor",            icon:"🛗", diff:3, benefit:"Control y coordinación",   sets:2, reps:8,  hold:4,  rest:10, pos:"seated",   desc:"Contrae en 4 niveles de fuerza progresivos.", muscle:"Capas profundas del suelo pélvico" },
  { id:"pillow_squeeze",name:"Compresión Lateral",    icon:"🛌", diff:1, benefit:"Estabilidad pélvica",      sets:3, reps:10, hold:5,  rest:5,  pos:"side",     desc:"Acostado de lado, aprieta una almohada entre las rodillas.", muscle:"Aductores + suelo pélvico" },
  { id:"reverse_kegel", name:"Kegel Inverso",          icon:"🔄", diff:2, benefit:"Flexibilidad y relajación",sets:2, reps:10, hold:5,  rest:5,  pos:"seated",   desc:"Relaja y abre el suelo pélvico activamente.", muscle:"Suelo pélvico (relajación activa)" },
  { id:"standing_kegel",name:"Kegel de Pie",           icon:"🧍", diff:2, benefit:"Uso funcional diario",    sets:3, reps:10, hold:5,  rest:5,  pos:"standing", desc:"Contracción estándar realizada de pie.", muscle:"Músculo PC funcional" },

  // ─── Morning exercises ───────────────────────────────────────────────────
  { id:"jumping_jacks",        name:"Jumping Jacks",          icon:"⭐", diff:1, benefit:"Activación cardiovascular",   sets:3, reps:1, hold:30, rest:15, pos:"standing", desc:"Salta abriendo piernas y brazos simultáneamente. Mantén el ritmo constante.", muscle:"Cuerpo completo" },
  { id:"high_knees",           name:"Rodillas Altas",         icon:"🏃", diff:1, benefit:"Calentamiento y coordinación", sets:3, reps:1, hold:30, rest:10, pos:"standing", desc:"Corre en el lugar levantando las rodillas a la altura de la cadera.", muscle:"Cuadríceps, core, cardio" },
  { id:"sun_salutation_stretch",name:"Estiramiento Solar",   icon:"🌞", diff:1, benefit:"Flexibilidad matutina",         sets:2, reps:5, hold:4,  rest:5,  pos:"standing", desc:"Brazos arriba, inclínate hacia adelante, regresa lentamente.", muscle:"Espalda, hamstrings, pecho" },
  { id:"shoulder_rolls",       name:"Rotación de Hombros",   icon:"🔁", diff:1, benefit:"Movilidad de hombros",         sets:2, reps:10,hold:1,  rest:3,  pos:"seated",   desc:"Gira los hombros hacia adelante y atrás lentamente.", muscle:"Deltoides, trapecio" },
  { id:"hip_circles",          name:"Círculos de Cadera",    icon:"⭕", diff:1, benefit:"Movilidad de caderas",         sets:2, reps:10,hold:1,  rest:5,  pos:"standing", desc:"Haz grandes círculos con las caderas en ambas direcciones.", muscle:"Flexores de cadera" },
  { id:"cat_cow",              name:"Gato-Vaca",              icon:"🐱", diff:1, benefit:"Movilidad espinal",            sets:3, reps:8, hold:2,  rest:5,  pos:"lying",    desc:"En cuadrupedia, arquea y redondea la espalda alternadamente.", muscle:"Columna vertebral, core" },
  { id:"mountain_climbers",    name:"Escaladores",            icon:"🧗", diff:2, benefit:"Core y cardio",                sets:3, reps:1, hold:30, rest:15, pos:"lying",    desc:"En posición de plancha, lleva las rodillas al pecho alternando rápidamente.", muscle:"Core, hombros, cardio" },
  { id:"deep_breathing_am",    name:"Respiración Profunda",   icon:"🌬️",diff:1, benefit:"Activación mental",            sets:2, reps:1, hold:10, rest:5,  pos:"seated",   desc:"Inhala 4s por la nariz, retén 2s, exhala 6s por la boca.", muscle:"Diafragma" },

  // ─── Facial exercises ────────────────────────────────────────────────────
  { id:"lion_pose",            name:"Pose del León",          icon:"🦁", diff:1, benefit:"Libera tensión facial",        sets:3, reps:5, hold:5,  rest:8,  pos:"seated",   desc:"Abre los ojos bien grandes, saca la lengua y exhala fuerte por la boca.", muscle:"Músculos faciales, mandíbula" },
  { id:"fish_face",            name:"Cara de Pez",            icon:"🐟", diff:1, benefit:"Tonifica las mejillas",        sets:3, reps:8, hold:5,  rest:5,  pos:"seated",   desc:"Succiona las mejillas hacia adentro y mantén la posición.", muscle:"Cigomático, buccinador" },
  { id:"jaw_release",          name:"Relajación de Mandíbula",icon:"😮", diff:1, benefit:"Reduce tensión de mandíbula", sets:3, reps:6, hold:5,  rest:8,  pos:"seated",   desc:"Abre la boca lentamente, mueve la mandíbula de lado a lado.", muscle:"Masetero, temporal" },
  { id:"brow_lift",            name:"Elevación de Cejas",     icon:"😲", diff:1, benefit:"Tono frontal",                 sets:3, reps:8, hold:3,  rest:5,  pos:"seated",   desc:"Eleva las cejas lo más alto posible y mantén la posición.", muscle:"Músculo frontal" },
  { id:"cheek_puff",           name:"Inflar Mejillas",        icon:"😤", diff:1, benefit:"Tono y volumen facial",        sets:3, reps:8, hold:5,  rest:5,  pos:"seated",   desc:"Infla las mejillas con aire y transfiere de un lado al otro.", muscle:"Orbicular, buccinador" },
  { id:"neck_stretch_facial",  name:"Estiramiento de Cuello", icon:"🦢", diff:1, benefit:"Libera tensión cervical",      sets:2, reps:5, hold:10, rest:8,  pos:"seated",   desc:"Inclina la cabeza suavemente hacia cada lado y mantén.", muscle:"Esternocleidomastoideo" },
  { id:"forehead_smooth",      name:"Suavizar Frente",        icon:"✋", diff:1, benefit:"Relajación de frente",         sets:3, reps:8, hold:3,  rest:5,  pos:"seated",   desc:"Presiona las yemas en la frente y levanta las cejas contra la resistencia.", muscle:"Frontal, corrugador" },
  { id:"smile_hold",           name:"Sostener Sonrisa",       icon:"😊", diff:1, benefit:"Tono de mejillas y labios",   sets:3, reps:8, hold:5,  rest:5,  pos:"seated",   desc:"Sonríe lo más amplio posible activando todos los músculos de las mejillas.", muscle:"Cigomático mayor y menor" },
];
