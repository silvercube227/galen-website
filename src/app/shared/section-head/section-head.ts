import { Component, input } from '@angular/core';

/**
 * The deck's section-head pattern: title left, index right, over a 2px rule.
 */
@Component({
  selector: 'app-section-head',
  templateUrl: './section-head.html',
  styleUrl: './section-head.scss',
})
export class SectionHead {
  readonly heading = input.required<string>();
  /** Two-digit section index, e.g. "02". */
  readonly index = input.required<string>();
  /** Links the section's aria-labelledby to this heading. */
  readonly headingId = input.required<string>();
}
