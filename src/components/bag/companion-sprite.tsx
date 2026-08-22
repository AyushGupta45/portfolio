import { PixelPokeball } from "@/components/pixel/pokeball";

const SIZE_UNIT = 14;

export function CompanionSprite({
  className,
  cellSize = 8,
}: {
  className?: string;
  cellSize?: number;
}) {
  const size = cellSize * SIZE_UNIT;

  return (
    <span
      className={`pixel-frame animate-pixel-bob-delayed inline-flex ${className ?? ""}`}
      aria-hidden="true"
    >
      <span
        className="pixel-frame-inner pixel-corners pixel-corners-sm flex items-center justify-center overflow-hidden bg-[var(--pixel-cream)]"
        style={{ width: size, height: size }}
      >
        {/* ~62% of the frame so the ball reads as "inside" the window */}
        <PixelPokeball cellSize={Math.max(3, Math.round(cellSize * 0.625))} />
      </span>
    </span>
  );
}
