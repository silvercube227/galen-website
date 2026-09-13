// Asserts the static build actually produced a prerendered page.
// A marketing site's whole SEO case rests on the HTML being real at rest,
// so this checks the emitted bytes rather than trusting the build log.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist/galen-website';
const browser = join(dist, 'browser');
const indexPath = join(browser, 'index.html');

const failures = [];
const check = (label, ok) => {
  if (!ok) failures.push(label);
};

check(`${indexPath} exists`, existsSync(indexPath));
check('no server bundle (outputMode must stay "static")', !existsSync(join(dist, 'server')));

if (existsSync(indexPath)) {
  const html = readFileSync(indexPath, 'utf8');

  const required = [
    ['hero headline is prerendered', 'forces the same call'],
    ['canonical URL', '<link rel="canonical" href="https://galen.software/"'],
    ['JSON-LD block', 'application/ld+json'],
    ['SoftwareApplication schema', '"@type": "SoftwareApplication"'],
    ['open graph image', 'og:image'],
    ['contact address', 'bennettye@galen.software'],
    ['pipeline steps rendered', 'Evidence dossier'],
    ['trust pillars rendered', 'Every field carries a citation'],
    ['skip link', 'Skip to content'],
  ];

  for (const [label, needle] of required) check(label, html.includes(needle));

  // Guard the honesty constraints from CLAUDE.md and the brand brief.
  const banned = [
    ['no customer claims', /trusted by/i],
    ['no hype language', /revolutionary|game[- ]changing/i],
    ['no mock persona from the business card', /anna meier|anna@galen\.io/i],
    ['no placeholder domain', /galen\.io/i],
    // hello@ is not a configured address on the domain; mail to it is lost.
    ['no unrouted hello@ address', /hello@galen\.software/i],
  ];

  for (const [label, pattern] of banned) check(label, !pattern.test(html));
}


if (failures.length) {
  console.error('Prerender check FAILED:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log('Prerender check passed.');
