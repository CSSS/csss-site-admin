import { inject, Injectable } from '@angular/core';
import {
  <%= classify(name) %>Params,
  <%= classify(name) %>Response,
  <%= classify(name) %>Service,
  <%= classify(name) %>UpdateParams
} from '@api/backend-api';
import { map, Observable, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class <%= classify(name) %>SourceEntry extends CrudEntry<<%= classify(name) %>Response> {}

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>SourceService extends CrudSource<<%= classify(name) %>Response, <%= classify(name) %>SourceEntry> {
  protected override entryClass = <%= classify(name) %>SourceEntry;
  <%= classify(name) %>Api = inject(<%= classify(name) %>Service);

  protected override readonly PRIMARY_KEY = '';

  protected override dataSource$ = this.<%= classify(name) %>Api.get<%= classify(name) %>();

  override createEntry$(newEntry: <%= classify(name) %>Params): Observable<<%= classify(name) %>SourceEntry> {
    return this.<%= classify(name) %>Api.create<%= classify(name) %>(newEntry).pipe(
      map(res => new <%= classify(name) %>SourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: <%= classify(name) %>SourceEntry,
    params: <%= classify(name) %>UpdateParams
  ): Observable<<%= classify(name) %>SourceEntry> {
    return this.<%= classify(name) %>Api.update<%= classify(name) %>(entry.data[this.PRIMARY_KEY], params).pipe(
      map(res => new <%= classify(name) %>SourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.updateEntry(entry))
    );
  }

  override default(): <%= classify(name) %>SourceEntry {
    return new <%= classify(name) %>SourceEntry('', {
      name: '',
    });
  }
}
