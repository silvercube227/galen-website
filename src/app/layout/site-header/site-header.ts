import { Component, signal } from '@angular/core';
import { GalenMark } from '../../shared/galen-mark/galen-mark';
import { primaryCtaHref, primaryCtaIsExternal, primaryCtaLabel, site } from '../../content/site.config';

@Component({
  selector: 'app-site-header',
  imports: [GalenMark],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: {
    // <app-site-header> is not a landmark on its own; screen readers need
    // the role to announce it as the page banner.
    role: 'banner',
    class: 'ground-navy',
    '[class.is-scrolled]': 'scrolled()',
    '(window:scroll)': 'onScroll()',
  },
})
export class SiteHeader {
  protected readonly site = site;
  protected readonly ctaHref = primaryCtaHref;
  protected readonly ctaLabel = primaryCtaLabel;
  protected readonly ctaIsExternal = primaryCtaIsExternal;

  /** Drives the bottom hairline. Stays false through prerender, which is correct. */
  protected readonly scrolled = signal(false);

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
