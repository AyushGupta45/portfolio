import { BookOpen, GraduationCap, School } from "lucide-react";
import { education, type EducationEntry } from "@/data/education";

const MARKERS = [GraduationCap, BookOpen, School];

/** Trainer School — education timeline, sibling of the Journey panel:
 * same dashed road, badge markers, card internals, and chip language. */
export function EducationPanel() {
  return (
    <ol className="relative space-y-6 pl-8">
      <div
        className="absolute bottom-2 left-2.25 top-2 w-1 bg-[repeating-linear-gradient(to_bottom,var(--pixel-brown)_0,var(--pixel-brown)_6px,transparent_6px,transparent_12px)]"
        aria-hidden="true"
      />
      {education.map((entry, i) => (
        <EducationCard
          key={`${entry.degree}-${i}`}
          entry={entry}
          Marker={MARKERS[i % MARKERS.length]}
          latest={i === 0}
        />
      ))}
    </ol>
  );
}

function EducationCard({
  entry,
  Marker,
  latest,
}: {
  entry: EducationEntry;
  Marker: typeof GraduationCap;
  latest: boolean;
}) {
  return (
    <li className="relative">
      {/* badge marker on the road */}
      <span
        className={`journey-badge absolute -left-8 top-1 flex items-center justify-center border-2 border-(--pixel-cream) ${
          latest ? "journey-badge is-current" : ""
        }`}
        style={{ background: latest ? "var(--pixel-yellow)" : "var(--pixel-grass)" }}
        aria-hidden="true"
      >
        <Marker size={11} className="text-(--pixel-ink)" />
      </span>

      <div
        className={`hover-lift border-2 bg-card p-4 ${
          latest ? "border-amber" : "border-border"
        }`}
        style={{ "--lift-accent": latest ? "var(--pixel-yellow)" : "var(--pixel-grass)" } as React.CSSProperties}
      >
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-3">
          <h3 className="min-w-0 text-[10px] leading-snug text-foreground">{entry.degree}</h3>
          <span className="flex min-w-0 flex-wrap items-center gap-1.5">
            {entry.grade && (
              <span className="border-2 border-border px-2 py-0.5 font-pixel text-[8px] text-muted-foreground">
                {entry.grade}
              </span>
            )}
            <span className="border-2 border-border px-2 py-0.5 font-pixel text-[8px] text-muted-foreground">
              {entry.period}
            </span>
          </span>
        </div>

        <p className="mt-1.5 text-sm font-medium text-amber">{entry.school}</p>
      </div>
    </li>
  );
}
