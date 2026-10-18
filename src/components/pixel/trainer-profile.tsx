"use client";

import { Bug, Coffee, Footprints, Star, Zap } from "lucide-react";
import {
  siAngular,
  siBetterauth,
  siDrizzle,
  siExpress,
  siGit,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siShadcnui,
  siSpringboot,
  siTailwindcss,
  siTypescript,
  siVercel,
  siXyflow,
} from "simple-icons";
import { profile } from "@/data/profile";
import { PixelAvatar, useTrainerDialogue } from "./pixel-avatar";
import { CompanionSprite } from "@/components/bag/companion-sprite";
import { TechIcon } from "@/components/shared/tech-icons";

const TOP_SKILLS = [
  { icon: siTypescript, name: "TypeScript" },
  { icon: siReact, name: "React" },
  { icon: siNextdotjs, name: "Next.js" },
  { icon: siAngular, name: "Angular" },
  { icon: siNodedotjs, name: "Node.js" },
  { icon: siSpringboot, name: "Spring Boot" },
  { icon: siPython, name: "Python" },
  { icon: siShadcnui, name: "Shadcn/UI" },
  { icon: siTailwindcss, name: "Tailwind CSS" },
  { icon: siPrisma, name: "Prisma" },
  { icon: siDrizzle, name: "Drizzle" },
  { icon: siPostgresql, name: "PostgreSQL" },
  { icon: siMysql, name: "SQLite" },
  { icon: siMongodb, name: "MongoDB" },
  { icon: siExpress, name: "Express" },
  { icon: siGit, name: "Git" },
  { icon: siXyflow, name: "xyflow" },
  { icon: siBetterauth, name: "BetterAuth" },
  { icon: siVercel, name: "Vercel" },
];

const hometown = profile.location.split(",")[0].trim();
const yearsBuilding =
  profile.stats.find((s) => s.label === "Years building")?.value ?? "4+";

export function TrainerProfile() {
  const { line, cycle } = useTrainerDialogue();

  return (
    <div className="w-full select-none">
      <div className="relative w-full overflow-hidden border-4 border-amber-600/70 bg-card p-3 sm:p-5 shadow-xl rounded-sm">
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-600/50 pb-3 mb-4 bg-amber-500/10 p-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 border-2 border-amber-700 bg-amber-500 px-2 py-1 font-pixel text-[8px] font-bold text-black uppercase tracking-wider shadow-sm hidden sm:inline-block">
              LEGENDARY TRAINER
            </span>
            <h2 className="font-pixel text-xs sm:text-sm md:text-base font-extrabold text-foreground tracking-wide truncate">
              {profile.name}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 font-pixel text-[10px] sm:text-xs text-(--pixel-red) font-black shrink-0">
            <span>HP</span>
            <span className="text-sm">120</span>
            <Zap
              size={14}
              className="fill-(--pixel-red) text-(--pixel-red)"
            />
          </div>
        </div>

        {/* Main Content: Stage Box + Info Matrix */}
        <div className="flex flex-col md:flex-row gap-4 items-start mb-4">
          {/* Left Stage Box */}
          <div className="flex flex-col items-center gap-3 border-2 border-border bg-(--pixel-cream-alt) p-3 shadow-sm shrink-0 w-full md:w-auto">
            <div className="relative flex items-center justify-center gap-2 sm:gap-3 border-2 border-border bg-(--pixel-cream) p-2 sm:p-3 rounded-sm shadow-inner max-w-full overflow-hidden">
              <PixelAvatar showDialogue={false} cellSize={8} />
              <CompanionSprite cellSize={8} />
            </div>
            <div
              onClick={cycle}
              className="border-2 border-border bg-card px-3 py-2 text-center cursor-pointer hover:border-amber-600 transition-all w-full shadow-sm h-13 flex items-center justify-center"
              title="Click to cycle dialogue!"
            >
              <p className="font-semibold text-foreground text-[11px] leading-snug italic line-clamp-2">
                &quot;{line}&quot;
              </p>
            </div>
          </div>

          {/* Right Section: Stats + Badges */}
          <div className="space-y-3 flex-1 min-w-0 w-full">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 border-2 border-border bg-(--pixel-cream-alt) p-3 text-xs">
              <div>
                <span className="font-pixel text-[8px] uppercase text-(--pixel-red) font-bold block mb-0.5">
                  TRAINER TYPE
                </span>
                <span className="font-bold text-foreground text-[11px] sm:text-xs leading-snug">
                  {profile.role}
                </span>
              </div>
              <div>
                <span className="font-pixel text-[8px] uppercase text-(--pixel-red) font-bold block mb-0.5">
                  CURRENT QUEST
                </span>
                <span className="font-bold text-(--pixel-forest) text-[11px] sm:text-xs leading-snug">
                  {profile.status}
                </span>
              </div>
              <div>
                <span className="font-pixel text-[8px] uppercase text-(--pixel-red) font-bold block mb-0.5">
                  HOMETOWN
                </span>
                <span className="font-bold text-foreground text-[11px] sm:text-xs">
                  {hometown}
                </span>
              </div>
              <div>
                <span className="font-pixel text-[8px] uppercase text-(--pixel-red) font-bold block mb-0.5">
                  BUILDING SINCE
                </span>
                <span className="font-bold text-foreground text-[11px] sm:text-xs">
                  {yearsBuilding} Years
                </span>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="border-2 border-border bg-card p-3 sm:p-4">
              <span className="font-pixel text-[8px] uppercase text-(--pixel-red) font-bold block mb-2 tracking-wider">
                TRAINER TECH BADGES ({TOP_SKILLS.length})
              </span>
              <div className="flex sm:flex-wrap items-center gap-3 overflow-x-auto pb-2 sm:pb-0 sm:justify-center">
                {TOP_SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative flex shrink-0 p-2 items-center justify-center border-2 border-border bg-(--pixel-cream) shadow-sm hover:border-amber-600 hover:bg-amber-50/50 transition-all cursor-default"
                  >
                    <TechIcon icon={skill.icon} size={36} />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[9px] font-pixel px-2 py-1 whitespace-nowrap z-50 shadow-md border border-white/20">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Specs */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-2 border-border bg-(--pixel-cream-alt) px-3 sm:px-4 py-2.5 font-pixel text-[7px] sm:text-[8px] font-bold text-foreground">
          <span className="flex items-center gap-1 text-(--pixel-red)">
            <Bug size={12} />
            <span>WEAKNESS: MONDAY x2</span>
          </span>
          <span className="flex items-center gap-1 text-(--pixel-forest)">
            <Coffee size={12} />
            <span>HELD ITEM: COFFEE</span>
          </span>
          <span className="flex items-center gap-1 text-foreground">
            <Footprints size={12} />
            <span>ABILITY: NEVER GIVE UP</span>
          </span>
          <span className="flex items-center gap-1 text-amber-700">
            <Star size={12} fill="currentColor" />
            <span>RARITY: ONE OF A KIND</span>
          </span>
        </div>
      </div>
    </div>
  );
}
