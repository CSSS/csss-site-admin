import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ElectionsService,
  NomineeApplicationModel,
  NomineeApplicationParams,
  NomineeApplicationUpdateParams
} from '@api/backend-api';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class NomineeApplicationSourceEntry extends CrudEntry<NomineeApplicationModel> {}

@Injectable({
  providedIn: 'root'
})
export class NomineeApplicationSourceService extends CrudSource<
  NomineeApplicationModel,
  NomineeApplicationSourceEntry
> {
  protected override entryClass = NomineeApplicationSourceEntry;

  private electionsApi = inject(ElectionsService);
  private activatedRoute = inject(ActivatedRoute);

  protected override readonly PRIMARY_KEY = 'computing_id';

  private electionName$: Observable<string> = this.activatedRoute.params.pipe(
    filter(params => params['electionName'] !== null),
    map(params => params['electionName'])
  );

  protected override dataSource$ = this.electionName$.pipe(
    switchMap(electionName => {
      return this.electionsApi.getElectionRegistrations(electionName);
    })
  );

  override createEntry$(
    newEntry: NomineeApplicationParams
  ): Observable<NomineeApplicationSourceEntry> {
    return this.electionName$.pipe(
      switchMap(electionName => this.electionsApi.register(electionName, newEntry)),
      map(res => new NomineeApplicationSourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: NomineeApplicationSourceEntry,
    params: NomineeApplicationUpdateParams
  ): Observable<NomineeApplicationSourceEntry> {
    return this.electionName$.pipe(
      switchMap(electionName =>
        this.electionsApi.updateRegistration(
          electionName,
          entry.data.computing_id,
          entry.data.position,
          params
        )
      ),
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
