import { computed, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, SiteUserModel } from '@api/backend-api';
import { of } from 'rxjs';
import { concatMap, filter, switchMap, takeWhile, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CsssAuthService {
  user = signal<SiteUserModel | undefined>(undefined);
  isAuthenticated = computed<boolean>(() => !!this.user());

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authApi = inject(AuthenticationService);

  readonly loginUrl = `https://cas.sfu.ca/cas/login?service=${encodeURIComponent(environment.appUrl)}`;

  logIn$ = this.route.queryParams.pipe(
    // Don't fire if there is already a user logged in.
    takeWhile(() => !this.user()),
    // Only fire if there's a ticket in the params
    filter(params => !!params['ticket']),
    // Remove the ticket from the URL bar
    switchMap(params => {
      const ticket = params['ticket'];
      this.router.navigate([], {
        queryParams: { ticket: undefined },
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
    // Set the user
    tap(user => {
      localStorage.setItem('sfuUser', JSON.stringify(user));
      this.user.set(user);
    })
  );
}
