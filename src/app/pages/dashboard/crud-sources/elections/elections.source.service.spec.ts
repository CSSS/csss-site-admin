import { TestBed } from '@angular/core/testing';

import { ElectionsSourceService } from './elections.source.service';

describe('ElectionsSourceService', () => {
  let service: ElectionsSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectionsSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
