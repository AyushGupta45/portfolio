/** Label/value list matching the Trainer ID's STATUS/CURRENT/LOCATION
 * block — extracted so any panel can reuse the exact rhythm. */
export function StatRows({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <dl className="space-y-2.5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-3 text-sm">
          <dt className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">{row.label}</dt>
          <dd className="text-right font-medium text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
