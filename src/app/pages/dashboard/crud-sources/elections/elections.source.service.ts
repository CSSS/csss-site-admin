import { inject, Injectable } from '@angular/core';
import {
  ElectionParams,
  ElectionResponse,
  ElectionsService,
  ElectionUpdateParams
} from '@api/backend-api';
import { Observable } from 'rxjs';
import { CrudSource } from '../crud-source';

@Injectable({
  providedIn: 'root'
})
export class ElectionsSourceService extends CrudSource<
  ElectionResponse,
  ElectionParams,
  ElectionUpdateParams
> {
  electionsApi = inject(ElectionsService);

  protected override readonly PRIMARY_KEY = 'slug';

  protected override dataSource$ = this.electionsApi.getAllElections();

  protected override createEntry$(newEntry: ElectionParams): Observable<ElectionResponse> {
    return this.electionsApi.createElection(newEntry);
  }

  protected override updateEntry$(
    entry: ElectionResponse,
    params: ElectionUpdateParams
  ): Observable<ElectionResponse> {
    return this.electionsApi.updateElection(entry[this.PRIMARY_KEY], params);
  }

  protected override sortFn = (a: ElectionResponse, b: ElectionResponse): number =>
    new Date(b.datetime_end_voting).getTime() - new Date(a.datetime_end_voting).getTime();
}
