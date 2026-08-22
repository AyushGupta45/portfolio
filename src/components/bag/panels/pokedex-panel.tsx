"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { projects } from "@/data/projects";
import { TypeBadge } from "@/components/pixel/type-badge";
import { DexCritter } from "@/components/pixel/dex-critter";
import { StatBar } from "@/components/shared/stat-bar";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<(typeof projects)[number]["status"], string> = {
  Active: "border-[var(--pixel-forest)] bg-[var(--pixel-grass)] text-[var(--pixel-ink)]",
  Shipped: "text-[var(--pixel-ink)] border-[var(--pixel-ink)] bg-[var(--pixel-cream-alt)]",
  Published: "border-[var(--pixel-ink)] bg-[var(--pixel-yellow)] text-[var(--pixel-ink)]",
};

const dexProjects = projects.filter((p) => p.showInDex !== false);

/** Stat bars derived from real project fields — no invented numbers.
 * Each metric is a count of something true about the entry; the
 * calibration spreads values across the low/mid/high bands so the
 * bars read like real Pokémon stats instead of a wall of green. */
function deriveStats(project: (typeof dexProjects)[number]) {
  const clamp = (n: number) => Math.min(100, n);
  return [
    {
      label: "depth",
      value: clamp(30 + project.achievements.length * 15),
      hint: "achievements listed",
    },
    {
      label: "stack",
      value: clamp(25 + project.tech.length * 9),
      hint: "tech in the stack",
    },
    {
      label: "reach",
      value: clamp(34 + project.categories.length * 22),
      hint: "domains it touches",
    },
    {
      label: "status",
      value: project.status === "Active" ? 92 : project.status === "Published" ? 80 : 70,
      hint: project.status.toLowerCase(),
    },
  ];
}

/** Counts up to `value` like a Pokédex odometer when the entry changes. */
function useOdometer(value: number, duration = 420): number {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = value;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || from === value) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setDisplay(Math.round(from + (value - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
}

function OdometerNumber({ value }: { value: number }) {
  const display = useOdometer(value);
  return <>{String(display).padStart(3, "0")}</>;
}

export function PokedexPanel() {
  const [selectedSlug, setSelectedSlug] = useState(dexProjects[0].slug);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dexProjects;
    return dexProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.categories.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);

  // Keep a valid selection even while filtering: if the current pick is
  // filtered out, fall back to the first match.
  const selected = filtered.find((p) => p.slug === selectedSlug) ?? filtered[0];

  const selectedIndex = dexProjects.findIndex((p) => p.slug === selected?.slug);

  return (
    <div className="grid gap-4 md:h-full md:grid-cols-[1fr_1.4fr] md:grid-rows-[minmax(0,1fr)]">
      <div className="flex min-h-0 flex-col gap-2">
        <label className="relative block">
          <span className="sr-only">Search entries</span>
          <Search
            size={12}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-(--pixel-ink-dim)"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search entries..."
            className="dex-search pl-7"
          />
        </label>

        <ul className="flex flex-col gap-1.5 md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-1">
          {filtered.map((project) => (
            <li key={project.slug}>
              <button
                type="button"
                onClick={() => setSelectedSlug(project.slug)}
                aria-current={project.slug === selected.slug ? "true" : undefined}
                className={cn(
                  "hover-lift flex w-full items-center gap-2 border-2 px-4 py-5 text-left text-xs",
                  project.slug === selected.slug
                    ? "border-amber bg-amber/15 text-amber"
                    : "border-border bg-card text-foreground hover:border-amber/40"
                )}
              >
                <span className="font-pixel text-[12px] text-muted-foreground">
                  {String(dexProjects.indexOf(project) + 1).padStart(3, "0")}
                </span>
                <span className="truncate font-medium">{project.name}</span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="border-2 border-dashed border-border px-3 py-4 text-center font-pixel text-[8px] text-muted-foreground">
              no entries found — try another search
            </li>
          )}
        </ul>
      </div>

      <div className="border-2 border-border bg-card p-5 md:min-h-0 md:overflow-y-auto">
        {selected ? (
          <div key={selected.slug} className="animate-fade-up">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-foreground">{selected.name}</h3>
              <span
                className={cn(
                  "shrink-0 border-2 px-2 py-0.5 font-pixel text-[8px]",
                  STATUS_STYLE[selected.status]
                )}
              >
                {selected.status}
              </span>
            </div>

            <p className="mt-0.5 font-pixel text-[8px] text-muted-foreground/70">
              no. <OdometerNumber value={selectedIndex + 1} /> · {selected.period}
            </p>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <div className="dex-sprite-window h-28 w-full shrink-0 sm:h-auto sm:w-32">
                <DexCritter blink className="h-24 text-(--dex-blue-dark) sm:h-32" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug text-[var(--pixel-ink)]">{selected.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selected.categories.map((c) => (
                    <TypeBadge key={c} category={c} />
                  ))}
                </div>
                {/* keyed so the staggered segment fill replays per entry */}
                <div className="mt-4 space-y-2" key={`stats-${selected.slug}`}>
                  {deriveStats(selected).map((s) => (
                    <StatBar key={s.label} {...s} />
                  ))}
                </div>
              </div>
            </div>

            {/* bold lead line + supporting detail instead of one gray wall */}
            <p className="mt-4 text-sm font-bold leading-snug text-[var(--pixel-ink)]">
              {selected.lead ?? selected.description}
            </p>
            {selected.lead && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
            )}

            <p className="mt-4 font-pixel text-[8px] uppercase tracking-wide text-muted-foreground/70">
              field notes
            </p>
            <ul className="mt-2 space-y-1.5">
              {selected.achievements.map((a) => (
                <li key={a} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-amber" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>

            <p className="mt-4 font-pixel text-[8px] uppercase tracking-wide text-muted-foreground/70">
              tech stack
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selected.tech.map((t) => (
                <span key={t} className="pixel-tag">
                  {t}
                </span>
              ))}
            </div>

            {selected.github && (
              <div className="mt-5 flex items-center justify-end border-t-2 border-border pt-4">
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-pixel text-[9px] text-amber hover:text-[var(--pixel-yellow)]"
                >
                  view source
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full min-h-40 items-center justify-center">
            <p className="font-pixel text-[9px] leading-relaxed text-muted-foreground">
              no data captured
              <br />
              for that search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
