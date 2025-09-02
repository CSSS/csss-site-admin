/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, inject, input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive()
export abstract class CrudFormField implements ControlValueAccessor {
  fieldId = input.required<string>();
  label = input.required<string>();
  isRequired = input<boolean>(false, { alias: 'required' });
  isInvalid = input<boolean>(false, { alias: 'invalid' });

  value: any;
  isDisabled = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onChange = (_: any): void => {};
  protected onTouched = (): void => {};

  protected ngControl = inject(NgControl, { optional: true, self: true });
  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  isRequiredMissing(): boolean {
    return (
      this.isRequired() &&
      this.ngControl?.invalid &&
      this.ngControl?.touched &&
      this.ngControl?.errors?.['required']
    );
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => unknown): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
