import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudSource<T> {
  protected abstract dataSource$: Observable<T[]>;

  protected abstract updateEntry(...args: unknown[]): Observable<T>;

  protected loaded = false;

  protected entries: WritableSignal<T[]> = signal([]);

  fetch(): void {
    this.dataSource$.subscribe({
      next: res => {
        if (this.sort) {
          this.sort();
        }
        this.entries.set(res);
        this.loaded = true;
      }
    });
  }

  addEntry(entry: T): void {
    this.entries.update(entries => {
      const newEntries = [entry, ...entries];
      if (this.sort) {
        this.sort();
      }
      return newEntries;
    });
  }

  protected sort?: () => T[];
}
