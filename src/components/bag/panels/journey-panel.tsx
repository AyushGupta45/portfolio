"use client";

import Image from "next/image";
import { Swords, Star } from "lucide-react";
import { experience } from "@/data/experience";

export function JourneyPanel() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-2 border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 animate-pixel-bob">
            <Image
              src="/pokemon/charizard.gif"
              alt="Charizard Gym Guardian"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-pixel text-[9px] uppercase tracking-[0.14em] text-foreground">
              Trainer Journey & League Battles
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Milestone achievements, enterprise engineering, & production deployments.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block border-2 border-amber bg-amber/10 px-3 py-1 font-pixel text-[8px] text-amber uppercase">
          CHAMPION LEAGUE
        </span>
      </div>

      <ol className="relative space-y-6 pl-8">
        <div
          className="absolute bottom-2 left-[9px] top-2 w-1 bg-[repeating-linear-gradient(to_bottom,var(--pixel-brown)_0,var(--pixel-brown)_6px,transparent_6px,transparent_12px)]"
          aria-hidden="true"
        />
        {experience.map((role, idx) => (
          <li key={role.company} className="relative">
            {/* Gym Badge marker */}
            <span
              className={`journey-badge absolute -left-8 top-1 flex items-center justify-center border-2 border-[var(--pixel-cream)] ${
                role.current ? "journey-badge is-current" : ""
              }`}
              style={{ background: role.current ? "var(--pixel-yellow)" : "var(--pixel-grass)" }}
              aria-hidden="true"
            >
              {role.current ? (
                <Star size={11} className="text-[var(--pixel-ink)]" fill="currentColor" />
              ) : (
                <span className="font-pixel text-[7px] text-[var(--pixel-ink)]">#{idx + 1}</span>
              )}
            </span>

            <div
              className={`hover-lift border-2 bg-card p-4 sm:p-5 ${
                role.current ? "border-amber" : "border-border"
              }`}
              style={{ "--lift-accent": role.current ? "var(--pixel-yellow)" : "var(--pixel-grass)" } as React.CSSProperties}
            >
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    {role.role}
                    {role.current && (
                      <span className="border-2 border-amber bg-amber/20 px-2 py-0.5 font-pixel text-[8px] text-amber">
                      <Star size={10} className="inline-block shrink-0 mr-1" />
                      CURRENT ROLE
                    </span>
                    )}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-amber">{role.company}</p>
                </div>
                <span className="border-2 border-border bg-muted px-2.5 py-1 font-pixel text-[8px] text-muted-foreground shrink-0">
                  {role.period}
                </span>
              </div>

              <p className="mt-1 font-pixel text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                DOMAIN: {role.domain}
              </p>

              {/* Achievements / Battle Notes */}
              <div className="mt-4 border-t border-dashed border-border pt-3">
                <p className="font-pixel text-[8px] uppercase tracking-wider text-amber mb-2 flex items-center gap-1.5">
                  <Swords size={11} className="shrink-0" />
                  BATTLE NOTES & IMPACT
                </p>
                <ul className="space-y-2">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Type Advantage Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-2">
                <span className="font-pixel text-[7px] uppercase tracking-wider text-muted-foreground mr-1">
                  TYPE ADVANTAGES:
                </span>
                {role.tags.map((tag) => (
                  <span key={tag} className="pixel-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
