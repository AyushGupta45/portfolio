import { Star } from "lucide-react";
import { experience } from "@/data/experience";

export function JourneyPanel() {
  return (
    <ol className="relative space-y-6 pl-8">
      <div
        className="absolute bottom-2 left-[9px] top-2 w-1 bg-[repeating-linear-gradient(to_bottom,var(--pixel-brown)_0,var(--pixel-brown)_6px,transparent_6px,transparent_12px)]"
        aria-hidden="true"
      />
      {experience.map((role) => (
        <li key={role.company} className="relative">
          {/* gym-badge marker on the road; the current stop glimmers */}
          <span
            className={`journey-badge absolute -left-8 top-1 flex items-center justify-center border-2 border-[var(--pixel-cream)] ${
              role.current ? "journey-badge is-current" : ""
            }`}
            style={{ background: role.current ? "var(--pixel-yellow)" : "var(--pixel-grass)" }}
            aria-hidden="true"
          >
            {role.current && <Star size={11} className="text-[var(--pixel-ink)]" fill="currentColor" />}
          </span>
          <div
            className={`hover-lift border-2 bg-card p-4 ${
              role.current ? "border-amber" : "border-border"
            }`}
            style={{ "--lift-accent": role.current ? "var(--pixel-yellow)" : "var(--pixel-grass)" } as React.CSSProperties}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                {role.role}
                {role.current && (
                  <span className="ml-2 align-middle font-pixel text-[8px] text-amber">★ current</span>
                )}
              </h3>
              <span className="border-2 border-border px-2 py-0.5 font-pixel text-[8px] text-muted-foreground">
                {role.period}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-amber">{role.company}</p>
            <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground/70">
              {role.domain}
            </p>
            <ul className="mt-3 space-y-1.5">
              {role.points.map((point) => (
                <li key={point} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-muted-foreground" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {role.tags.map((tag) => (
                <span key={tag} className="pixel-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
