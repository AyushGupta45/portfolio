/** Classic Poké Ball as original pixel art — 16×16 grid, exact colors:
 * red #EE1515 top hemisphere, white #F5F5F5 bottom, near-black band,
 * outlined center button. */
const RED = "#EE1515";
const WHITE = "#F5F5F5";
const INK = "#212121";

const GRID = [
  "....oooooooo....",
  "...orrrrrrrro...",
  "..orrrrrrrrrro..",
  ".orrrrrrrrrrrro.",
  ".orrrrrrrrrrrro.",
  "orrrrrrrrrrrrrro",
  "orrrrrbbbbrrrrro",
  "obbbbbwwwwbbbbbo",
  "obbbbbwwwwbbbbbo",
  "owwwwwbbbbwwwwwo",
  "owwwwwwwwwwwwwwo",
  ".owwwwwwwwwwwwo.",
  ".owwwwwwwwwwwwo.",
  "..owwwwwwwwwwo..",
  "...owwwwwwwwo...",
  "....oooooooo....",
] as const;

const FILLS: Record<"o" | "r" | "w" | "b", string> = {
  o: INK,
  r: RED,
  w: WHITE,
  b: INK,
};

export function PixelPokeball({ cellSize = 8 }: { cellSize?: number }) {
  const cells: { x: number; y: number; fill: string; w: number }[] = [];

  // Merge horizontal runs of the SAME color into single rects.
  GRID.forEach((row, y) => {
    let runStart = -1;
    for (let x = 0; x <= row.length; x++) {
      const ch = x < row.length ? row[x] : undefined;
      const active = ch !== undefined && ch !== ".";
      if (active && runStart === -1) {
        runStart = x;
      } else if (runStart !== -1 && (!active || ch !== row[runStart])) {
        cells.push({
          x: runStart,
          y,
          w: x - runStart,
          fill: FILLS[row[runStart] as keyof typeof FILLS],
        });
        runStart = active ? x : -1;
      }
    }
  });

  return (
    <svg
      width={cellSize * 16}
      height={cellSize * 16}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={c.w} height={1} fill={c.fill} />
      ))}
    </svg>
  );
}
