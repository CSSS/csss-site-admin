import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ElectionResponse } from '@api/backend-api/model/election-response';
import {
  ElectionParams,
  ElectionTypeEnum,
  OfficerPositionEnum
} from '@api/backend-api/model/models';
import {
  ElectionsSourceEntry,
  ElectionsSourceService
} from '@pages/dashboard/crud-sources/elections/elections.source.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { DatepickerComponent } from '../../crud-components/crud-dialog/datepicker/datepicker.component';
import { DialogComponent } from '../../crud-components/crud-dialog/dialog-component';
import { InputComponent } from '../../crud-components/crud-dialog/input/input.component';
import { ListboxComponent } from '../../crud-components/crud-dialog/listbox/listbox.component';
import { SelectComponent } from '../../crud-components/crud-dialog/select/select.component';
import { officerLabels } from '../../officers';
import { electionDatesValidator } from './elections-dates.validator';
import { electionTypeLabels } from './pipes/election-type.pipe';
import { SlugPipe } from './pipes/slug.pipe';

@Component({
  selector: 'cs-elections-dialog',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    InputComponent,
    SelectComponent,
    DatepickerComponent,
    ListboxComponent,
    InputTextModule,
    SlugPipe,
    FloatLabelModule
  ],
  templateUrl: './elections-dialog.component.html',
  styleUrl: './elections-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsDialogComponent extends DialogComponent<
  ElectionResponse,
  ElectionsSourceEntry,
  ElectionParams
> {
  protected dataSource = inject(ElectionsSourceService);

  protected form = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
      type: this.fb.control<ElectionTypeEnum>('general_election', Validators.required),
      datetime_start_nominations: this.fb.control(new Date(), Validators.required),
      datetime_start_voting: this.fb.control(new Date(), Validators.required),
      datetime_end_voting: this.fb.control(new Date(), Validators.required),
      available_positions: this.fb.control<OfficerPositionEnum[]>(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      survey_link: this.fb.control<string | null>('')
    },
    // `electionDatesValidator()` ensures that the dates are sequential to each other.
    // This means startNominations must be before start voting and start voting must be before end voting.
    { validators: [electionDatesValidator()] }
  );

  /**
   * The options in the Election Types dropdown.
   */
  electionTypes = Object.entries(electionTypeLabels).map(([k, v]) => {
    return {
      label: v,
      value: k
    };
  });

  /**
   * The options in the Officer Positions listbox.
   */
  officerPositions = Object.entries(officerLabels).map(([k, v]) => {
    return {
      label: v,
      value: k
    };
  });

  protected override initForm(): void {
    this.form.patchValue({
      ...this.entry.data,
      datetime_start_nominations: new Date(this.entry.data.datetime_start_nominations ?? ''),
      datetime_start_voting: new Date(this.entry.data.datetime_start_voting ?? ''),
      datetime_end_voting: new Date(this.entry.data.datetime_end_voting ?? '')
    });
  }

  protected override formToPostBody(): ElectionParams {
    const controls = this.form.controls;
    return {
      ...this.form.getRawValue(),
      datetime_start_nominations: controls.datetime_start_nominations.value.toISOString(),
      datetime_start_voting: controls.datetime_start_voting.value.toISOString(),
      datetime_end_voting: controls.datetime_end_voting.value.toISOString()
    };
  }
}
