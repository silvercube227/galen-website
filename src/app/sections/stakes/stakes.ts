import { Component } from '@angular/core';
import { SectionHead } from '../../shared/section-head/section-head';

@Component({
  selector: 'app-stakes',
  imports: [SectionHead],
  templateUrl: './stakes.html',
  styleUrl: './stakes.scss',
  host: { class: 'ground-white section' },
})
export class Stakes {}
