import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { Officer } from '@api/backend-api';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { OfficersDialogComponent } from '../officers-dialog/officers-dialog.component';
import {
  OfficerSourceEntry,
  OfficerSourceService
} from '../officers-sources/officers.source.service';

@Component({
  selector: 'cs-officers',
  imports: [CrudTableComponent],
  templateUrl: './officers-table.component.html',
  styleUrl: './officers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficersComponent extends TableComponent<
  Officer,
  OfficerSourceEntry,
  OfficersDialogComponent
> {
  protected override dialogClass = OfficersDialogComponent;

  protected override dataSource = inject(OfficerSourceService);

  protected columns: Signal<CrudTableColumn<Officer>[]> = computed(() => [
    {
      label: 'Label',
      key: 'term_id'
    }
  ]);
}
