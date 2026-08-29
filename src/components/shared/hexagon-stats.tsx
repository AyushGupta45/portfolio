"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

/**
 * Pokémon-style 6-axis hexagon radar chart, rendered in pure SVG.
 * Each axis is a "base stat" (HP / ATK / DEF / SPD / SP.ATK / SP.DEF)
 * derived from the project's real metadata — no external chart library.
 */

export interface HexStat {
  /** Short 3-char-ish label for the axis. */
  label: string;
  /** Full name shown in the legend/tooltip. */
  name: string;
  /** 0–100 value. */
  value: number;
  hint?: string;
}

function clamp(n: number) {
  return Math.min(100, Math.max(0, n));
}

/** Derive six Pokémon-flavoured stats from a project's metadata. */
export function deriveHexStats(project: Project): HexStat[] {
  const { achievements, tech, categories } = project;
  return [
    { label: "HP", name: "HP · Impact", value: clamp(45 + categories.length * 18), hint: "breadth of domains it touches" },
    { label: "ATK", name: "ATK · Complexity", value: clamp(40 + achievements.length * 16), hint: "scale of engineering effort" },
    { label: "DEF", name: "DEF · Robustness", value: clamp(48 + tech.length * 10), hint: "size of the tech stack" },
    { label: "SPD", name: "SPD · Velocity", value: project.status === "Active" ? 92 : project.status === "Published" ? 80 : 70, hint: "how current / shipped it is" },
    { label: "SP.ATK", name: "SP.ATK · Innovation", value: clamp(40 + (project.lead ? 25 : 15) + (tech.some((t) => /ai|ml|llm/i.test(t)) ? 20 : 0)), hint: "novelty & AI usage" },
    { label: "SP.DEF", name: "SP.DEF · Maintainability", value: clamp(46 + achievements.length * 12), hint: "documented & clean structure" },
  ];
}

const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = SIZE / 2 - 24;
const RINGS = 4;

function vertex(i: number, r: number): [number, number] {
  // Start at top (-90deg) so the first axis points up like a stat chart.
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

function polygonPoints(points: Array<[number, number]>) {
  return points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
}

export function HexagonStats({ project }: { project: Project }) {
  const stats = deriveHexStats(project);
  const [open, setOpen] = useState(false);

  // Fade + scale the whole chart in on mount, respecting reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOpen(true);
      return;
    }
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const dataPoints = stats.map((s, i) => vertex(i, RADIUS * (s.value / 100)));
  const dataPolygon = polygonPoints(dataPoints);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      {/* Chart */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={`h-48 w-48 shrink-0 transition-all duration-700 ease-out sm:h-56 sm:w-56 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        role="img"
        aria-label={`${project.name} stat hexagon`}
      >
        {/* Grid rings */}
        {Array.from({ length: RINGS }, (_, ring) => {
          const r = RADIUS * ((ring + 1) / RINGS);
          return (
            <polygon
              key={ring}
              points={polygonPoints(stats.map((_, i) => vertex(i, r)))}
              fill="none"
              stroke="var(--pixel-brown)"
              strokeOpacity={0.35}
              strokeWidth={1}
            />
          );
        })}
        {/* Spokes */}
        {stats.map((_, i) => {
          const [x, y] = vertex(i, RADIUS);
          return (
            <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--pixel-brown)" strokeOpacity={0.3} strokeWidth={1} />
          );
        })}

        {/* Value polygon */}
        <polygon
          points={dataPolygon}
          fill="var(--dex-yellow)"
          fillOpacity={0.35}
          stroke="var(--amber)"
          strokeWidth={2}
        />

        {/* Vertex dots */}
        {dataPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill="var(--amber)" stroke="var(--pixel-ink)" strokeWidth={1} />
        ))}

        {/* Axis labels */}
        {stats.map((s, i) => {
          const [x, y] = vertex(i, RADIUS + 16);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-pixel"
              fill="var(--pixel-ink)"
              style={{ fontSize: 9 }}
            >
              {s.label}
            </text>
          );
        })}
      </svg>

      {/* Legend / values & Progress Bars */}
      <div className="flex w-full flex-1 flex-col gap-2.5 mt-4 sm:mt-0">
        {stats.map((s) => {
          const level = s.value < 50 ? "low" : s.value < 75 ? "mid" : "high";
          const maxSegments = 15;
          const filledSegments = Math.round((s.value / 100) * maxSegments);
          
          return (
            <div key={s.label} className="dex-stat-row" title={s.hint}>
              <span className="dex-stat-label truncate" title={s.name}>{s.label}</span>
              <div className="dex-stat-bar">
                {Array.from({ length: maxSegments }).map((_, idx) => (
                  <span 
                    key={idx} 
                    className="dex-stat-seg" 
                    data-filled={idx < filledSegments}
                    data-level={level}
                  />
                ))}
              </div>
              <span className="dex-stat-value" data-level={level}>
                {String(Math.round(s.value)).padStart(3, "0")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
