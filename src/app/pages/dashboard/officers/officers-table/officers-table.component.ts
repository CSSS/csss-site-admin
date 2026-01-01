import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { Officer, OfficerCreate } from '@api/backend-api';
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
  selector: 'cs-officers-table',
  imports: [CrudTableComponent],
  templateUrl: './officers-table.component.html',
  styleUrl: './officers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficersTableComponent extends TableComponent<
  Officer,
  OfficerSourceEntry,
  OfficerCreate,
  OfficersDialogComponent
> {
  protected override dialogClass = OfficersDialogComponent;

  protected override dataSourceService = inject(OfficerSourceService);

  protected columns: Signal<CrudTableColumn<Officer>[]> = computed(() => [
    {
      label: 'Computing ID',
      key: 'computing_id'
    },
    {
      label: 'Legal Name',
      key: 'legal_name'
    },
    {
      label: 'Start Date',
      key: 'start_date',
      type: 'date'
    },
    {
      label: 'End Date',
      key: 'end_date',
      type: 'date'
    },
    {
      label: 'Discord ID',
      key: 'discord_id'
    },
    {
      label: 'Discord Name',
      key: 'discord_name'
    },
    {
      label: 'Discord Nickname',
      key: 'discord_nickname'
    },
    {
      label: 'Phone Number',
      key: 'phone_number'
    },
    {
      label: 'GitHub',
      key: 'github_username'
    },
    {
      label: 'Google Drive',
      key: 'google_drive_email'
    },
    {
      label: 'Photo URL',
      key: 'photo_url'
    }
  ]);
}
