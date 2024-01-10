import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterModule],
  template: `
    <button id="step1" (click)="goToStep('one')">Step 1</button>
    <button id="step2" (click)="goToStep('two')">Step 2</button>
    <button id="step3" (click)="goToStep('three')">Step 3</button>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor(private router: Router) {
    this.goToStep('one');
  }

  getStepRoute(step: 'one' | 'two' | 'three') {
    switch (step) {
      case 'one':
        return '/step-one'
      case 'two':
        return '/step-two'
      case 'three':
        return '/step-three'
    }
  }

  goToStep(step: 'one' | 'two' | 'three') {
    this.router.navigate([this.getStepRoute(step)]);
  }

}
