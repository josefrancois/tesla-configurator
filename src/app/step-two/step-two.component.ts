import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { CarModel } from '../models/car-model';
import { CarOption, Config } from '../models/car-option';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Step 2: Choose config and options</h1>
    <div *ngIf="carOption">
      <label>Config</label>
      <select id="configSelect" name="config" [compareWith]="compareConfigFn" [(ngModel)]="selectedConfig" (change)="activateStepThree()">
        <option *ngFor="let config of carOption.configs" [ngValue]="config">{{config.description}}</option>
      </select>
    </div>

    <ng-container *ngIf="carOption && selectedConfig">
      <p>Range: {{this.selectedConfig.range}} miles - Max speed : {{this.selectedConfig.speed}} - Price : {{this.selectedConfig.price | currency: 'USD'}}</p>

      <label for="tow-hitch">Tow hitch</label>
      <input id="includeTow" type="checkbox" name="tow-hitch" [(ngModel)]="carOption.towHitch" (change)="activateStepThree()">

      <label for="yoke">Yoke</label>
      <input id="includeYoke" type="checkbox" name="yoke" [(ngModel)]="carOption.yoke" (change)="activateStepThree()">
    </ng-container>

  `,
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent implements OnInit {
  
  selectedCarModel!: CarModel;
  carOption?: CarOption;
  selectedConfig?: Config;

  compareConfigFn = (c1: Config, c2: Config) => c1 && c2 && c1.id === c2.id;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.selectedCarModel = JSON.parse(localStorage.getItem('model') as string);
    this.selectedConfig = JSON.parse(localStorage.getItem('config') as string) || undefined;
    this.httpService.getCarOptions(this.selectedCarModel.code).subscribe(result => {
      this.carOption = JSON.parse(localStorage.getItem('option') as string) || result;
    });
  }

  activateStepThree() {
    localStorage.setItem("config", JSON.stringify(this.selectedConfig));
    localStorage.setItem("option", JSON.stringify(this.carOption));
  }
}
