import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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

  protected messageService = inject(MessageService);

  protected abstract form: FormGroup;

  protected abstract submit(): T | null;

  protected formSubmitted = false;

  protected entry!: T;

  private ref = inject(DynamicDialogRef);

  private config = inject(DynamicDialogConfig);

  ngOnInit(): void {
    this.entry = this.config.data;
  }

  close(result?: T): void {
    this.ref.close(result);
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
