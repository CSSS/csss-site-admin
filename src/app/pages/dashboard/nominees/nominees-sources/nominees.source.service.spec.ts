import { TestBed } from '@angular/core/testing';

import { NomineesSourceService } from './nominees.source.service';

describe('NomineesSourceService', () => {
  let service: NomineesSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomineesSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
