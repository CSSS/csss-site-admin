import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { CrudFormField } from '../crud-form-field';

@Component({
  selector: 'cs-select',
  imports: [SelectModule, FloatLabelModule, MessageModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends CrudFormField {
  options = input.required<unknown[]>();

  dataKey = input.required<string>();

  optionLabel = input.required<string>();

  optionValue = input.required<string>();
}
