"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { projects, type ProjectCategory } from "@/data/projects";
import { PixelAvatar } from "@/components/pixel/pixel-avatar";
import { TypeBadge } from "@/components/pixel/type-badge";
import { useBag } from "./bag-provider";

const ENCOUNTER_LINE = "a wild pokemon  appeared!";

/** Reveals `text` a character at a time, like a Game Boy dialogue box.
 * Skips straight to the full text under prefers-reduced-motion. */
function useTypewriter(text: string, speed = 32, delay = 150) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setOutput(text);
      return;
    }

    setOutput("");
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOutput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return output;
}

/** Where each focus bracket starts before snapping to its resting spot. */
const FOCUS_CORNERS = [
  { pos: "tl", dx: -14, dy: -14 },
  { pos: "tr", dx: 14, dy: -14 },
  { pos: "bl", dx: -14, dy: 14 },
  { pos: "br", dx: 14, dy: 14 },
] as const;

export function IntroScreen() {
  const { openBag } = useBag();
  const scope = useRef<HTMLDivElement>(null);
  const typedEncounterLine = useTypewriter(ENCOUNTER_LINE);
  const [phase, setPhase] = useState<string>("");

  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-height: 780px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const h = new Date().getHours();
    setPhase(h >= 5 && h < 10 ? "dawn" : h >= 10 && h < 17 ? "day" : h >= 17 && h < 21 ? "dusk" : "night");
  }, []);

  const domains = useMemo(() => {
    const seen = new Set<ProjectCategory>();
    projects.forEach((p) => p.categories.forEach((c) => seen.add(c)));
    return [...seen];
  }, []);

  // One codepath for click and keyboard — both call openBag.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        openBag();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openBag]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-focus-corner]", {
          x: (_i, el) => Number((el as HTMLElement).dataset.dx),
          y: (_i, el) => Number((el as HTMLElement).dataset.dy),
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
        })
        // content reveals while the reticle is still locking on
        .from("[data-intro-item]", { opacity: 0, y: 18, duration: 0.6, stagger: 0.1 }, "-=0.35");
    },
    { scope }
  );

  return (
    <div ref={scope} data-phase={phase || undefined} className="intro-screen relative h-dvh w-full overflow-hidden flex justify-center items-center">
   
      <div className="z-10 flex flex-col items-center justify-center gap-6 px-5 py-6 text-center">
        <div data-intro-item className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <span className="dex-focus-frame" aria-hidden="true">
              {FOCUS_CORNERS.map(({ pos, dx, dy }) => (
                <i
                  key={pos}
                  data-focus-corner
                  data-dx={dx}
                  data-dy={dy}
                  className={`dex-focus-corner dex-focus-${pos}`}
                />
              ))}
              <i className="dex-scanline" aria-hidden="true" />
            </span>

            <PixelAvatar cellSize={compact ? 9 : 11} showDialogue={false} />
          </div>

          <div className="relative mt-5">
            <p aria-hidden="true" className="invisible font-pixel text-[10px] uppercase tracking-[0.15em] sm:text-xs">
              {ENCOUNTER_LINE}
            </p>
            <p
              aria-live="polite"
              className="absolute inset-0 font-pixel text-[10px] uppercase tracking-[0.15em] text-(--dex-yellow) sm:text-xs"
            >
              {typedEncounterLine}
            </p>
          </div>
        </div>

        <div data-intro-item className="flex flex-col items-center gap-2">
          <h1 className="max-w-2xl text-balance text-2xl leading-tight text-foreground sm:text-4xl lg:text-[42px]">
            {profile.name}
          </h1>
          <p className="max-w-md text-base font-medium leading-snug text-(--pixel-grass) sm:text-lg">
            {profile.positioning}
          </p>
        </div>

        <div data-intro-item className="flex max-w-lg flex-wrap items-center justify-center gap-1.5">
          {domains.map((domain) => (
            <TypeBadge key={domain} category={domain} />
          ))}
        </div>

        <div data-intro-item className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={openBag}
            className="pixel-btn flex items-center gap-2.5 bg-primary px-7 py-3 font-pixel text-xs text-primary-foreground"
          >
            open pokedex
          </button>

          <p className="flex items-center mt-2 gap-1.5 font-pixel text-[9px] uppercase tracking-wide text-muted-foreground/70">
            press enter to continue
            <span className="animate-blink" aria-hidden="true">
              ▼
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
