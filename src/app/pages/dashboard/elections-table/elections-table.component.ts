import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CrudTableComponent } from '../crud-table/crud-table.component';
import { ELECTIONS, ElectionModel } from '../temp-interfaces';

interface ElectionViewModel extends ElectionModel {
  year: number;
  startNominations: Date;
}

@Component({
  selector: 'cs-elections-table',
  imports: [CrudTableComponent],
  templateUrl: './elections-table.component.html',
  styleUrl: './elections-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsTableComponent {
  protected columns = [
    {
      label: 'Slug',
      key: 'slug'
    },
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Year',
      key: 'year'
    },
    {
      label: 'Type',
      key: 'type'
    },
    {
      label: 'Nominations Start',
      key: 'datetime_start_nominations'
    },
    {
      label: 'Voting Start',
      key: 'datetime_start_voting'
    },
    {
      label: 'Voting End',
      key: 'datetime_end_voting'
    },
    {
      label: 'Available Positions',
      key: 'available_positions'
    },
    {
      label: 'Survey Link',
      key: 'survey_link',
      isExternalLink: true
    }
  ];

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
