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

  })
  deleteAll() {
    if (this.deleteForm.invalid) {
      this.deleteForm.markAllAsTouched()
      return
    }
    this.bus.send({ type: 'DELETE_SELECTED_ELEMENTS'})
  }
}
