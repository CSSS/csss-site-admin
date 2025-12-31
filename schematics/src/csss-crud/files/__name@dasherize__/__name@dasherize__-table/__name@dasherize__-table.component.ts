import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import {
  <%= classify(name) %>,
  <%= classify(name) %>Create
} from '@api/backend-api/model/models';
import {
  <%= classify(name) %>SourceEntry,
  <%= classify(name) %>SourceService
} from '../<%= dasherize(name) %>-sources/<%= dasherize(name) %>.source.service';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { <%= classify(name) %>DialogComponent } from '../<%= dasherize(name) %>-dialog/<%= dasherize(name) %>-dialog.component';

@Component({
  selector: 'cs-<%= dasherize(name) %>',
  imports: [CrudTableComponent],
  templateUrl: './<%= dasherize(name) %>-table.component.html',
  styleUrl: './<%= dasherize(name) %>-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>Component extends TableComponent<
  <%= classify(name) %>,
  <%= classify(name) %>SourceEntry,
  <%= classify(name) %>Create,
  <%= classify(name) %>DialogComponent
> {
  protected override dialogClass = <%= classify(name) %>DialogComponent;

  protected override dataSource = inject(<%= classify(name) %>SourceService);

  protected columns: Signal<CrudTableColumn<<%= classify(name) %>>[]> = computed(() => [
    {
      label: 'Name',
      key: 'name'
    },
  ]);
}
