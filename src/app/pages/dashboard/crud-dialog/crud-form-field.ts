/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cs-input',
  imports: [ReactiveFormsModule],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class CrudFormField implements ControlValueAccessor {
  id = input.required<string>();
  label = input.required<string>();
  isRequired = input<boolean>(false, { alias: 'required' });
  isInvalid = input<boolean>(false, { alias: 'invalid' });
  formControlName = input<string>();

  value: any = null;
  isDisabled = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any): void => {};
  onTouched = (): void => {};

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
