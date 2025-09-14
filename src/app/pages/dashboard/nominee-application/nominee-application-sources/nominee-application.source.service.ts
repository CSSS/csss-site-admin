import { inject, Injectable } from '@angular/core';
import {
  NomineeApplicationModel,
  NomineeApplicationParams,
  NomineeApplicationUpdateParams,
  RegistrationService
} from '@api/backend-api';
import { map, Observable, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class NomineeApplicationSourceEntry extends CrudEntry<NomineeApplicationModel> {
  static makeId(entry: NomineeApplicationModel): string {
    return `${entry.computing_id}-${entry.nominee_election}-${entry.position}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NomineeApplicationSourceService extends CrudSource<
  NomineeApplicationModel,
  NomineeApplicationSourceEntry
> {
  electionName: string = '';

  protected override entryClass = NomineeApplicationSourceEntry;

  private registrationApi = inject(RegistrationService);

  protected override readonly PRIMARY_KEY = 'computing_id'; // don't use this

  protected override dataSource$ = this.registrationApi.getElectionRegistrations(this.electionName); // unused

  override fetch(): void {
    this.registrationApi.getElectionRegistrations(this.electionName).subscribe({
      next: res => {
        // Wrap the entries so they're CRUD entries.
        const entries = res.map(
          e => new this.entryClass(NomineeApplicationSourceEntry.makeId(e), e)
        );
        if (this.sortFn) {
          entries.sort(this.sortFn);
        }
        this.entries.set(entries);
        this.loaded = true;
      }
    });
  }

  override createEntry$(
    newEntry: NomineeApplicationParams
  ): Observable<NomineeApplicationSourceEntry> {
    return this.registrationApi.register(this.electionName, newEntry).pipe(
      map(res => new NomineeApplicationSourceEntry(NomineeApplicationSourceEntry.makeId(res), res)),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: NomineeApplicationSourceEntry,
    params: NomineeApplicationUpdateParams
  ): Observable<NomineeApplicationSourceEntry> {
    return this.registrationApi
      .updateRegistration(this.electionName, entry.data.computing_id, entry.data.position, params)
      .pipe(
        map(res => new NomineeApplicationSourceEntry(res[this.PRIMARY_KEY], res)),
        tap(entry => this.updateEntry(entry))
      );
  }

  override default(): NomineeApplicationSourceEntry {
    return new NomineeApplicationSourceEntry('', {
      computing_id: '',
      nominee_election: '',
      position: 'president'
    });
  }
}
