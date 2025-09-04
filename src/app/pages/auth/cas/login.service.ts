import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@api/backend-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private casLogInUrl = 'https://cas.sfu.ca/cas/login';
  private authLogInUrl = '/api/auth/login';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authApi = inject(AuthenticationService);

  getLoginUrl(): string {
    return `${this.casLogInUrl}?service=${encodeURIComponent(
      environment.appUrl + this.authLogInUrl + `?redirect_path=${environment.appUrl}`
    )}`;
  }

  validate(): void {
    const ticket = this.route.snapshot.queryParamMap.get('ticket');

    if (ticket) {
      this.authApi
        .login({
          redirectPath: environment.appUrl,
          ticket
        })
        .subscribe(console.log);
    }
  }
}
