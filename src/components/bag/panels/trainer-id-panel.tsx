import { ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { LinkedinIcon } from "@/components/shared/brand-icons";

const current = experience.find((e) => e.current) ?? experience[0];

export function TrainerIdPanel() {
  return (
    <div>
      {/* <div className="mb-4 flex items-center gap-2">
        <LinkedinIcon size={16} className="text-muted-foreground" />
        <h2 className="font-pixel text-xs uppercase text-muted-foreground">Trainer ID · LinkedIn</h2>
      </div> */}

      <div className="border-2 border-border bg-card p-5">
        <div className="flex items-center gap-3 border-b-2 border-border pb-4">
          <span className="flex h-11 w-11 items-center justify-center border-2 border-amber/40 bg-amber/10 text-amber">
            <LinkedinIcon size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{profile.name}</p>
            <p className="text-xs text-muted-foreground">{profile.role}</p>
          </div>
        </div>

        <dl className="mt-4 space-y-2.5">
          <Row label="status" value={profile.status} />
          <Row label="current" value={`${current.role} @ ${current.company}`} />
          <Row label="location" value={profile.location} />
        </dl>

        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn mt-5 flex w-fit items-center gap-2 bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"
        >
          view on linkedin
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <dt className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
