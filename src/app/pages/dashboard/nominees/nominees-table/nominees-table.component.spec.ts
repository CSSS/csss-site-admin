import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineesTableComponent } from './nominees-table.component';

describe('NomineesTableComponent', () => {
  let component: NomineesTableComponent;
  let fixture: ComponentFixture<NomineesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomineesTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NomineesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
