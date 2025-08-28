import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'cs-top-bar',
  imports: [MenubarModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Create',
      icon: PrimeIcons.PLUS,
      items: [
        {
          label: 'Election',
          icon: PrimeIcons.TICKET
        },
        {
          label: 'Nominee',
          icon: PrimeIcons.RECEIPT
        },
        {
          label: 'Officer',
          icon: PrimeIcons.CROWN
        }
      ]
    },
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      items: [
        {
          label: 'General Election',
          icon: PrimeIcons.USERS
        },
        {
          label: 'By-Election',
          icon: PrimeIcons.USER_PLUS
        },
        {
          label: 'Council Representative',
          icon: PrimeIcons.USER
        }
      ]
    }
  ];
}
