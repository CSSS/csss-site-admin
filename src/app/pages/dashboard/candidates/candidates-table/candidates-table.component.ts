import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { Candidate, CandidateCreate } from '@api/backend-api/model/models';
import { officerLabels } from '@pages/dashboard/officers';
import { getValueOfKey } from '@utils/type-utils';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { CandidatesDialogComponent } from '../candidates-dialog/candidates-dialog.component';
import {
  CandidatesSourceEntry,
  CandidatesSourceService
} from '../candidates-sources/candidates.source.service';

@Component({
  selector: 'cs-candidates',
  imports: [CrudTableComponent],
  templateUrl: './candidates-table.component.html',
  styleUrl: './candidates-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidatesTableComponent extends TableComponent<
  Candidate,
  CandidatesSourceEntry,
  CandidateCreate,
  CandidatesDialogComponent
> {
  protected override dialogClass = CandidatesDialogComponent;

  protected override dataSourceService = inject(CandidatesSourceService);

  protected columns: Signal<CrudTableColumn<Candidate>[]> = computed(() => [
    {
      label: 'Computing ID',
      key: 'computing_id'
    },
    {
      label: 'Election',
      key: 'nominee_election'
    },
    {
      label: 'Position',
      key: 'position',
      transform: (value: string) => getValueOfKey(officerLabels, value) ?? value
    },
    {
      label: 'Speech',
      key: 'speech'
    }
  ]);
}
