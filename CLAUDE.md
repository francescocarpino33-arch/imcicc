# IMCICC portfolio — notes for future sessions

Portfolio of Francesco Carpino (IMCICC), freelance sports designer, Milan. Live at https://imcicc.com,
deployed on Netlify from `main` (`bun run build`, publish `dist`). TanStack Start + Vite + Tailwind v4.

## Content
- `src/data/projects.ts` — project index (order = order on site), summaries, client list, contact links.
  Only Francesco's own descriptions go here. Never invent outcomes, metrics, awards or years.
- `src/data/capabilities.ts` — each capability must point to a project that proves it.
- Images, role, year and intro for project pages live in Supabase (`projects` table, `project-images`
  bucket) and are managed at `/admin`. The first image of a project is its cover; reorder in `/admin`.
- `src/assets/*.jpg` and `src/assets/*.asset.json` are leftover stock/AI images from the first build.
  They are not Francesco's work and must not be used on the site.

## Design system ("Floodlight")
- Tokens in `src/styles.css`: night `#000`, stand `#121211`, line `#2b2b29`, concrete `#94938d`,
  chalk `#f1f0ec`, signal (IMCICC orange) `#ff6a1a`.
- One family: Archivo variable (self-hosted via `@fontsource-variable/archivo`). Condensed width
  (`.voice`, `--wdth-voice`) for headlines, expanded (`.label`, `--wdth-label`) for small labels.
  Labels are sentence case.
- Orange is structural: full plates (poster wall + client board, footer CTA, contact page), primary
  buttons, link underlines, active nav and project names.
- Artwork is never cropped on project pages; covers adapt to the artwork's proportions
  (`ProjectCover`), the gallery pairs portraits and gives landscapes a full row (`ProjectGallery`).
- Motion: one hero sequence on the homepage, short cross-fade between pages, hover responses.
  No scroll-triggered fade-ups. `prefers-reduced-motion` is respected.

## Languages (EN / IT)
- All interface copy lives in `src/i18n/copy.ts` (one object per language, same shape). Project and
  capability text has an `it` block in `src/data/projects.ts` / `src/data/capabilities.ts`.
- The language is decided in the root route's `beforeLoad` (`detectLang` in `src/i18n/lang.tsx`):
  the `lang` cookie if set, otherwise the browser's Accept-Language (Italian → `it`), otherwise `en`.
  URLs are the same in both languages. Use `useCopy()` / `useLang()` in components and
  `headCopy(match)` in route `head()`.
- Project intros written in /admin are shown on the English page only; the Italian page uses the
  Italian summary from `projects.ts`.

## Dev
- `bun install`, `bun run dev`. `bunfig.toml` / `bun.lock` reference Lovable's npm cache; outside that
  network, install from the public npm registry.
- Check changes in a private window (Cmd+Shift+N) to avoid cached assets.
