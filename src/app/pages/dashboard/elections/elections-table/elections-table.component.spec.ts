import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsTableComponent } from './elections-table.component';

describe('ElectionsTableComponent', () => {
  let component: ElectionsTableComponent;
  let fixture: ComponentFixture<ElectionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionsTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ElectionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
