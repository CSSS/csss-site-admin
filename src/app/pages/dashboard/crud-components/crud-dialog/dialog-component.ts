import { Directive, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrudEntry } from '../crud-item';

/**
 * Constructor required to pass instances of concrete dialog components.
 */
export type DialogComponentConstructor<T extends CrudEntry, D extends DialogComponent<T>> = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => D;

@Directive()
export abstract class DialogComponent<T extends CrudEntry> implements OnInit {
  static dialogDefaults = {
    modal: true,
    closable: true,
    focusOnShow: false
  };

  /**
   * Called before submitting the entry.
   */
  protected abstract preSubmit(): void;

  protected abstract form: FormGroup;

  protected fb = inject(NonNullableFormBuilder);

  protected formSubmitted = false;

  protected entry: T | null = null;

  private ref = inject(DynamicDialogRef);

  private config: DynamicDialogConfig<T, T> = inject(DynamicDialogConfig);

  ngOnInit(): void {
    if (!this.config.data) {
      return;
    }
    this.entry = this.config.data;
    this.patchForm();
  }

  submit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.ref.close(this.preSubmit());
    }
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

  /**
   * Called when patching the form with the entry.
   */
  protected patchForm(): void {
    if (!this.entry) {
      throw new Error('No entry to patch form with.');
    }
    this.form.patchValue(this.entry);
    console.log(this.form.controls);
  }
}
