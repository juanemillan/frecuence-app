export interface Achievement {
  id: string;
  icon: string;
  name: string;
  desc: string;
  coins: number;
  xp: number;
  cond: (days: number, streak: number) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id:"d1",   icon:"🌱", name:"Primer Paso",   desc:"Completa tu primer entrenamiento", coins:10,  xp:50,   cond:(d,_s)=>d>=1 },
  { id:"s3",   icon:"🔥", name:"En Racha",      desc:"3 días seguidos",                  coins:20,  xp:100,  cond:(_d,s)=>s>=3 },
  { id:"d7",   icon:"⚡", name:"Una Semana",     desc:"7 días completados",               coins:50,  xp:200,  cond:(d,_s)=>d>=7 },
  { id:"s7",   icon:"💎", name:"Constancia",    desc:"7 días en racha",                  coins:75,  xp:300,  cond:(_d,s)=>s>=7 },
  { id:"d14",  icon:"🏅", name:"Dos Semanas",   desc:"14 días completados",              coins:100, xp:400,  cond:(d,_s)=>d>=14 },
  { id:"d28",  icon:"🏆", name:"Un Mes",        desc:"28 días completados",              coins:200, xp:750,  cond:(d,_s)=>d>=28 },
  { id:"s30",  icon:"👑", name:"Rey del Core",  desc:"30 días en racha",                 coins:300, xp:1000, cond:(_d,s)=>s>=30 },
  { id:"d60",  icon:"🌟", name:"Maestro",       desc:"60 días completados",              coins:500, xp:2000, cond:(d,_s)=>d>=60 },
];
