import { TestBed } from '@angular/core/testing';

import { <%= classify(name) %>SourceService } from './<%= dasherize(name) %>.source.service';

describe('<%= classify(name) %>SourceService', () => {
  let service: <%= classify(name) %>SourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(<%= classify(name) %>SourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
