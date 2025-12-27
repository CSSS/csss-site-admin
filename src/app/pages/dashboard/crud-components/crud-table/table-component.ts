/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { CrudEntry, CrudSource } from '@pages/dashboard/crud-sources/crud-source';
import { PartialNullable } from '@utils/type-utils';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent, DialogComponentConstructor } from '../crud-dialog/dialog-component';
import { CrudTableColumn } from './crud-table.component';

/**
 * Base table component each table should extend.
 */
@Directive()
export abstract class TableComponent<
  T extends Record<string, any>, // API Type
  E extends CrudEntry<T>, // Entry type
  D extends DialogComponent<T, E, PartialNullable<T>, PartialNullable<T>> // Dialog type
>
  implements OnInit, OnDestroy
{
  /**
   * Class that represents the dialog component that this table uses.
   */
  protected abstract dialogClass: DialogComponentConstructor<
    T,
    E,
    PartialNullable<T>,
    PartialNullable<T>,
    D
  >;

  /**
   * The columns of the table and how they should be displayed.
   */
  protected abstract columns: Signal<CrudTableColumn<T>[]>;

  /**
   * The data used for the table entries.
   */
  protected abstract dataSource: CrudSource<T, E, PartialNullable<T>, PartialNullable<T>>;

  /**
   * Reference to the dialog for this table.
   */
  protected dialogRef?: DynamicDialogRef<D> | null;

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
  protected openDialog(entry: E | null, tableName: string): void {
    this.dialogRef = this.dialogService.open(this.dialogClass, {
      ...DialogComponent.dialogDefaults,
      header: `${entry ? 'Edit' : 'New'} ${tableName} Entry`,
      data: entry
    });

    this.dialogRef?.onClose.subscribe(entry => entry);
  }
}
