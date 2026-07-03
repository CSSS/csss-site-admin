import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService, SiteUser } from '@api/backend-api';
import { of, throwError } from 'rxjs';
import { Mock, vi } from 'vitest';
import { CsssAuthService, RETURN_URL_KEY } from './csss-auth.service';

describe('CsssAuthService', () => {
  const siteUser: SiteUser = {
    computing_id: 'testuser',
    first_logged_in: '2026-01-01T00:00:00Z',
    last_logged_in: '2026-01-02T00:00:00Z'
  };

  let service: CsssAuthService;
  let authApi: {
    login: Mock;
    getUser: Mock;
    logout: Mock;
  };
  let router: {
    navigateByUrl: Mock;
  };

  beforeEach(() => {
    authApi = {
      login: vi.fn().mockReturnValue(of({})),
      getUser: vi.fn().mockReturnValue(of(siteUser)),
      logout: vi.fn().mockReturnValue(of({ message: 'Logged out' }))
    };
    router = {
      navigateByUrl: vi.fn()
    };
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthenticationService,
          useValue: authApi
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    });
    service = TestBed.inject(CsssAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('restores the user on page refresh while the session is still valid', async () => {
    await service.initialize();

    expect(authApi.getUser).toHaveBeenCalledTimes(1);
    expect(service.user()).toEqual(siteUser);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('leaves the user unauthenticated on page refresh after the session has expired', async () => {
    authApi.getUser.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            error: { detail: 'Not logged in.' }
          })
      )
    );

    await service.initialize();

    expect(authApi.getUser).toHaveBeenCalledTimes(1);
    expect(service.user()).toBeUndefined();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('navigates to a stored dashboard return URL after login', async () => {
    sessionStorage.setItem(RETURN_URL_KEY, '/dashboard/officers');

    await service.logIn('ticket');

    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard/officers');
  });

  it('falls back to the dashboard for unsafe return URLs after login', async () => {
    sessionStorage.setItem(RETURN_URL_KEY, 'https://example.com/phishing');

    await service.logIn('ticket');

    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('clears the user when logging out', async () => {
    service.user.set(siteUser);

    await service.logOut();

    expect(authApi.logout).toHaveBeenCalledTimes(1);
    expect(service.user()).toBeUndefined();
    expect(service.isAuthenticated()).toBe(false);
  });
});
