import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NomineeApplicationModel,
  NomineeApplicationUpdateParams,
  OfficerPositionEnum
} from '@api/backend-api/model/models';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { CrudDialogComponent } from '../../crud-components/crud-dialog/crud-dialog.component';
import {
  NomineeApplicationSourceEntry,
  NomineeApplicationSourceService
} from '../nominee-application-sources/nominee-application.source.service';

@Component({
  selector: 'cs-nominee-application-dialog',
  imports: [ReactiveFormsModule, CrudDialogComponent],
  templateUrl: './nominee-application-dialog.component.html',
  styleUrl: './nominee-application-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NomineeApplicationDialogComponent extends DialogComponent<
  NomineeApplicationModel,
  NomineeApplicationSourceEntry
> {
  protected dataSource = inject(NomineeApplicationSourceService);

  protected form = this.fb.group({
    computing_id: this.fb.control('', Validators.required),
    position: this.fb.control<OfficerPositionEnum>(
      OfficerPositionEnum.President,
      Validators.required
    ),
    speech: this.fb.control('')
  });

  protected override formToEntry(): NomineeApplicationModel {
    const controls = this.form.controls;
    return {
      ...this.entry.data,
      computing_id: controls.computing_id.value,
      position: controls.position.value
    };
  }

  protected getDirtyValues(): NomineeApplicationUpdateParams {
    const result: NomineeApplicationUpdateParams = {};

    result.position = this.getIfDirty('position');
    result.speech = this.getIfDirty('speech');

    return result;
  }
}
