// Renders design/og-image.html to public/og-image.png at 1200x630 using
// headless Chrome, so the social card uses the real shipped fonts.
//
// The fonts are inlined as data URIs and the page is loaded from a temp file:
// serving them over a local http server makes Chrome's --screenshot hang.

import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, copyFileSync, rmSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}. Render design/og-image.html by hand instead.`);
  process.exit(1);
}

const asDataUri = (file) =>
  `data:font/woff2;base64,${readFileSync(join('public', file)).toString('base64')}`;

const html = readFileSync('design/og-image.html', 'utf8').replace(
  /url\('(\/fonts\/[^']+)'\)/g,
  (_, path) => `url('${asDataUri(path)}')`,
);

const work = mkdtempSync(join(tmpdir(), 'galen-og-'));
const page = join(work, 'og.html');
const shot = join(work, 'og.png');
writeFileSync(page, html);

// Chrome exits 0 but leaves helper processes attached, so execFileSync waits
// forever on them. Spawn detached and poll for the screenshot instead.
const child = spawn(
  CHROME,
  [
    // Chrome 152's new headless mode never returns from --screenshot here.
    '--headless=old',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${join(work, 'profile')}`,
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    `--screenshot=${shot}`,
    `file://${page}`,
  ],
  { stdio: 'ignore', detached: true },
);

try {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline && !existsSync(shot)) {
    await new Promise((r) => setTimeout(r, 250));
  }

  if (!existsSync(shot)) throw new Error('Chrome produced no screenshot within 60s.');
  copyFileSync(shot, 'public/og-image.png');
  console.log('Wrote public/og-image.png (1200x630).');
} finally {
  try {
    process.kill(-child.pid);
  } catch {
    // already gone
  }
  // Chrome is still flushing its profile directory as it shuts down.
  await new Promise((r) => setTimeout(r, 500));
  rmSync(work, { force: true, recursive: true, maxRetries: 10, retryDelay: 200 });
}
