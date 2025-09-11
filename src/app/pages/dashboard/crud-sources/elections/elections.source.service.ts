import { inject, Injectable } from '@angular/core';
import { ElectionResponse, ElectionsService, ElectionUpdateParams } from '@api/backend-api';
import { Observable } from 'rxjs';
import { CrudSource } from '../crud-source';

@Injectable({
  providedIn: 'root'
})
export class ElectionsSourceService extends CrudSource<ElectionResponse> {
  electionsApi = inject(ElectionsService);

  protected override dataSource$ = this.electionsApi.getAllElections();

  protected override updateEntry(
    name: string,
    params: ElectionUpdateParams
  ): Observable<ElectionResponse> {
    return this.electionsApi.updateElection(name, params);
  }
}
