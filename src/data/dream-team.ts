/* ===================================================================
   DREAM TEAM — Trainer's core 6-Pokémon Battle Party.
   Used across the header Party Bar, Trainer Profile Card, & Battle HUD.
   =================================================================== */

export interface DreamPokemon {
  id: number;
  name: string;
  type: string[];
  level: number;
  hp: number;
  maxHp: number;
  image: string;
  role: string;
  ability: string;
}

export const DREAM_TEAM: DreamPokemon[] = [
  {
    id: 25,
    name: "Pikachu",
    type: ["Electric"],
    level: 100,
    hp: 100,
    maxHp: 100,
    image: "/pokemon/pikachu.gif",
    role: "Speed & Communication Transmitter",
    ability: "Static / Volt Tackle",
  },
  {
    id: 6,
    name: "Charizard",
    type: ["Fire", "Flying"],
    level: 100,
    hp: 100,
    maxHp: 100,
    image: "/pokemon/charizard.gif",
    role: "High Impact System Architect",
    ability: "Blaze / Seismic Toss",
  },
  {
    id: 658,
    name: "Greninja",
    type: ["Water", "Dark"],
    level: 100,
    hp: 100,
    maxHp: 100,
    image: "/pokemon/greninja.gif",
    role: "Full-Stack Stealth Automation",
    ability: "Battle Bond / Water Shuriken",
  },
  {
    id: 392,
    name: "Infernape",
    type: ["Fire", "Fighting"],
    level: 100,
    hp: 100,
    maxHp: 100,
    image: "/pokemon/infernape.gif",
    role: "Relentless Problem Solver",
    ability: "Iron Fist / Mach Punch",
  },
  {
    id: 94,
    name: "Gengar",
    type: ["Ghost", "Poison"],
    level: 100,
    hp: 100,
    maxHp: 100,
    image: "/pokemon/gengar.gif",
    role: "Creative Logic & Shadow Tech",
    ability: "Cursed Body / Shadow Ball",
  },
  {
    id: 448,
    name: "Lucario",
    type: ["Fighting", "Steel"],
    level: 100,
    hp: 100,
    maxHp: 100,
    image: "/pokemon/lucario.gif",
    role: "Agentic AI & Precision Logic",
    ability: "Inner Focus / Aura Sphere",
  },
];
