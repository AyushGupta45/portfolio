import { Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { withBasePath } from "@/lib/base-path";

export function PokegearPanel() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3 border-2 border-border bg-card px-4 py-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your team is fully healed and ready for battle! Reach out below.
        </p>
        <span className="signal-bars shrink-0 text-(--pixel-grass)" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={`mailto:${profile.email}`}
          className="hover-lift flex h-full flex-col border-2 border-border bg-card p-4"
        >
          <Mail size={18} className="mb-3 text-amber" />
          <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">Email</p>
          <p className="mt-1 truncate text-sm font-medium text-foreground">{profile.email}</p>
        </a>

        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift flex h-full flex-col border-2 border-border bg-card p-4"
        >
          <GithubIcon size={18} className="mb-3 text-amber" />
          <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">GitHub</p>
          <p className="mt-1 truncate text-sm font-medium text-foreground">@{profile.githubHandle}</p>
        </a>

        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift flex h-full flex-col border-2 border-border bg-card p-4"
        >
          <LinkedinIcon size={18} className="mb-3 text-amber" />
          <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">LinkedIn</p>
          <p className="mt-1 truncate text-sm font-medium text-foreground">/in/ayushgupta</p>
        </a>

        <a
          href={withBasePath(profile.links.resume)}
          download
          className="hover-lift flex h-full flex-col border-2 border-amber bg-amber/10 p-4"
        >
          <Download size={18} className="mb-3 text-amber" />
          <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">Resume</p>
          <p className="mt-1 text-sm font-medium text-foreground">grab it</p>
        </a>
      </div>
    </div>
  );
}
