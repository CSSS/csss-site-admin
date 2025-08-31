import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CrudFormField } from '../crud-form-field';

@Component({
  selector: 'cs-input',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends CrudFormField {}
