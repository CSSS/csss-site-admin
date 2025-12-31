import { TestBed } from '@angular/core/testing';

import { CandidatesSourceService } from './candidates.source.service';

describe('CandidatesSourceService', () => {
  let service: CandidatesSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
