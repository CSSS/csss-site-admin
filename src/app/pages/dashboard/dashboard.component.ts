import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { ElectionsTableComponent } from './elections-table/elections-table.component';

@Component({
  selector: 'cs-dashboard',
  imports: [TopBarComponent, ElectionsTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  protected isAdmin = true;
}
