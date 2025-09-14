import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>DialogComponent } from './<%= dasherize(name) %>-dialog.component';

describe('<%= classify(name) %>DialogComponent', () => {
  let component: <%= classify(name) %>DialogComponent;
  let fixture: ComponentFixture<<%= classify(name) %>DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<%= classify(name) %>DialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(<%= classify(name) %>DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
