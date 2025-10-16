import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditText } from './form-edit-text';

describe('FormEditText', () => {
  let component: FormEditText;
  let fixture: ComponentFixture<FormEditText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
