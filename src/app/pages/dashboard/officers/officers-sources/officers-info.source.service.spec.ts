import { TestBed } from '@angular/core/testing';

import { OfficersInfoSourceService } from './officers-info.source.service';

describe('OfficersSourceService', () => {
  let service: OfficersInfoSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficersInfoSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
