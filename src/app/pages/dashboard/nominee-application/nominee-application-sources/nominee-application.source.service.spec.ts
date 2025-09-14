import { TestBed } from '@angular/core/testing';

import { NomineeApplicationSourceService } from './nominee-application.source.service';

describe('NomineeApplicationSourceService', () => {
  let service: NomineeApplicationSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomineeApplicationSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
