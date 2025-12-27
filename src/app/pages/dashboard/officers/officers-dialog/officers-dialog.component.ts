import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Officer, OfficerUpdate } from '@api/backend-api/model/models';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { CrudDialogComponent } from '../../crud-components/crud-dialog/crud-dialog.component';
import {
  OfficerInfoSourceEntry,
  OfficersInfoSourceService
} from '../officers-sources/officers-info.source.service';

@Component({
  selector: 'cs-officers-dialog',
  imports: [ReactiveFormsModule, CrudDialogComponent],
  templateUrl: './officers-dialog.component.html',
  styleUrl: './officers-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficersDialogComponent extends DialogComponent<Officer, OfficerInfoSourceEntry> {
  protected dataSource = inject(OfficersInfoSourceService);

  protected form = this.fb.group({
    name: this.fb.control('', Validators.required)
  });

  protected override formToEntry(): Officer {
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
