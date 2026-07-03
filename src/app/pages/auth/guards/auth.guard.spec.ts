import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Mock, vi } from 'vitest';
import { CsssAuthService } from '../csss-auth/csss-auth.service';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let auth: {
    isAuthenticated: Mock;
  };
  let router: {
    createUrlTree: Mock;
  };
  let loginRedirect: UrlTree;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    auth = {
      isAuthenticated: vi.fn()
    };
    loginRedirect = {} as UrlTree;
    router = {
      createUrlTree: vi.fn().mockReturnValue(loginRedirect)
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: CsssAuthService,
          useValue: auth
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('redirects an unauthenticated user from a protected route to the base login path', () => {
    auth.isAuthenticated.mockReturnValue(false);

    const result = executeGuard({} as ActivatedRouteSnapshot, {
      url: '/dashboard/officers'
    } as RouterStateSnapshot);

    expect(router.createUrlTree).toHaveBeenCalledWith([''], {
      queryParams: { returnUrl: '/dashboard/officers' }
    });
    expect(result).toBe(loginRedirect);
  });

  it('allows an authenticated user to access a protected route', () => {
    auth.isAuthenticated.mockReturnValue(true);

    const result = executeGuard({} as ActivatedRouteSnapshot, {
      url: '/dashboard/officers'
    } as RouterStateSnapshot);

    expect(result).toBe(true);
  });
});
