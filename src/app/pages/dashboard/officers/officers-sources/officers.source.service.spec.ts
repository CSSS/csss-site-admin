import { TestBed } from '@angular/core/testing';

import { OfficerSourceService } from './officers.source.service';

describe('OfficersSourceService', () => {
  let service: OfficerSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficerSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
