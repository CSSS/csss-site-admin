import { Directive, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { CrudSource } from '@pages/dashboard/crud-sources/crud-source';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent, DialogComponentConstructor } from '../crud-dialog/dialog-component';
import { CrudEntry } from '../crud-item';
import { CrudTableColumn } from './crud-table.component';

/**
 * Base table component each table should extend.
 */
@Directive()
export abstract class TableComponent<T extends CrudEntry, D extends DialogComponent<T, C, U>, C, U>
  implements OnInit, OnDestroy
{
  /**
   * The columns of the table and how they should be displayed.
   */
  protected abstract columns: Signal<CrudTableColumn<T>[]>;

  /**
   * The data used for the table entries.
   */
  protected abstract dataSource: CrudSource<T, C, U>;

  /**
   * Reference to the dialog for this table.
   */
  protected dialogRef?: DynamicDialogRef<D>;

  /**
   * Class that represents the dialog component that this table uses.
   */
  protected abstract dialogClass: DialogComponentConstructor<T, D, C, U>;

  /**
   * PrimeNG service that creates the dialog.
   */
  private dialogService = inject(DialogService);

  ngOnInit(): void {
    if (!this.dataSource.loaded) {
      this.dataSource.fetch();
    }
  }

  ngOnDestroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
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
      this.dataSource.addEntry(entry);
    });
  }
}
