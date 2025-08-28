import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { ELECTIONS, ElectionModel } from './temp-interfaces';

interface ElectionViewModel extends ElectionModel {
  year: number;
  startNominations: Date;
}

@Component({
  selector: 'cs-dashboard',
  imports: [TopBarComponent, TableModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  protected elections: ElectionViewModel[] = ELECTIONS.map(e => {
    const startNominations = new Date(e.datetime_start_nominations);
    return {
      ...e,
      year: startNominations.getFullYear(),
      startNominations
    };
    // Latest elections should be at the stop, based on when nominations start.
  }).sort(
    (a, b) => b.startNominations.getUTCMilliseconds() - a.startNominations.getUTCMilliseconds()
  );
}
