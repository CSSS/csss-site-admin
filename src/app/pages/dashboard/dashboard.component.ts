import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { ELECTIONS, ElectionViewModel } from './temp-interfaces';

@Component({
  selector: 'cs-dashboard',
  imports: [TopBarComponent, TableModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  protected elections: ElectionViewModel[] = ELECTIONS;
}
