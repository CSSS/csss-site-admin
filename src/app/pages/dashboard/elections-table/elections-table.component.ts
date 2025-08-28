import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { CrudColumn, CrudTableComponent } from '../crud-table/crud-table.component';
import { ElectionModel, ELECTIONS } from '../temp-interfaces';

interface ElectionTableEntry extends ElectionModel {
  year: number;
  startNominations: Date;
  isActive: boolean;
}

@Component({
  selector: 'cs-elections-table',
  imports: [CrudTableComponent, TagModule],
  templateUrl: './elections-table.component.html',
  styleUrl: './elections-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsTableComponent {
  activeTemplate = viewChild.required<TemplateRef<unknown>>('activeTemplate');

  /**
   * Needs to be a signal since the activeTemplate needs to be instantiated.
   */
  protected columns: Signal<CrudColumn<ElectionTableEntry>[]> = computed(() => [
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
      label: 'Status',
      key: 'isActive',
      cellTemplate: this.activeTemplate()
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
  ]);

  readonly currentTime = new Date();

  protected elections: ElectionTableEntry[] = ELECTIONS.map(e => {
    const startNominations = new Date(e.datetime_start_nominations);
    const endVoting = new Date(e.datetime_end_voting);
    const isActive = this.currentTime >= startNominations && this.currentTime <= endVoting;
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
