"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/base-path";
import { sfx } from "@/lib/sfx";
import { cn } from "@/lib/utils";

const SIZE_UNIT = 14;

const DIALOGUE = [...profile.dialogue];

/** Reveals `text` a character at a time, Game Boy text-box style, with a
 * quiet blip every other visible character. Full text instantly under
 * prefers-reduced-motion. */
function useTypewriterLine(text: string, speed = 30): string {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setOutput(text);
      return;
    }

    setOutput("");
    let i = 0;
    const interval = window.setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      const ch = text[i - 1];
      if (i % 2 === 0 && ch && ch !== " ") sfx.blip();
      if (i >= text.length) window.clearInterval(interval);
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  return output;
}

/** Shared by PixelAvatar's own built-in dialogue and any caller that needs
 * to render the dialogue box itself (e.g. outside the avatar's own column,
 * so its variable width doesn't reflow a sibling layout). */
export function useTrainerDialogue() {
  const [lineIndex, setLineIndex] = useState(0);

  // Picked client-side (not in the initial useState) so server and client
  // render the same first line and only randomize once mounted — a fresh
  // line every time the site loads, not a hydration mismatch.
  useEffect(() => {
    setLineIndex(Math.floor(Math.random() * DIALOGUE.length));
  }, []);

  const cycle = useCallback(() => setLineIndex((i) => (i + 1) % DIALOGUE.length), []);

  return { line: DIALOGUE[lineIndex], cycle };
}

export function PixelAvatar({
  className,
  cellSize = 9,
  showDialogue = true,
  onClick,
}: {
  className?: string;
  cellSize?: number;
  /** Compact contexts (e.g. the persistent player card) skip the dialogue. */
  showDialogue?: boolean;
  /** Only used when showDialogue is false — lets a caller drive its own
   * externally-rendered dialogue (see TrainerProfile) via the click. */
  onClick?: () => void;
}) {
  const { line, cycle } = useTrainerDialogue();
  const typedLine = useTypewriterLine(line);
  const size = cellSize * SIZE_UNIT;

  const frame = (
    <span
      className="pixel-frame-inner pixel-corners pixel-corners-sm relative block overflow-hidden bg-[var(--pixel-cream)]"
      style={{ width: size, height: size }}
    >
      <Image
        src={withBasePath("/me.png")}
        alt={profile.name}
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </span>
  );

  if (!showDialogue) {
    if (!onClick) {
      return (
        <span className={cn("pixel-frame animate-pixel-bob inline-flex", className)}>{frame}</span>
      );
    }
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Talk to the trainer"
        className={cn("pixel-frame animate-pixel-bob inline-flex", className)}
      >
        {frame}
      </button>
    );
  }

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <button
        type="button"
        onClick={cycle}
        aria-label="Talk to the trainer"
        className="pixel-frame animate-pixel-bob"
      >
        {frame}
      </button>

      <div
        className="pixel-panel pixel-corners-sm flex min-h-10 max-w-[220px] items-center px-3 py-2 text-center text-xs"
        aria-live="polite"
      >
        <p className="text-[var(--pixel-ink)]">
          {typedLine}
          <span className="animate-blink" aria-hidden="true">
            ▼
          </span>
        </p>
      </div>
    </div>
  );
}
