import { CanActivateFn } from '@angular/router';

export const stepTwoGuard: CanActivateFn = (route, state) => {
  return !!localStorage.getItem('model') && !!localStorage.getItem('color');
};