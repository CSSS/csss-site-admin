/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SuccessResponse } from '@api/backend-api';
import { PartialNullable } from '@utils/type-utils';
import { MessageService } from 'primeng/api';
import { map, Observable, of, tap } from 'rxjs';

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
   * Flag that indicates the source has been fully loaded.
   */
  loaded = false;

  /**
   * The entries that have been fetched.
   */
  entries: WritableSignal<E[]> = signal([]);

  protected destroyRef = inject(DestroyRef);

  /**
   * Returns an entry with the default values.
   */
  abstract default(): E;

  /**
   * Creates an observable that sends a request to create the entry on the backend.
   */
  abstract createEntry$(newEntry: C, params?: Record<string, any>): Observable<E>;

  /**
   * Creates an observable that sends a request to patch the entry on the backend.
   */
  abstract updateEntry$(entry: E, new_values: PartialNullable<T>): Observable<E>;

  /**
   * Creates an observable that sends a request to delete the entry on the backend.
   */
  abstract deleteEntry$(entry: E): Observable<SuccessResponse>;

  /**
   * Class used to construct entries.
   */
  protected abstract entryClass: CrudEntryConstructor<T, E>;

  /**
   * Name of the source.
   */
  protected abstract readonly SOURCE_NAME: string;

  /**
   * The key that uniquely identifies each entry.
   */
  protected abstract readonly PRIMARY_KEY: keyof T;

  /**
   * The source observable fetches all the entries.
   */
  protected abstract dataSource$: Observable<T[]>;

  /**
   * The entries in a map with the key as the `id` and value as the entry.
   */
  private entryMap: Signal<Record<string | number, E>> = computed(() =>
    this.entries().reduce((map: Record<string | number, E>, entry: E) => {
      map[entry.id] = entry;
      return map;
    }, {})
  );

  private messageService = inject(MessageService);

  /**
   * Fetches all the entries form the backend.
   * Override this to process the data after fetching.
   */
  fetch(): Observable<E[]> {
    return this.dataSource$.pipe(
      map(res => {
        // Wrap the entries so they're CRUD entries.
        return res.map(e => this.makeSourceEntry(e));
      }),
      tap(entries => {
        if (this.sortFn) {
          entries.sort(this.sortFn);
        }
        this.entries.set(entries);
        this.loaded = true;
        console.info('Datasource loaded.');
      })
    );
  }

  /**
   * Returns the current entries if already loaded, otherwise fetches them.
   * @returns An observable of the entries.
   */
  getEntries(): Observable<E[]> {
    return this.loaded ? of(this.entries()) : this.fetch();
  }

  /**
   * Returns the entry if it's cached on the source.
   *
   * @param id -
   * @returns
   */
  getEntryById(id: string | number): E | undefined {
    if (!this.loaded) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Source is not loaded',
        detail: `${this.SOURCE_NAME} is not loaded`,
        life: 5000
      });
      return undefined;
    }
    return this.entryMap()[id];
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

  deleteEntry(entry: E): void {
    this.deleteEntry$(entry)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        if (!res.success) {
          this.messageService.add({
            severity: 'error',
            summary: 'Delete Failed',
            detail: `Failed to delete "${entry.id}" from ${this.SOURCE_NAME} source`,
            life: 5000
          });
          return;
        }

        this.entries.update(entries => entries.filter(e => e.id !== entry.id));
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Deleted ${entry.id} from ${this.SOURCE_NAME} source`,
          life: 5000
        });
      });
  }

  protected makeSourceEntry(data: T): E {
    return new this.entryClass(data[this.PRIMARY_KEY], data);
  }

  /**
   * The function to sort the entries.
   * Called after `addEntry()` and `fetch()`.
   */
  protected sortFn?: (a: E, b: E) => number;
}
