import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedInGuardGuard: CanActivateFn = (route, state) => { 
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    return router.parseUrl('/signin'); // ✅ Fix: Redirect before route finalizes
  }
};
