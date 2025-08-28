import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

export interface CrudColumn<T> {
  /**
   * The label of the column in the table header.
   */
  label: string;

  /**
   * The key to access the column value in the entries.
   */
  key: keyof T;

  /**
   * Flag if the column should show an anchor.
   */
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
  /**
   * Title of the table.
   */
  title = input<string>();

  /**
   * The entries in the table.
   */
  entries = input.required<T[]>();

  /**
   * The columns displayed on the table.
   */
  columns = input.required<CrudColumn<T>[]>();
}
