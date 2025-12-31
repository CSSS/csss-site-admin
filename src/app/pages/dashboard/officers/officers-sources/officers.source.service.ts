import { inject, Injectable } from '@angular/core';
import {
  Officer,
  OfficerCreate,
  OfficerInfo,
  OfficerPositionEnum,
  OfficersService,
  OfficerTerm
} from '@api/backend-api';
import { PartialNullable } from '@utils/type-utils';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class OfficerSourceEntry extends CrudEntry<Officer> {
  declare id: number; // declare overrides this to a number

  static fromOfficer(o: Officer): OfficerSourceEntry {
    return new OfficerSourceEntry(
      { ...o, id: o.term_id, computing_id: o.computing_id ?? '' },
      { ...o, computing_id: o.computing_id ?? '' }
    );
  }

  constructor(term: OfficerTerm, info: OfficerInfo) {
    super(term.id, {
      ...term,
      ...info,
      csss_email: '',
      term_id: term.id
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class OfficerSourceService extends CrudSource<Officer, OfficerSourceEntry, OfficerCreate> {
  protected override entryClass = OfficerSourceEntry;
  officersApi = inject(OfficersService);

  protected override readonly PRIMARY_KEY = 'term_id';

  // For now, only fetch the current officers
  protected override dataSource$ = this.officersApi.getCurrentOfficers();

  override fetch(): void {
    this.dataSource$.subscribe({
      next: res => {
        // Wrap the entries so they're CRUD entries.
        const entries = res.map(e => OfficerSourceEntry.fromOfficer(e));
        if (this.sortFn) {
          entries.sort(this.sortFn);
        }
        this.entries.set(entries);
        this.loaded = true;
      }
    });
  }

  override createEntry$(newEntry: OfficerCreate): Observable<OfficerSourceEntry> {
    // Only a single response is expected here
    return this.officersApi.createOfficerTerm([newEntry]).pipe(
      switchMap(res =>
        forkJoin({
          term: of(res[0]),
          info: this.officersApi.getOfficerInfoById(newEntry.computing_id)
        })
      ),
      map(({ term, info }) => {
        return new OfficerSourceEntry(term, info);
      }),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: OfficerSourceEntry,
    params: PartialNullable<Officer>
  ): Observable<OfficerSourceEntry> {
    if (!entry.data.computing_id) {
      throw new Error('Cannot update officer info without computing ID');
    }
    return forkJoin({
      term: this.officersApi.updateOfficerTermById(entry.id, params),
      info: this.officersApi.updateOfficerInfo(entry.data.computing_id, params)
    }).pipe(
      map(({ term, info }) => new OfficerSourceEntry(term, info)),
      tap(updatedEntry => this.updateEntry(updatedEntry))
    );
  }

  override default(): OfficerSourceEntry {
    return new OfficerSourceEntry(
      {
        id: 0,
        computing_id: '',
        position: OfficerPositionEnum.President,
        start_date: new Date().toISOString(),
        is_active: false
      },
      {
        computing_id: '',
        legal_name: ''
      }
    );
  }
}
