import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CsssAuthService } from '@pages/auth/csss-auth/csss-auth.service';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';

@Component({
  selector: 'cs-dashboard',
  imports: [RouterModule, TopBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private csssAuth = inject(CsssAuthService);

  protected isAdmin = true;

  ngOnInit(): void {
    // TODO: Check the user's session with the backend first before letting them continue
    const localUser = localStorage.getItem('sfuUser');
    if (localUser) {
      this.csssAuth.user.set(JSON.parse(localUser));
    }
  }
}
