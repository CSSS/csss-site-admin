import { TestBed } from '@angular/core/testing';

import { OfficersSourceService } from './officers.source.service';

describe('OfficersSourceService', () => {
  let service: OfficersSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficersSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
