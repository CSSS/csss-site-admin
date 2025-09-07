import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { CsssAuthService } from '../csss-auth/csss-auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(CsssAuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    console.log('Failed');
    return new RedirectCommand(router.parseUrl(''));
  }
  return true;
};
