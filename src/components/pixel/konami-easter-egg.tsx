"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Classic Konami code — rewards exploration, blocks nothing. */
export function KonamiEasterEgg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let progress = 0;

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[progress]) {
        progress += 1;
        if (progress === SEQUENCE.length) {
          progress = 0;
          setShow(true);
          window.setTimeout(() => setShow(false), 4000);
        }
      } else {
        progress = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      className="pixel-panel pixel-corners animate-fade-up fixed bottom-5 left-1/2 -translate-x-1/2 px-5 py-3 font-pixel text-[11px]"
      style={{ zIndex: 400 }}
    >
      <p className="text-[var(--pixel-ink)] flex items-center gap-1.5">
        a shiny developer appeared!
        <Sparkles size={12} className="shrink-0" />
      </p>
    </div>
  );
}
