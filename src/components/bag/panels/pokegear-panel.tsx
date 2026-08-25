"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Download, ExternalLink, FileText, Mail, Check } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { withBasePath } from "@/lib/base-path";

export function PokegearPanel() {
  const resumeHref = withBasePath(profile.links.resume);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-2 border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 animate-pixel-bob">
            <Image
              src="/pokemon/gengar.gif"
              alt="Gengar Pokegear Transmitter"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-pixel text-[10px] uppercase text-foreground">
              Pokégear Transmitters & Trainer ID Cards
            </h3>
            <p className="text-xs font-medium text-muted-foreground">
              Direct signal line, professional networks, PC repository box, & resume items.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="signal-bars shrink-0 text-[var(--pixel-forest)]" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="hidden sm:inline-block border-2 border-[var(--pixel-forest)] bg-[var(--pixel-grass)] text-[var(--pixel-ink)] px-2.5 py-0.5 font-pixel text-[8px] font-bold uppercase">
            ONLINE
          </span>
        </div>
      </div>

      {/* Grid of Consolidated Communications & Links */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 min-w-0">
        {/* Email Copy Action */}
        <button
          type="button"
          onClick={copyEmail}
          className="hover-lift flex flex-col justify-between border-2 border-border bg-card p-4 sm:p-5 group transition-colors hover:border-[var(--pixel-red)] text-left min-w-0"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-[var(--pixel-red)] bg-[var(--pixel-cream-alt)] text-[var(--pixel-red)] group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </span>
              <span className="font-pixel text-[8px] font-bold text-[var(--pixel-red)] uppercase">TRANSMITTER</span>
            </div>
            <p className="font-pixel text-[8px] uppercase tracking-wide text-foreground font-bold">
              DIRECT EMAIL
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">{profile.email}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between font-pixel text-[9px] font-bold text-[var(--pixel-red)] group-hover:underline">
            <span>{emailCopied ? "COPIED!" : "COPY EMAIL"}</span>
            {emailCopied ? <Check size={12} /> : <Copy size={12} />}
          </div>
        </button>

        {/* LinkedIn Trainer ID Card */}
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift flex flex-col justify-between border-2 border-border bg-card p-4 sm:p-5 group transition-colors hover:border-[var(--pixel-red)] min-w-0"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-border bg-[var(--pixel-cream-alt)] text-[var(--pixel-ink)] group-hover:scale-110 transition-transform">
                <LinkedinIcon size={20} />
              </span>
              <span className="font-pixel text-[8px] font-bold text-[var(--pixel-ink)] uppercase">TRAINER ID</span>
            </div>
            <p className="font-pixel text-[8px] uppercase tracking-wide text-foreground font-bold">
              LINKEDIN NETWORK
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              {profile.name} · @{profile.linkedinHandle}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between font-pixel text-[9px] font-bold text-[var(--pixel-red)] group-hover:underline">
            <span>CONNECT ON LINKEDIN</span>
            <ExternalLink size={12} />
          </div>
        </a>

        {/* GitHub PC Box Storage Card */}
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift flex flex-col justify-between border-2 border-border bg-card p-4 sm:p-5 group transition-colors hover:border-[var(--pixel-red)] min-w-0"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-border bg-[var(--pixel-cream-alt)] text-[var(--pixel-ink)] group-hover:scale-110 transition-transform">
                <GithubIcon size={20} />
              </span>
              <span className="font-pixel text-[8px] font-bold text-[var(--pixel-ink)] uppercase">PC STORAGE</span>
            </div>
            <p className="font-pixel text-[8px] uppercase tracking-wide text-foreground font-bold">
              GITHUB CODEVAULT ({profile.stats[1].value} REPOS)
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              @{profile.githubHandle}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between font-pixel text-[9px] font-bold text-[var(--pixel-red)] group-hover:underline">
            <span>VIEW CODE REPOSITORIES</span>
            <ExternalLink size={12} />
          </div>
        </a>

        {/* Resume Items Bag Card */}
        <div className="border-2 border-[var(--pixel-red)] bg-[var(--pixel-cream-alt)] p-4 sm:p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-[var(--pixel-red)] bg-[var(--pixel-yellow)] text-[var(--pixel-ink)]">
                <FileText size={20} />
              </span>
              <span className="font-pixel text-[8px] font-bold text-[var(--pixel-red)] uppercase">ITEM BAG</span>
            </div>
            <p className="font-pixel text-[8px] uppercase tracking-wide text-foreground font-bold">
              LATEST RESUME (PDF)
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              Ayush_Gupta_Resume.pdf
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--pixel-red)]/30 flex items-center gap-2">
            <a
              href={resumeHref}
              download
              className="pixel-btn flex flex-1 items-center justify-center gap-1.5 bg-primary py-2 font-pixel text-[8px] text-primary-foreground font-bold"
            >
              <Download size={12} />
              DOWNLOAD
            </a>
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn flex flex-1 items-center justify-center gap-1.5 border-2 border-border bg-card py-2 font-pixel text-[8px] text-foreground font-bold hover:bg-accent"
            >
              <ExternalLink size={12} />
              OPEN PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
