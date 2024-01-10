import { CanActivateFn } from '@angular/router';

export const stepThreeGuard: CanActivateFn = (route, state) => {
  return !!localStorage.getItem('config') && !!localStorage.getItem('option');
};
