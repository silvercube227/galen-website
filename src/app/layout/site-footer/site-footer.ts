import { Component } from '@angular/core';
import { GalenMark } from '../../shared/galen-mark/galen-mark';
import { emailHref, site } from '../../content/site.config';

@Component({
  selector: 'app-site-footer',
  imports: [GalenMark],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  host: { role: 'contentinfo', class: 'ground-navy' },
})
export class SiteFooter {
  protected readonly site = site;
  protected readonly emailHref = emailHref;
  protected readonly year = new Date().getFullYear();
}
