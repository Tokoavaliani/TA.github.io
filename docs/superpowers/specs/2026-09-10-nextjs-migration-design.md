# Portfolio migration: Astro → Next.js — Design

**Status:** Approved 2026-09-10. Ready for implementation planning.

## Context

The repo currently contains an uncommitted, largely-finished Astro build of a
locked design direction ("Instrument" — see prior decisions below) alongside
the original pre-migration static HTML site (now staged for deletion). The
Astro build matches the locked design pixel-for-pixel but the framework
choice is being changed: this migration re-implements the same design and
content on Next.js instead of Astro. **No visual or content redesign is in
scope** — colors, layout, copy, and interactions carry over unchanged.

### Locked design direction ("Instrument")

Decided in an earlier session (2026-07-17), unchanged by this migration:

- Split layout: sticky left "identity" panel (name, role, scroll-spy nav,
  socials, Download CV) + scrolling right content (About → Experience →
  Projects). Hover-lift rows with a mono date column and tech tags. Mono
  section labels (`01 / 02 / 03`), hairline rules, tabular-nums dates.
- Two color modes toggled via an `html.dark` class:
  - **Parchment (light, default):** `--bg:#f2efe7 --bg-soft:#faf8f2
    --line:#dcd6c8 --head:#201d16 --body:#494539 --dim:#726d5e`, accent
    **Spruce `#1d6149`**.
  - **Dusk (dark):** `--bg:#181410 --bg-soft:#221d16 --line:#39322a
    --head:#f4efe6 --body:#cabfae --dim:#978c7d`, accent light sage
    `#b4d3c5`.
  - Accent is "Caius Blue" — an identity easter egg on "Caius Boat Club" in
    the About copy.
- Type: Inter (grotesque sans) for headings/body, JetBrains Mono for labels.
  Self-hosted, no CDN.
- Icons: inline SVG, no third-party icon kit (this was already a deliberate
  fix — the old FontAwesome CDN kit caused a "box-with-X" icon flash).

## Repo audit results

**Legacy, safe to delete** (no live references from the current Astro app):
`dist/`, `.astro/`, `astro.config.mjs`, the Astro `package.json` /
`package-lock.json`, `src/layouts/ProjectLayout.astro`, and
`src/pages/projects/{iep,robot,structure}.astro` (3 detailed project writeups
that are not linked from anywhere in the current design — homepage links go
straight to GitHub/YouTube instead. Decision: drop, not migrate). Also 7
images with zero references anywhere in `src/`: `CUlogo.png`,
`CUlogodark.png`, the IET badge jpg, `ai.jpg`, `bigdata.jpg`, `mds.png`, plus
`IMG_1301.jpg` / `IMG_1342.jpg` / `IMG_4385.jpg` / `IMG_4386.jpg` (used only
by the 3 dropped project pages). The already-staged deletions of the
pre-Astro static site (`about.html`, `index.html`, `blog.html`,
`projects.html`, `Projects/*.html`, old `assets/`) are correct and will be
finalized as part of this work.

**Bug found and fixed in migration**: the CV download link in
`src/pages/index.astro` points to `Toko Avaliani CV - April 2024 PDF.pdf`,
which was deleted from the repo. The current CV
(`Toko Avaliani CV - Summer 2026.pdf`) already exists in `public/` but is
unlinked. The new site links to the current file.

**Kept content**: full homepage copy (About / Experience / Projects
sections), the Archive page (16 entries), all 4 PDFs (CV, engineering-in-
society essay, sustainability poster, vibration-absorbers report), and
`IMG_1286.jpg` (flagged headshot candidate — not wired into the design yet;
that remains an open follow-up requiring Toko's input, out of scope for this
migration).

## Approach

### Framework & tooling

- **Next.js (App Router)**, TypeScript, deployed to Vercel. Chosen over
  Vite+React for file-based routing, built-in image optimization, and
  zero-config Vercel deploys — appropriate since the site is fully static
  (no auth, no API routes) and Toko is still learning web dev, where
  Next.js's ecosystem/tutorials help.
- **Tailwind CSS v4.** The existing Parchment/Dusk tokens become Tailwind
  `@theme` CSS variables in `app/globals.css`. The existing dark-mode
  mechanism (toggling an `html.dark` class, persisted to `localStorage`,
  applied pre-paint via an inline script to prevent flash) is unchanged and
  maps directly onto Tailwind's class-based `dark:` variant — no rework
  needed there.
- **Fonts via `next/font/google`** (Inter, JetBrains Mono) replacing
  `@fontsource-variable`. Same outcome (self-hosted, preloaded, no FOUT,
  no CDN), less manual wiring than the Astro version's hand-rolled
  `<link rel="preload">` + explicit `.woff2` imports.
- **Icons as inline SVG React components** (`components/icons.tsx`) — the
  design only uses 5 icons (moon, sun, download, GitHub, LinkedIn, mail), so
  no icon package dependency is added; this keeps the "no CDN, no icon kit"
  decision from the original design.

### Content model

Experience, Projects, and Archive entries move out of hardcoded JSX and into
a typed `content/site-data.ts` module (`ExperienceEntry[]`, `ProjectEntry[]`,
`ArchiveEntry[]`). This is a small, targeted improvement scoped to this
migration: Toko edits this content often (new jobs, new projects), and a
typed data array is a one-line change instead of HTML surgery. No other
refactoring beyond what the migration itself requires.

### Directory structure

```
toko-portfolio/
├── app/
│   ├── layout.tsx        # fonts, dark-mode flash-prevention script, <ThemeToggle/>
│   ├── page.tsx           # home: identity panel + About/Experience/Projects
│   ├── globals.css        # Parchment/Dusk tokens as Tailwind @theme vars
│   └── archive/
│       └── page.tsx
├── components/
│   ├── theme-toggle.tsx   # client component, localStorage-persisted
│   ├── section-nav.tsx    # client component, IntersectionObserver scroll-spy
│   └── icons.tsx           # inline SVG icon components
├── content/
│   └── site-data.ts        # typed Experience/Project/Archive arrays
├── public/
│   ├── documents/           # the 4 PDFs
│   └── images/               # IMG_1286.jpg only
├── README.md                 # structure, local dev, deploy — rewritten for Next.js
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

`AGENTS.md` / `CLAUDE.md` (currently hardlinked, identical, Astro-specific
dev instructions) are updated to reflect Next.js dev commands
(`next dev`, `next build`) instead of the Astro equivalents.

## Out of scope

- Headshot integration (`IMG_1286.jpg` → left panel) — needs Toko's input on
  crop/selection, tracked as a follow-up, not blocking this migration.
- SEO/accessibility polish (meta tags, OG image, alt text audit) and actual
  Vercel deployment — follow-on work after the migration lands.
- Any visual or copy changes beyond the CV-link bug fix noted above.

## Testing / verification

No test framework is being introduced (static content site, no business
logic to unit test). Verification is manual: `next dev`, visually diff
against the current Astro build for both Parchment and Dusk modes, confirm
scroll-spy nav, theme persistence across reload, all outbound links
(GitHub/YouTube/PDFs), and the CV link resolves to the correct file. Run
`next build` to confirm a clean static build before considering this done.
