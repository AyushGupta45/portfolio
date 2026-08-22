# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

A Next.js 15 (App Router, React 19, TypeScript strict) portfolio template, built as a single-route
(`/`) **Pokédex device**: a dark title screen ("open pokedex") that leads into a full-screen red
Pokédex shell — lens + LEDs in the header, a persistent player card (trainer + an original companion
sprite), a tabbed item list, and a content panel that swaps per selection. Desktop locks the device
to the viewport (only inner panes scroll); below 860px the layout flows naturally. Includes a boot
sequence and opt-out chiptune SFX (`src/lib/sfx.ts`). All personal data is placeholder-driven from
`src/data/` — see README's "Make it yours" checklist. See [design.md](design.md) for the full locked
design system (palette, type, radius exception, scroll model). This file covers commands and
architecture only; don't duplicate the README here.

## Commands

```bash
npm run dev          # dev server (Turbopack)
npm run build         # production build — includes type-check + lint
npm run build:pages    # static export build for GitHub Pages (sets STATIC_EXPORT=true)
npm run start           # serve a production build
npm run lint              # ESLint (flat config: next/core-web-vitals + next/typescript)
```

No test suite exists in this repo. There is no separate typecheck script — `npm run build` is how
type errors surface.

To smoke-test the GitHub Pages static export locally (the basePath won't be reproduced by a plain
`npx serve out`, see README's Deployment section for the workaround):

```bash
npm run build:pages
npx serve out
```

## Architecture

**Two build outputs from one config.** [next.config.ts](next.config.ts) branches on the
`STATIC_EXPORT` env var: unset → normal server build (Vercel/Node host, dynamic OG images, optimized
`next/image`); `STATIC_EXPORT=true` → `output: "export"` with `unoptimized` images and an optional
`basePath` from `NEXT_PUBLIC_BASE_PATH`. [lib/base-path.ts](src/lib/base-path.ts)'s
`withBasePath()` exists solely to make internal asset URLs correct under both modes — use it for any
new hardcoded `public/` asset reference. `.github/workflows/deploy-pages.yml` runs the static build
on every push to `master` and deploys to Pages.

**Content is fully data-driven.** Everything under [src/data/](src/data/) (`profile.ts`,
`experience.ts`, `projects.ts`, `skills.ts`) is a typed plain object/array —
no CMS, no fetches at runtime for this content. Adding a project, skill, or job means
editing the relevant data file; the panel components render off it directly and require no other
changes.

**The Pokédex world is not a theme toggle — it's the only mode, and the device shell is the only
page.**
`<body>` in [layout.tsx](src/app/layout.tsx) always carries `theme-pixel`, and every theme rule
in [globals.css](src/app/globals.css) is scoped under `body.theme-pixel ...`. There's no light/dark
or "default" style to fall back to, and no second route to branch on. `src/components/bag/` is the
whole app: `bag-app.tsx` (intro ⇄ shell state machine + device chrome), `bag-provider.tsx`
(`bagOpen` / `booting` / `activeId` / `mobileView` state + `↑↓ Enter Esc` keyboard nav with SFX),
`boot-sequence.tsx` (first-open power-on overlay), `sfx-toggle.tsx`, `intro-screen.tsx`,
`player-card.tsx` + `companion-sprite.tsx` (the persistent trainer/companion — the companion is
original pixel art drawn in code, `pixel/pokeball.tsx`, never official Pokémon art), `bag-nav.tsx`, `content-panel.tsx`,
and `panels/*.tsx` (one component per item, keyed by `src/lib/bag-items.ts`'s `BAG_ITEMS`).
`src/components/pixel/` holds pixel primitives: `PixelPanel` (the shared cream "screen" chrome every
panel is wrapped in), `PixelAvatar` (renders `public/me.png` inside the pixel-frame card
chrome), `DexCritter` (the original critter silhouette used by Projectdex entries), `PixelClock`,
`TrainerProfile`, `TypeBadge`. `PixelPanel`
re-scopes the shared semantic CSS tokens (`--card`, `--foreground`, `--border`, …) to a light cream
palette inside itself — existing component classNames (`bg-card`, `text-foreground`,
`text-muted-foreground`) read correctly against either the dark overworld or a light panel
automatically, with no per-component color-class forking. `src/lib/pixel-types.ts` maps
`ProjectCategory` to a restrained Pokémon-style "type" badge language (design vocabulary only, not a
literal claim about a project).

**Styling has no `tailwind.config.js`.** Tailwind v4 is configured CSS-first via `@theme` in
`globals.css` (see `components.json`'s `"tailwind": { "config": "" }`). shadcn/ui is set up with
style `base-nova` on `@base-ui/react`; run its CLI rather than hand-writing new primitives under
`src/components/ui/`.

**GSAP usage is centralized.** `src/lib/gsap.ts` registers GSAP + ScrollTrigger once; import from
there (not `gsap` directly) wherever animation is needed. The intro screen's entrance stagger is the
only remaining consumer — there's no scroll-reveal wrapper anymore (the old `Reveal` component was
removed with the scrolling homepage; a fixed-height Bag panel with its own internal scroll isn't a
good fit for a viewport-scroll-based `ScrollTrigger`).

**OG/Twitter images are static-generated, not runtime.** `app/opengraph-image.tsx` and
`app/twitter-image.tsx` use `next/og` with `export const dynamic = "force-static"` — prerendered
once at build time, compatible with the static export path. `src/lib/og-image.tsx` holds the shared
JSX both generators use.

## Environment

`NEXT_PUBLIC_SITE_URL` (default `https://yourusername.github.io`) drives canonical URLs across
metadata, OG tags, JSON-LD, sitemap, and robots.txt — must be set correctly per deployment target
(the Pages workflow sets it inline; Vercel needs it configured in project settings).
