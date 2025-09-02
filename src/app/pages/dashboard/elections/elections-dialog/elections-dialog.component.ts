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
import { electionTypeLabels } from '../../elections';
import { officerLabels } from '../../officers';
import { ElectionsTableEntry } from '../elections-table/elections-table.component';
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
export class ElectionsDialogComponent extends DialogComponent<ElectionsTableEntry> {
  protected form = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
      type: this.fb.control('', Validators.required),
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
      datetime_start_voting: controls.startVoting.value?.toISOString(),
      datetime_end_voting: controls.endVoting.value?.toISOString(),
      available_positions: availablePositions.join(',').toLowerCase(),
      year: startNominations.getFullYear(),
      startNominations,
      isActive: false,
      availablePositions
    };
  }
}
