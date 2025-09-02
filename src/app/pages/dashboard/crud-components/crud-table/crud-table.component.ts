import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

export type CrudTableColumnType = 'date' | 'externalLink';

export interface CrudTableColumn<T> {
  /**
   * The label of the column in the table header.
   */
  label: string;

  /**
   * The key to access the column value in each entry.
   */
  key?: keyof T;

  /**
   * Template of what the cell should look like.
   */
  cellTemplate?: TemplateRef<unknown>;

  /**
   * Type of table column that matches the output value.
   */
  type?: CrudTableColumnType;

  /**
   * Transformation to apply to the value before displaying it in the cell.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform?: (input: any) => string;
}

@Component({
  selector: 'cs-crud-table',
  imports: [TableModule, ToolbarModule, ButtonModule, NgTemplateOutlet, DatePipe],
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
  columns = input.required<CrudTableColumn<T>[]>();

  /**
   * Event emitter to indicate that the dialog has been opened.
   */
  dialogOpened = output<T | null>();

  /**
   * The currently selected entry.
   */
  protected selectedEntry: T | null = null;
}
