import { Component } from '@angular/core';
import { CarModel, Color } from '../models/car-model';
import { CommonModule } from '@angular/common';
import { CarOption, Config } from '../models/car-option';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Step 3: Summary</h1>
    <h3>Your Tesla {{selectedCarModel.description}}</h3>
    <span class="space-left space-between">
      <span class="bold-text">{{selectedCarConfig.description}}</span>
      <span>{{selectedCarConfig.price | currency: 'USD'}}</span>
    </span>
    <span class="space-left">Range : {{selectedCarConfig.range}} miles - Max speed : {{selectedCarConfig.speed}}</span> 
    <span class="space-left space-between">
      <span class="bold-text">{{selectedCarColor.description}}</span>
      <span>{{selectedCarColor.price | currency: 'USD'}}</span>
    </span>
    <span *ngIf="selectedCarOption.towHitch">
      <span class="space-left space-between">
        <span class="bold-text">Tow Hitch Package</span>
        <span>{{thousand | currency: 'USD'}}</span>
      </span>
    </span>
    <span *ngIf="selectedCarOption.yoke">
      <span class="space-left space-between">
        <span class="bold-text">Yoke Package</span>
        <span>{{thousand | currency: 'USD'}}</span>
      </span>
    </span>
    <hr>
    <span class="space-left space-between">
      <span class="bold-text">TOTAL COST</span>
      <span>{{totalCost | currency: 'USD'}}</span>
    </span>
    <hr>


  `,
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {

  readonly thousand = 1000;
  selectedCarModel: CarModel;
  selectedCarColor: Color;
  selectedCarConfig: Config;
  selectedCarOption: CarOption;
  totalCost: number = 0;

  constructor() {
    this.selectedCarModel = JSON.parse(localStorage.getItem('model') as string);
    this.selectedCarColor = JSON.parse(localStorage.getItem('color') as string);
    this.selectedCarConfig = JSON.parse(localStorage.getItem('config') as string);
    this.selectedCarOption = JSON.parse(localStorage.getItem('option') as string);
    this.totalCost = this.selectedCarColor.price + this.selectedCarConfig.price 
    + (this.selectedCarOption.towHitch ? 1000 : 0) + (this.selectedCarOption.yoke ? 1000 : 0); 
  }
}
