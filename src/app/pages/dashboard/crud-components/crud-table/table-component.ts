/* eslint-disable @typescript-eslint/no-explicit-any */
import { DestroyRef, Directive, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CrudEntry, CrudSource } from '@pages/dashboard/crud-sources/crud-source';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { DialogComponent, DialogComponentConstructor } from '../crud-dialog/dialog-component';
import { DialogFooterComponent } from '../crud-dialog/footer/footer.component';
import { CrudTableColumn } from './crud-table.component';

/**
 * Base table component each table should extend.
 */
@Directive()
export abstract class TableComponent<
  T extends Record<string, any>, // API Type
  E extends CrudEntry<T>, // Entry type
  C extends Record<string, any>, // Create type
  D extends DialogComponent<T, E, C> // Dialog type
>
  implements OnInit, OnDestroy
{
  submitHandler$ = new Subject<E | null>();

  /**
   * Class that represents the dialog component that this table uses.
   */
  protected abstract dialogClass: DialogComponentConstructor<T, E, C, D>;

  /**
   * The columns of the table and how they should be displayed.
   */
  protected abstract columns: Signal<CrudTableColumn<T>[]>;

  /**
   * The data used for the table entries.
   */
  protected abstract dataSourceService: CrudSource<T, E, C>;

  /**
   * Reference to the dialog for this table.
   */
  protected dialogRef?: DynamicDialogRef<D> | null;

  /**
   * Used to inform other objects that this component has been destroyed.
   */
  protected destroyRef = inject(DestroyRef);

  /**
   * PrimeNG service that manages the dialogs.
   */
  private dialogService = inject(DialogService);

  ngOnInit(): void {
    if (!this.dataSourceService.loaded) {
      this.dataSourceService.getEntries().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
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
      data: {
        entry,
        submitHandler: this.submitHandler$.pipe(takeUntilDestroyed(this.destroyRef))
      },
      templates: {
        footer: DialogFooterComponent
      }
    });

    this.dialogRef?.onClose.subscribe(entry => entry);
  }
}
