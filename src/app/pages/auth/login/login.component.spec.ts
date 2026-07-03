import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { Mock, vi } from 'vitest';
import { CsssAuthService } from '../csss-auth/csss-auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: {
    isAuthenticated: Mock;
    loginUrl: string;
  };
  let router: {
    navigate: Mock;
  };

  beforeEach(async () => {
    auth = {
      isAuthenticated: vi.fn(),
      loginUrl: 'https://cas.sfu.ca/cas/login?service=http%3A%2F%2Flocalhost%3A8080'
    };
    router = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        {
          provide: CsssAuthService,
          useValue: auth
        },
        {
          provide: Router,
          useValue: router
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({})
            }
          }
        }
      ]
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    auth.isAuthenticated.mockReturnValue(false);

    createComponent();

    expect(component).toBeTruthy();
  });

  it('stays on the base login path when there is no session', () => {
    auth.isAuthenticated.mockReturnValue(false);

    createComponent();

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('redirects to the dashboard when an authenticated user manually navigates to the base path', () => {
    auth.isAuthenticated.mockReturnValue(true);

    createComponent();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
