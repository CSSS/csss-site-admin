import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'cs-crud-dialog',
  imports: [ReactiveFormsModule, DividerModule, ButtonModule],
  templateUrl: './crud-dialog.component.html',
  styleUrl: './crud-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudDialogComponent {
  formGroup = input.required<FormGroup>();
  private dialogRef = inject(DynamicDialogRef);

  submit(): void {}

  cancel(): void {
    this.dialogRef.close();
  }
}
