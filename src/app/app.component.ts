import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CsssAuthService } from '@pages/auth/csss-auth/csss-auth.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [MessageService, DialogService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private router = inject(Router);
  private auth = inject(CsssAuthService);

  constructor() {
    let wasAuthenticated = false;
    effect(() => {
      const authenticated = this.auth.isAuthenticated();
      if (wasAuthenticated && !authenticated) {
        this.router.navigate(['/']);
      }
      wasAuthenticated = authenticated;
    });
  }
}
