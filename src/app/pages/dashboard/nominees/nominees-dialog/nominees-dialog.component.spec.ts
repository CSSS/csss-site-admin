import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineesDialogComponent } from './nominees-dialog.component';

describe('NomineesDialogComponent', () => {
  let component: NomineesDialogComponent;
  let fixture: ComponentFixture<NomineesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomineesDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NomineesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
