import { Component } from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { Stakes } from '../../sections/stakes/stakes';
import { HowItWorks } from '../../sections/how-it-works/how-it-works';
import { Trust } from '../../sections/trust/trust';
import { Audience } from '../../sections/audience/audience';
import { Cta } from '../../sections/cta/cta';

@Component({
  selector: 'app-home',
  imports: [Hero, Stakes, HowItWorks, Trust, Audience, Cta],
  templateUrl: './home.html',
})
export class Home {}
