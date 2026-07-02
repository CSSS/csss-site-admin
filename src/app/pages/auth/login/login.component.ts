import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CsssAuthService } from '../csss-auth/csss-auth.service';

export const RETURN_URL_KEY = 'csss-return-url';

@Component({
  selector: 'cs-login',
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  protected readonly auth = inject(CsssAuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) {
      sessionStorage.setItem(RETURN_URL_KEY, returnUrl);
    }
  }
}
