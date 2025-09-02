import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  TemplateRef
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

export interface CrudColumn<T> {
  /**
   * The label of the column in the table header.
   */
  label: string;

  /**
   * The key to access the column value in each entry.
   */
  key: keyof T;

  /**
   * Flag if the column should show an anchor.
   */
  isExternalLink?: boolean;

  /**
   * Template of what the cell should look like.
   */
  cellTemplate?: TemplateRef<unknown>;

  /**
   * Transformation to apply to the value before displaying it in the cell.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform?: (input: any) => any;
}

@Component({
  selector: 'cs-crud-table',
  imports: [TableModule, ToolbarModule, ButtonModule, NgTemplateOutlet, ToastModule],
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

  dialogOpened = output<T | null>();

  protected selectedEntry: T | null = null;

  /**
   * Handles the toast notifications.
   */
  private messageService = inject(MessageService);

  protected onSubmit(entryKey: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Successfully updated ${entryKey}`,
      life: 3000
    });
  }
}
