import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { Nominee, NomineeCreate } from '@api/backend-api/model/models';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { NomineesDialogComponent } from '../nominees-dialog/nominees-dialog.component';
import {
  NomineesSourceEntry,
  NomineesSourceService
} from '../nominees-sources/nominees.source.service';

@Component({
  selector: 'cs-nominees',
  imports: [CrudTableComponent],
  templateUrl: './nominees-table.component.html',
  styleUrl: './nominees-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NomineesTableComponent extends TableComponent<
  Nominee,
  NomineesSourceEntry,
  NomineeCreate,
  NomineesDialogComponent
> {
  protected override dialogClass = NomineesDialogComponent;

  protected override dataSourceService = inject(NomineesSourceService);

  protected columns: Signal<CrudTableColumn<Nominee>[]> = computed(() => [
    {
      label: 'Computing ID',
      key: 'computing_id'
    },
    {
      label: 'Name',
      key: 'full_name'
    },
    {
      label: 'LinkedIn',
      key: 'linked_in'
    },
    {
      label: 'Instagram',
      key: 'instagram'
    },
    {
      label: 'Email',
      key: 'email'
    },
    {
      label: 'Discord Username',
      key: 'discord_username'
    }
  ]);
}
