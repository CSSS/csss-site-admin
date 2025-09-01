import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { CrudFormField } from '../crud-form-field';

@Component({
  selector: 'cs-listbox',
  imports: [ListboxModule, FloatLabelModule, MessageModule],
  templateUrl: './listbox.component.html',
  styleUrl: './listbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListboxComponent extends CrudFormField {
  options = input.required<unknown[]>();

  dataKey = input.required<string>();

  optionLabel = input.required<string>();

  optionValue = input.required<string>();
}
