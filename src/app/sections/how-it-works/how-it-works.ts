import { Component } from '@angular/core';
import { SectionHead } from '../../shared/section-head/section-head';
import { PipelineSteps } from '../../shared/pipeline-steps/pipeline-steps';

@Component({
  selector: 'app-how-it-works',
  imports: [SectionHead, PipelineSteps],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
  host: { class: 'ground-white section' },
})
export class HowItWorks {}
