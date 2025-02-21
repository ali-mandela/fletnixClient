import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/* 
redirects the user to signin route incase the 
user rhe tries to go to any other route without logged in.

*/
export const isLoggedInGuardGuard: CanActivateFn = (route, state) => { 
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    return router.parseUrl('/signin'); 
  }
};
