import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pokémon-type-badge-shaped pill in the panels' amber accent — for short
 * tags that aren't project categories (resume highlights etc.). */
export function PixelTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border-2 border-amber/40 bg-amber/10 px-2 py-[3px] font-pixel text-[9px] font-semibold uppercase tracking-[0.04em] text-amber",
        className
      )}
    >
      {children}
    </span>
  );
}
