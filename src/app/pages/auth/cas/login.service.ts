import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@api/backend-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private casLogInUrl = 'https://cas.sfu.ca/cas/login';
  private redirectUrl = `${environment.appUrl}/auth`;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authApi = inject(AuthenticationService);

  getLoginUrl(): string {
    return `${this.casLogInUrl}?service=${encodeURIComponent(this.redirectUrl)}`;
  }

  validate(): void {
    const ticket = this.route.snapshot.queryParamMap.get('ticket');

    if (ticket) {
      this.authApi
        .login(
          {
            service: this.redirectUrl,
            ticket
          },
          'response'
        )
        .subscribe({
          next: response => {
            console.log(response);
            if (!response.ok) {
              return;
            }
            this.router.navigate(['dashboard', 'elections']);
          }
        });
    }
  }
}
