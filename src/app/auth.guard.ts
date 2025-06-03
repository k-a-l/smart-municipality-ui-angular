// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwt');
  console.log('[AuthGuard] Token:', token);

  return token ? true : router.createUrlTree(['/login']);
};
