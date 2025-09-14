import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>sDialogComponent } from './<%= dasherize(name) %>-dialog.component';

describe('<%= classify(name) %>sDialogComponent', () => {
  let component: <%= classify(name) %>sDialogComponent;
  let fixture: ComponentFixture<<%= classify(name) %>sDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<%= classify(name) %>sDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(<%= classify(name) %>sDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
