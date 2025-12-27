/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CrudEntry, CrudSource } from '@pages/dashboard/crud-sources/crud-source';
import { PartialNullable } from '@utils/type-utils';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

/**
 * Constructor required to pass instances of concrete dialog components.
 */
export type DialogComponentConstructor<
  T extends Record<string, any>,
  E extends CrudEntry<T>,
  C extends PartialNullable<T>,
  U extends PartialNullable<T>,
  D extends DialogComponent<T, E, C, U>
> = new (...args: any[]) => D;

@Directive()
export abstract class DialogComponent<
  T extends Record<string, any>,
  E extends CrudEntry<T>,
  C extends PartialNullable<T>,
  U extends PartialNullable<T>
> implements OnInit {
  static dialogDefaults = {
    modal: true,
    closable: true,
    focusOnShow: false
  };

  /**
   * Reference to the PrimeNG dynamic dialog.
   */
  private ref = inject(DynamicDialogRef);

  /**
   * Configuration of the PrimeNG dynamic dialog.
   */
  private config: DynamicDialogConfig<E, E> = inject(DynamicDialogConfig);

  /**
   * The form builder for the dialog.
   */
  protected fb = inject(NonNullableFormBuilder);

  /**
   * The datasource that the entry is a part of.
   */
  protected abstract dataSource: CrudSource<T, E, C, U>;

  /**
   * Takes all the values in the form fields and creates an object of the data type.
   */
  protected abstract formToEntry(): C;

  /**
   * Used to get the dirty values to create the patch request.
   */
  protected abstract getDirtyValues(): U;

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

  /**
   * Submits the form and tells the datasource to make the changes.
   * If successful the dialog will close.
   */
  submit(): void {
    this.formSubmitted = true;
    if (!this.form.valid) {
      return;
    }
    let apiCall: Observable<E>;
    if (this.isEditing) {
      apiCall = this.dataSource.updateEntry$(this.entry, this.getDirtyValues());
    } else {
      apiCall = this.dataSource.createEntry$(this.formToEntry());
    }
    apiCall.subscribe(res => {
      this.ref.close(res);
    });
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

  /**
   * Populates the form values with the entry you are editing.
   * Override for items that need to be changed to certain interfaces.
   */
  protected patchForm(): void {
    this.form.patchValue(this.entry);
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
    const control = this.form.get(controlName);
    if (!control) {
      throw new Error(`No control ${controlName} in dialog.`);
    }
    return control?.dirty ? control.value : undefined;
  }
}
