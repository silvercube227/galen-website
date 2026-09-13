import { Component } from '@angular/core';
import { pipelineSteps } from '../../content/site-content';

/**
 * The ingest -> sign-off pipeline.
 *
 * Built as a real ordered list rather than one wide SVG: it stays legible at
 * 400px, reflows from a horizontal run to a vertical spine without an
 * overflow container, and reads as five steps to a screen reader instead of
 * one opaque image. No icons, per the brand spec.
 */
@Component({
  selector: 'app-pipeline-steps',
  templateUrl: './pipeline-steps.html',
  styleUrl: './pipeline-steps.scss',
})
export class PipelineSteps {
  protected readonly steps = pipelineSteps;
}
