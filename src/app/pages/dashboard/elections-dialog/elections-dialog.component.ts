import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { DialogComponent } from '../crud-dialog/crud-dialog';
import { DatepickerComponent } from '../crud-dialog/datepicker/datepicker.component';
import { InputComponent } from '../crud-dialog/input/input.component';
import { ListboxComponent } from '../crud-dialog/listbox/listbox.component';
import { SelectComponent } from '../crud-dialog/select/select.component';
import { ElectionsTableEntry } from '../elections-table/elections-table.component';
import { officerLabels } from '../officers';
import { electionTypeLabels } from '../temp-interfaces';
import { electionDatesValidator } from './elections-dates.validator';

@Component({
  selector: 'cs-elections-dialog',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    InputComponent,
    SelectComponent,
    DatepickerComponent,
    ListboxComponent
  ],
  templateUrl: './elections-dialog.component.html',
  styleUrl: './elections-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsDialogComponent extends DialogComponent<ElectionsTableEntry> {
  protected form = this.fb.group(
    {
      name: [null, Validators.required],
      type: [null, Validators.required],
      startNominations: [null, { validators: [Validators.required], updateOn: 'blur' }],
      startVoting: [null, { validators: [Validators.required], updateOn: 'blur' }],
      endVoting: [null, { validators: [Validators.required], updateOn: 'blur' }],
      availablePositions: [[], [Validators.required, Validators.minLength(1)]],
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

  submit(): ElectionsTableEntry | null {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.messageService.add({
        summary: 'success',
        detail: 'Successful form submission',
        life: 3000,
        severity: 'success'
      });
      this.formSubmitted = false;
    }

    return null;
  }
}
