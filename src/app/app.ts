import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './layout/site-header/site-header';
import { SiteFooter } from './layout/site-footer/site-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    // A link shared as galen.software/#trust arrives before the web fonts have
    // loaded, and swapping Fraunces in moves every heading below it. Waiting
    // for fonts means the deep link lands on the section, not near it.
    afterNextRender(() => {
      const id = location.hash.slice(1);
      if (!id) return;

      const settle = document.fonts?.ready ?? Promise.resolve();
      settle.then(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    });
  }
}
