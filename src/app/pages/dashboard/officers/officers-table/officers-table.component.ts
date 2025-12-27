import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { OfficerInfoResponse } from '@api/backend-api/model/models';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { OfficersDialogComponent } from '../officers-dialog/officers-dialog.component';
import {
  OfficerInfoSourceEntry,
  OfficersInfoSourceService
} from '../officers-sources/officers-info.source.service';

@Component({
  selector: 'cs-officers',
  imports: [CrudTableComponent],
  templateUrl: './officers-table.component.html',
  styleUrl: './officers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficersComponent extends TableComponent<
  OfficerInfoResponse,
  OfficerInfoSourceEntry,
  OfficersDialogComponent
> {
  protected override dialogClass = OfficersDialogComponent;

  protected override dataSource = inject(OfficersInfoSourceService);

  protected columns: Signal<CrudTableColumn<OfficerInfoResponse>[]> = computed(() => [
    {
      label: 'Label',
      key: 'Key'
    }
  ]);
}
