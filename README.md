# galen.software

Marketing site for Galen — an AI regulatory agent that drafts FDA Letter-to-File
and 510(k)-change assessments for medtech RA and QA teams.

Angular 22, fully prerendered to static HTML. No server, no backend, no forms.

## Requirements

Node >= 24.15.0 (Angular 22's minimum). See `.nvmrc`.

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Dev server at http://localhost:4200 |
| `npm run build` | Static build into `dist/galen-website/browser` |
| `npm run verify` | Asserts the build really prerendered, and that no banned copy slipped in |
| `npm run og` | Regenerates `public/og-image.png` from `design/og-image.html` |

To check what actually ships, serve the build output rather than `ng serve`:

```bash
npm run build && npm run verify
npx http-server dist/galen-website/browser -p 4200
```

The page must render with JavaScript disabled — that is the point of the
prerender, and it is what search engines and link unfurlers see.

## Deploying

Cloudflare Pages, connected to this repo:

- Build command: `npm run build`
- Output directory: `dist/galen-website/browser`
- Environment variable: `NODE_VERSION=24`

`public/_headers` and `public/_redirects` are picked up by Cloudflare Pages
automatically. They set the security headers and redirect `www` to the apex.

## Before launch

`src/app/content/site.config.ts` has one unset value:

- `bookingUrl` — empty. Every call to action falls back to the email link until
  a real scheduler URL is set. Fill it in and the buttons become "Book a call".

Also confirm `hello@galen.software` is a real, monitored address.

## Structure

```
src/app/content/     site.config.ts (identity, links) and site-content.ts (copy)
src/app/sections/    the six page sections, in page order
src/app/shared/      mark, section head, cards, pipeline
src/styles/          design tokens, type, layout primitives
design/              brand artwork and the OG card source
```

## Brand

The palette, type scale, logo geometry and layout rules come from the Galen
brand specification and are transcribed in `src/styles/_tokens.scss`. Two
grounds only (white and navy), one accent, square corners, no shadows, no
icons. `design/Galen Mockups-selection.png` is the reference artwork.

Copy constraints, from `CLAUDE.md`: no hype language, no customer or traction
claims, no invented people. `npm run verify` enforces the ones it can.
