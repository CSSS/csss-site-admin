import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { CrudFormField } from '../crud-form-field';

@Component({
  selector: 'cs-textarea',
  imports: [FormsModule, FloatLabel, TextareaModule, MessageModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends CrudFormField {
  onInput(event: Event): void {
    this.onChange((event.target as HTMLTextAreaElement).value);
  }
}
