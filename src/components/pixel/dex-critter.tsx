import { cn } from "@/lib/utils";

/* An original pixel imp — deliberately NOT shaped after any existing
 * creature (round body, horn nubs, white grin/eyes are generic folklore
 * monster territory). Official Pokémon art stays out of this repo on
 * purpose; swap in your own licensed art instead if you want a real
 * species here. '#' = body (currentColor), 'w' = white accents. */
const GRID = [
  "..#..........#..",
  ".##..........##.",
  ".###........###.",
  ".##############.",
  "################",
  "################",
  "##ww########ww##",
  "################",
  "################",
  "####ww####ww####",
  "################",
  ".##############.",
  "..############..",
  "..##..####..##..",
];

export function DexCritter({
  className,
  style,
  blink,
}: {
  className?: string;
  style?: React.CSSProperties;
  /** Eyelids periodically cover the white eyes — idle "alive" touch. */
  blink?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 16 14"
      shapeRendering="crispEdges"
      className={cn("h-full w-auto", className)}
      style={style}
      aria-hidden="true"
    >
      {GRID.flatMap((row, y) =>
        [...row].map((cell, x) => {
          if (cell === "#") {
            return (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill="currentColor"
              />
            );
          }
          if (cell === "w") {
            return (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill="#f5efe2"
              />
            );
          }
          return null;
        }),
      )}
      {blink && (
        <g className="critter-blink">
          {/* eyelid rects in body colour — drawn after the eyes so they
              cover them exactly during the blink frames */}
          <rect x={3} y={6} width={2} height={1} fill="currentColor" />
          <rect x={12} y={6} width={2} height={1} fill="currentColor" />
        </g>
      )}
    </svg>
  );
}
