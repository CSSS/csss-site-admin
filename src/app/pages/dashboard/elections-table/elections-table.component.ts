import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { getValueOfKey } from '../../../utils/type-utils';
import { CrudColumn, CrudTableComponent } from '../crud-table/crud-table.component';
import { ElectionsDialogComponent } from '../elections-dialog/elections-dialog.component';
import { ElectionModel, ELECTIONS, electionTypeLabels } from '../temp-interfaces';

export interface ElectionsTableEntry extends ElectionModel {
  year: number;
  startNominations: Date;
  isActive: boolean;
  availablePositions: string[];
}

@Component({
  selector: 'cs-elections-table',
  imports: [CrudTableComponent, TagModule, ElectionsDialogComponent],
  templateUrl: './elections-table.component.html',
  styleUrl: './elections-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsTableComponent {
  protected activeChipCell = viewChild.required<TemplateRef<unknown>>('activeChipCell');
  protected availablePosCell = viewChild.required<TemplateRef<unknown>>('availablePositionsCell');
  protected createDialog = viewChild.required<TemplateRef<unknown>>('dialog');

  /**
   * Needs to be a signal since the activeTemplate needs to be instantiated.
   */
  protected columns: Signal<CrudColumn<ElectionsTableEntry>[]> = computed(() => [
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
      key: 'type',
      transform: (value: string) => getValueOfKey(electionTypeLabels, value) ?? value
    },
    {
      label: 'Status',
      key: 'isActive',
      cellTemplate: this.activeChipCell()
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
      key: 'available_positions',
      cellTemplate: this.availablePosCell()
    },
    {
      label: 'Survey Link',
      key: 'survey_link',
      isExternalLink: true
    }
  ]);

  readonly currentTime = new Date();

  protected elections: ElectionsTableEntry[] = ELECTIONS.map(e => {
    const startNominations = new Date(e.datetime_start_nominations);
    const endVoting = new Date(e.datetime_end_voting);
    const isActive = this.currentTime >= startNominations && this.currentTime <= endVoting;
    return {
      ...e,
      year: startNominations.getFullYear(),
      startNominations,
      isActive,
      availablePositions: e.available_positions.split(',')
    };
    // Latest elections should be at the top, based on when nominations start.
  }).sort(
    (a, b) => b.startNominations.getUTCMilliseconds() - a.startNominations.getUTCMilliseconds()
  );
}
