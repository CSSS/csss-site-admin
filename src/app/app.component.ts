import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  private csssAuth = inject(CsssAuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const localUser = localStorage.getItem('sfuUser');
    if (localUser) {
      this.csssAuth.user.set(JSON.parse(localUser));
      this.router.navigate(['dashboard']);
    } else {
      this.csssAuth.logIn$.subscribe({
        next: () => {
          this.router.navigate(['dashboard']);
        },
        error: err => {
          throw new Error(err);
        }
      });
    }
  }
}
