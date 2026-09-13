import { Component } from '@angular/core';
import { SectionHead } from '../../shared/section-head/section-head';
import { audiencePoints } from '../../content/site-content';

@Component({
  selector: 'app-audience',
  imports: [SectionHead],
  templateUrl: './audience.html',
  styleUrl: './audience.scss',
  host: { class: 'ground-white section' },
})
export class Audience {
  protected readonly points = audiencePoints;
}
