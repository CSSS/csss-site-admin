import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { ElectionsService } from '@api/backend-api';
import { ElectionModel, ElectionTypeEnum } from '@api/backend-api/model/models';
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
  ElectionModel,
  ElectionsDialogComponent
> {
  private electionApi = inject(ElectionsService);
  protected activeChipCell = viewChild.required<TemplateRef<unknown>>('activeChipCell');

  protected availablePosCell = viewChild.required<TemplateRef<unknown>>('availablePositionsCell');

  protected override dialogClass = ElectionsDialogComponent;

  /**
   * Needs to be a signal since the activeTemplate needs to be instantiated.
   */
  protected columns: Signal<CrudTableColumn<ElectionModel>[]> = computed(() => [
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

  protected override dataSource = this.electionApi.getAllElections();

  protected override fetchEntries(): void {
    this.dataSource.subscribe(res => {
      const entries = res.sort(
        // Latest elections should be at the top, based on the end voting date
        (a, b) =>
          new Date(b.datetime_end_voting).getTime() - new Date(a.datetime_end_voting).getTime()
      );
      this.entries.set(entries);
    });
  }

  protected isElectionActive(election: ElectionModel): boolean {
    const currentTime = new Date();
    return (
      currentTime >= new Date(election.datetime_start_nominations) &&
      currentTime <= new Date(election.datetime_end_voting)
    );
  }
}
