import type { ProjectCategory } from "@/data/projects";

/**
 * Pokémon-style "type" language mapped onto the existing engineering
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
