import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CsssAuthService } from '@pages/auth/csss-auth/csss-auth.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'cs-top-bar',
  imports: [MenubarModule, MenuModule, ButtonModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  protected auth = inject(CsssAuthService);
  protected menuItems: MenuItem[] = [
    {
      label: 'Elections',
      icon: PrimeIcons.TICKET,
      routerLink: ['/dashboard/elections'],
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'Officers',
      icon: PrimeIcons.CROWN,
      routerLink: ['/dashboard/officers'],
      routerLinkActiveOptions: { exact: true }
    }
  ];

  protected options: MenuItem[] = [
    {
      label: 'Log out',
      icon: PrimeIcons.SIGN_OUT,
      command: () => console.log('Sign out')
    }
  ];
}
