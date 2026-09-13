import { Component } from '@angular/core';
import { primaryCtaHref, primaryCtaIsExternal, primaryCtaLabel, site } from '../../content/site.config';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  host: { class: 'ground-navy' },
})
export class Hero {
  protected readonly site = site;
  protected readonly ctaHref = primaryCtaHref;
  protected readonly ctaLabel = primaryCtaLabel;
  protected readonly ctaIsExternal = primaryCtaIsExternal;
}
