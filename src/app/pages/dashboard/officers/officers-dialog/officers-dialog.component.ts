import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Officer, OfficerPositionEnum } from '@api/backend-api/model/models';
import { OfficerTermCreate } from '@api/backend-api/model/officer-term-create';
import { DatepickerComponent } from '@pages/dashboard/crud-components/crud-dialog/datepicker/datepicker.component';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';
import { InputComponent } from '@pages/dashboard/crud-components/crud-dialog/input/input.component';
import { toDate } from '@utils/string-utils';
import { PartialNullable } from '@utils/type-utils';
import { FieldsetModule } from 'primeng/fieldset';
import {
  OfficerSourceEntry,
  OfficerSourceService
} from '../officers-sources/officers.source.service';

@Component({
  selector: 'cs-officers-dialog',
  imports: [ReactiveFormsModule, InputComponent, DatepickerComponent, FieldsetModule],
  templateUrl: './officers-dialog.component.html',
  styleUrl: './officers-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficersDialogComponent extends DialogComponent<
  Officer,
  OfficerSourceEntry,
  OfficerTermCreate
> {
  protected dataSource = inject(OfficerSourceService);

  protected form = this.fb.group({
    legal_name: this.fb.control('', Validators.required),
    position: this.fb.control<OfficerPositionEnum>(
      OfficerPositionEnum.President,
      Validators.required
    ),
    computing_id: this.fb.control<string>('', Validators.required),
    start_date: this.fb.control<string>(new Date().toISOString(), Validators.required),
    end_date: this.fb.control<string | null>(null),
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

  protected override initForm(): void {
    this.form.patchValue({
      ...this.entry.data,
      computing_id: this.entry.data.computing_id ?? '',
      legal_name: this.entry.data.legal_name ?? '',
      start_date: this.entry.data.start_date,
      end_date: this.entry.data.end_date
    });
  }

  protected override formToPatchBody(): PartialNullable<Officer> {
    const result = super.formToPatchBody({
      start_date: toDate,
      end_date: toDate
    });
    return result;
  }
}
