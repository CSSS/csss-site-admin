/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'cs-input',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  id = input.required<string>();
  name = input.required<string>();
  label = input.required<string>();
  isRequired = input<boolean>(false, { alias: 'required' });
  isInvalid = input<boolean>(false, { alias: 'invalid' });

  value: string = '';
  isDisabled = false;
  onChange = (_: string): void => {};
  onTouched = (): void => {};

  protected ngControl = inject(NgControl, { optional: true, self: true });
  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (_: string) => unknown): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
