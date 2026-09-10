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
