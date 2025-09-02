import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { CrudFormField } from '../crud-form-field';

@Component({
  selector: 'cs-select',
  imports: [SelectModule, FloatLabelModule, MessageModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends CrudFormField {
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
}
