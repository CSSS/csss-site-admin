import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ElectionResponse,
  ElectionTypeEnum,
  ElectionUpdateParams
} from '@api/backend-api/model/models';
import {
  ElectionsSourceEntry,
  ElectionsSourceService
} from '@pages/dashboard/crud-sources/elections/elections.source.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CrudDialogComponent } from '../../crud-components/crud-dialog/crud-dialog.component';
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
    CrudDialogComponent,
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
  ElectionsSourceEntry
> {
  protected dataSource = inject(ElectionsSourceService);

  protected form = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
      type: this.fb.control<ElectionTypeEnum>('general_election', Validators.required),
      startNominations: this.fb.control(new Date(), Validators.required),
      startVoting: this.fb.control(new Date(), Validators.required),
      endVoting: this.fb.control(new Date(), Validators.required),
      availablePositions: this.fb.control<string[]>(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      surveyLink: this.fb.control('')
    },
    { validators: [electionDatesValidator()] }
  );

  electionTypes = Object.entries(electionTypeLabels).map(([k, v]) => {
    return {
      label: v,
      value: k
    };
  });

  officerPositions = Object.entries(officerLabels).map(([k, v]) => {
    return {
      label: v,
      value: k
    };
  });

  protected override patchForm(): void {
    this.form.patchValue({
      ...this.entry.data,
      availablePositions: this.entry?.data.available_positions,
      startNominations: new Date(this.entry?.data.datetime_start_nominations ?? ''),
      startVoting: new Date(this.entry?.data.datetime_start_voting ?? ''),
      endVoting: new Date(this.entry?.data.datetime_end_voting ?? '')
    });
  }

  protected override formToEntry(): void {
    const controls = this.form.controls;
    this.entry.data = {
      ...this.entry.data,
      name: controls.name.value,
      type: controls.type.value,
      datetime_start_nominations: controls.startNominations.value.toISOString(),
      datetime_start_voting: controls.startVoting.value.toISOString(),
      datetime_end_voting: controls.endVoting.value.toISOString(),
      available_positions: controls.availablePositions.value,
      survey_link: controls.surveyLink.value?.length > 0 ? controls.surveyLink.value : null
    };
  }

  protected getPatchedValues(): ElectionUpdateParams {
    const result: ElectionUpdateParams = {};

    result.type = this.getIfDirty('type');
    result.datetime_start_nominations = this.getIfDirty('startNominations');
    result.datetime_start_voting = this.getIfDirty('startVoting');
    result.datetime_end_voting = this.getIfDirty('endVoting');
    result.available_positions = this.getIfDirty('availablePositions');
    result.survey_link = this.getIfDirty('surveyLink');

    return result;
  }
}
