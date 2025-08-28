import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, TemplateRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
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

  cellTemplate?: TemplateRef<unknown>;
}

@Component({
  selector: 'cs-crud-table',
  imports: [TableModule, ToolbarModule, ButtonModule, NgTemplateOutlet, ToastModule, DialogModule],
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

  createTemplate = input.required<TemplateRef<unknown>>();

  /**
   * Handles the toast notifications.
   */
  private messageService = inject(MessageService);

  private isCreateDialogVisible = false;

  onSubmit(entryKey: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Successfully updated ${entryKey}`,
      life: 3000
    });
  }

  createNew(): void {}
}
