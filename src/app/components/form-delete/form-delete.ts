import {Component, DestroyRef, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SectionContainer} from "../section-container/section-container";
import {PenpotMessagingService} from '../../services/penpot-messaging-service';

@Component({
  selector: 'app-form-delete',
    imports: [
        NgOptimizedImage,
        ReactiveFormsModule,
        SectionContainer
    ],
  templateUrl: './form-delete.html',
  styleUrl: './form-delete.css'
})
export class FormDelete {
  private fb = inject(FormBuilder) as NonNullableFormBuilder
  private bus = inject(PenpotMessagingService)
  private destroyRef = inject(DestroyRef)
  readonly deleteForm = this.fb.group({
    tag: this.fb.control<string>('', [
      Validators.required,
      Validators.pattern(/\S/)
    ])
  })
  deleteOne() {
    if (this.deleteForm.invalid) {
      this.deleteForm.markAllAsTouched()
      return
    }
    const tag = this.deleteForm.value.tag!.trim()
    this.bus.send({ type: 'DELETE_BY_TAG', tag })
  }
}
