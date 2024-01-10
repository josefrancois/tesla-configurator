import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarModel, Color } from '../models/car-model';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Step 1: Choose model and color</h1>
    <div>
      <label>Model</label>
      <select id="modelSelect" name="carModel" [compareWith]="compareOptionFn" [(ngModel)]="selectedCarModel" [disabled]="!!selectedCarColor">
        <option *ngFor="let carModel of carModels" [ngValue]="carModel">{{carModel.description}}</option>
      </select>
      <button (click)="reset()" [disabled]="!selectedCarModel">Reset</button>
    </div>
    
    

    <div *ngIf="selectedCarModel">
      <label>Color</label>
      <select id="colorSelect" name="carColor" [compareWith]="compareOptionFn" [(ngModel)]="selectedCarColor" (change)="activateStepTwo()">
        <option *ngFor="let color of selectedCarModel?.colors" [ngValue]="color">{{color.description | titlecase}}</option>
      </select>
    </div>
        
    <img *ngIf="selectedCarModel && selectedCarColor" [src]="displayImg()" >
  `,
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent implements OnInit {
  displayImg = () => `https://interstate21.com/tesla-app/images/${this.selectedCarModel?.code}/${this.selectedCarColor?.code.toLowerCase()}.jpg`;

  carModels: CarModel[] = [];
  selectedCarModel?: CarModel;
  selectedCarColor?: Color;

  compareOptionFn = (c1: {code: string}, c2: {code: string}) => c1 && c2 && c1.code === c2.code;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.selectedCarModel = JSON.parse(localStorage.getItem('model') as string) as CarModel || undefined;
    this.selectedCarColor = JSON.parse(localStorage.getItem('color') as string) as Color || undefined;
    this.httpService.getCarModels().subscribe(result => {
      this.carModels = result;
    });
  }

  activateStepTwo() {
    localStorage.setItem("model", JSON.stringify(this.selectedCarModel));
    localStorage.setItem("color", JSON.stringify(this.selectedCarColor));
  }

  reset() {
    this.selectedCarModel = undefined;
    this.selectedCarColor = undefined;
    localStorage.clear();
  }
}
