import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import {
  ElectionResponse,
  ElectionStatusEnum,
  ElectionTypeEnum
} from '@api/backend-api/model/models';
import {
  ElectionsSourceEntry,
  ElectionsSourceService
} from '@pages/dashboard/crud-sources/elections/elections.source.service';
import { getValueOfKey } from '@utils/type-utils';
import { TagModule } from 'primeng/tag';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { ElectionsDialogComponent } from '../elections-dialog/elections-dialog.component';
import { OfficerFormatPipe } from './officer-format/officer-format.pipe';

@Component({
  selector: 'cs-elections-table',
  imports: [CrudTableComponent, TagModule, OfficerFormatPipe],
  templateUrl: './elections-table.component.html',
  styleUrl: './elections-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsTableComponent extends TableComponent<
  ElectionResponse,
  ElectionsSourceEntry,
  ElectionsDialogComponent
> {
  protected activeChipCell = viewChild.required<TemplateRef<unknown>>('activeChipCell');

  protected availablePosCell = viewChild.required<TemplateRef<unknown>>('availablePositionsCell');

  protected override dialogClass = ElectionsDialogComponent;

  /**
   * Needs to be a signal since the activeTemplate needs to be instantiated.
   */
  protected columns: Signal<CrudTableColumn<ElectionResponse>[]> = computed(() => [
    {
      label: 'Slug',
      key: 'slug'
    },
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Type',
      key: 'type',
      transform: (value: string) => getValueOfKey(ElectionTypeEnum, value) ?? value
    },
    {
      label: 'Status',
      cellTemplate: this.activeChipCell()
    },
    {
      label: 'Nominations Start',
      key: 'datetime_start_nominations',
      type: 'date'
    },
    {
      label: 'Voting Start',
      key: 'datetime_start_voting',
      type: 'date'
    },
    {
      label: 'Voting End',
      key: 'datetime_end_voting',
      type: 'date'
    },
    {
      label: 'Available Positions',
      key: 'available_positions',
      cellTemplate: this.availablePosCell()
    },
    {
      label: 'Survey Link',
      key: 'survey_link',
      type: 'externalLink'
    }
  ]);

  protected override dataSource = inject(ElectionsSourceService);

  protected isElectionActive(election: ElectionResponse): boolean {
    return (
      election.status !== ElectionStatusEnum.AfterVoting &&
      election.status !== ElectionStatusEnum.BeforeNominations
    );
  }
}
