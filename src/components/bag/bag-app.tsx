"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { BagProvider, useBag } from "./bag-provider";
import { IntroScreen } from "./intro-screen";
import { PlayerCard } from "./player-card";
import { BagNav } from "./bag-nav";
import { ContentPanel } from "./content-panel";
import { BootSequence } from "./boot-sequence";
import { SfxToggle } from "./sfx-toggle";
import { PixelClock } from "@/components/pixel/pixel-clock";
import { DexCritter } from "@/components/pixel/dex-critter";
import { profile } from "@/data/profile";
import { sfx } from "@/lib/sfx";

function DeviceChrome() {
  return (
    <>
      <span className="bag-device-screw bag-device-screw-tl" aria-hidden="true" />
      <span className="bag-device-screw bag-device-screw-tr" aria-hidden="true" />
      <span className="bag-device-screw bag-device-screw-bl" aria-hidden="true" />
      <span className="bag-device-screw bag-device-screw-br" aria-hidden="true" />
    </>
  );
}

/** True for ~`ms` after any dex-sfx event — drives the LED blip so the
 * hardware visibly reacts to sound. */
function useSfxPulse(ms = 170): boolean {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    let t: number | undefined;
    const onSfx = () => {
      window.clearTimeout(t);
      setPulse(true);
      t = window.setTimeout(() => setPulse(false), ms);
    };
    window.addEventListener("dex-sfx", onSfx);
    return () => {
      window.removeEventListener("dex-sfx", onSfx);
      window.clearTimeout(t);
    };
  }, [ms]);
  return pulse;
}

/** Soft specular sheen that trails the pointer across the whole screen.
 * Desktop fine-pointer devices only; off under reduced motion. */
function ScreenGlare() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="screen-glare" aria-hidden="true" />;
}

/** Tiny pixel sparkles dropped behind the cursor as it moves. */
function CursorTrail() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = 0;
    const colors = ["#f5d442", "#e8452f", "#7fb2e5", "#f5efe2"];
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 48) return;
      last = now;
      const spark = document.createElement("span");
      spark.className = "cursor-spark";
      const size = Math.random() > 0.5 ? 5 : 3;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${e.clientX - size / 2}px`;
      spark.style.top = `${e.clientY - size / 2}px`;
      spark.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(spark);
      spark.addEventListener("animationend", () => spark.remove());
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];
const SHINY_KEY = "dex-shiny";

/** ↑↑↓↓←→←→BA toggles a gold "shiny" shell palette for this visit. */
function useShinyMode() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SHINY_KEY) === "1") {
        document.body.classList.add("theme-shiny");
      }
    } catch {
      // no session storage — shiny just won't persist
    }
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        const on = document.body.classList.toggle("theme-shiny");
        sfx.fanfare();
        try {
          sessionStorage.setItem(SHINY_KEY, on ? "1" : "0");
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/** Visible B-button: backs out of content on mobile, closes the dex to
 * the intro screen otherwise. Same codepath as the Escape key. */
function BackButton() {
  const { backOut } = useBag();
  return (
    <button
      type="button"
      onClick={backOut}
      aria-label="Back to title screen"
      className="pixel-module font-pixel text-[9px]"
    >
      <ChevronLeft size={12} />
      <span className="hidden sm:inline">back</span>
    </button>
  );
}

function BagShell() {
  const { bagOpen, booting, finishBoot } = useBag();

  if (!bagOpen) return <IntroScreen />;

  return <DeviceShell booting={booting} finishBoot={finishBoot} />;
}

/** The open Pokédex hardware. Split from BagShell so the sfx-pulse
 * subscription only runs while the device is actually on screen. */
function DeviceShell({ booting, finishBoot }: { booting: boolean; finishBoot: () => void }) {
  const { mobileView } = useBag();
  const sfxPulse = useSfxPulse();

  return (
    <div className="bag-shell">
      {booting && <BootSequence onDone={finishBoot} />}

      <div className="bag-device">
        <DeviceChrome />
        <header className="bag-shell-header font-pixel">
          <span className="dex-lens" aria-hidden="true">
            <DexCritter className="lens-critter" />
            <i className="lens-glare" />
          </span>
          <span className="dex-leds" data-pulse={sfxPulse} data-booting={booting} aria-hidden="true">
            <i className="dex-led dex-led-red" />
            <i className="dex-led dex-led-yellow" />
            <i className="dex-led dex-led-green" />
          </span>
          <span className="min-w-0 flex-1 truncate">{profile.bagTitle}</span>
          <PixelClock />
          <SfxToggle />
          <BackButton />
        </header>

        <div className="bag-shell-body" data-mobile-view={mobileView}>
          <div className="bag-shell-left">
            <div className="bag-shell-player">
              <PlayerCard />
            </div>
            <BagNav className="bag-shell-nav" />
          </div>
          <ContentPanel className="bag-shell-content" />
        </div>
      </div>
    </div>
  );
}

export function BagApp() {
  useShinyMode();
  return (
    <BagProvider>
      <div className="app-scanlines" aria-hidden="true" />
      <ScreenGlare />
      <CursorTrail />
      <BagShell />
    </BagProvider>
  );
}
