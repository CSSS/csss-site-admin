import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Officer, OfficerCreate, OfficerPositionEnum } from '@api/backend-api/model/models';
import { OfficerUpdate } from '@api/backend-api/model/officer-update';
import { DatepickerComponent } from '@pages/dashboard/crud-components/crud-dialog/datepicker/datepicker.component';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { InputComponent } from '@pages/dashboard/crud-components/crud-dialog/input/input.component';
import { PartialNullable } from '@utils/type-utils';
import { CrudDialogComponent } from '../../crud-components/crud-dialog/crud-dialog.component';
import {
  OfficerSourceEntry,
  OfficerSourceService
} from '../officers-sources/officers.source.service';

@Component({
  selector: 'cs-officers-dialog',
  imports: [ReactiveFormsModule, CrudDialogComponent, InputComponent, DatepickerComponent],
  templateUrl: './officers-dialog.component.html',
  styleUrl: './officers-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficersDialogComponent extends DialogComponent<
  Officer,
  OfficerSourceEntry,
  OfficerCreate,
  PartialNullable<Officer>
> {
  protected dataSource = inject(OfficerSourceService);

  protected form = this.fb.group({
    legal_name: this.fb.control('', Validators.required),
    position: this.fb.control<OfficerPositionEnum>(
      OfficerPositionEnum.President,
      Validators.required
    ),
    computing_id: this.fb.control<string>('', Validators.required),
    start_date: this.fb.control<Date>(new Date(), Validators.required),
    end_date: this.fb.control<Date | null>(null),
    nickname: this.fb.control<string | null>(''),
    biography: this.fb.control<string | null>(''),
    discord_id: this.fb.control<string | null>(''),
    discord_name: this.fb.control<string | null>(''),
    discord_nickname: this.fb.control<string | null>(''),
    phone_number: this.fb.control<string | null>(''),
    github_username: this.fb.control<string | null>(''),
    google_drive_email: this.fb.control<string | null>(''),
    photo_url: this.fb.control<string | null>(''),
    favourite_course_0: this.fb.control<string | null>(''),
    favourite_course_1: this.fb.control<string | null>(''),
    favourite_pl_0: this.fb.control<string | null>(''),
    favourite_pl_1: this.fb.control<string | null>('')
  });

  protected override formToEntry(): OfficerCreate {
    const controls = this.form.controls;
    return {
      ...this.entry.data,
      ...this.form.value,
      computing_id: controls.computing_id.value,
      start_date: controls.start_date.value.toISOString(),
      end_date: controls.end_date.value?.toISOString() ?? null
    };
  }

  protected getDirtyValues(): OfficerUpdate {
    const result: OfficerUpdate = {};

    return result;
  }
}
