# Design — Pokédex Portfolio

A locked design system for this app. Read this file before touching visual styling on any page.

**2026 revision 2**: the site was rethemed from "GBA Bag interface (navy/cream)" to a **full
classic-Pokédex device**: red shell, blue lens/screens, yellow trim, dark maroon overworld. The
single-route structure is unchanged — an intro/title card followed by the device shell (player
card, tabbed item list, swappable content panel). Audio returned as an opt-in SFX system (square-
wave bleeps, mutable, persisted); there is still no music loop.

## Genre
playful (bespoke) — classic Pokédex hardware in service of a professional portfolio. Structure,
palette, and type are designed from first principles; no catalog theme fits a retro device world.

## Macrostructure
`/` is a two-state client app (`src/components/bag/bag-app.tsx`):

1. **Intro screen** (`intro-screen.tsx`) — dark maroon title card: trainer sprite, name, domain
   tags, current role, an "open pokedex" button, press-ENTER hint.
2. **Device shell** (`.bag-device`) — the red hardware frame with corner screws, containing:
   - **Header**: big blue lens circle, three blinking LEDs (red/yellow/green), dynamic title
     (`profile.bagTitle`), pixel clock, SFX mute toggle.
   - **Body** (three panes): `PlayerCard`, `BagNav` (tabbed item list, `▶` cursor,
     keyboard-navigable), `ContentPanel` (swaps in one of `src/components/bag/panels/*.tsx` per
     `src/lib/bag-items.ts`). Each item drives `--bag-accent` on selection (200ms).
   - Below 860px the body collapses to a stack: player card + list first, content panel swaps in
     via back button / Escape.

## Scroll model (important)
Desktop (≥860px): `.bag-shell { height: 100dvh; overflow: hidden }` — the device is locked to the
viewport. Only the nav list and the content panel's inner div scroll internally. Never reintroduce
page-level scrolling on desktop; new panels must keep their content inside the panel's scroll area.
Mobile (<860px): natural document flow (`height: auto; min-height: 100dvh`) for thumb-friendly
scrolling.

## Boot sequence
First open plays a power-on overlay (`boot-sequence.tsx`): lens glow, LED sweep, segmented loading
bar (~1.3s). Skippable with any click/key; instant under prefers-reduced-motion. Plays once per
session (per mount), not persisted.

## Sound
`src/lib/sfx.ts` — tiny Web Audio engine, square-wave only: nav blips, select/back two-tones, copy
chirp, boot jingle. Muted by default? No — **on by default**, toggled from the header
(`sfx-toggle.tsx`), preference persisted in localStorage (`dex-sfx-muted`). Context is created
lazily inside user gestures so autoplay policies never trip.

## Theme tokens (`globals.css :root`)
- `--background` oklch(14% 0.025 20) — near-black maroon overworld
- `--dex-red` oklch(57% 0.21 26) — main shell red
- `--dex-red-dark` / `--dex-red-deep` — shaded reds for header/borders
- `--dex-blue` / `--dex-blue-dark` / `--dex-blue-light` — lens & LCD screens
- `--pixel-yellow` oklch(78% 0.13 90) — highlight/LED trim
- `--pixel-grass` — green LED/success accents
- `--pixel-cream` oklch(93% 0.025 90) — inner "screen" panels
- `--pixel-brown` — panel borders
- `--pixel-ink` / `--pixel-ink-dim` — text on cream
- `--amber` **kept as an alias of dex-red** so every existing `text-amber`/`bg-amber/10`/
  `hover:border-amber` utility keeps working unchanged.

Legacy names `--pixel-navy*` alias the maroon world; `--pixel-forest` now aliases `--dex-blue-dark`.

## Typography
- Display/body: Geist Sans — all headings and readable copy.
- Pixel chrome: Press Start 2P (`--font-pixel`), weight 400 only — nav labels, eyebrows, buttons,
  badges, titlebars, stat labels. Never full sentences.
- Mono: Geist Mono — `<code>`/inline tags.

## Radius rule (with one exception)
Zero border-radius everywhere for content surfaces; corners come from `.pixel-corners` clip-path
notches or hard square edges. **Sole exception**: the hardware chrome — lens circle, LEDs, screws,
boot lens — is circular because that's what the physical object is. Don't extend the exception to
anything else without updating this file.

## Panels & screens
- `.pixel-panel` — cream screen, 3px brown border, hard offset shadow, re-scopes semantic tokens
  (--card/--foreground/--muted-foreground/…) so existing component classes read correctly on light
  surfaces.
- `.pixel-panel-titlebar` — blue LCD strip (`--bag-accent` tints it per selected item).
- `.dex-sprite-window` — blue dithered window holding the entry silhouette (`DexCritter`, an
  original generic critter — never redraw official Pokémon art).

## Projectdex specifics
- Entries numbered #001… by curated-list order; search filters name/tagline/tech/category live.
- Stat bars are **derived from real fields only** (achievement count, stack size, category breadth,
  status) rendered as 10 segmented cells — never invent RPG numbers about a person.
- Empty state ("no data captured") must keep the search field reachable.

## Motion
- Intro entrance: GSAP `power3.out` stagger.
- Panel entrance: `pixel-panel-in` (scale+fade 0.4s).
- Button press: hard offset-shadow collapse (`.pixel-btn`), steps(2).
- Idle bob: trainer/companion sprites, offset phases.
- Reduced-motion: global `[class*="animate-"]` guard plus explicit fallbacks on pixel-btn/panel/
  LEDs/boot/nav cursor.

## What pages MUST share
- The dex-red accent and its restrained placement; blue reserved for screens/lens.
- Geist Sans for readable text; Press Start 2P for UI chrome only.
- Zero radius on content surfaces (see the single hardware exception).
- The `PixelPanel` token re-scoping technique for any light-panel content.

## What pages MAY differ on
- Titlebar copy/iconography per item; whether a panel uses notched corners or plain hard borders.
