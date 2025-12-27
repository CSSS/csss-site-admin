import { inject, Injectable } from '@angular/core';
import { OfficerCreate, OfficerInfo, OfficersService, OfficerUpdate } from '@api/backend-api';
import { map, Observable, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class OfficerInfoSourceEntry extends CrudEntry<OfficerInfo> {}

@Injectable({
  providedIn: 'root'
})
export class OfficersInfoSourceService extends CrudSource<
  OfficerInfo,
  OfficerInfoSourceEntry,
  OfficerCreate,
  OfficerUpdate
> {
  protected override entryClass = OfficerInfoSourceEntry;
  officersApi = inject(OfficersService);

  protected override readonly PRIMARY_KEY = 'computing_id';

  protected override dataSource$ = this.officersApi.getCurrentOfficers();

  override createEntry$(newEntry: OfficerCreate): Observable<OfficerInfoSourceEntry> {
    return this.officersApi.createOfficerTerm([newEntry]).pipe(
      map(() => {
        const newEnt = {
          ...newEntry,
          is_active: false
        };
        return new OfficerInfoSourceEntry(newEntry.position, newEnt);
      }),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: OfficerInfoSourceEntry,
    params: OfficerCreate
  ): Observable<OfficerInfoSourceEntry> {
    return this.officersApi.updateOfficerInfo(params.computing_id, params).pipe(
      map(res => return new OfficerInfoSourceEntry(res[this.PRIMARY_KEY], {

      })),
      tap(e => this.updateEntry(e))
    );
  }

  override default(): OfficerInfoSourceEntry {
    return new OfficerInfoSourceEntry('', {
      name: ''
    });
  }
}
