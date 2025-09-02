import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { slugify } from '../../../../utils/string-utils';
import { CrudDialogComponent } from '../../crud-components/crud-dialog/crud-dialog.component';
import { DatepickerComponent } from '../../crud-components/crud-dialog/datepicker/datepicker.component';
import { DialogComponent } from '../../crud-components/crud-dialog/dialog-component';
import { InputComponent } from '../../crud-components/crud-dialog/input/input.component';
import { ListboxComponent } from '../../crud-components/crud-dialog/listbox/listbox.component';
import { SelectComponent } from '../../crud-components/crud-dialog/select/select.component';
import { ElectionModel, ElectionType, electionTypeLabels } from '../../elections';
import { officerLabels } from '../../officers';
import { electionDatesValidator } from './elections-dates.validator';
import { SlugPipe } from './slug-pipe/slug.pipe';

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
export class ElectionsDialogComponent extends DialogComponent<ElectionModel> {
  protected form = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
      type: this.fb.control<ElectionType>('general', Validators.required),
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
      ...this.entry,
      availablePositions: this.entry?.available_positions.split(','),
      startNominations: new Date(this.entry?.datetime_start_nominations ?? ''),
      startVoting: new Date(this.entry?.datetime_start_voting ?? ''),
      endVoting: new Date(this.entry?.datetime_end_voting ?? '')
    });
  }

  protected override preSubmit(): ElectionModel {
    const controls = this.form.controls;
    const name = controls.name.value;
    return {
      slug: slugify(name),
      name,
      type: controls.type.value,
      datetime_start_nominations: controls.startNominations.value.toISOString(),
      datetime_start_voting: controls.startVoting.value.toISOString(),
      datetime_end_voting: controls.endVoting.value.toISOString(),
      available_positions: controls.availablePositions.value.join(',').toLowerCase()
    };
  }
}
