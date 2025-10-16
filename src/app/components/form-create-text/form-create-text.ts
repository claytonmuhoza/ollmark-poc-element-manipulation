import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SectionContainer} from "../section-container/section-container";
import {PenpotMessagingService} from '../../services/penpot-messaging-service';

@Component({
  selector: 'app-form-create-text',
    imports: [
        NgOptimizedImage,
        ReactiveFormsModule,
        SectionContainer
    ],
  templateUrl: './form-create-text.html',
  styleUrl: './form-create-text.css'
})
export class FormCreateText {
  private bus = inject(PenpotMessagingService)
  private fb = inject(FormBuilder) as NonNullableFormBuilder
  readonly createForm = this.fb.group({
    text: this.fb.control<string>('', [
      Validators.required,
      Validators.pattern(/\S/) // empêche les chaînes vides/espaces
    ])
  })
  create() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched()
      return
    }
    const text = this.createForm.value.text!.trim()
    this.bus.send({ type: 'CREATE_TEXT', text })
    this.createForm.reset({ text: '' })
  }

}
