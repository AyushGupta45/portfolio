"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectThumbnailProps {
  project: Project;
  className?: string;
  aspectRatio?: "video" | "square" | "banner";
}

/**
 * Smart Project Thumbnail Component:
 * - If `project.image` is provided and loads successfully, renders the screenshot.
 * - If `project.image` is missing or fails, automatically generates a sleek, retro
 *   code canvas SVG mockup—making adding or updating future projects 100% effortless!
 */
export function ProjectThumbnail({
  project,
  className = "",
  aspectRatio = "video",
}: ProjectThumbnailProps) {
  const [imgError, setImgError] = useState(false);

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "banner"
      ? "aspect-[21/9]"
      : "aspect-video";

  if (project.image && !imgError) {
    return (
      <div className={`relative ${aspectClass} ${className}`} style={{ padding: 3, background: "var(--dex-blue-dark)" }}>
        <div className="pixel-corners pixel-corners-sm relative overflow-hidden bg-black/40 w-full h-full">
          <Image
            src={project.image}
            alt={`${project.name} screenshot mockup`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    );
  }

  // Dynamic Retro Code Canvas SVG Fallback
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden border-2 border-border bg-[#0d1117] p-3 text-emerald-400 font-mono select-none ${aspectClass} ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-emerald-900/60 pb-1.5 font-pixel text-[8px] tracking-wider text-emerald-500/80">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {project.slug}.exe
        </span>
        <span className="text-[7px] text-amber/80">{project.status}</span>
      </div>

      {/* Code body mockup */}
      <div className="my-auto space-y-1 font-pixel text-[9px] leading-tight text-emerald-400/90">
        <p className="text-amber/90 font-bold font-mono">{"// "}{project.name}</p>
        <p className="truncate text-emerald-300/80">&gt; {project.tagline}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="border border-emerald-800/80 bg-emerald-950/40 px-1 py-0.2 text-[7px] text-emerald-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-t border-emerald-900/60 pt-1 text-[7px] text-muted-foreground">
        <span>PROJECTDEX #{project.slug.slice(0, 5)}</span>
        <span className="text-amber flex items-center gap-1">READY <ArrowRight size={8} /></span>
      </div>
    </div>
  );
}
