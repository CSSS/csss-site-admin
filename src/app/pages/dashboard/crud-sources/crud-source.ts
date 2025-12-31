/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, signal, WritableSignal } from '@angular/core';
import { PartialNullable } from '@utils/type-utils';
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
 * C = Parameters to update an entry
 * U = Parameters to update an entry
 */
@Injectable({
  providedIn: 'root'
})
export abstract class CrudSource<
  T extends Record<string, any>,
  E extends CrudEntry<T>,
  C extends Record<string, any>
> {
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

  /**
   * Creates an observable that sends a request to create the entry on the backend.
   */
  abstract createEntry$(newEntry: C): Observable<E>;

  /**
   * Creates an observable that sends a request to patch the entry on the backend.
   */
  abstract updateEntry$(entry: E, params: PartialNullable<T>): Observable<E>;

  /**
   * Fetches all the entries form the backend.
   * Override this to process the data after fetching.
   */
  fetch(): void {
    this.dataSource$.subscribe({
      next: res => {
        // Wrap the entries so they're CRUD entries.
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
   * Finds the changed entry by its unique ID and replaces it.
   *
   * @param updatedEntry - The entry with its updated values.
   */
  updateEntry(updatedEntry: E): void {
    this.entries.update(entries => {
      const newEntries = [];
      for (const e of entries) {
        if (e.id === updatedEntry.id) {
          newEntries.push(updatedEntry);
        } else {
          newEntries.push(e);
        }
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
