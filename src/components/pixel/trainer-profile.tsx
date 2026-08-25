"use client";

import { Bug, Coffee, Footprints, Sparkles, Star, Zap } from "lucide-react";
import {
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";
import { profile } from "@/data/profile";
import { PixelAvatar, useTrainerDialogue } from "./pixel-avatar";
import { CompanionSprite } from "@/components/bag/companion-sprite";
import { TechIcon } from "@/components/shared/tech-icons";

const TOP_SKILLS = [
  { icon: siTypescript, name: "TypeScript" },
  { icon: siReact, name: "React" },
  { icon: siNextdotjs, name: "Next.js" },
  { icon: siNodedotjs, name: "Node.js" },
  { icon: siPostgresql, name: "PostgreSQL" },
  { icon: siPython, name: "Python" },
];

const hometown = profile.location.split(",")[0].trim();
const yearsBuilding = profile.stats.find((s) => s.label === "Years building")?.value ?? "4+";

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
          <div className="flex items-center gap-1.5 font-pixel text-[10px] sm:text-xs text-[var(--pixel-red)] font-black shrink-0">
            <span>HP</span>
            <span className="text-sm">120</span>
            <Zap size={14} className="fill-[var(--pixel-red)] text-[var(--pixel-red)]" />
          </div>
        </div>

        {/* Main Content: Stage Box + Info Matrix */}
        <div className="flex flex-col md:flex-row gap-4 items-start mb-4">
          {/* Left Stage Box */}
          <div className="flex flex-col items-center gap-3 border-2 border-border bg-[var(--pixel-cream-alt)] p-3 shadow-sm shrink-0 w-full md:w-auto">
            <div className="relative flex items-center justify-center gap-2 sm:gap-3 border-2 border-border bg-[var(--pixel-cream)] p-2 sm:p-3 rounded-sm shadow-inner max-w-full overflow-hidden">
              <PixelAvatar showDialogue={false} cellSize={8} />
              <CompanionSprite cellSize={8} />
            </div>
            <div
              onClick={cycle}
              className="border-2 border-border bg-card px-3 py-2 text-center cursor-pointer hover:border-amber-600 transition-all w-full shadow-sm h-[52px] flex items-center justify-center"
              title="Click to cycle dialogue!"
            >
              <p className="font-semibold text-foreground text-[11px] leading-snug italic line-clamp-2">&quot;{line}&quot;</p>
            </div>
          </div>

          {/* Right Section: Stats + Badges */}
          <div className="space-y-3 flex-1 min-w-0 w-full">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 border-2 border-border bg-[var(--pixel-cream-alt)] p-3 text-xs">
              <div>
                <span className="font-pixel text-[8px] uppercase text-[var(--pixel-red)] font-bold block mb-0.5">CLASS</span>
                <span className="font-bold text-foreground text-[11px] sm:text-xs leading-snug">{profile.role}</span>
              </div>
              <div>
                <span className="font-pixel text-[8px] uppercase text-[var(--pixel-red)] font-bold block mb-0.5">STATUS</span>
                <span className="font-bold text-[var(--pixel-forest)] text-[11px] sm:text-xs leading-snug">{profile.status}</span>
              </div>
              <div>
                <span className="font-pixel text-[8px] uppercase text-[var(--pixel-red)] font-bold block mb-0.5">HOMETOWN</span>
                <span className="font-bold text-foreground text-[11px] sm:text-xs">{hometown}</span>
              </div>
              <div>
                <span className="font-pixel text-[8px] uppercase text-[var(--pixel-red)] font-bold block mb-0.5">JOURNEY</span>
                <span className="font-bold text-foreground text-[11px] sm:text-xs">{yearsBuilding} Years</span>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="border-2 border-border bg-card p-3 sm:p-4">
              <span className="font-pixel text-[8px] uppercase text-(--pixel-red) font-bold block mb-2 tracking-wider">
                MASTER TECH STACK BADGES (6/6)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOP_SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    title={skill.name}
                    className="flex items-center gap-2 border-2 border-border bg-(--pixel-cream) px-2.5 py-1.5 text-[10px] font-bold font-pixel text-foreground shadow-sm hover:border-amber-600 hover:bg-amber-50/50 transition-all cursor-default"
                  >
                    <TechIcon icon={skill.icon} size={20} />
                    <span className="truncate">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Moves & Abilities */}
        {/* <div className="border-2 border-border bg-card p-3 sm:p-4 space-y-3 mb-4 shadow-sm">
          <div className="border-b border-dashed border-border pb-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="shrink-0 border border-red-700 bg-red-600 text-white font-pixel text-[7px] px-2 py-0.5 font-bold uppercase">
                ABILITY
              </span>
              <h4 className="font-pixel text-[10px] sm:text-[11px] font-bold text-foreground uppercase flex items-center gap-1.5 min-w-0">
                <Sparkles size={13} className="text-amber-600 shrink-0" />
                <span className="truncate">System Architecture & AI Engineering</span>
              </h4>
            </div>
            <p className="text-xs text-foreground font-medium leading-relaxed pl-1">
              Engineers end-to-end full-stack web applications, multi-agent AI debate engines, and web scrapers.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-pixel text-[10px] sm:text-xs text-amber-600 font-bold flex items-center gap-0.5 shrink-0">
                  <Zap size={12} fill="currentColor" />
                  <Zap size={12} fill="currentColor" />
                </span>
                <h4 className="font-pixel text-[10px] sm:text-[11px] font-bold text-foreground uppercase truncate">
                  Full-Stack Deployment Blast
                </h4>
              </div>
              <span className="font-pixel text-[10px] sm:text-xs font-black text-[var(--pixel-red)] shrink-0">120</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed pl-1">
              {profile.heroHeadline}
            </p>
          </div>
        </div> */}

        {/* Footer Specs */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-2 border-border bg-[var(--pixel-cream-alt)] px-3 sm:px-4 py-2.5 font-pixel text-[7px] sm:text-[8px] font-bold text-foreground">
          <span className="flex items-center gap-1 text-(--pixel-red)">
            <Bug size={12} />
            <span>WEAKNESS: BUGS x2</span>
          </span>
          <span className="flex items-center gap-1 text-(--pixel-forest)">
            <Coffee size={12} />
            <span>RESISTANCE: COFFEE -30</span>
          </span>
          <span className="flex items-center gap-1 text-foreground">
            <Footprints size={12} />
            <span>RETREAT COST: 2x ENERGY</span>
          </span>
          <span className="flex items-center gap-1 text-amber-700">
            <Star size={12} fill="currentColor" />
            <span>SECRET RARE (100/100)</span>
          </span>
        </div>
      </div>
    </div>
  );
}
