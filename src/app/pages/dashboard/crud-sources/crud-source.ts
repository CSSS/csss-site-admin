/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Constructor required to create new CRUD entries.
 */
export type CrudEntryConstructor<T extends Record<string, any>, E extends CrudEntry<T>> = new (
  ...args: any[]
) => E;

export abstract class CrudEntry<T> {
  /**
   * Unique ID of the entry within the source.
   */
  id: string | number;

  /**
   * The data of the entry.
   */
  data: T;

  constructor(id: string | number, data: T) {
    this.id = id;
    this.data = data;
  }
}

/**
 * Wrapper for sources of data.
 * Made as a service so that data doesn't need to be fetched every time we load a page.
 * T = type of the entries
 * E = The type of the entries as CRUD entries
 * C = Parameters to create an entry
 */
@Injectable({
  providedIn: 'root'
})
export abstract class CrudSource<T extends Record<string, any>, E extends CrudEntry<T>> {
  /**
   * Class used to construct entries.
   */
  protected abstract entryClass: CrudEntryConstructor<T, E>;

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
  protected abstract createEntry$(newEntry: T): Observable<T>;

  /**
   * Flag that indicates the source has been fully loaded.
   */
  loaded = false;

  /**
   * The entries that have been fetched.
   */
  entries: WritableSignal<E[]> = signal([]);

  /**
   * Returns an entry with the default values.
   */
  abstract default(): E;

  abstract updateEntry$(entry: E, params: Partial<T>): Observable<T>;

  /**
   * Fetches all the entries form the backend.
   * Override this to process the data after fetching.
   */
  fetch(): void {
    this.dataSource$.subscribe({
      next: res => {
        const entries = res.map(e => new this.entryClass(e[this.PRIMARY_KEY], e));
        if (this.sortFn) {
          entries.sort(this.sortFn);
        }
        this.entries.set(entries);
        this.loaded = true;
      }
    });
  }

  /**
   * Adds a new entry to the local list and then sorts the entries.
   * Run this locally if you want to update the changes to this list.
   *
   * @param entry - Entry to add
   */
  addEntry(entry: E): void {
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
  protected sortFn?: (a: E, b: E) => number;
}
