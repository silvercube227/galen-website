import { Component, computed, input } from '@angular/core';

/**
 * Square-cornered card, no shadow. Three variants per the brand spec:
 * default (1.5px border), emphasis (solid navy fill), and dashed —
 * reserved for anything future or hypothetical.
 */
@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.html',
  styleUrl: './brand-card.scss',
  host: { '[class]': 'hostClass()' },
})
export class BrandCard {
  readonly variant = input<'default' | 'emphasis' | 'dashed'>('default');
  readonly heading = input.required<string>();

  protected readonly hostClass = computed(() => {
    const variant = this.variant();
    // An emphasis card is a navy ground, so it re-scopes the colour roles.
    return `card card--${variant} ${variant === 'emphasis' ? 'ground-navy' : ''}`;
  });
}
