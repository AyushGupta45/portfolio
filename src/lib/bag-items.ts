import {
  Bot,
  FileText,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Sprout,
  Swords,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";

type IconComponent = LucideIcon | typeof GithubIcon;

export type BagItemId =
  | "about"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "github"
  | "linkedin"
  | "resume"
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
    id: "education",
    label: "Education",
    metaphor: "Trainer School",
    accent: "oklch(48% 0.13 155)",
    accentIsLight: false,
    icon: GraduationCap,
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
    id: "github",
    label: "GitHub",
    metaphor: profile.pcName,
    accent: "oklch(35% 0.03 280)",
    accentIsLight: false,
    icon: GithubIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    metaphor: "Trainer ID",
    accent: "oklch(55% 0.16 250)",
    accentIsLight: false,
    icon: LinkedinIcon,
  },
  {
    id: "resume",
    label: "Resume",
    metaphor: "Documents",
    accent: "oklch(45% 0.14 280)",
    accentIsLight: false,
    icon: FileText,
  },
  {
    id: "contact",
    label: "Contact",
    metaphor: "Pokégear",
    accent: "oklch(52% 0.17 25)",
    accentIsLight: false,
    icon: MessageCircle,
  },
];

export const BAG_ITEMS: BagItem[] = ALL_BAG_ITEMS;
