import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CsssAuthService } from '../csss-auth/csss-auth.service';

@Component({
  selector: 'cs-login',
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  auth = inject(CsssAuthService);
}
