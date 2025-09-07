import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { CrudFormField } from '../crud-form-field';

@Component({
  selector: 'cs-listbox',
  imports: [FormsModule, ListboxModule, FloatLabelModule, MessageModule],
  templateUrl: './listbox.component.html',
  styleUrl: './listbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListboxComponent extends CrudFormField {
  /**
   * The options available to select.
   */
  options = input.required<unknown[]>();

  /**
   * The key in the option objects that uniquely identifies each option.
   */
  dataKey = input.required<string>();

  /**
   * The key in the option objects that is used for the label.
   */
  optionLabel = input.required<string>();

  /**
   * The key in the option objects that is used for the value.
   */
  optionValue = input.required<string>();

  /**
   * Minimum number of options to select.
   */
  minLength = input<number>(0);

  isMinLengthInvalid(): boolean {
    return this.minLength() > 0 && this.isInvalid() && this.ngControl?.errors?.['minLength'];
  }
}
