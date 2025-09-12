/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CrudEntry, CrudSource } from '@pages/dashboard/crud-sources/crud-source';
import { PartialNullable } from '@utils/type-utils';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

/**
 * Constructor required to pass instances of concrete dialog components.
 */
export type DialogComponentConstructor<
  T extends Record<string, any>,
  E extends CrudEntry<T>,
  D extends DialogComponent<T, E>
> = new (...args: any[]) => D;

@Directive()
export abstract class DialogComponent<T extends Record<string, any>, E extends CrudEntry<T>>
  implements OnInit
{
  static dialogDefaults = {
    modal: true,
    closable: true,
    focusOnShow: false
  };

  private ref = inject(DynamicDialogRef);

  private config: DynamicDialogConfig<E, E> = inject(DynamicDialogConfig);

  protected fb = inject(NonNullableFormBuilder);

  protected abstract dataSource: CrudSource<T, E>;

  protected abstract formToEntry(): void;

  protected abstract getPatchedValues(): PartialNullable<T>;

  /**
   * The form in the dialog.
   */
  protected abstract form: FormGroup;

  /**
   * Flag to indicate if there has been an attempted form submission.
   */
  protected formSubmitted = false;

  /**
   * Flag that indicates the user is editing an existing entry.
   */
  protected isEditing = true;

  /**
   * The original entry being edited.
   */
  protected entry!: E;

  ngOnInit(): void {
    if (!this.config.data) {
      this.entry = this.dataSource.default();
      this.isEditing = false;
    } else {
      this.entry = this.config.data;
    }
    this.patchForm();
  }

  submit(): void {
    this.formSubmitted = true;
    if (!this.form.valid) {
      return;
    }
    if (this.isEditing) {
      console.log(this.getPatchedValues());
      // this.dataSource.updateEntry$(this.entry, this.getPatchedValues());
    } else {
      this.formToEntry();
      this.dataSource.createEntry$(this.entry.data).subscribe(res => {
        console.log(res);
        this.ref.close(res);
      });
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

  /**
   * Function to check if the form has a certain error.
   *
   * @param args - Form control names
   * @returns True if the dialog has either been touched or is dirty and all the controls show an error.
   */
  hasDialogError(...args: string[]): boolean {
    if (!this.form.touched && !this.form.dirty) {
      return false;
    }

    return args.every(arg => this.form.hasError(arg));
  }

  /**
   * Called when patching the form with the entry.
   * Override for items that need to be changed to certain objects.
   */
  protected patchForm(): void {
    this.form.patchValue(this.entry);
  }

  protected getIfDirty(controlName: string): any | undefined {
    const control = this.form.get(controlName);
    return control?.dirty ? control.value : undefined;
  }
}
