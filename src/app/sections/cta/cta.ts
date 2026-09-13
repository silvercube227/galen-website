import { Component } from '@angular/core';
import { emailHref, primaryCtaHref, primaryCtaIsExternal, primaryCtaLabel, site } from '../../content/site.config';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
  host: { class: 'ground-navy section' },
})
export class Cta {
  protected readonly site = site;
  protected readonly ctaHref = primaryCtaHref;
  protected readonly ctaLabel = primaryCtaLabel;
  protected readonly ctaIsExternal = primaryCtaIsExternal;
  protected readonly emailHref = emailHref;
  /** True when the button already is the email link; avoids offering it twice. */
  protected readonly ctaIsEmail = primaryCtaHref === emailHref;
}
