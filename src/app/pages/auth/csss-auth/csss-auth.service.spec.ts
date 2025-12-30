import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@api/backend-api';
import { of } from 'rxjs';
import { CsssAuthService } from './csss-auth.service';

describe('CsssAuthService', () => {
  let service: CsssAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provider: ActivatedRoute,
          useValue: {
            queryParams: of({ ticket: 'ticket' })
          }
        },
        Router,
        AuthenticationService
      ]
    });
    service = TestBed.inject(CsssAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
