import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'cs-crud-dialog',
  imports: [ReactiveFormsModule, DividerModule, ButtonModule],
  templateUrl: './crud-dialog.component.html',
  styleUrl: './crud-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudDialogComponent {
  formGroup = input.required<FormGroup>();
}
