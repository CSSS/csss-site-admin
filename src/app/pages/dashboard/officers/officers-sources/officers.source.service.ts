import { inject, Injectable } from '@angular/core';
import { OfficerInfoResponse, OfficersService, OfficerTermCreate } from '@api/backend-api';
import { map, Observable, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class OfficersSourceEntry extends CrudEntry<OfficerInfoResponse> {}

@Injectable({
  providedIn: 'root'
})
export class OfficersSourceService extends CrudSource<OfficerInfoResponse, OfficersSourceEntry> {
  protected override entryClass = OfficersSourceEntry;
  officersApi = inject(OfficersService);

  protected override readonly PRIMARY_KEY = 'position';

  protected override dataSource$ = this.officersApi.getCurrentOfficers();

  override createEntry$(newEntry: OfficerTermCreate): Observable<OfficersSourceEntry> {
    return this.officersApi.createOfficerTerm([newEntry]).pipe(
      map(() => {
        const newEnt = {
          ...newEntry,
          is_active: false
        };
        return new OfficersSourceEntry(newEntry.position, newEnt);
      }),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: OfficersSourceEntry,
    params: OfficerTermCreate
  ): Observable<OfficersSourceEntry> {
    return this.officersApi.updateOfficerInfo(params.computing_id, params).pipe(
      map(res => new OfficersSourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.updateEntry(entry))
    );
  }

  override default(): OfficersSourceEntry {
    return new OfficersSourceEntry('', {
      name: ''
    });
  }
}
