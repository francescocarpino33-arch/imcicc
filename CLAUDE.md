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
- Motion never changes the design at rest: every animation leaves no style behind when it ends.
  - Hidden/moving states exist only under `html.motion-ok`, set by `MOTION_BOOT` (`src/lib/reveal.ts`,
    inline in `<head>`) unless reduced motion is on; it removes itself after 4s if the app never hydrates.
  - Words rising out of masks: `RevealWords` (`on="load"` for page titles, `on="scroll"` for section
    titles); it returns to plain text once landed, so kerning at rest is untouched. Hero h1 uses the same
    CSS with its own markup.
  - Covers: `data-reveal="cover"` (set in `ProjectCover`), short masked rise when they enter the viewport.
    Reveals are once per element, via `useRevealObserver` in the root (state = `data-in` attribute).
  - Hover roll on `.nav-link`, `.link` (letter by letter), `.btn` and the cover open bar (whole label):
    `src/lib/hover-roll.ts`, one delegated listener; an aria-hidden overlay is built only while hovered.
    Fine pointers only. Add `data-no-roll` to opt an element out.
  - Interactive headlines (`src/lib/headline-roll.ts`): the word under the pointer in any `.voice`
    h1/h2/h3 or `.tile-title` rolls letter by letter and lands in orange (chalk on orange or on orange
    titles). Overlay covers only the word's ink, measured with canvas, so tight leading isn't disturbed.
  - Cursor label over project covers (`src/lib/cursor-badge.ts`): orange "View project" pill that
    follows the pointer, text taken from the cover's open bar (so it is translated and NDA-aware).
  - Page change: orange curtain lifts off the new page (`.page-curtain`, keyed in `__root.tsx`);
    entrances that start with the page wait for it via `--page-delay` (set on <html> for 800ms).
  - Rows and lists rise in on scroll (`data-reveal="rise"`): capabilities, about rows, footer steps.
  - Portraits push in slowly on hover (`.portrait-zoom`); covers scale to 1.06 on hover.
  - Hero portrait/poster wall entrances (`.enter-wipe`, `.enter-wall`), mobile menu stagger, and a fade-in
    of each new page (framer-motion in `__root.tsx`; no exit animation, because an exiting `<Outlet />`
    re-mounts the old page). `prefers-reduced-motion` is respected.
  - Regression check: full-page screenshots at rest before/after must be pixel-identical.

## Languages (EN / IT)
- All interface copy lives in `src/i18n/copy.ts` (one object per language, same shape). Project and
  capability text has an `it` block in `src/data/projects.ts` / `src/data/capabilities.ts`.
- The site always opens in English. Italian only after the visitor picks IT, for that visit only
  (session cookie `site_lang`, read in the root route's `beforeLoad` via `detectLang` in
  `src/i18n/lang.tsx`). No browser-language detection. URLs are the same in both languages.
  Use `useCopy()` / `useLang()` in components and `headCopy(match)` in route `head()`.
- Italian copy is written for Italian clients, not translated word for word: sentence case, and the
  English terms the industry uses (art direction, brief, key visual, storytelling, brand, NDA).
- Project intros written in /admin are shown on the English page only; the Italian page uses the
  Italian summary from `projects.ts`.

## Dev
- `bun install`, `bun run dev`. `bunfig.toml` / `bun.lock` reference Lovable's npm cache; outside that
  network, install from the public npm registry.
- Check changes in a private window (Cmd+Shift+N) to avoid cached assets.
