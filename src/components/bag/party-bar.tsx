"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { DREAM_TEAM } from "@/data/dream-team";
import { TypeBadge } from "@/components/pixel/type-badge";

export function PartyBar({ className = "" }: { className?: string }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const showPopup = useCallback((id: number) => {
    const el = itemRefs.current.get(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pw = 224;
    let x = rect.left + rect.width / 2 - pw / 2;
    if (x + pw > window.innerWidth - 8) x = window.innerWidth - pw - 8;
    if (x < 8) x = 8;
    setPopupPos({ x, y: rect.bottom + 8 });
    setHoveredId(id);
  }, []);

  const hoveredPokemon = hoveredId !== null ? DREAM_TEAM.find((p) => p.id === hoveredId) : null;

  return (
    <div
      aria-label="Trainer Dream Team Party"
      className={`pixel-panel-sm flex items-center gap-2 bg-black/50 px-2.5 py-1 ${className}`}
    >
      <span className="font-pixel text-[8px] font-bold uppercase tracking-wider text-amber shrink-0 hidden lg:inline">
        PARTY:
      </span>
      <div className="flex items-center gap-1.5">
        {DREAM_TEAM.map((pokemon) => (
          <div
            key={pokemon.id}
            ref={(el) => {
              if (el) itemRefs.current.set(pokemon.id, el);
              else itemRefs.current.delete(pokemon.id);
            }}
            className="group relative flex h-8 w-8 shrink-0 items-center justify-center border-2 border-border bg-[var(--pixel-cream-alt)] p-0.5 transition-all duration-200 hover:scale-125 hover:border-amber cursor-pointer"
            onMouseEnter={() => showPopup(pokemon.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={26}
                height={26}
                unoptimized
                className="h-full w-full object-contain transition-transform group-hover:rotate-6"
              />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2 items-center justify-center rounded-full bg-emerald-500 ring-1 ring-black" />
          </div>
        ))}
      </div>

      {/* Hover popup rendered at body level with fixed positioning */}
      {hoveredPokemon && (
        <div
          className="pointer-events-none fixed z-9999! w-56 border-2 border-amber bg-card p-3 shadow-2xl"
          style={{ left: popupPos.x, top: popupPos.y }}
        >
          <div className="flex items-center gap-3 border-b border-border pb-2 mb-2">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src={hoveredPokemon.image}
                alt={hoveredPokemon.name}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-foreground truncate">{hoveredPokemon.name}</p>
              <p className="font-pixel text-[8px] text-[var(--pixel-red)] font-bold">
                Lv. {hoveredPokemon.level}
              </p>
            </div>
          </div>
          <p className="font-pixel text-[8px] text-muted-foreground leading-tight mb-2">
            {hoveredPokemon.role}
          </p>
          <div className="flex flex-wrap gap-1">
            {hoveredPokemon.type.map((t) => (
              <TypeBadge key={t} type={t} className="text-[7px] !px-1.5 !py-[2px] !border !border-[var(--pixel-ink)] !shadow-none" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
