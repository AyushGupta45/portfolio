"use client";

import Image from "next/image";
import { BookOpen, GraduationCap, School, Zap } from "lucide-react";
import { education, type EducationEntry } from "@/data/education";

const MARKERS = [GraduationCap, BookOpen, School];

export function EducationPanel() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-2 border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 animate-pixel-bob">
            <Image
              src="/pokemon/bulbasaur.gif"
              alt="Bulbasaur Academy Mascot"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-pixel text-[10px] uppercase text-foreground font-bold">
              Trainer School & Academic Foundation
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              Formal education, specializations, academic honors, & learned technical moves.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block border-2 border-[var(--pixel-forest)] bg-[var(--pixel-grass)] text-[var(--pixel-ink)] px-3 py-1 font-pixel text-[8px] uppercase font-bold shadow-xs">
          HONORS GRADUATE
        </span>
      </div>

      <ol className="relative space-y-6 pl-8">
        <div
          className="absolute bottom-2 left-2.25 top-2 w-1 bg-[repeating-linear-gradient(to_bottom,var(--pixel-brown)_0,var(--pixel-brown)_6px,transparent_6px,transparent_12px)]"
          aria-hidden="true"
        />
        {education.map((entry, i) => (
          <EducationCard
            key={`${entry.degree}-${i}`}
            entry={entry}
            Marker={MARKERS[i % MARKERS.length]}
            latest={i === 0}
          />
        ))}
      </ol>
    </div>
  );
}

function EducationCard({
  entry,
  Marker,
  latest,
}: {
  entry: EducationEntry;
  Marker: typeof GraduationCap;
  latest: boolean;
}) {
  return (
    <li className="relative">
      {/* Badge marker */}
      <span
        className={`journey-badge absolute -left-8 top-1 flex items-center justify-center border-2 border-[var(--pixel-cream)] ${
          latest ? "journey-badge is-current" : ""
        }`}
        style={{ background: latest ? "var(--pixel-yellow)" : "var(--pixel-grass)" }}
        aria-hidden="true"
      >
        <Marker size={11} className="text-(--pixel-ink)" />
      </span>

      <div
        className={`hover-lift border-2 bg-card p-4 sm:p-5 shadow-sm ${
          latest ? "border-amber" : "border-border"
        }`}
        style={{ "--lift-accent": latest ? "var(--pixel-yellow)" : "var(--pixel-grass)" } as React.CSSProperties}
      >
        {/* Title + Period Row (matches experience layout) */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground leading-snug">
              {entry.degree}
            </h3>
            {/* <p className="mt-0.5 text-sm font-medium text-[var(--pixel-red)]">{entry.school}</p> */}
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {entry.grade && (
              <span className="border-2 border-(--pixel-red) bg-(--pixel-cream-alt) px-2 py-0.5 font-pixel text-[8px] font-bold text-[var(--pixel-red)]">
                GRADE: {entry.grade}
              </span>
            )}
            <span className="border-2 border-border bg-muted px-2.5 py-0.5 font-pixel text-[8px] text-muted-foreground">
              {entry.period}
            </span>
          </div>
        </div>

        {/* Highlights / Bullet Points Box */}
        {entry.highlights && entry.highlights.length > 0 && (
          <div className="mt-4 border-t border-dashed border-border pt-3">
            <p className="font-pixel text-[8px] uppercase tracking-wider text-[var(--pixel-red)] font-bold mb-2">
              ACADEMIC HIGHLIGHTS & ACHIEVEMENTS
            </p>
            <ul className="space-y-1.5">
              {entry.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--pixel-forest)]" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learned Moves / Coursework Badges Box */}
        {entry.coursework && entry.coursework.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-2">
            <span className="font-pixel text-[7px] uppercase tracking-wider text-muted-foreground mr-1">
              LEARNED MOVES:
            </span>
            {entry.coursework.map((course) => (
              <span key={course} className="pixel-tag">
                <Zap size={10} className="inline-block shrink-0 mr-1" />
                {course}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
