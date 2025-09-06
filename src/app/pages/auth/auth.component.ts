import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CsssAuthService } from './csss-auth/login.service';

@Component({
  selector: 'cs-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  private csssAuth = inject(CsssAuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    // Need to copy the params to delete anything from it.
    const queryParams = { ...this.route.snapshot.queryParams };
    const ticket = queryParams['ticket'];

    if (!ticket) {
      throw new Error('No ticket supplied.');
    }

    delete queryParams['ticket'];
    this.router.navigate([], { queryParams, relativeTo: this.route, replaceUrl: true });

    this.csssAuth.logIn(ticket).subscribe({
      next: res => {
        this.csssAuth.user.set(res);
        this.router.navigate(['dashboard']);
      },
      error: err => {
        throw new Error(err);
      }
    });
  }
}
