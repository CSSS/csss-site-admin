import { inject, Injectable } from '@angular/core';
import {
  Nominee,
  NomineeCreate,
  NomineeService,
  NomineeUpdate,
  SuccessResponse
} from '@api/backend-api';
import { map, Observable, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class NomineesSourceEntry extends CrudEntry<Nominee> {}

@Injectable({
  providedIn: 'root'
})
export class NomineesSourceService extends CrudSource<Nominee, NomineesSourceEntry, NomineeCreate> {
  protected override SOURCE_NAME = 'Nominees';

  protected override entryClass = NomineesSourceEntry;

  nomineeApi = inject(NomineeService);

  protected override readonly PRIMARY_KEY = 'computing_id';

  protected override dataSource$ = this.nomineeApi.getAllNominees();

  override createEntry$(newEntry: NomineeCreate): Observable<NomineesSourceEntry> {
    return this.nomineeApi.createNominee(newEntry).pipe(
      map(res => new NomineesSourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: NomineesSourceEntry,
    params: NomineeUpdate
  ): Observable<NomineesSourceEntry> {
    return this.nomineeApi.updateNominee(entry.data[this.PRIMARY_KEY], params).pipe(
      map(res => new NomineesSourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.updateEntry(entry))
    );
  }

  override deleteEntry$(entry: NomineesSourceEntry): Observable<SuccessResponse> {
    return this.nomineeApi.deleteNominee(entry.data[this.PRIMARY_KEY]);
  }

  override default(): NomineesSourceEntry {
    return new NomineesSourceEntry('', {
      computing_id: '',
      linked_in: '',
      full_name: '',
      instagram: '',
      email: '',
      discord_username: ''
    });
  }
}
