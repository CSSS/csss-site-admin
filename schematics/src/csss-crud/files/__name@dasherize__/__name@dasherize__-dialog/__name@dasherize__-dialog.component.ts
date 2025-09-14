import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  <%= classify(name) %>Response,
  <%= classify(name) %>UpdateParams
} from '@api/backend-api/model/models';
import {
  <%= classify(name) %>SourceEntry,
  <%= classify(name) %>SourceService
} from '../<%= dasherize(name) %>-sources/<%= dasherize(name) %>.source.service';
import { CrudDialogComponent } from '../../crud-components/crud-dialog/crud-dialog.component';
import { DialogComponent } from '@pages/dashboard/crud-components/crud-dialog/dialog-component';

@Component({
  selector: 'cs-<%= dasherize(name) %>-dialog',
  imports: [
    ReactiveFormsModule,
    CrudDialogComponent
  ],
  templateUrl: './<%= dasherize(name) %>-dialog.component.html',
  styleUrl: './<%= dasherize(name) %>-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>DialogComponent extends DialogComponent<
  <%= classify(name) %>Response,
  <%= classify(name) %>SourceEntry
> {
  protected dataSource = inject(<%= classify(name) %>SourceService);

  protected form = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
    }
  );

  protected override formToEntry(): <%= classify(name) %>Response {
    const controls = this.form.controls;
    return {
      ...this.entry.data,
      name: controls.name.value
    };
  }

  protected getDirtyValues(): <%= classify(name) %>UpdateParams {
    const result: <%= classify(name) %>UpdateParams = {};

    result.name = this.getIfDirty('name');

    return result;
  }
}
