import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { slugify } from '../../../../utils/string-utils';
import { CrudDialogComponent } from '../../crud-components/crud-dialog/crud-dialog.component';
import { DatepickerComponent } from '../../crud-components/crud-dialog/datepicker/datepicker.component';
import { DialogComponent } from '../../crud-components/crud-dialog/dialog-component';
import { InputComponent } from '../../crud-components/crud-dialog/input/input.component';
import { ListboxComponent } from '../../crud-components/crud-dialog/listbox/listbox.component';
import { SelectComponent } from '../../crud-components/crud-dialog/select/select.component';
import { electionTypeLabels } from '../../elections';
import { officerLabels } from '../../officers';
import { ElectionsTableEntry } from '../elections-table/elections-table.component';
import { electionDatesValidator } from './elections-dates.validator';

@Component({
  selector: 'cs-elections-dialog',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    InputComponent,
    SelectComponent,
    DatepickerComponent,
    ListboxComponent,
    ButtonModule,
    CrudDialogComponent
  ],
  templateUrl: './elections-dialog.component.html',
  styleUrl: './elections-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsDialogComponent extends DialogComponent<ElectionsTableEntry> {
  protected form = this.fb.group(
    {
      name: ['', Validators.required],
      type: ['', Validators.required],
      startNominations: [new Date(), { validators: [Validators.required], updateOn: 'blur' }],
      startVoting: [new Date(), { validators: [Validators.required], updateOn: 'blur' }],
      endVoting: [new Date(), { validators: [Validators.required], updateOn: 'blur' }],
      availablePositions: [[] as string[], [Validators.required, Validators.minLength(1)]],
      surveyLink: [{ value: '', nonNullable: false }]
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

  protected override preSubmit(): ElectionsTableEntry {
    const controls = this.form.controls;
    const name = controls.name.value;
    const availablePositions = controls.availablePositions.value;
    const startNominations = controls.startNominations.value;
    return {
      slug: slugify(name),
      name,
      type: 'general',
      datetime_start_nominations: startNominations.toISOString(),
      datetime_start_voting: controls.startVoting.value.toISOString(),
      datetime_end_voting: controls.endVoting.value.toISOString(),
      available_positions: availablePositions.join(',').toLowerCase(),
      year: startNominations.getFullYear(),
      startNominations,
      isActive: false,
      availablePositions
    };
  }
}
