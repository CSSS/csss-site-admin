import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudSource<T, C, U> {
  /**
   * The key that uniquely identifies each entry.
   */
  protected abstract readonly PRIMARY_KEY: keyof T;

  /**
   * The source observable fetches all the entries.
   */
  protected abstract dataSource$: Observable<T[]>;

  /**
   * Creates an observable that creates an entry on the backend.
   */
  protected abstract createEntry$(newEntry: C): Observable<T>;

  /**
   * Creates an observable that updates an entry on the backend.
   */
  protected abstract updateEntry$(entry: T, params: U): Observable<T>;

  /**
   * Flag that indicates the source has been fully loaded.
   */
  protected loaded = false;

  /**
   * The entries that have been fetched.
   */
  entries: WritableSignal<T[]> = signal([]);

  /**
   * Fetches all the entries form the backend.
   * Override this to process the data after fetching.
   */
  fetch(): void {
    this.dataSource$.subscribe({
      next: res => {
        if (this.sortFn) {
          res.sort(this.sortFn);
        }
        this.entries.set(res);
        this.loaded = true;
      }
    });
  }

  /**
   * Adds a new entry to the local list and then sorts the entries.
   * Does not add the entry to the backend.
   *
   * @param entry - Entry to add
   */
  addEntry(entry: T): void {
    this.entries.update(entries => {
      const newEntries = [entry, ...entries];
      if (this.sortFn) {
        newEntries.sort(this.sortFn);
      }
      return newEntries;
    });
  }

  /**
   * The function to sort the entries.
   * Called after `addEntry()` and `fetch()`.
   */
  protected sortFn?: (a: T, b: T) => number;
}
