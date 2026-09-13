import { Component } from '@angular/core';
import { SectionHead } from '../../shared/section-head/section-head';
import { BrandCard } from '../../shared/brand-card/brand-card';
import { trustPillars } from '../../content/site-content';

@Component({
  selector: 'app-trust',
  imports: [SectionHead, BrandCard],
  templateUrl: './trust.html',
  styleUrl: './trust.scss',
  host: { class: 'ground-white section' },
})
export class Trust {
  protected readonly pillars = trustPillars;
}
