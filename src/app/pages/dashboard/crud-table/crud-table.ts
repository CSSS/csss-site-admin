import { ChangeDetectionStrategy, Component, inject, OnDestroy, Signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent, DialogComponentConstructor } from '../crud-dialog/crud-dialog';
import { CrudColumn } from './crud-table.component';

@Component({
  selector: 'cs-crud-table',
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class TableComponent<T, D extends DialogComponent<T>> implements OnDestroy {
  protected abstract columns: Signal<CrudColumn<T>[]>;
  protected abstract entries: T[];
  protected dialogService = inject(DialogService);

  protected dialogRef?: DynamicDialogRef<D>;

  protected abstract dialogClass: DialogComponentConstructor<T, D>;

  ngOnDestroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  protected openDialog(entry: T | null): void {
    this.dialogRef = this.dialogService.open(this.dialogClass, {
      ...DialogComponent.dialogDefaults,
      header: `${entry ? 'Create' : 'New'} Entry`,
      data: entry
    });

    this.dialogRef.onClose.subscribe(entry => {
      console.log(entry);
    });
  }
}
