import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Officer, OfficerCreate, OfficerPositionEnum } from '@api/backend-api/model/models';
import { OfficerUpdate } from '@api/backend-api/model/officer-update';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { PartialNullable } from '@utils/type-utils';
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
    computing_id: this.fb.control('', Validators.required),
    start_date: this.fb.control<Date>(new Date(), Validators.required),
    end_date: this.fb.control<Date | null>(null),
    nickname: this.fb.control<string | null>(null),
    biography: this.fb.control<string | null>(null),
    discord_id: this.fb.control<string | null>(null),
    discord_name: this.fb.control<string | null>(null),
    discord_nickname: this.fb.control<string | null>(null),
    phone_number: this.fb.control<string | null>(null),
    github_username: this.fb.control<string | null>(null),
    google_drive_email: this.fb.control<string | null>(null),
    photo_url: this.fb.control<string | null>(null),
    favourite_course_0: this.fb.control<string | null>(null),
    favourite_course_1: this.fb.control<string | null>(null),
    favourite_pl_0: this.fb.control<string | null>(null),
    favourite_pl_1: this.fb.control<string | null>(null)
  });

  protected override formToEntry(): OfficerCreate {
    const controls = this.form.controls;
    return {
      ...this.entry.data,
      computing_id: controls.computing_id.value,
      start_date: controls.start_date.value.toISOString(),
      end_date: controls.end_date.value?.toISOString() ?? null,
      nickname: controls.nickname.value,
      biography: controls.biography.value,
      discord_id: controls.discord_id.value,
      discord_name: controls.discord_name.value,
      discord_nickname: controls.discord_nickname.value,
      phone_number: controls.phone_number.value,
      github_username: controls.github_username.value,
      google_drive_email: controls.google_drive_email.value,
      photo_url: controls.photo_url.value,
      favourite_course_0: controls.favourite_course_0.value,
      favourite_course_1: controls.favourite_course_1.value,
      favourite_pl_0: controls.favourite_pl_0.value,
      favourite_pl_1: controls.favourite_pl_1.value
    };
  }

  protected getDirtyValues(): OfficerUpdate {
    const result: OfficerUpdate = {};

    return result;
  }
}
