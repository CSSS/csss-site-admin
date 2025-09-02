import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

/**
 * Constructor required to pass instances of concrete dialog components.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DialogComponentConstructor<T, D extends DialogComponent<T>> = new (...args: any[]) => D;
@Component({
  selector: 'cs-dialog',
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class DialogComponent<T> implements OnInit {
  static dialogDefaults = {
    modal: true,
    closable: true
  };

  protected fb = inject(NonNullableFormBuilder);

  protected abstract form: FormGroup;

  protected formSubmitted = false;

  protected entry!: T;

  private ref = inject(DynamicDialogRef);

  private config = inject(DynamicDialogConfig);

  ngOnInit(): void {
    this.entry = this.config.data;
    console.log(this.entry);
  }

  protected abstract preSubmit(): T;

  submit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.ref.close(this.preSubmit());
    }
    this.formSubmitted = false;
  }

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

  hasDialogError(...args: string[]): boolean {
    if (!this.form.touched && !this.form.dirty) {
      return false;
    }

    return args.every(arg => this.form.hasError(arg));
  }
}
