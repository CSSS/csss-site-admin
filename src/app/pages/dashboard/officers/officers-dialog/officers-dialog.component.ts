import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Officer } from '@api/backend-api/model/models';
import { OfficerTermCreate } from '@api/backend-api/model/officer-term-create';
import { OfficerUpdate } from '@api/backend-api/model/officer-update';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { CrudDialogComponent } from '../../crud-components/crud-dialog/crud-dialog.component';
import {
  OfficerSourceEntry,
  OfficerSourceService
} from '../officers-sources/officers.source.service';

@Component({
  selector: 'cs-officers-dialog',
  imports: [ReactiveFormsModule, CrudDialogComponent],
  templateUrl: './officers-dialog.component.html',
  styleUrl: './officers-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficersDialogComponent extends DialogComponent<
  Officer,
  OfficerSourceEntry,
  Partial<Officer>,
  Partial<Officer>
> {
  protected dataSource = inject(OfficerSourceService);

  protected form = this.fb.group({
    name: this.fb.control('', Validators.required)
  });

  protected override formToEntry(): OfficerTermCreate {
    const controls = this.form.controls;
    return {
      ...this.entry.data,
      name: controls.name.value
    };
  }

  protected getDirtyValues(): OfficerUpdate {
    const result: OfficerUpdate = {};

    return result;
  }
}
