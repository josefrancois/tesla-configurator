import { Routes } from '@angular/router';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { stepTwoGuard } from './service/guard/step-two.guard';
import { stepThreeGuard } from './service/guard/step-three.guard';

export const routes: Routes = [
    {path: 'step-one', component: StepOneComponent},
    {path: 'step-two', canActivate: [stepTwoGuard], component: StepTwoComponent},
    {path: 'step-three', canActivate: [stepThreeGuard], component: StepThreeComponent}
];
