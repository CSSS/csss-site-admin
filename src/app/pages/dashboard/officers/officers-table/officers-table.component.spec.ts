import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersTableComponent } from './officers-table.component';

describe('OfficersTableComponent', () => {
  let component: OfficersTableComponent;
  let fixture: ComponentFixture<OfficersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficersTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OfficersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
