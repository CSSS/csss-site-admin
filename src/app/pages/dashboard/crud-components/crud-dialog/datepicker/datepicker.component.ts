import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { CrudFormField } from '../crud-form-field';

@Component({
  selector: 'cs-datepicker',
  imports: [FormsModule, FloatLabelModule, DatePickerModule, MessageModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent extends CrudFormField {}
