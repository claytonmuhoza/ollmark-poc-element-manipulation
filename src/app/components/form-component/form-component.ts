import {Component, DestroyRef, inject, signal} from '@angular/core'
import {CommonModule, NgOptimizedImage} from '@angular/common'
import { FormBuilder, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms'
import {SectionContainer} from '../section-container/section-container';
import {PenpotMessagingService} from '../../services/penpot-messaging-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormCreateText} from '../form-create-text/form-create-text';
import {FormDelete} from '../form-delete/form-delete';
import {FormEditText} from '../form-edit-text/form-edit-text';

@Component({
  selector: 'app-form-component',
  imports: [
    SectionContainer,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormCreateText,
    FormDelete,
    FormEditText
  ],
  templateUrl: './form-component.html',
  styleUrl: './form-component.css'
})

export class FormComponent {
  private fb = inject(FormBuilder) as NonNullableFormBuilder
  private bus = inject(PenpotMessagingService)
  private destroyRef = inject(DestroyRef)


  constructor(){
    this.bus.send({ type: 'UI_READY' })
    this.bus.on('SELECTION_CHANGED').subscribe(({ selection }) => {
      console.log(selection) // tableau [{id, name, type}, ...]
    })
  }





}
