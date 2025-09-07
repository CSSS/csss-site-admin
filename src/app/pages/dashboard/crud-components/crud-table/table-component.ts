import {
  Directive,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { DialogComponent, DialogComponentConstructor } from '../crud-dialog/dialog-component';
import { CrudEntry } from '../crud-item';
import { CrudTableColumn } from './crud-table.component';

/**
 * Base table component each table should extend.
 */
@Directive()
export abstract class TableComponent<T extends CrudEntry, D extends DialogComponent<T>>
  implements OnInit, OnDestroy
{
  /**
   * The columns of the table and how they should be displayed.
   */
  protected abstract columns: Signal<CrudTableColumn<T>[]>;

  protected abstract dataSource: Observable<T[]>;

  /**
   * The table entries.
   */
  protected entries: WritableSignal<T[]> = signal([]);

  /**
   * Reference to the dialog for this table.
   */
  protected dialogRef?: DynamicDialogRef<D>;

  /**
   * Class that represents the dialog component that this table uses.
   */
  protected abstract dialogClass: DialogComponentConstructor<T, D>;

  /**
   * PrimeNG service that creates the dialog.
   */
  private dialogService = inject(DialogService);

  ngOnInit(): void {
    this.fetchEntries();
  }

  ngOnDestroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  /**
   * Method to fetch the entries.
   * Uses the datasource by default.
   * Override this to change how the entries are fetched and processed.
   */
  protected fetchEntries(): void {
    this.dataSource.subscribe(this.entries.set);
  }

  /**
   * Opens the dialog that matches this table.
   *
   * @param entry - The entry to open the dialog with.
   * @param tableName - The name of the table.
   */
  protected openDialog(entry: T | null, tableName: string): void {
    this.dialogRef = this.dialogService.open(this.dialogClass, {
      ...DialogComponent.dialogDefaults,
      header: `${entry ? 'Edit' : 'New'} ${tableName} Entry`,
      data: entry
    });

    this.dialogRef.onClose.subscribe(entry => {
      this.entries.update(entries => {
        return [entry, ...entries];
      });
    });
  }
}
