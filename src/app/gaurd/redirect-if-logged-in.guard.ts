import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/* 
redirects the user to movies route incase the 
user rhe tries to go to signup.in route when logged in.

*/

export const redirectIfLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) { 
    return router.parseUrl('/movies'); 
  } else {
    return true;
  }
};
