import { Download, ExternalLink, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { withBasePath } from "@/lib/base-path";
import { PixelTag } from "@/components/shared/pixel-tag";
import { StatRows } from "@/components/shared/stat-rows";

const current = experience.find((e) => e.current) ?? experience[0];

/** Curated at-a-glance summary — every value traces back to app data
 * (experience.ts / education.ts / profile.about), nothing invented. */
const RESUME_TAGS = ["full-stack", "multi-agent ai", "freelance"];
const CORE_STACK = ["Next.js", "TypeScript", "Node.js"].join(", ");
const FOCUS_LINE = "Full-stack + agentic AI systems";

/** Documents panel — file card, highlight tags, and a stat block that
 * mirrors the Trainer ID rows, so the tab doesn't read as an empty page. */
export function DocumentsPanel() {
  const resumeHref = withBasePath(profile.links.resume);

  return (
    <div className="flex flex-col gap-5">
      <div className="border-2 border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-amber/40 bg-amber/10 text-amber">
            <FileText size={22} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">Ayush_Gupta_Resume.pdf</p>
            <p className="mt-0.5 font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">
              pdf · one page · latest
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t-2 border-dashed border-border pt-4 sm:flex-row">
          <a
            href={resumeHref}
            download
            className="pixel-btn flex flex-1 items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Download size={15} />
            download
          </a>
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn flex flex-1 items-center justify-center gap-2 border-2 border-border bg-[var(--pixel-cream-alt)] px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-amber/50"
          >
            <ExternalLink size={15} />
            open in new tab
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {RESUME_TAGS.map((tag) => (
          <PixelTag key={tag}>{tag}</PixelTag>
        ))}
      </div>

      <div className="border-2 border-border bg-card p-5">
        <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">resume at a glance</p>
        <div className="mt-4">
          <StatRows
            rows={[
              { label: "experience", value: `${current.role} @ ${current.company}` },
              { label: "education", value: education[0]?.degree ?? "" },
              { label: "core stack", value: CORE_STACK },
              { label: "focus", value: FOCUS_LINE },
            ]}
          />
        </div>
      </div>

      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        Last synced 22 Aug 2026 · always up to date!
      </p>
    </div>
  );
}
