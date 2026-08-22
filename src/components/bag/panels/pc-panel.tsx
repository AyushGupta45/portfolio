import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { GithubIcon } from "@/components/shared/brand-icons";
import { profile } from "@/data/profile";

export function PcPanel() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3 border-2 border-border bg-card px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-amber/40 bg-amber/10 text-amber">
            <GithubIcon size={20} />
          </span>
          <div className="min-w-0">
            <p className="truncate font-pixel text-[9px] uppercase tracking-wide text-muted-foreground">
              {profile.pcName}
            </p>
            <p className="mt-1 truncate text-sm font-medium text-foreground">
              @{profile.githubHandle} · {profile.stats[1].value} repos
            </p>
          </div>
        </div>

        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn flex shrink-0 items-center gap-1.5 bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
        >
          profile
          <ExternalLink size={12} />
        </a>
      </div>

      <ul className="flex flex-col gap-3">
        {projects.map((project) => (
          <li key={project.slug}>
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="pixel-panel pixel-corners-sm flex items-center justify-between px-4 py-3 transition-colors hover:bg-accent"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {project.name}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    /{project.slug}
                  </span>
                </span>
                <ExternalLink
                  size={14}
                  className="ml-3 shrink-0 text-muted-foreground"
                />
              </a>
            ) : (
              <div className="pixel-panel pixel-corners-sm flex items-center justify-between px-4 py-3 opacity-70">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {project.name}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    private / off-github
                  </span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}