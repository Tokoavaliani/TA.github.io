# Astro-to-Next.js Portfolio Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-implement the locked "Instrument" portfolio design (currently built in Astro, uncommitted) on Next.js App Router + TypeScript + Tailwind CSS v4, with identical colors, layout, copy, and interactions, while cleaning up dead files from the repo.

**Architecture:** Static, no-backend Next.js App Router site. Two routes (`/` and `/archive`). Design tokens and the Preflight reset come from Tailwind v4 (`app/globals.css`); the two page layouts and the two small interactive widgets (theme toggle, scroll-spy nav) use CSS Modules ported near-verbatim from the existing Astro `<style>` blocks — this preserves exact pixel values for a design the user hand-picked colors for, rather than re-deriving every margin/gap through Tailwind's arbitrary-value syntax from scratch. Experience/Projects/Archive copy lives in one typed data module instead of hardcoded JSX.

**Tech Stack:** Next.js (App Router, TypeScript), React, Tailwind CSS v4, CSS Modules, `next/font/google` (Inter + JetBrains Mono), no icon package (6 icons as inline SVG components), no test framework (static content site — see spec's Testing/verification section).

**Spec:** `docs/superpowers/specs/2026-09-10-nextjs-migration-design.md`

---

## Task 1: Remove legacy Astro app and orphaned assets

**Files:**
- Delete: `dist/`, `.astro/`, `astro.config.mjs`, `tsconfig.json`, `package.json`, `package-lock.json`, `node_modules/`, `src/`
- Delete: `public/assets/images/ai.jpg`, `public/assets/images/bigdata.jpg`, `public/assets/images/CUlogo.png`, `public/assets/images/CUlogodark.png`, `public/assets/images/IET Badge 2021 - Diamond Winner_[4625].jpg`, `public/assets/images/IMG_1301.jpg`, `public/assets/images/IMG_1342.jpg`, `public/assets/images/IMG_4385.jpg`, `public/assets/images/IMG_4386.jpg`, `public/assets/images/mds.png`

These images have zero references anywhere in `src/` except the four `IMG_*.jpg` files, which are used only by the three project detail pages being dropped per the spec (not linked from the live design).

- [ ] **Step 1: Remove Astro build output, cache, and config**

```bash
rm -rf dist .astro astro.config.mjs
```

Expected: no output. `ls` no longer lists `dist/`, `.astro/`, or `astro.config.mjs`.

- [ ] **Step 2: Remove the Astro app source tree**

```bash
rm -rf src
```

- [ ] **Step 3: Remove Astro's dependency manifests, lockfile, and tsconfig (recreated in Task 3)**

```bash
rm -f package.json package-lock.json tsconfig.json
rm -rf node_modules
```

- [ ] **Step 4: Remove orphaned images**

```bash
rm -f "public/assets/images/ai.jpg" "public/assets/images/bigdata.jpg" \
  "public/assets/images/CUlogo.png" "public/assets/images/CUlogodark.png" \
  "public/assets/images/IET Badge 2021 - Diamond Winner_[4625].jpg" \
  "public/assets/images/IMG_1301.jpg" "public/assets/images/IMG_1342.jpg" \
  "public/assets/images/IMG_4385.jpg" "public/assets/images/IMG_4386.jpg" \
  "public/assets/images/mds.png"
```

- [ ] **Step 5: Verify only the headshot remains**

Run: `ls public/assets/images`
Expected: `IMG_1286.jpg` (only entry)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Remove legacy Astro app and orphaned images"
```

---

## Task 2: Reorganize public/ assets

**Files:**
- Move: `public/127_ta503_VIBR_multipleabsorbers.pdf`, `public/Sustainable-engineering-poster.pdf`, `public/Toko Avaliani - Engineering in society.pdf`, `public/Toko Avaliani CV - Summer 2026.pdf` → `public/documents/`
- Move: `public/assets/images/IMG_1286.jpg` → `public/images/IMG_1286.jpg`
- Delete: `public/assets/` (now empty)

- [ ] **Step 1: Create the new public subfolders**

```bash
mkdir -p public/documents public/images
```

- [ ] **Step 2: Move the four PDFs into public/documents/**

```bash
mv "public/127_ta503_VIBR_multipleabsorbers.pdf" public/documents/
mv "public/Sustainable-engineering-poster.pdf" public/documents/
mv "public/Toko Avaliani - Engineering in society.pdf" public/documents/
mv "public/Toko Avaliani CV - Summer 2026.pdf" public/documents/
```

- [ ] **Step 3: Move the headshot into public/images/**

```bash
mv "public/assets/images/IMG_1286.jpg" public/images/
```

- [ ] **Step 4: Remove the now-empty assets folder**

```bash
rm -rf public/assets
```

- [ ] **Step 5: Verify the new layout**

Run: `find public -type f | sort`
Expected:

```
public/documents/127_ta503_VIBR_multipleabsorbers.pdf
public/documents/Sustainable-engineering-poster.pdf
public/documents/Toko Avaliani - Engineering in society.pdf
public/documents/Toko Avaliani CV - Summer 2026.pdf
public/favicon.ico
public/favicon.svg
public/images/IMG_1286.jpg
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Reorganize public/ into documents/ and images/"
```

---

## Task 3: Scaffold the Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "toko-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install next react react-dom
```

Expected: completes with no errors; `package.json` now lists `next`, `react`, `react-dom` under `"dependencies"`.

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss
```

Expected: completes with no errors; `package.json` now lists these 6 packages under `"devDependencies"`.

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 6: Create postcss.config.mjs**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 7: Create next-env.d.ts**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

- [ ] **Step 8: Update .gitignore for Next.js**

Replace the existing "build output" / "generated types" lines (`dist/`, `.astro/`) with the Next.js equivalents, keeping the rest of the file as-is:

```
# next.js
/.next/
/out/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*


# environment variables
.env
.env.production

# macOS-specific files
.DS_Store

# jetbrains setting folder
.idea/

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js project configuration"
```

---

## Task 4: Global styles — Tailwind entry + design tokens

**Files:**
- Create: `app/globals.css`

Ports the Parchment/Dusk tokens and base styles from the old `src/styles/global.css` (already deleted in Task 1) into a Tailwind v4 entry file. Tailwind's Preflight reset replaces the old manual `box-sizing`/`margin` reset and the old `a { color: inherit; text-decoration: none }` / `img { max-width: 100%; display: block }` rules (Preflight already does both). The color tokens are also exposed as Tailwind `@theme` variables so any future utility-class usage (e.g. `bg-bg`, `text-accent`) works without extra setup.

- [ ] **Step 1: Create app/globals.css**

```css
@import "tailwindcss";

@theme {
  --color-bg: var(--bg);
  --color-bg-soft: var(--bg-soft);
  --color-line: var(--line);
  --color-head: var(--head);
  --color-body: var(--body);
  --color-dim: var(--dim);
  --color-accent: var(--accent);
  --color-accent-soft: var(--accent-soft);
}

:root {
  --bg: #f2efe7;
  --bg-soft: #faf8f2;
  --line: #dcd6c8;
  --head: #201d16;
  --body: #494539;
  --dim: #726d5e;
  --accent: #1d6149;
  --accent-soft: rgba(29, 97, 73, 0.12);
}

html.dark {
  --bg: #181410;
  --bg-soft: #221d16;
  --line: #39322a;
  --head: #f4efe6;
  --body: #cabfae;
  --dim: #978c7d;
  --accent: #b4d3c5;
  --accent-soft: rgba(180, 211, 197, 0.15);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--body);
  font-family: var(--font-inter), system-ui, -apple-system, "Segoe UI", Roboto,
    sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background 0.3s, color 0.3s;
}

h1,
h2,
h3,
h4 {
  color: var(--head);
  line-height: 1.15;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "Add Tailwind entry and Parchment/Dusk design tokens"
```

---

## Task 5: Icon components

**Files:**
- Create: `components/icons.tsx`

Six inline SVG components replace the Astro build's `astro-icon`/MDI usage: moon, sun (theme toggle), download (CV button), GitHub, LinkedIn, mail (socials). No icon package dependency, matching the "no CDN, no icon kit" decision from the locked design.

- [ ] **Step 1: Create components/icons.tsx**

```tsx
import type { SVGProps } from "react";

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/icons.tsx
git commit -m "Add inline SVG icon components"
```

> Note for the manual verification pass (Task 13): the GitHub and LinkedIn paths above are reproduced from memory, not copy-pasted from an official source. Visually confirm both render as recognizable logos; if either looks off, swap in the official mark from https://github.com/logos or https://simpleicons.org.

---

## Task 6: Typed content data module

**Files:**
- Create: `content/site-data.ts`

Moves Experience/Projects/Archive copy out of JSX into typed arrays, ported verbatim from the current `index.astro` and `archive.astro` content (both already deleted from the working tree in Task 1, but their text is reproduced exactly below). Future edits (new job, new project) become a one-line array change instead of HTML surgery.

- [ ] **Step 1: Create content/site-data.ts**

```ts
export type ExperienceEntry = {
  year: string;
  role: string;
  org: string;
  description: string;
  tags: string[];
};

export type ProjectEntry = {
  year: string;
  title: string;
  href: string;
  description: string;
  tags: string[];
};

export type ArchiveEntry = {
  year: string;
  title: string;
  tech: string;
  href?: string;
  linkLabel?: string;
};

export const experience: ExperienceEntry[] = [
  {
    year: "2025",
    role: "Digital & Technology Services",
    org: "Alvarez and Marsal",
    description:
      "Evaluated and pitched digital initiatives for a £2B+ revenue client. Delivered data-driven insights using clustering and segmentation, supported with data analysis, feature engineering, and embedding techniques.",
    tags: ["Python", "Data Science", "Clustering", "Strategy"],
  },
  {
    year: "2024",
    role: "Product Engineer",
    org: "Humanising Autonomy",
    description:
      "Ethical-AI startup in automotive sector. Produced competitor and market-trend reports, and identified & prioritised key B2B clients to drive revenue.",
    tags: ["Product", "Market Research", "B2B"],
  },
  {
    year: "2023",
    role: "Summer Analyst",
    org: "Beacon Capital",
    description:
      "VC firm backing early-stage enterprise SaaS. Led data operations to source promising startups aligned with the investment thesis and built founder relationships.",
    tags: ["Data Analysis", "Sourcing", "Research"],
  },
  {
    year: "2022",
    role: "Data Scientist",
    org: "TBC Bank",
    description:
      "Built and presented an XGBoost pipeline to predict employee churn end-to-end — cleaning, feature engineering, validation.",
    tags: ["Python", "ML", "XGBoost"],
  },
];

export const projects: ProjectEntry[] = [
  {
    year: "2025",
    title: "Sudoku Solver",
    href: "https://github.com/Tokoavaliani/Sudoku-Solver",
    description:
      "A webapp that digitises a printed Sudoku puzzle through OpenCV, solves it with a recursive backtracking algorithm, and provides corrections and LLM-powered hints.",
    tags: ["Python", "OpenCV", "Algorithms", "LLMs"],
  },
  {
    year: "2025",
    title: "Caius Padel Ranking",
    href: "https://github.com/Tokoavaliani/caius-padel-ranking",
    description:
      "An Elo-based ranking system and player dashboard for Gonville & Caius College padel society.",
    tags: ["Python", "Algorithms", "DB Management"],
  },
  {
    year: "2024",
    title: "Blackjack",
    href: "https://github.com/Tokoavaliani/Blackjack",
    description:
      "PyQt web app for learning blackjack basic strategy and card counting, with realistic game mechanics",
    tags: ["Python", "Simulation", "GUI design"],
  },
  {
    year: "2023",
    title: "IDP — Autonomous Robot",
    href: "https://www.youtube.com/watch?v=33eCCn5jYRU",
    description:
      "An autonomous line following robot that collects and sort blocks by colour.",
    tags: ["C++", "Arduino", "Robotics"],
  },
  {
    year: "2022",
    title: "Meal Booking Bot",
    href: "#",
    description:
      "An automated meal-booking bot to guarantee me a place at in demand college events.",
    tags: ["AWS Lambda", "Automation", "Concurrency"],
  },
];

export const archive: ArchiveEntry[] = [
  {
    year: "2025",
    title: "Sudoku Solver",
    tech: "Python · Computer Vision",
    href: "https://github.com/Tokoavaliani/Sudoku-Solver",
    linkLabel: "Code ↗",
  },
  {
    year: "2025",
    title: "Caius Padel Ranking",
    tech: "Python · Elo · Data",
    href: "https://github.com/Tokoavaliani/caius-padel-ranking",
    linkLabel: "Code ↗",
  },
  {
    year: "2025",
    title: "Blackjack",
    tech: "Python · Simulation · Probability",
    href: "https://github.com/Tokoavaliani/Blackjack",
    linkLabel: "Code ↗",
  },
  {
    year: "2023",
    title: "IDP — Autonomous Robot",
    tech: "C++ · Arduino · Robotics",
    href: "https://www.youtube.com/watch?v=33eCCn5jYRU",
    linkLabel: "Video ↗",
  },
  { year: "2023", title: "Data Science", tech: "Python · Fourier Analysis" },
  { year: "2023", title: "Device Programming", tech: "C++ · I²C · Interrupts" },
  {
    year: "2022",
    title: "“Sustainable Engineering” Poster",
    tech: "Comms · Smart Grid",
    href: "/documents/Sustainable-engineering-poster.pdf",
    linkLabel: "PDF ↗",
  },
  {
    year: "2022",
    title: "Earthquake-Resistant Structures",
    tech: "Python · Vibration Sim",
    href: "/documents/127_ta503_VIBR_multipleabsorbers.pdf",
    linkLabel: "Report ↗",
  },
  {
    year: "2022",
    title: "Meal Booking Bot",
    tech: "AWS Lambda · Selenium · Concurrency",
    href: "#",
    linkLabel: "Code ↗",
  },
  { year: "2022", title: "Mars Lander Simulator", tech: "C++ · Control Theory" },
  { year: "2022", title: "Product Design", tech: "Design Process" },
  {
    year: "2022",
    title: "Integrated Electrical Project",
    tech: "Electronics · LTSpice",
    href: "https://www.youtube.com/watch?v=HIDArrAtTYE",
    linkLabel: "Video ↗",
  },
  { year: "2022", title: "Engineering Drawings", tech: "Technical Drawing" },
  {
    year: "2022",
    title: "Flood Warning System",
    tech: "Python · Data Structures",
    href: "https://github.com/KaneZhao25/Flood_risk_project_83",
    linkLabel: "Code ↗",
  },
  { year: "2021", title: "SolidWorks Rollercoaster", tech: "CAD · Motion Analysis" },
  {
    year: "2021",
    title: "Engineer in Society",
    tech: "Essay · Ethics of AVs",
    href: "/documents/Toko%20Avaliani%20-%20Engineering%20in%20society.pdf",
    linkLabel: "Essay ↗",
  },
  {
    year: "2021",
    title: "Structural Design Project",
    tech: "CAD · Structural Analysis",
    href: "https://www.youtube.com/watch?v=bRULRWLsXm0",
    linkLabel: "Video ↗",
  },
];
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits with no errors.

- [ ] **Step 3: Commit**

```bash
git add content/site-data.ts
git commit -m "Add typed site content data"
```

---

## Task 7: Theme toggle component

**Files:**
- Create: `components/theme-toggle.module.css`
- Create: `components/theme-toggle.tsx`

Ports the `.theme-toggle` button from the old global.css exactly, including the `html.dark` selector that swaps which icon is visible.

- [ ] **Step 1: Create components/theme-toggle.module.css**

```css
.toggle {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 50;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--bg-soft);
  color: var(--head);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.toggle svg {
  width: 20px;
  height: 20px;
}

.sun {
  display: none;
}

:global(html.dark) .moon {
  display: none;
}

:global(html.dark) .sun {
  display: block;
}
```

- [ ] **Step 2: Create components/theme-toggle.tsx**

```tsx
"use client";

import { MoonIcon, SunIcon } from "./icons";
import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const handleClick = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Switch colour theme"
      className={styles.toggle}
    >
      <MoonIcon className={styles.moon} />
      <SunIcon className={styles.sun} />
    </button>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: exits with no errors.

- [ ] **Step 4: Commit**

```bash
git add components/theme-toggle.module.css components/theme-toggle.tsx
git commit -m "Add theme toggle component"
```

---

## Task 8: Section-nav scroll-spy component

**Files:**
- Create: `components/section-nav.module.css`
- Create: `components/section-nav.tsx`

Ports the `.dots` nav and its `IntersectionObserver` scroll-spy behavior exactly: same `rootMargin`, same "clear all, activate the intersecting one" logic, "About" active by default on load.

- [ ] **Step 1: Create components/section-nav.module.css**

```css
.nav {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link {
  font-family: var(--font-jetbrains-mono);
  font-size: 14px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--dim);
  display: flex;
  align-items: center;
  gap: 16px;
  width: max-content;
}

.bar {
  width: 32px;
  height: 1px;
  background: var(--dim);
  transition: width 0.2s, background 0.2s;
}

.link:hover,
.link.active {
  color: var(--accent);
}

.link:hover .bar,
.link.active .bar {
  width: 56px;
  background: var(--accent);
}
```

- [ ] **Step 2: Create components/section-nav.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./section-nav.module.css";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export function SectionNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const links = Array.from(navRef.current?.querySelectorAll("a") ?? []);
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href") ?? ""))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = sections.indexOf(entry.target);
          links.forEach((link) => link.classList.remove(styles.active));
          links[index]?.classList.add(styles.active);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={navRef} className={styles.nav}>
      {SECTIONS.map(({ id, label }, index) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.link} ${index === 0 ? styles.active : ""}`}
        >
          <span className={styles.bar} />
          {label}
        </a>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: exits with no errors.

- [ ] **Step 4: Commit**

```bash
git add components/section-nav.module.css components/section-nav.tsx
git commit -m "Add scroll-spy section nav component"
```

---

## Task 9: Root layout

**Files:**
- Create: `app/layout.tsx`

Ports the Astro `Layout.astro` shell: `next/font/google` for self-hosted Inter + JetBrains Mono (replacing `@fontsource-variable`), the pre-paint dark-mode script (identical logic to the old `is:inline` script), and the floating `<ThemeToggle />`. Per-page titles use Next's metadata `title.template` so `/archive` renders "Archive — Tornike Avaliani" exactly like the old per-page Astro title.

- [ ] **Step 1: Create app/layout.tsx**

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Tornike Avaliani — Engineering undergraduate, Cambridge",
    template: "%s — Tornike Avaliani",
  },
  description:
    "Portfolio of Tornike Avaliani — engineering graduate of the University of Cambridge.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if (localStorage.getItem('theme') === 'dark') { document.documentElement.classList.add('dark'); }",
          }}
        />
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits with no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "Add root layout with fonts and dark-mode setup"
```

---

## Task 10: Home page

**Files:**
- Create: `app/page.module.css`
- Create: `app/page.tsx`

Ports the split-layout homepage (identity panel + About/Experience/Projects) from `index.astro`, including the fix for the CV link (was pointing at a deleted `April 2024` file — now points at `Toko Avaliani CV - Summer 2026.pdf` under `public/documents/`, URL-encoded). Drops the unused `.blurb` CSS rule that existed in the old stylesheet but had no matching element in the markup.

- [ ] **Step 1: Create app/page.module.css**

```css
.shell {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 28px;
  display: grid;
  grid-template-columns: minmax(0, 44%) minmax(0, 56%);
  gap: 40px;
}

.side {
  position: sticky;
  top: 0;
  align-self: start;
  display: flex;
  flex-direction: column;
  padding: 96px 0 72px;
}

.name {
  font-size: clamp(38px, 5.2vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 800;
  margin-left: -12px;
}

.role {
  font-size: 19px;
  color: var(--head);
  font-weight: 500;
  margin-top: 14px;
}

.sideFoot {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.cv {
  font-family: var(--font-jetbrains-mono);
  font-size: 12.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 8px;
  padding: 11px 24px;
  width: max-content;
  display: inline-flex;
  gap: 9px;
  align-items: center;
  transition: background 0.2s;
}

.cv:hover {
  background: var(--accent-soft);
}

.cv svg {
  width: 16px;
  height: 16px;
}

.socials {
  display: flex;
  gap: 12px;
}

.socials a {
  color: var(--dim);
  transition: color 0.2s, transform 0.2s;
}

.socials a:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.socials svg {
  width: 44px;
  height: 44px;
}

.main {
  padding: 96px 0 96px;
}

.section {
  margin-bottom: 76px;
  scroll-margin-top: 96px;
}

.secLabel {
  font-family: var(--font-jetbrains-mono);
  font-size: 16px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 26px;
}

.secLabel::before {
  content: attr(data-n);
  color: var(--dim);
  font-weight: 400;
}

.secLabel::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--line);
}

.prose p {
  margin-bottom: 16px;
}

.prose b {
  color: var(--head);
  font-weight: 600;
}

.caius {
  color: var(--accent);
  font-weight: 600;
  cursor: help;
  border-bottom: 1px dotted var(--accent);
}

.row {
  display: grid;
  grid-template-columns: 108px 1fr;
  gap: 18px;
  padding: 20px;
  margin: 0 -20px 8px;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}

a.row:hover {
  background: var(--bg-soft);
  border-color: var(--line);
}

.when {
  font-family: var(--font-jetbrains-mono);
  font-size: 12px;
  color: var(--dim);
  padding-top: 4px;
  font-variant-numeric: tabular-nums;
}

.row h3 {
  font-size: 17px;
  font-weight: 600;
}

.at {
  color: var(--accent);
}

.arrow {
  display: inline-block;
  transition: transform 0.2s;
}

a.row:hover .arrow {
  transform: translate(3px, -3px);
}

.row p {
  margin-top: 8px;
  font-size: 14.5px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tags span {
  font-family: var(--font-jetbrains-mono);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 999px;
  padding: 5px 11px;
}

.archiveLink {
  display: inline-block;
  margin-top: 12px;
  font-family: var(--font-jetbrains-mono);
  font-size: 13px;
  color: var(--accent);
}

.archiveLink:hover {
  text-decoration: underline;
}

@media (max-width: 820px) {
  .shell {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .side {
    position: static;
    height: auto;
    padding: 72px 0 24px;
  }
  .main {
    padding: 24px 0 64px;
  }
}
```

- [ ] **Step 2: Create app/page.tsx**

```tsx
import Link from "next/link";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { SectionNav } from "@/components/section-nav";
import { experience, projects } from "@/content/site-data";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.shell}>
      <aside className={styles.side}>
        <div>
          <h1 className={styles.name}>Tornike Avaliani</h1>
          <p className={styles.role}>Engineering, University of Cambridge</p>
          <SectionNav />
        </div>
        <div className={styles.sideFoot}>
          <a
            href="/documents/Toko%20Avaliani%20CV%20-%20Summer%202026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cv}
          >
            <DownloadIcon />
            Download CV
          </a>
          <div className={styles.socials}>
            <a
              href="https://github.com/Tokoavaliani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/tornikeavaliani/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <a href="mailto:tokoavaliani42@gmail.com" aria-label="Email">
              <MailIcon />
            </a>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <section id="about" className={styles.section}>
          <h2 className={styles.secLabel} data-n="01">
            About
          </h2>
          <div className={styles.prose}>
            <p>
              I graduated in engineering from the <b>University of Cambridge</b>,
              where I was a <b>College Scholar</b> and an{" "}
              <b>IET Diamond Jubilee Scholar</b>. For my <b>MEng</b> I investigated
              orbital angular momentum multiplexing for free-space optical{" "}
              <b>inter-satellite communications</b>, building an end-to-end
              simulation to analyse performance.
            </p>
            <p>
              In my free time I enjoy building things: AI tools, embedded systems,
              and web apps. Most of what I know about programming is{" "}
              <b>self-taught</b>, through online courses and applied{" "}
              <b>project-based learning</b>.
            </p>
            <p>
              Alongside my degree, I rowed for{" "}
              <span
                className={styles.caius}
                title={
                  'The light blue Gonville & Caius lent Cambridge in 1836 — it became "Cambridge Blue".'
                }
              >
                Caius Boat Club
              </span>
              , where I captained the Men&apos;s squad and served on committee. In
              my final year I was also President of the Gonville &amp; Caius
              Engineering Society, running a programme of talks and industry
              events.
            </p>
          </div>
        </section>

        <section id="experience" className={styles.section}>
          <h2 className={styles.secLabel} data-n="02">
            Experience
          </h2>
          {experience.map((entry) => (
            <div key={`${entry.year}-${entry.org}`} className={styles.row}>
              <div className={styles.when}>{entry.year}</div>
              <div>
                <h3>
                  {entry.role} · <span className={styles.at}>{entry.org}</span>
                </h3>
                <p>{entry.description}</p>
                <div className={styles.tags}>
                  {entry.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.secLabel} data-n="03">
            Projects
          </h2>
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.row}
            >
              <div className={styles.when}>{project.year}</div>
              <div>
                <h3>
                  {project.title} <span className={styles.arrow}>↗</span>
                </h3>
                <p>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
          <Link href="/archive" className={styles.archiveLink}>
            View the full archive →
          </Link>
        </section>
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: exits with no errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.module.css app/page.tsx
git commit -m "Add home page"
```

---

## Task 11: Archive page

**Files:**
- Create: `app/archive/page.module.css`
- Create: `app/archive/page.tsx`

Ports the archive listing from `archive.astro`. Drops one duplicated/dead CSS declaration that existed in the original (`.arc-row .tech` was declared twice in a row with different font-sizes — the second always won, so only the surviving 12.5px value is kept; no visual change).

- [ ] **Step 1: Create app/archive/page.module.css**

```css
.wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 90px 28px 110px;
}

.back {
  font-family: var(--font-jetbrains-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--accent);
}

.back:hover {
  text-decoration: underline;
}

.wrap h1 {
  font-size: clamp(34px, 6vw, 52px);
  letter-spacing: -0.03em;
  font-weight: 800;
  margin-top: 22px;
}

.intro {
  color: var(--dim);
  margin-top: 12px;
  max-width: 60ch;
}

.list {
  margin-top: 40px;
  border-top: 1px solid var(--line);
}

.row {
  display: grid;
  grid-template-columns: 58px 1fr auto;
  gap: 20px;
  align-items: baseline;
  padding: 16px 12px;
  margin: 0 -12px;
  border-bottom: 1px solid var(--line);
  border-radius: 8px;
  transition: background 0.18s;
}

a.row:hover {
  background: var(--bg-soft);
}

.year {
  font-family: var(--font-jetbrains-mono);
  font-size: 13px;
  color: var(--dim);
  font-variant-numeric: tabular-nums;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.title {
  color: var(--head);
  font-weight: 600;
  font-size: 16px;
}

a.row:hover .title {
  color: var(--accent);
}

.tech {
  font-family: var(--font-jetbrains-mono);
  font-size: 12.5px;
  color: var(--dim);
}

.link {
  font-family: var(--font-jetbrains-mono);
  font-size: 12.5px;
  color: var(--accent);
  white-space: nowrap;
}

.linkNone {
  color: var(--dim);
  opacity: 0.45;
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 46px 1fr;
  }
  .link {
    grid-column: 2;
    margin-top: 4px;
  }
}
```

- [ ] **Step 2: Create app/archive/page.tsx**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { archive } from "@/content/site-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Archive",
};

export default function ArchivePage() {
  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}>
        ← Home
      </Link>
      <h1>Archive</h1>
      <p className={styles.intro}>The full record</p>
      <p className={styles.intro}>
        Coursework, internship-related tinkering, and personal projects.
      </p>

      <div className={styles.list}>
        {archive.map((entry) => {
          const rowContent = (
            <>
              <span className={styles.year}>{entry.year}</span>
              <div className={styles.main}>
                <span className={styles.title}>{entry.title}</span>
                <span className={styles.tech}>{entry.tech}</span>
              </div>
              <span
                className={
                  entry.href ? styles.link : `${styles.link} ${styles.linkNone}`
                }
              >
                {entry.href ? entry.linkLabel : "—"}
              </span>
            </>
          );

          if (entry.href) {
            return (
              <a
                key={entry.title}
                className={styles.row}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {rowContent}
              </a>
            );
          }

          return (
            <div key={entry.title} className={styles.row}>
              {rowContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: exits with no errors.

- [ ] **Step 4: Commit**

```bash
git add app/archive/page.module.css app/archive/page.tsx
git commit -m "Add archive page"
```

---

## Task 12: Update README and agent docs

**Files:**
- Modify: `README.md` (currently the default Astro starter template)
- Modify: `CLAUDE.md`
- Modify: `AGENTS.md`

`CLAUDE.md`/`AGENTS.md` currently document Astro-specific dev commands and link to Astro docs; both need updating to Next.js equivalents now that Astro is gone.

- [ ] **Step 1: Replace README.md**

```markdown
# Tornike Avaliani — Portfolio

Personal portfolio site: About, Experience, Projects, and a full project
archive.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) for design tokens and the base
  reset; CSS Modules for page-level layout
- Deployed on [Vercel](https://vercel.com)

## Project structure

```
app/
  layout.tsx          Root layout: fonts, dark-mode setup, theme toggle
  page.tsx              Home page (About / Experience / Projects)
  globals.css             Design tokens (Parchment/Dusk) + base styles
  archive/page.tsx          Full project archive
components/            Client components: theme toggle, section nav, icons
content/site-data.ts     Site copy as typed arrays (experience/projects/archive)
public/
  documents/              CV and PDF write-ups
  images/                  Photos
```

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Editing content

Experience, project, and archive entries live in `content/site-data.ts` as
typed arrays — add or edit an entry there rather than touching the page
components.

## Deployment

Connected to Vercel via GitHub — pushes to `main` deploy automatically.
```

- [ ] **Step 2: Replace the full contents of CLAUDE.md**

The current file contains only these two sections (`## Development` and
`## Documentation`), both Astro-specific — replace the entire file with:

```markdown
## Development

Run the dev server in the background so it doesn't block the session:

```
npm run dev
```

Start it with the Bash tool's background mode (`run_in_background: true`),
then check on it via the Monitor tool or by reading its output.

## Documentation

Full documentation: https://nextjs.org/docs

Consult these guides before working on related tasks:

- [Routing (App Router)](https://nextjs.org/docs/app/building-your-application/routing)
- [Layouts and pages](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates)
- [Styling with CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [Styling with Tailwind CSS](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)
- [Optimizing fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Metadata (SEO)](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
```

- [ ] **Step 3: Apply the identical CLAUDE.md content to AGENTS.md**

`CLAUDE.md` and `AGENTS.md` were hardlinked copies of each other before this migration; write the same replacement content from Step 2 into `AGENTS.md` directly (don't rely on the hardlink surviving the edit).

- [ ] **Step 4: Commit**

```bash
git add README.md CLAUDE.md AGENTS.md
git commit -m "Update README and agent docs for Next.js"
```

---

## Task 13: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full type-check**

Run: `npx tsc --noEmit`
Expected: exits with no errors.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build completes successfully and the route summary lists `/` and
`/archive`.

- [ ] **Step 3: Manual walkthrough**

Start the dev server in the background (`npm run dev`, `run_in_background: true`), then use a browser tool (e.g. the `run` skill or the Playwright MCP tools) to check, in both Parchment (light) and Dusk (dark) modes:

- Home page: identity panel content, all three sections render with correct copy from `content/site-data.ts`
- Scroll-spy nav: the active link (and its underline bar) updates as you scroll past About/Experience/Projects
- Theme toggle: click it, confirm colors swap and the sun/moon icon swaps; reload the page and confirm the choice persisted (no flash of the wrong theme)
- Download CV button resolves to a working PDF (not a 404)
- GitHub/LinkedIn/mail icons in the identity panel render as recognizable marks (see the note at the end of Task 5)
- All project row links (GitHub repos, YouTube video) open the correct external page
- "View the full archive →" navigates to `/archive`
- Archive page: all 17 rows render with correct year/title/tech; rows with links (GitHub/YouTube/PDF) are clickable and hover-highlight; rows without links show a dim "—" and are not clickable
- "← Home" on the archive page returns to `/`
- Resize to a narrow viewport (< 820px) and confirm the home page collapses to a single column with the identity panel no longer sticky

- [ ] **Step 4: Fix and commit any discrepancies found**

If the manual walkthrough surfaces a visual or behavioral difference from the locked design, fix it in the relevant file from Tasks 4–11 and commit:

```bash
git add -A
git commit -m "Fix visual discrepancies found during manual verification"
```

If nothing needs fixing, no commit is needed for this task.
