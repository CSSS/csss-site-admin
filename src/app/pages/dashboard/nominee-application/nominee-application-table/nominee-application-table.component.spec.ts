import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeApplicationTableComponent } from './nominee-application-table.component';

describe('NomineeApplicationTableComponent', () => {
  let component: NomineeApplicationTableComponent;
  let fixture: ComponentFixture<NomineeApplicationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomineeApplicationTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NomineeApplicationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
