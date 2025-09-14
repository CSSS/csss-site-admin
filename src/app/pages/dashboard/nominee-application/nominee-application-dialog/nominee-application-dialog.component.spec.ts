import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeApplicationDialogComponent } from './nominee-application-dialog.component';

describe('NomineeApplicationDialogComponent', () => {
  let component: NomineeApplicationDialogComponent;
  let fixture: ComponentFixture<NomineeApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomineeApplicationDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NomineeApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
