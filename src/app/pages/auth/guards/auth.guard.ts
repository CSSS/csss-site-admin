import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CsssAuthService } from '../csss-auth/csss-auth.service';

export const authGuard: CanActivateFn = (_, state) => {
  const auth = inject(CsssAuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  return true;
};
