import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, SiteUser } from '@api/backend-api';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

export const RETURN_URL_KEY = 'csss-return-url';
const DEFAULT_RETURN_URL = '/dashboard';

@Injectable({
  providedIn: 'root'
})
export class CsssAuthService {
  private router = inject(Router);
  private authApi = inject(AuthenticationService);

  readonly loginUrl = `https://cas.sfu.ca/cas/login?service=${encodeURIComponent(environment.appUrl)}`;

  readonly user = signal<SiteUser | undefined>(undefined);
  readonly isAuthenticated = computed<boolean>(() => !!this.user());

  async initialize(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const ticket = params.get('ticket');
    if (ticket) {
      await this.logIn(ticket);
      return;
    }

    await this.restoreSession();
  }

  /**
   * Attempts to restore the session using the cookie already attached to requests.
   */
  async restoreSession(): Promise<boolean> {
    try {
      const user = await firstValueFrom(this.authApi.getUser());
      this.user.set(user);
      return true;
    } catch {
      return false;
    }
  }

  async logIn(ticket: string): Promise<void> {
    // Remove the ticket from the URL bar
    const url = new URL(window.location.href);
    url.searchParams.delete('ticket');
    window.history.replaceState({}, '', url.toString());

    try {
      await firstValueFrom(this.authApi.login({ service: environment.appUrl, ticket }, 'response'));
      const user = await firstValueFrom(this.authApi.getUser());
      this.user.set(user);

      const returnUrl = sessionStorage.getItem(RETURN_URL_KEY);
      sessionStorage.removeItem(RETURN_URL_KEY);
      this.router.navigateByUrl(this.getSafeReturnUrl(returnUrl));
    } catch {
      this.user.set(undefined);
    }
  }

  async logOut(): Promise<void> {
    try {
      await firstValueFrom(this.authApi.logout());
    } catch {
      console.error('Failed to log out.');
    } finally {
      this.user.set(undefined);
    }
  }

  private getSafeReturnUrl(returnUrl: string | null): string {
    if (!returnUrl || !returnUrl.startsWith('/') || returnUrl.startsWith('//')) {
      return DEFAULT_RETURN_URL;
    }

    try {
      const url = new URL(returnUrl, window.location.origin);
      const isDashboardRoute =
        url.pathname === DEFAULT_RETURN_URL || url.pathname.startsWith('/dashboard/');
      if (!isDashboardRoute) {
        return DEFAULT_RETURN_URL;
      }

      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return DEFAULT_RETURN_URL;
    }
  }
}
