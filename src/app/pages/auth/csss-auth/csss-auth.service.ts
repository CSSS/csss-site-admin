import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, SiteUserModel } from '@api/backend-api';
import { of } from 'rxjs';
import { concatMap, filter, switchMap, takeWhile, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CsssAuthService {
  user = signal<SiteUserModel | null>(null);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  logIn$ = this.route.queryParams.pipe(
    // Don't fire if there is already a user logged in.
    takeWhile(() => !this.user()),
    // Only fire if there's a ticket in the params
    filter(params => !!params['ticket']),
    // Remove the ticket from the URL bar
    switchMap(params => {
      const ticket = params['ticket'];
      this.router.navigate([], {
        queryParams: { ticket: null },
        queryParamsHandling: 'merge',
        relativeTo: this.route,
        replaceUrl: true
      });
      return of(ticket);
    }),
    // Tell the backend to create a session
    concatMap(ticket => {
      return this.authApi.login(
        {
          service: environment.appUrl,
          ticket
        },
        'response'
      );
    }),
    // Get the user of the current session
    concatMap(() => this.authApi.getUser()),
    // Set it in the service
    tap(this.user.set)
  );

  private casLogInUrl = 'https://cas.sfu.ca/cas/login';

  private authApi = inject(AuthenticationService);

  getLoginUrl(): string {
    return `${this.casLogInUrl}?service=${encodeURIComponent(environment.appUrl)}`;
  }

  /**
   * Ask the backend to verify and create a session for us.
   */
  // private logIn(ticket: string): Observable<SiteUserModel> {
  //   return this.authApi
  //     .login(
  //       {
  //         service: environment.appUrl,
  //         ticket
  //       },
  //       'response'
  //     )
  //     .pipe(concatMap(() => this.authApi.getUser()));
  // }
}
