"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import {
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { PixelAvatar, useTrainerDialogue } from "./pixel-avatar";
import { CompanionSprite } from "@/components/bag/companion-sprite";
import { TechIcon } from "@/components/shared/tech-icons";

// Trainer (132px) + companion (132px, both frames include their 3px pixel
// border) + the gap between them — fixed so the dialogue box below can sit
// at a constant width and only grow in height as its text changes, instead
// of the whole row reflowing.
const SPRITE_ROW_WIDTH = 276;

const current = experience.find((e) => e.current) ?? experience[0];

/** Actual core stack — official brand marks, swapped in for the old
 * robotics-era badge set (Python/OpenCV/PyTorch/etc.). */
const TOP_SKILLS = [siTypescript, siReact, siNextdotjs, siNodedotjs, siPostgresql, siPython];

const hometown = profile.location.split(",")[0].trim();
const yearsBuilding = profile.stats.find((s) => s.label === "Years building")?.value ?? "4+";

const FIELDS: [string, string][] = [
  ["name", profile.name],
  ["class", profile.role],
  ["specialty", current.domain],
  ["status", profile.status],
  ["based in", profile.location],
];

export function TrainerProfile() {
  const { line, cycle } = useTrainerDialogue();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
      <div className="shrink-0" style={{ width: SPRITE_ROW_WIDTH }}>
        <div className="trainer-card-flip" data-flipped={flipped}>
          <div className="trainer-card-flip-inner">
            <div className="trainer-card-face">
              <div className="flex items-start justify-center gap-3">
                <PixelAvatar showDialogue={false} onClick={cycle} />
                <CompanionSprite cellSize={9} />
              </div>

              <div
                className="pixel-panel pixel-corners-sm mt-3 w-full px-3 py-2 text-center text-xs"
                aria-live="polite"
              >
                <p className="text-[var(--pixel-ink)]">{line}</p>
              </div>
            </div>

            <div className="trainer-card-face trainer-card-face-back">
              <div className="pixel-panel pixel-corners-sm flex h-full flex-col justify-center gap-2 p-3 text-left">
                <Stat label="name" value={profile.name.split(" ")[0]} />
                <Stat label="hometown" value={hometown} />
                <Stat label="journey" value={`${yearsBuilding} years`} />

                <div className="mt-0.5">
                  <p className="mb-1.5 font-pixel text-[7px] uppercase tracking-wide text-muted-foreground">
                    badges
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {TOP_SKILLS.map((skill) => (
                      <span
                        key={skill.slug}
                        title={skill.title}
                        className="pixel-corners-sm flex h-7 w-7 items-center justify-center border-2 border-border bg-muted"
                      >
                        <TechIcon icon={skill} size={15} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Show trainer sprite" : "Show trainer card"}
          className="pixel-btn mt-3 flex w-full items-center justify-center gap-1.5 bg-card px-2 py-1.5 font-pixel text-[8px] uppercase text-foreground"
        >
          <RotateCw size={11} aria-hidden="true" />
          {flipped ? "back to sprite" : "flip trainer card"}
        </button>
      </div>

      <div className="w-full">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          {FIELDS.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="font-pixel text-[9px] uppercase tracking-wide text-amber">{label}</dt>
              <dd className="text-sm font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 border-t border-border pt-4">
          <p className="font-pixel text-[9px] uppercase tracking-wide text-amber">
            currently building
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {profile.heroHeadline}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="font-pixel text-[7px] uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-[var(--pixel-ink)]">{value}</dd>
    </div>
  );
}
