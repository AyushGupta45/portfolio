import {
  Bot,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Sprout,
  Swords,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon } from "@/components/shared/brand-icons";

type IconComponent = LucideIcon | typeof GithubIcon;

export type BagItemId =
  | "about"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "contact";

interface BagItem {
  id: BagItemId;
  /** Nav list label. */
  label: string;
  /** Pokémon-metaphor title shown as the content panel's titlebar. */
  metaphor: string;
  /** Indigo-League-inspired accent, oklch(). */
  accent: string;
  /** Whether the accent is light enough to need dark ink text instead of cream. */
  accentIsLight: boolean;
  icon: IconComponent;
}

const ALL_BAG_ITEMS: BagItem[] = [
  {
    id: "about",
    label: "About",
    metaphor: "Trainer Profile",
    accent: "oklch(47% 0.17 275)",
    accentIsLight: false,
    icon: Sprout,
  },
  {
    id: "experience",
    label: "Experience",
    metaphor: "Trainer Journey",
    accent: "oklch(48% 0.18 300)",
    accentIsLight: false,
    icon: Swords,
  },
  {
    id: "education",
    label: "Education",
    metaphor: "Trainer School",
    accent: "oklch(48% 0.13 155)",
    accentIsLight: false,
    icon: GraduationCap,
  },
  {
    id: "projects",
    label: "Projects",
    metaphor: "Projectdex",
    accent: "oklch(40% 0.15 255)",
    accentIsLight: false,
    icon: Bot,
  },
  {
    id: "skills",
    label: "Skills",
    metaphor: "Moveset",
    accent: "oklch(80% 0.15 95)",
    accentIsLight: true,
    icon: Sparkles,
  },
  {
    id: "contact",
    label: "Contact",
    metaphor: "Pokégear & Trainer Card",
    accent: "oklch(52% 0.17 25)",
    accentIsLight: false,
    icon: MessageCircle,
  },
];

export const BAG_ITEMS: BagItem[] = ALL_BAG_ITEMS;
