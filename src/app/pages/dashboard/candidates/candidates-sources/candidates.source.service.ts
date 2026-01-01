import { inject, Injectable } from '@angular/core';
import {
  Candidate,
  CandidateCreate,
  CandidateService,
  CandidateUpdate,
  OfficerPositionEnum
} from '@api/backend-api';
import { map, Observable, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class CandidatesSourceEntry extends CrudEntry<Candidate> {
  static makeId(data: Candidate): string {
    return `${data.nominee_election}::${data.position}::${data.computing_id}`;
  }

  declare id: string; // override id to be a string

  constructor(data: Candidate) {
    super(CandidatesSourceEntry.makeId(data), data);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CandidatesSourceService extends CrudSource<
  Candidate,
  CandidatesSourceEntry,
  CandidateCreate
> {
  protected override entryClass = CandidatesSourceEntry;

  candidatesApi = inject(CandidateService);

  protected override readonly PRIMARY_KEY = 'computing_id';

  protected override dataSource$ = this.candidatesApi.getCandidates();

  override createEntry$(
    newEntry: CandidateCreate,
    params: { election: string }
  ): Observable<CandidatesSourceEntry> {
    return this.candidatesApi.register(params.election, newEntry).pipe(
      map(res => new CandidatesSourceEntry(res)),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: CandidatesSourceEntry,
    new_values: CandidateUpdate
  ): Observable<CandidatesSourceEntry> {
    return this.candidatesApi
      .updateCandidate(
        entry.data.nominee_election,
        entry.data[this.PRIMARY_KEY],
        entry.data.position,
        new_values
      )
      .pipe(
        map(res => new CandidatesSourceEntry(res)),
        tap(e => this.updateCandidate(e, entry.id))
      );
  }

  updateCandidate(updatedEntry: CandidatesSourceEntry, oldId: string): void {
    this.entries.update(entries => {
      const newEntries = [];
      for (const e of entries) {
        if (e.id === oldId) {
          newEntries.push(updatedEntry);
        } else {
          newEntries.push(e);
        }
      }
      return newEntries;
    });
  }

  override default(): CandidatesSourceEntry {
    return new CandidatesSourceEntry({
      computing_id: '',
      position: OfficerPositionEnum.President,
      nominee_election: '',
      speech: ''
    });
  }

  protected override makeSourceEntry(data: Candidate): CandidatesSourceEntry {
    return new CandidatesSourceEntry(data);
  }
}
