import { inject, Injectable, signal } from '@angular/core';
import { AuthenticationService, SiteUserModel } from '@api/backend-api';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CsssAuthService {
  user = signal<SiteUserModel | null>(null);
  private casLogInUrl = 'https://cas.sfu.ca/cas/login';
  private redirectUrl = `${environment.appUrl}/auth`;

  private authApi = inject(AuthenticationService);

  getLoginUrl(): string {
    return `${this.casLogInUrl}?service=${encodeURIComponent(this.redirectUrl)}`;
  }

  /**
   * Ask the backend to verify and create a session for us.
   */
  logIn(ticket: string): Observable<SiteUserModel> {
    return this.authApi
      .login(
        {
          service: this.redirectUrl,
          ticket
        },
        'response'
      )
      .pipe(concatMap(() => this.authApi.getUser()));
  }
}
