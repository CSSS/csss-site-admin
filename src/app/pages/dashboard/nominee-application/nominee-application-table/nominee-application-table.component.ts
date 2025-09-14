import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { NomineeApplicationModel } from '@api/backend-api/model/models';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { NomineeApplicationDialogComponent } from '../nominee-application-dialog/nominee-application-dialog.component';
import {
  NomineeApplicationSourceEntry,
  NomineeApplicationSourceService
} from '../nominee-application-sources/nominee-application.source.service';

@Component({
  selector: 'cs-nominee-application',
  imports: [CrudTableComponent],
  templateUrl: './nominee-application-table.component.html',
  styleUrl: './nominee-application-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NomineeApplicationComponent extends TableComponent<
  NomineeApplicationModel,
  NomineeApplicationSourceEntry,
  NomineeApplicationDialogComponent
> {
  protected override dialogClass = NomineeApplicationDialogComponent;

  protected override dataSource = inject(NomineeApplicationSourceService);

  protected columns: Signal<CrudTableColumn<NomineeApplicationModel>[]> = computed(() => [
    {
      label: 'Label',
      key: 'Key'
    }
  ]);
}
