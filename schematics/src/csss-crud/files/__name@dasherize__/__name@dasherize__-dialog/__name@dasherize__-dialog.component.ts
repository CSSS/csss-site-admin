import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  <%= classify(name) %>,
  <%= classify(name) %>Create,
  <%= classify(name) %>Update
} from '@api/backend-api/model/models';
import {
  <%= classify(name) %>SourceEntry,
  <%= classify(name) %>SourceService
} from '../<%= dasherize(name) %>-sources/<%= dasherize(name) %>.source.service';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';

@Component({
  selector: 'cs-<%= dasherize(name) %>-dialog',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './<%= dasherize(name) %>-dialog.component.html',
  styleUrl: './<%= dasherize(name) %>-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>DialogComponent extends DialogComponent<
  <%= classify(name) %>,
  <%= classify(name) %>SourceEntry,
  <%= classify(name) %>Create
> {
  protected dataSource = inject(<%= classify(name) %>SourceService);

  protected form = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
    }
  );
}
