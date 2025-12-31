/* eslint-disable @typescript-eslint/no-explicit-any */
import { DestroyRef, Directive, inject, OnInit, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NgForm, NonNullableFormBuilder } from '@angular/forms';
import { CrudEntry, CrudSource } from '@pages/dashboard/crud-sources/crud-source';
import { PartialNullable, SerializeConfig } from '@utils/type-utils';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

/**
 * Constructor required to pass instances of concrete dialog components.
 */
export type DialogComponentConstructor<
  T extends Record<string, any>,
  E extends CrudEntry<T>,
  C extends Record<string, any>,
  D extends DialogComponent<T, E, C>
> = new (...args: any[]) => D;

@Directive()
export abstract class DialogComponent<
  T extends Record<string, any>,
  E extends CrudEntry<T>,
  C extends Record<string, any>
> implements OnInit {
  static dialogDefaults = {
    modal: true,
    closable: true,
    focusOnShow: false
  };

  /**
   * The form builder for the dialog.
   */
  protected fb = inject(NonNullableFormBuilder);

  /**
   * The datasource that the entry is a part of.
   */
  protected abstract dataSource: CrudSource<T, E, C>;

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

  /**
   * Reference to the PrimeNG dynamic dialog.
   */
  private ref = inject(DynamicDialogRef);

  /**
   * Configuration of the PrimeNG dynamic dialog.
   */
  private config: DynamicDialogConfig<any, any> = inject(DynamicDialogConfig);

  private formDir = viewChild.required<NgForm>('formDir');

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (!this.config.data) {
      throw new Error('DialogComponent must be opened in a DynamicDialog.');
    }
    if (!this.config.data.entry) {
      this.entry = this.dataSource.default();
      this.isEditing = false;
    } else {
      this.entry = this.config.data.entry;
    }
    this.initForm();
    this.config.data.submitHandler
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.formDir().ngSubmit.emit());
  }

  /**
   * Submits the form and tells the datasource to make the changes.
   * If successful the dialog will close.
   */
  submit(): void {
    this.formSubmitted = true;
    if (!this.form.valid) {
      return;
    }
    const apiCall = this.isEditing
      ? this.dataSource.updateEntry$(this.entry, this.formToPatchBody())
      : this.dataSource.createEntry$(this.formToPostBody());
    apiCall.subscribe(res => {
      this.ref.close(res);
    });
  }

  /**
   * Populates the form values with the entry you are editing.
   * Override for items that need to be changed to certain interfaces.
   */
  protected initForm(): void {
    this.form.patchValue(this.entry.data);
  }

  /** Takes all the values in the form fields to create the post request.
   */
  protected formToPostBody(): C {
    return {
      ...this.form.value
    };
  }

  /**
   * Used to get the dirty values to create the patch request.
   * By default, Dates are converted to ISO 8601 strings.
   * Currently only goes one level deep.
   */
  protected formToPatchBody(config?: SerializeConfig<T>): PartialNullable<T> {
    if (!this.form.dirty) {
      return {};
    }
    const result: PartialNullable<T> = {};

    for (const key of Object.keys(this.form.controls)) {
      const control = this.form.get(key);
      if (!control || control.pristine) {
        continue;
      }

      const typedKey = key as keyof T;
      if (config && config[typedKey] !== undefined) {
        result[typedKey] = config[typedKey](control.value as T[keyof T]);
        continue;
      }

      if (control.value instanceof Date) {
        result[key as keyof T] = control.value.toISOString() as T[keyof T];
        continue;
      }

      result[key as keyof T] = control.value;
    }

    return result;
  }

  /**
   * Retrieves the value or returns undefined if the value has not been changed.
   * Throws an error if the control does not exist.
   *
   * @param controlName - Name of the control in the form to check
   * @returns The value of the control if it has been marked dirty, undefined otherwise.
   */
  protected getIfDirty(controlName: string): any | undefined {
    // TODO: Check arrays differently, since deselecting and reselecting the same option will always mark something as dirty.
    // TODO: Make this generic
    const control = this.form.get(controlName);
    if (!control) {
      throw new Error(`No control ${controlName} in dialog.`);
    }
    return control?.dirty ? control.value : undefined;
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
   * Method to check if the form has a certain error.
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
}
