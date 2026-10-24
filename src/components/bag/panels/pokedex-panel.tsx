"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Play, Search } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { TypeBadge } from "@/components/pixel/type-badge";
import { ProjectThumbnail } from "@/components/pixel/project-thumbnail";
import { HexagonStats } from "@/components/shared/hexagon-stats";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<Project["status"], string> = {
  Active: "border-[var(--pixel-forest)] bg-[var(--pixel-grass)] text-[var(--pixel-ink)]",
  Shipped: "text-[var(--pixel-ink)] border-[var(--pixel-ink)] bg-[var(--pixel-cream-alt)]",
  Published: "border-[var(--pixel-ink)] bg-[var(--pixel-yellow)] text-[var(--pixel-ink)]",
};

const dexProjects = projects.filter((p) => p.showInDex !== false);

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
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const parts = hash.split("/");
      if (parts[0] === "projects" && parts[1]) {
        setSelectedSlug(parts[1]);
      } else {
        setSelectedSlug(null);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
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

  const selected = selectedSlug
    ? dexProjects.find((p) => p.slug === selectedSlug) ?? null
    : null;

  const selectedIndex = selected ? dexProjects.findIndex((p) => p.slug === selected.slug) : 0;

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-border bg-card p-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 animate-pixel-bob">
            <Image
              src="/pokemon/greninja.gif"
              alt="Greninja Projectdex Mascot"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div>
          <h3 className="font-pixel text-[9px] uppercase tracking-[0.14em] text-foreground">
            Projectdex — Pokémon-style Project Catalogue
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Browse trainer&apos;s quest logs, view field data, and access live deployments or source code.
          </p>
          </div>
        </div>

        {/* Search Bar */}
        <label className="relative block shrink-0 sm:w-56">
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
            placeholder="search projects..."
            className="dex-search pl-7 w-full text-xs"
          />
        </label>
      </div>

      {/* VIEW SWITCH: DETAIL VIEW vs GRID VIEW */}
      {selected ? (
        /* DETAIL VIEW */
        <div key={selected.slug} className="animate-fade-up border-2 border-border bg-card p-5 space-y-5">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => { window.location.hash = "projects"; }}
            className="pixel-btn flex items-center gap-2 bg-muted px-4 py-2 font-pixel text-[8px] uppercase text-foreground hover:bg-accent"
          >
            <ArrowLeft size={13} />
            BACK TO PROJECTS
          </button>

          {/* Banner Screenshot Preview */}
          <div className="relative group overflow-hidden cursor-default">
            {selected.demo ? (
              <a href={selected.demo} target="_blank" rel="noopener noreferrer" className="block sm:pointer-events-none cursor-pointer sm:cursor-default">
                <ProjectThumbnail project={selected} aspectRatio="banner" className="w-full" />
              </a>
            ) : selected.github ? (
              <a href={selected.github} target="_blank" rel="noopener noreferrer" className="block sm:pointer-events-none cursor-pointer sm:cursor-default">
                <ProjectThumbnail project={selected} aspectRatio="banner" className="w-full" />
              </a>
            ) : (
              <ProjectThumbnail project={selected} aspectRatio="banner" className="w-full" />
            )}
            <div className="absolute top-2 right-2 flex gap-1.5 z-10 transition-opacity group-hover:opacity-0">
              <span
                className={cn(
                  "border-2 px-2.5 py-0.5 font-pixel text-[8px] font-bold shadow-md",
                  STATUS_STYLE[selected.status]
                )}
              >
                {selected.status}
              </span>
            </div>
            
            {/* Hover Link Overlay (Hidden on Mobile) */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-4 z-20">
              {selected.demo && (
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn flex items-center gap-2 bg-emerald-500 px-4 py-2.5 font-pixel text-[8px] text-black font-bold hover:bg-emerald-400"
                >
                  <Play size={12} fill="currentColor" />
                  PLAY / LIVE DEMO
                </a>
              )}
              {selected.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn flex items-center gap-2 bg-primary px-4 py-2.5 font-pixel text-[8px] text-primary-foreground hover:bg-primary/90"
                >
                  VIEW SOURCE
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Meta Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
            <div>
              <h3 className="text-xl font-bold text-foreground">{selected.name}</h3>
              <p className="mt-0.5 font-pixel text-[8px] text-muted-foreground">
                NO. <OdometerNumber value={selectedIndex + 1} /> · {selected.period}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selected.categories.map((c) => (
                <TypeBadge key={c} category={c} />
              ))}
            </div>
          </div>

          <p className="text-sm font-semibold leading-relaxed text-amber">{selected.tagline}</p>

          {/* Description & Lead */}
          <div className="space-y-2">
            <p className="text-sm font-bold leading-snug text-foreground">
              {selected.lead ?? selected.description}
            </p>
            {selected.lead && (
              <p className="text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
            )}
          </div>

          {/* Base-Stat Hexagram */}
          <div className="border-2 border-border bg-black/20 p-4">
            <p className="font-pixel text-[8px] uppercase tracking-wide text-amber mb-3">
              BASE STAT HEXAGRAM
            </p>
            <HexagonStats project={selected} />
          </div>

          {/* Field Notes / Achievements */}
          <div>
            <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground mb-2">
              FIELD NOTES & ACHIEVEMENTS
            </p>
            <ul className="space-y-1.5">
              {selected.achievements.map((a) => (
                <li key={a} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground mb-2">
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selected.tech.map((t) => (
                <span key={t} className="pixel-tag pixel-tag-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Links Footer: Optional Live Demo & GitHub */}
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-4">
            {selected.demo && (
              <a
                href={selected.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn flex items-center gap-2 bg-emerald-500 px-4 py-2.5 font-pixel text-[8px] text-black font-bold hover:bg-emerald-400"
              >
                <Play size={12} fill="currentColor" />
                PLAY / LIVE DEMO
              </a>
            )}
            {selected.github && (
              <a
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn flex items-center gap-2 bg-primary px-4 py-2.5 font-pixel text-[8px] text-primary-foreground hover:bg-primary/90"
              >
                VIEW SOURCE ON GITHUB
                <ExternalLink size={12} />
              </a>
            )}
          </div>

        </div>
      ) : (
        /* GRID VIEW (6 Cards) */
        <div>
          {filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => {
                const idx = dexProjects.indexOf(project);
                return (
                  <div
                    key={project.slug}
                    onClick={() => { window.location.hash = `projects/${project.slug}`; }}
                    className="hover-lift group cursor-pointer border-2 border-border bg-card p-3 flex flex-col justify-between min-w-0 transition-transform duration-300 hover:scale-[1.03] hover:border-amber"
                  >
                    <div>
                      {/* Project Screenshot / Dynamic Mockup */}
                      <div className="relative mb-3">
                        <ProjectThumbnail project={project} aspectRatio="video" />
                        <span className="absolute top-1.5 left-1.5 border border-black bg-black/80 px-1.5 py-0.5 font-pixel text-[7px] text-amber">
                          #{String(idx + 1).padStart(3, "0")}
                        </span>
                        <span
                          className={cn(
                            "absolute top-1.5 right-1.5 border px-1.5 py-0.5 font-pixel text-[7px]",
                            STATUS_STYLE[project.status]
                          )}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Project Header */}
                      <h4 className="text-base font-bold text-foreground group-hover:text-amber transition-colors">
                        {project.name}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.categories.slice(0, 2).map((c) => (
                          <TypeBadge key={c} category={c} className="scale-90 origin-left" />
                        ))}
                      </div>
                      <span className="font-pixel text-[8px] text-amber group-hover:underline flex items-center gap-1">
                        INSPECT
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border-2 border-dashed border-border bg-card p-8 text-center">
              <p className="font-pixel text-[8px] text-muted-foreground">
                NO PROJECTS FOUND MATCHING &quot;{query}&quot;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
