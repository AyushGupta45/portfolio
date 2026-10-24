"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import { DREAM_TEAM } from "@/data/dream-team";
import { TrainerProfile } from "@/components/pixel/trainer-profile";
import { TypeBadge } from "@/components/pixel/type-badge";

export function TrainerProfilePanel() {
  return (
    <div className="space-y-6">
      {/* 1. Full-Width Landscape Trainer Card */}
      <TrainerProfile />

      {/* 2. Trainer Lore & Background Section */}
      <div className="border-2 border-border bg-card p-5 space-y-4 shadow-sm">
        <h3 className="font-pixel text-[9px] uppercase tracking-[0.14em] text-[var(--pixel-red)] font-bold">
          Trainer Lore & Background
        </h3>
        {profile.about.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-foreground font-medium text-readable">
            {paragraph}
          </p>
        ))}
      </div>

      {/* 3. Dream Team Party Showcase Card */}
      <div className="border-2 border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-2.5 w-2.5 rounded-full bg-amber animate-pulse shrink-0" />
            <h3 className="font-pixel text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-foreground font-bold truncate">
              Trainer Dream Team Party (6/6)
            </h3>
          </div>
          <span className="font-pixel text-[7px] sm:text-[8px] text-(--pixel-forest) font-bold tracking-[0.12em] text-right">
            STATUS: ALL HEALED & READY
          </span>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {DREAM_TEAM.map((pokemon) => (
            <div
              key={pokemon.id}
              className="hover-lift flex flex-col items-center border-2 border-border bg-black/10 p-3 text-center group"
            >
              <div className="relative h-16 w-16 sm:h-24 sm:w-24 mb-2">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  fill
                  unoptimized
                  className="object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-foreground truncate w-full">
                {pokemon.name}
              </span>
              <span className="font-pixel text-[8px] font-bold text-[var(--pixel-red)]">
                Lv. {pokemon.level}
              </span>
              <div className="mt-1 flex flex-wrap gap-1 justify-center">
                {pokemon.type.map((t) => (
                  <TypeBadge key={t} type={t} className="text-[7px] !px-1.5 !py-0.5 !border !border-[var(--pixel-ink)] !shadow-none" />
                ))}
              </div>
              <p className="mt-2 font-pixel text-[7px] text-muted-foreground leading-tight w-full line-clamp-2">
                {pokemon.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
