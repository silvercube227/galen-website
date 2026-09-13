/** Single source of truth for identity and outbound links. */
export const site = {
  name: 'Galen',
  tagline: 'Regulatory infrastructure',
  domain: 'galen.software',
  origin: 'https://galen.software',

  /**
   * Design-partner booking link. Leave empty until a real scheduler exists —
   * the CTA falls back to email rather than shipping a dead button.
   */
  bookingUrl: '',

  email: 'bennettye@galen.software',
} as const;

export const emailHref = `mailto:${site.email}`;

/** Where the primary CTA points today. */
export const primaryCtaHref = site.bookingUrl || emailHref;

/** A scheduler link leaves the site; email does not. */
export const primaryCtaIsExternal = Boolean(site.bookingUrl);

export const primaryCtaLabel = site.bookingUrl ? 'Book a call' : 'Get in touch';
