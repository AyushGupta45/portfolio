const SEGMENTS = 10;

/** Segmented stat bar — the Projectdex DEPTH/STACK/REACH row, extracted so
 * other panels (trainer card etc.) reuse the exact component and its
 * colored-by-value fill logic (green ≥78, amber <78, red <50). */
export function StatBar({ label, value, hint }: { label: string; value: number; hint?: string }) {
  const filled = Math.round((value / 100) * SEGMENTS);
  const level = value < 50 ? "low" : value < 78 ? "mid" : "high";
  return (
    <div className="dex-stat-row" title={hint}>
      <span className="dex-stat-label">{label}</span>
      <span className="dex-stat-bar" aria-hidden="true">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <i
            key={i}
            className="dex-stat-seg"
            style={{ "--seg-i": i } as React.CSSProperties}
            data-filled={i < filled ? "true" : "false"}
            data-level={level}
          />
        ))}
      </span>
      <span className="dex-stat-value" data-level={level}>
        {String(value).padStart(3, "0")}
      </span>
    </div>
  );
}
