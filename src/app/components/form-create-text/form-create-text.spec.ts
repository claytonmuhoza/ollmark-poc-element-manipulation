import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateText } from './form-create-text';

describe('FormCreateText', () => {
  let component: FormCreateText;
  let fixture: ComponentFixture<FormCreateText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
