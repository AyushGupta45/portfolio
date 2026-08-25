"use client";

import Image from "next/image";

const SIZE_UNIT = 14;

export function CompanionSprite({
  className,
  cellSize = 8,
  pokemonSvg = "/pokemon/pikachu.gif",
}: {
  className?: string;
  cellSize?: number;
  pokemonSvg?: string;
}) {
  const size = cellSize * SIZE_UNIT;

  return (
    <span
      className={`pixel-frame animate-pixel-bob-delayed inline-flex ${className ?? ""}`}
      aria-hidden="true"
    >
      <span
        className="pixel-frame-inner pixel-corners pixel-corners-sm flex items-center justify-center overflow-hidden bg-[var(--pixel-cream)] p-1"
        style={{ width: size, height: size }}
      >
        <Image
          src={pokemonSvg}
          alt="Companion Pokemon"
          width={Math.round(size * 0.8)}
          height={Math.round(size * 0.8)}
          unoptimized
          className="h-full w-full object-contain"
        />
      </span>
    </span>
  );
}
