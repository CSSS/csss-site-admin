import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'cs-dialog',
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class DialogComponent<T> {
  protected fb = inject(NonNullableFormBuilder);
  protected messageService = inject(MessageService);
  protected abstract form: FormGroup;

  protected abstract submit(): T | null;

  protected formSubmitted = false;

  /**
   * Method that checks if a form field is valid.
   * Throws an error if the control does not exist on the form.
   *
   * @param controlName - Name of the form control to check
   * @returns True if the field's value is invalid, false otherwise.
   */
  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) {
      throw new Error(`Form control ${controlName} does not exist.`);
    }
    return control.invalid && (control.touched || this.formSubmitted);
  }
}
