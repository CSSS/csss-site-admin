import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CrudColumn, CrudTableComponent } from '../crud-table/crud-table.component';
import { ELECTIONS, ElectionModel } from '../temp-interfaces';

interface ElectionTableEntry extends ElectionModel {
  year: number;
  startNominations: Date;
  isActive: boolean;
}

@Component({
  selector: 'cs-elections-table',
  imports: [CrudTableComponent],
  templateUrl: './elections-table.component.html',
  styleUrl: './elections-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsTableComponent {
  protected columns: CrudColumn<ElectionTableEntry>[] = [
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
      label: 'Active?',
      key: 'isActive'
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

  readonly currentTime = new Date();

  protected elections: ElectionTableEntry[] = ELECTIONS.map(e => {
    const startNominations = new Date(e.datetime_start_nominations);
    const endVoting = new Date(e.datetime_end_voting);
    const isActive = this.currentTime < startNominations || this.currentTime > endVoting;
    return {
      ...e,
      year: startNominations.getFullYear(),
      startNominations,
      isActive
    };
    // Latest elections should be at the stop, based on when nominations start.
  }).sort(
    (a, b) => b.startNominations.getUTCMilliseconds() - a.startNominations.getUTCMilliseconds()
  );
}
