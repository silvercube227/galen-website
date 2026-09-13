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
| `npm run build:ci` | Build then verify — this is what Cloudflare Pages runs |
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

Cloudflare **Workers** (static assets), connected to this repo via Workers
Builds. Pages is legacy, so new Git connections land here instead.
`galen.software` is already on Cloudflare nameservers, so the custom domain
needs no registrar changes.

Build configuration in the dashboard:

- Root directory: `/` (leave blank)
- Build command: `npm run build:ci`
- Deploy command: `npx wrangler deploy`
- Version command: `npx wrangler versions upload`

There is no output-directory field in this flow — `wrangler.jsonc` points at
`dist/galen-website/browser` instead. Node comes from `.nvmrc` (24.21.0).

Using `build:ci` rather than `build` means a deploy fails if the prerender
broke or banned copy reappeared, instead of shipping it.

`public/_headers` is copied into the output by the build and applied by Workers
static assets — security headers plus immutable caching for `/fonts/*`. Unknown
paths return 404 with `public/404.html`.

To check the whole thing the way Cloudflare will run it:

```bash
npm run build:ci
npx wrangler dev --local        # serves on :8787 with _headers applied
npx wrangler deploy --dry-run   # validates config, uploads nothing
```

### www redirect

There is deliberately no `_redirects` file. Domain-level sources are not
supported there — a `www.galen.software/*` rule is accepted silently and never
fires. Redirect `www` to the apex with a zone-level **Single Redirect** rule:

- Rules -> Redirect Rules -> Create rule
- If: `Hostname equals www.galen.software`
- Then: Dynamic redirect to `concat("https://galen.software", http.request.uri.path)`
- Status 301, preserve query string

## Before launch

`src/app/content/site.config.ts` has one unset value:

- `bookingUrl` — empty. Every call to action falls back to the email link until
  a real scheduler URL is set. Fill it in and the buttons become "Book a call".

Contact is `bennettye@galen.software`, routed through Cloudflare Email Routing.
Note that `hello@` is not a configured address — do not use it in copy.

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
