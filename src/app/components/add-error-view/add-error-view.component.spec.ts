import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddErrorViewComponent } from './add-error-view.component';

describe('AddErrorViewComponent', () => {
  let component: AddErrorViewComponent;
  let fixture: ComponentFixture<AddErrorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddErrorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddErrorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
