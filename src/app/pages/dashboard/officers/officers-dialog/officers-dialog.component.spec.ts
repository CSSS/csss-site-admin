import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersDialogComponent } from './officers-dialog.component';

describe('OfficersDialogComponent', () => {
  let component: OfficersDialogComponent;
  let fixture: ComponentFixture<OfficersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficersDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OfficersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
