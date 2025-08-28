import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

interface CrudColumn<T> {
  label: string;
  key: keyof T;
  isExternalLink?: boolean;
}

@Component({
  selector: 'cs-crud-table',
  imports: [TableModule, ToolbarModule, ButtonModule],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudTableComponent<T> {
  title = input<string>();
  entries = input.required<unknown[]>();
  columns = input.required<CrudColumn<T>[]>();
}
