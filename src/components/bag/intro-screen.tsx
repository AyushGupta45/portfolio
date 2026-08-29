"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { projects, type ProjectCategory } from "@/data/projects";
import { BookOpen, ChevronDown, Swords, Zap } from "lucide-react";
import { PixelAvatar } from "@/components/pixel/pixel-avatar";
import { TypeBadge } from "@/components/pixel/type-badge";
import { useBag } from "./bag-provider";

const ENCOUNTER_LINE = "a wild full-stack systems engineer appeared!";

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

const FOCUS_CORNERS = [
  { pos: "tl", dx: -14, dy: -14 },
  { pos: "tr", dx: 14, dy: -14 },
  { pos: "bl", dx: -14, dy: 14 },
  { pos: "br", dx: 14, dy: 14 },
] as const;

export function IntroScreen() {
  const { openBag, setActiveId } = useBag();
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
        .from("[data-intro-item]", { opacity: 0, y: 18, duration: 0.6, stagger: 0.1 }, "-=0.35");
    },
    { scope }
  );

  // const openSkills = () => {
  //   openBag();
  //   setActiveId("skills");
  // };

  // const openProjects = () => {
  //   openBag();
  //   setActiveId("projects");
  // };

  return (
    <div
      ref={scope}
      data-phase={phase || undefined}
      className="intro-screen relative min-h-dvh w-full overflow-y-auto flex justify-center items-center select-none py-6 px-4 sm:py-10"
    >
      <div className="z-10 flex flex-col items-center justify-center gap-5 sm:gap-7 py-4 sm:py-6 text-center max-w-3xl w-full">
          {/* Battle Trainer Display with Flanking Pokemon */}
          <div data-intro-item className="relative flex flex-col items-center gap-2 w-full">
            {/* Pokemon Battle Level / HP HUD */}
            <div className="pixel-panel pixel-corners border-2 border-border bg-card/90 px-3 sm:px-4 py-1.5 sm:py-2 text-left w-full max-w-xs sm:max-w-sm shadow-md">
            <div className="flex items-center justify-between font-pixel text-[10px]">
              <span className="font-semibold text-foreground uppercase tracking-wider">
                {profile.name}
              </span>
              <span className="text-amber font-bold">Lv. 100</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-pixel text-[8px] text-emerald-400 font-bold">HP</span>
              <div className="h-2 flex-1 overflow-hidden border border-emerald-800 bg-emerald-950/60 p-0.5">
                <div className="h-full w-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="font-pixel text-[8px] text-muted-foreground font-bold">100/100</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center gap-4 sm:gap-12 my-2 sm:my-6">
            {/* Left Battle Companion: Pikachu */}
            <div className="relative h-16 w-16 sm:h-36 sm:w-36 animate-pixel-bob shrink-0">
              <Image
                src="/pokemon/pikachu.gif"
                alt="Pikachu battle companion"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Central Avatar */}
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

            {/* Right Battle Companion: Lucario */}
            <div className="relative h-16 w-16 sm:h-36 sm:w-36 animate-pixel-bob-delayed shrink-0">
              <Image
                src="/pokemon/lucario.gif"
                alt="Lucario battle companion"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>

          {/* Dialogue Textbox */}
          <div className="relative mt-0 sm:mt-1 min-h-5">
            <p aria-hidden="true" className="invisible font-pixel text-[10px] uppercase tracking-[0.15em] sm:text-xs">
              {ENCOUNTER_LINE}
            </p>
            <p
              aria-live="polite"
              className="absolute inset-0 font-pixel text-[10px] uppercase tracking-[0.15em] text-(--dex-yellow) sm:text-xs font-bold"
            >
              {typedEncounterLine}
            </p>
          </div>
        </div>

        {/* Headlines */}
        <div data-intro-item className="flex flex-col items-center gap-1">
          <h1 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {profile.name}
          </h1>
          <p className="max-w-md text-xs font-medium leading-snug text-(--pixel-grass) sm:text-sm">
            {profile.positioning}
          </p>
        </div>

        {/* Type Badges */}
        <div data-intro-item className="flex max-w-xl flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 py-1 sm:py-2 my-0 sm:my-1">
          {domains.map((domain) => (
            <TypeBadge key={domain} category={domain} />
          ))}
        </div>

        {/* Battle Command Menu Buttons */}
        <div data-intro-item className="flex flex-col items-center gap-2 w-full">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-pixel text-[10px] w-full">
            <button
              type="button"
              onClick={openBag}
              className="group pixel-btn flex w-36 sm:w-48 items-center justify-center gap-2 bg-(--dex-red) border-2 border-red-700 px-3 sm:px-4 py-2.5 sm:py-3 text-white font-bold hover:bg-red-600 hover:scale-105 transition-all shadow-md"
            >
              <BookOpen size={14} className="shrink-0 text-white" />
              <span className="text-[9px] sm:text-[10px]">OPEN POKÉDEX</span>
            </button>
            {/* <button
              type="button"
              onClick={openProjects}
              className="group pixel-btn flex w-36 sm:w-48 items-center justify-center gap-2 border-2 border-amber-500 bg-amber-500/20 px-3 sm:px-4 py-2.5 sm:py-3 text-amber-300 font-bold hover:bg-amber-500 hover:text-black hover:scale-105 transition-all shadow-md"
            >
              <Swords size={14} className="shrink-0 text-amber-400 group-hover:text-black transition-colors" />
              <span className="text-[9px] sm:text-[10px]">PROJECTDEX</span>
            </button>
            <button
              type="button"
              onClick={openSkills}
              className="group pixel-btn flex w-36 sm:w-48 items-center justify-center gap-2 border-2 border-emerald-500 bg-emerald-500/20 px-3 sm:px-4 py-2.5 sm:py-3 text-emerald-300 font-bold hover:bg-emerald-500 hover:text-black hover:scale-105 transition-all shadow-md"
            >
              <Zap size={14} className="shrink-0 text-emerald-400 group-hover:text-black transition-colors" />
              <span className="text-[9px] sm:text-[10px]">MOVESET</span>
            </button> */}
          </div>

          <p className="flex items-center mt-2 sm:mt-4 gap-1.5 font-pixel text-[9px] uppercase tracking-wide text-muted-foreground">
            press enter to continue
            <span className="animate-blink" aria-hidden="true">
              <ChevronDown size={24} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
