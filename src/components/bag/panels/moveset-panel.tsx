"use client";

import Image from "next/image";
import {
  Bot,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  Layout,
  Server,
  Sparkles,
  Video,
  Wrench,
} from "lucide-react";
import { skills } from "@/data/skills";

const ICONS: Record<string, React.ReactNode> = {
  "AI & ML": <Sparkles size={15} />,
  Languages: <Code2 size={15} />,
  "Computer Vision": <Video size={15} />,
  Robotics: <Bot size={15} />,
  "Embedded Systems": <Cpu size={15} />,
  Automation: <Boxes size={15} />,
  Cloud: <Cloud size={15} />,
  Databases: <Database size={15} />,
  Backend: <Server size={15} />,
  Frontend: <Layout size={15} />,
  Tools: <Wrench size={15} />,
};

const ACCENT: Record<string, string> = {
  Languages: "var(--pixel-yellow)",
  Frontend: "var(--dex-blue)",
  Backend: "var(--pixel-red)",
  Databases: "var(--pixel-brown)",
  "AI & ML": "oklch(58% 0.08 320)",
  Tools: "oklch(68% 0.02 250)",
};

const TYPE_ELEMENT: Record<string, string> = {
  "AI & ML": "PSYCHIC / AGENTIC",
  Languages: "ELECTRIC / LOGIC",
  Frontend: "WATER / UI & UX",
  Backend: "FIRE / SERVERS",
  Databases: "DRAGON / STORAGE",
  Tools: "STEEL / DEVOPS",
};

export function MovesetPanel() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-2 border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 animate-pixel-bob">
            <Image
              src="/pokemon/mewtwo.gif"
              alt="Mewtwo Moveset Master"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-pixel text-[9px] uppercase tracking-[0.14em] text-foreground">
              Trainer Moveset & Technical Type Matchups
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Battle-tested skills categorized by technical domain & power proficiency.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block border-2 border-purple-500 bg-purple-950/40 px-3 py-1 font-pixel text-[8px] text-purple-300 uppercase">
          FULL MOVESET UNLOCKED
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.category}
            className="hover-lift move-card border-2 border-border bg-card p-4 flex flex-col justify-between"
            style={{ "--move-accent": ACCENT[group.category] ?? "var(--amber)" } as React.CSSProperties}
          >
            <div>
              <div className="moves-head mb-3 flex items-center justify-between border-b-2 border-border pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-amber">{ICONS[group.category] ?? ICONS.Tools}</span>
                  <div>
                    <h3 className="font-pixel text-[8px] uppercase tracking-wide text-foreground">
                      {group.category}
                    </h3>
                    <span className="font-pixel text-[7px] text-muted-foreground block uppercase">
                      {TYPE_ELEMENT[group.category] ?? "NORMAL TYPE"}
                    </span>
                  </div>
                </div>
                <span className="pp-chip font-pixel text-[8px]">
                  PP {group.skills.length * 5}/{group.skills.length * 5}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="pixel-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Power Meter Gauge */}
            <div className="mt-4 pt-2 border-t border-dashed border-border/60 flex items-center justify-between text-[8px] font-pixel text-muted-foreground">
              <span>POWER: MAX</span>
              <span className="text-amber">ACCURACY: 100%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
