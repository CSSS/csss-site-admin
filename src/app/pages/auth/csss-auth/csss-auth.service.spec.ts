import { TestBed } from '@angular/core/testing';

import { CsssAuthService } from './login.service';

describe('SfuCasService', () => {
  let service: CsssAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsssAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
