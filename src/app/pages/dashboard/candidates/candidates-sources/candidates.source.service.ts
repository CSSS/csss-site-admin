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

  override fetch(): void {
    this.dataSource$.subscribe({
      next: res => {
        const entries = res.map(e => new CandidatesSourceEntry(e));
        this.entries.set(entries);
        this.loaded = true;
      }
    });
  }

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
        new_values.position ?? entry.data.position,
        new_values
      )
      .pipe(
        map(res => new CandidatesSourceEntry(res)),
        tap(entry => this.updateEntry(entry))
      );
  }

  override default(): CandidatesSourceEntry {
    return new CandidatesSourceEntry({
      computing_id: '',
      position: OfficerPositionEnum.President,
      nominee_election: '',
      speech: ''
    });
  }
}
