"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sfx";
import { projects } from "@/data/projects";

const STEPS = 12;
const STEP_MS = 110;
const ENTRY_COUNT = projects.filter((p) => p.showInDex !== false).length;
const LINES = [
  "dex os v2.6",
  "memory check ok",
  `scanning entries... ${String(ENTRY_COUNT).padStart(3, "0")} found`,
  "battery ok",
  "ready",
];

/** Classic Pokédex power-on: lens glow, LED sweep, segmented loading bar
 * with memory-check readout, then a one-frame CRT flash before handover.
 * Skippable with any click/key; instant under prefers-reduced-motion. */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const [filled, setFilled] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const doneRef = useRef(false);
  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    sfx.boot();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      finish();
      return;
    }

    const interval = window.setInterval(() => {
      setFilled((f) => {
        if (f >= STEPS) {
          window.clearInterval(interval);
          // brief hold on "READY", then the flash-to-white handover
          window.setTimeout(() => setFlashing(true), 220);
          return f;
        }
        return f + 1;
      });
    }, STEP_MS);

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [finish]);

  // Flash fires after the bar fills; hand over mid-flash.
  useEffect(() => {
    if (!flashing) return;
    const t = window.setTimeout(finish, 130);
    return () => window.clearTimeout(t);
  }, [flashing, finish]);

  const lineIndex = Math.min(
    Math.floor((filled / STEPS) * LINES.length),
    LINES.length - 1
  );

  return (
    <div className="boot-overlay" role="status" aria-label="Booting">
      {flashing && <div className="boot-flash" aria-hidden="true" />}
      <span className="boot-lens" aria-hidden="true" />
      <span className="boot-leds" aria-hidden="true">
        <i className="dex-led dex-led-red" />
        <i className="dex-led dex-led-yellow" />
        <i className="dex-led dex-led-green" />
      </span>
      <div className="boot-progress" aria-hidden="true">
        {Array.from({ length: STEPS }, (_, i) => (
          <span key={i} data-on={i < filled ? "true" : "false"} />
        ))}
      </div>
      <p className="boot-text" aria-live="polite">
        {LINES[lineIndex]}
      </p>
      <p className="boot-hint">press any key to skip</p>
    </div>
  );
}
