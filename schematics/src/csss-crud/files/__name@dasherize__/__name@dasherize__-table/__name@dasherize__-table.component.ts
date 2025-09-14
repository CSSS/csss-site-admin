import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { <%= classify(name) %>Response } from '@api/backend-api/model/models';
import {
  <%= classify(name) %>SourceEntry,
  <%= classify(name) %>SourceService
} from '@pages/dashboard/crud-sources/elections/elections.source.service';
import {
  CrudTableColumn,
  CrudTableComponent
} from '../../crud-components/crud-table/crud-table.component';
import { TableComponent } from '../../crud-components/crud-table/table-component';
import { <%= classify(name) %>DialogComponent } from '../<%= dasherize(name) %>-dialog/<%= dasherize(name) %>-dialog.component';

@Component({
  selector: 'cs-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrl: './<%= dasherize(name) %>.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>Component extends TableComponent<
  <%= classify(name) %>Response,
  <%= classify(name) %>SourceEntry,
  <%= classify(name) %>DialogComponent
> {
  protected override dialogClass = <%= classify(name) %>DialogComponent;

  protected override dataSource = inject(<%= classify(name) %>SourceService);

  protected columns: Signal<CrudTableColumn<<%= classify(name) %>Response>[]> = computed(() => [
    {
      label: 'Label',
      key: 'Key'
    },
  ]);
}
