import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, SiteUser } from '@api/backend-api';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RETURN_URL_KEY } from '../login/login.component';

export const USER_STORAGE_KEY = 'sfu-user';

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
      this.router.navigateByUrl(returnUrl ?? '/dashboard');
    } catch {
      this.user.set(undefined);
    }
  }

  async logOut(): Promise<void> {
    await firstValueFrom(this.authApi.logout());
    this.user.set(undefined);
  }
}
