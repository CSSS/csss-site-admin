import { inject, Injectable } from '@angular/core';
import {
  ElectionParams,
  ElectionResponse,
  ElectionsService,
  ElectionUpdateParams
} from '@api/backend-api';
import { map, Observable, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../crud-source';

export class ElectionsSourceEntry extends CrudEntry<ElectionResponse> {}

@Injectable({
  providedIn: 'root'
})
export class ElectionsSourceService extends CrudSource<ElectionResponse, ElectionsSourceEntry> {
  protected override entryClass = ElectionsSourceEntry;
  electionsApi = inject(ElectionsService);

  protected override readonly PRIMARY_KEY = 'slug';

  protected override dataSource$ = this.electionsApi.getAllElections();

  override createEntry$(newEntry: ElectionParams): Observable<ElectionsSourceEntry> {
    return this.electionsApi.createElection(newEntry).pipe(
      map(res => new ElectionsSourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: ElectionsSourceEntry,
    params: ElectionUpdateParams
  ): Observable<ElectionsSourceEntry> {
    return this.electionsApi.updateElection(entry.data[this.PRIMARY_KEY], params).pipe(
      map(res => new ElectionsSourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.updateEntry(entry))
    );
  }

  override default(): ElectionsSourceEntry {
    return new ElectionsSourceEntry('', {
      slug: '',
      name: '',
      type: 'general_election',
      datetime_start_nominations: new Date().toISOString(),
      datetime_start_voting: new Date().toISOString(),
      datetime_end_voting: new Date().toISOString(),
      available_positions: [],
      status: 'before_nominations'
    });
  }

  protected override sortFn = (a: ElectionsSourceEntry, b: ElectionsSourceEntry): number =>
    new Date(b.data.datetime_end_voting).getTime() - new Date(a.data.datetime_end_voting).getTime();
}
