import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { DialogComponent } from '../crud-dialog/crud-dialog';
import { InputComponent } from '../crud-dialog/input/input.component';
import { SelectComponent } from '../crud-dialog/select/select.component';
import { ElectionsTableEntry } from '../elections-table/elections-table.component';
import { electionTypeLabels, electionTypes } from '../temp-interfaces';

@Component({
  selector: 'cs-elections-dialog',
  imports: [ReactiveFormsModule, InputComponent, SelectModule, MessageModule, SelectComponent],
  templateUrl: './elections-dialog.component.html',
  styleUrl: './elections-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsDialogComponent extends DialogComponent<ElectionsTableEntry> {
  protected form = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    startNominations: [new Date(), Validators.required],
    startVoting: [new Date(), Validators.required],
    endVoting: [new Date(), Validators.required],
    availablePositions: [[], Validators.required],
    surveyLink: [{ value: '', nonNullable: false }]
  });

  electionTypes = electionTypes.map(e => {
    return {
      label: electionTypeLabels[e],
      value: e
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
