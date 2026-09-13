import { Component, input } from '@angular/core';

/**
 * The Confluence mark: two strokes enter from the left, converge at a vertex
 * right of centre, and continue right as one. Traced from the brand artwork
 * in design/Galen Mockups-selection.png onto the spec's 32x32 grid —
 * stroke 3.5, butt caps, miter joins, no fill, 45-degree diagonals.
 *
 * Colour comes from currentColor so the ground controls it: cream on navy,
 * navy on white. Never the accent.
 */
@Component({
  selector: 'app-galen-mark',
  templateUrl: './galen-mark.html',
  styleUrl: './galen-mark.scss',
})
export class GalenMark {
  /** Rendered height in px. Width follows the 32:32 viewBox. */
  readonly size = input(32);
}
