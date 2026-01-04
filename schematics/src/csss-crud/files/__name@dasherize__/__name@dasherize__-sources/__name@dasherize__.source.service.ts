import { inject, Injectable } from '@angular/core';
import {
  <%= classify(name) %>,
  <%= classify(name) %>Create,
  <%= classify(name) %>Service,
  <%= classify(name) %>Update
} from '@api/backend-api';
import { map, Observable, tap } from 'rxjs';
import { CrudEntry, CrudSource } from '../../crud-sources/crud-source';

export class <%= classify(name) %>SourceEntry extends CrudEntry<<%= classify(name) %>> {}

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>SourceService extends CrudSource<
  <%= classify(name) %>,
  <%= classify(name) %>SourceEntry,
  <%= classify(name) %>Create
> {
  protected override entryClass = <%= classify(name) %>SourceEntry;
  <%= camelize(name) %>Api = inject(<%= classify(name) %>Service);

  protected override readonly SOURCE_NAME = '<%= classify(name) %>';

  protected override readonly PRIMARY_KEY = '';

  protected override dataSource$ = this.<%= camelize(name) %>Api.get<%= classify(name) %>();

  override createEntry$(newEntry: <%= classify(name) %>Create): Observable<<%= classify(name) %>SourceEntry> {
    return this.<%= classify(name) %>Api.create<%= classify(name) %>(newEntry).pipe(
      map(res => new <%= classify(name) %>SourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.addEntry(entry))
    );
  }

  override updateEntry$(
    entry: <%= classify(name) %>SourceEntry,
    new_values: <%= classify(name) %>Update
  ): Observable<<%= classify(name) %>SourceEntry> {
    return this.<%= camelize(name) %>Api.update<%= classify(name) %>(entry.data[this.PRIMARY_KEY], new_values).pipe(
      map(res => new <%= classify(name) %>SourceEntry(res[this.PRIMARY_KEY], res)),
      tap(entry => this.updateEntry(entry))
    );
  }

  override deleteEntry$(entry: <%= classify(name) %>SourceEntry): Observable<SuccessResponse> {
    return this.<%= camelize(name) %>Api.delete<%= classify(name) %>();
  }

  override default(): <%= classify(name) %>SourceEntry {
    return new <%= classify(name) %>SourceEntry('', {
      name: '',
    });
  }
}
