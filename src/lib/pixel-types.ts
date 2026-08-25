import type { ProjectCategory } from "@/data/projects";

/**
 * Pokemon-style "type" language mapped onto the existing engineering
 * domains — design vocabulary only, not a literal claim about a project.
 * Every ProjectCategory value used in src/data/projects.ts must have an
 * entry here.
 */
interface PixelType {
  name: string;
  className: string;
}

export const CATEGORY_TYPE: Record<ProjectCategory, PixelType> = {
  "Embedded Systems": { name: "Fire", className: "type-fire" },
  Automation: { name: "Electric", className: "type-electric" },
  Robotics: { name: "Steel", className: "type-steel" },
  "AI / ML": { name: "Psychic", className: "type-psychic" },
  "Computer Vision": { name: "Bug", className: "type-bug" },
  Infrastructure: { name: "Ground", className: "type-ground" },
  "Web Development": { name: "Water", className: "type-water" },
};

/**
 * Direct Pokemon type → CSS class mapping, used for dream team badges,
 * header decorations, and anywhere a raw type name needs the badge style.
 */
export const POKEMON_TYPE: Record<string, PixelType> = {
  Fire: { name: "Fire", className: "type-fire" },
  Electric: { name: "Electric", className: "type-electric" },
  Water: { name: "Water", className: "type-water" },
  Steel: { name: "Steel", className: "type-steel" },
  Psychic: { name: "Psychic", className: "type-psychic" },
  Bug: { name: "Bug", className: "type-bug" },
  Ground: { name: "Ground", className: "type-ground" },
  Normal: { name: "Normal", className: "type-normal" },
  Flying: { name: "Flying", className: "type-flying" },
  Dark: { name: "Dark", className: "type-dark" },
  Ghost: { name: "Ghost", className: "type-ghost" },
  Poison: { name: "Poison", className: "type-poison" },
  Fighting: { name: "Fighting", className: "type-fighting" },
};
