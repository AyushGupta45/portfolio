# Your Name — Pokédex Portfolio

A portfolio that looks like a **classic Pokédex**: a red device shell with a blue lens and LED
lights, a boot-up sequence, chiptune sound effects, and an inventory of panels (Trainer Profile,
Trainer Journey, Projectdex, Moveset, PC, Trainer ID, Documents, Pokégear). Built with
Next.js 15, TypeScript, Tailwind CSS v4, GSAP, and shadcn/ui.

The site is a single route (`/`) with two states:

1. **Intro screen** — trainer sprite, name, tagline, "open pokedex" button (or press Enter).
2. **Device shell** — header with lens/LEDs/clock/SFX toggle, player card, tabbed item list
   (keyboard-navigable: ↑/↓ move, Enter selects, Escape backs out), and a swappable content panel.

## Make it yours — the checklist

Everything personal lives in **`src/data/`** plus a handful of assets. Search the repo for `REPLACE`
to find every placeholder.

### 1. Data files (this covers ~90% of the site)

| File | What to change |
| --- | --- |
| [`src/data/profile.ts`](src/data/profile.ts) | Name, role, tagline, location, status, email, links, about paragraphs, education, stats, avatar dialogue lines, chrome labels (`bagTitle`, handles, `pcName`, console tag) |
| [`src/data/experience.ts`](src/data/experience.ts) | Your jobs, newest first; the entry with `current: true` feeds the intro screen and trainer card |
| [`src/data/projects.ts`](src/data/projects.ts) | Your projects. `featured` ones lead the Projectdex; `showInDex: false` keeps one out of the curated list but visible in the GitHub panel |
| [`src/data/skills.ts`](src/data/skills.ts) | Skill groups for the Moveset panel + spoken languages |

Project categories map to Pokémon-style type badges in [`src/lib/pixel-types.ts`](src/lib/pixel-types.ts)
(add a mapping there if you invent a new category).

### 2. Assets

| File | Purpose |
| --- | --- |
| `public/me.png` | Your portrait on the intro screen / player card (referenced from `src/components/pixel/pixel-avatar.tsx`) |
| `public/resume.pdf` | Your résumé (referenced by `profile.links.resume`) |
| `src/app/icon.svg` | Favicon/app icon (Pokéball-ish mark) |
| `public/cursor-dex.svg` | Custom cursor — delete the two `cursor:` rules at the bottom of `globals.css` if you don't want one |
| `src/components/pixel/pokeball.tsx` | Original pixel-art Poké Ball drawn in code — rendered inside `companion-sprite.tsx` |

### 3. Metadata & config

- `src/app/layout.tsx` — page title/description fall back to `profile.name`/`profile.role`; set your
  real domain in `NEXT_PUBLIC_SITE_URL`.
- `.github/workflows/deploy-pages.yml` — replace `https://yourusername.github.io` with your URL.
- Rename the repo to `<yourusername>.github.io` for GitHub's user-site serving (see Deployment).

## Tech stack

- **Framework**: Next.js 15.5 (App Router, React 19)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme`)
- **Components**: shadcn/ui (`components.json`, built on `@base-ui/react`)
- **Animation**: GSAP (`@gsap/react`) — intro entrance only
- **Sound**: hand-rolled Web Audio square-wave SFX (`src/lib/sfx.ts`), mutable, persisted in localStorage
- **Icons**: lucide-react (+ two hand-rolled brand marks)

## Layout behaviour

Desktop (≥860px): the device is locked to the viewport (`height: 100dvh`) — only the content panel
and item list scroll internally. Mobile (<860px): natural document flow, list/content swap via a
back button.

## Getting started

Requires **Node.js 20+**.

```bash
npm install
npm run dev
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build + type-check + lint |
| `npm run build:pages` | Static export for GitHub Pages (`STATIC_EXPORT=true`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

### Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://yourusername.github.io` | Canonical URL used in metadata, OG tags, JSON-LD, sitemap, robots.txt |
| `NEXT_PUBLIC_BASE_PATH` | unset | Set when deploying under a subpath (project sites) |

## Design system

[`design.md`](design.md) is the design contract — read it before changing visual styling. Palette,
type rules, the zero-radius rule (and its lens/LED exception), and component conventions are all
documented there.

## Easter eggs

Konami code (a shiny developer appears), devtools console hello, click-the-avatar NPC dialogue,
first-open popup. None gate real content.

## Known limitations

- `npm audit` reports transitive advisories inside `next@15.x` (fixed upstream in Next 16).
- OG/Twitter images prerender from `profile.*` at build time — rebuild after editing profile data.
- The custom cursor is forced over interactive elements for consistency; remove `body.theme-pixel *`
  cursor rule in `globals.css` if you'd rather keep native pointers.

## Deployment

### Vercel (recommended)

1. Push to GitHub → import at [vercel.com/new](https://vercel.com/new).
2. Set `NEXT_PUBLIC_SITE_URL`.
3. Deploy.

### GitHub Pages

GitHub Pages serves static files only. `npm run build:pages` switches Next to `output: "export"`;
the included workflow (`.github/workflows/deploy-pages.yml`) does this automatically on push to
`master`.

1. Repo name: `<yourusername>.github.io` → serves at the account root, no path prefix needed.
2. **Settings → Pages → Source → GitHub Actions**.
3. Push to `master`. Live at `https://<yourusername>.github.io`.

Test the static export locally first:

```bash
npm run build:pages
npx serve out
```

For project sites (`<user>.github.io/<repo>`), set `NEXT_PUBLIC_BASE_PATH=/<repo>` in the workflow —
see `next.config.ts`.
