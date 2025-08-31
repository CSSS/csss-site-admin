import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsDialogComponent } from './elections-dialog.component';

describe('ElectionsDialogComponent', () => {
  let component: ElectionsDialogComponent;
  let fixture: ComponentFixture<ElectionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
