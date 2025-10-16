import {Component, inject, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SectionContainer} from "../section-container/section-container";
import {PenpotMessagingService} from '../../services/penpot-messaging-service';
export type NamedColor = 'White' | 'Blue' | 'Red' | 'Purple' | 'Green'
@Component({
  selector: 'app-form-edit-text',
    imports: [
        NgOptimizedImage,
        ReactiveFormsModule,
        SectionContainer
    ],
  templateUrl: './form-edit-text.html',
  styleUrl: './form-edit-text.css'
})

export class FormEditText {
  private fb = inject(FormBuilder) as NonNullableFormBuilder
  private bus = inject(PenpotMessagingService)
  readonly colorOptions: NamedColor[] = ['White', 'Blue', 'Red', 'Purple', 'Green']
  selectedElement = signal<string|undefined>(undefined)

  // Map couleur Name -> Hex
  private readonly colorMap: Record<NamedColor, string> = {
    White: '#FFFFFF',
    Blue:  '#1E90FF',
    Red:   '#FF3B30',
    Purple:'#7C3AED',
    Green: '#22C55E',
  }
  readonly editForm = this.fb.group({
    text: this.fb.control<string>('', [
      Validators.required,
      Validators.pattern(/\S/)
    ]),
    color: this.fb.control<NamedColor>('White')
  })
  editSelected() {
    if (this.editForm.controls.text.invalid) {
      this.editForm.controls.text.markAsTouched()
      return
    }
    const text = this.editForm.value.text!.trim()
    this.bus.send({ type: 'EDIT_SELECTED_TEXT', text })
  }

  setColor() {
    const name = this.editForm.value.color ?? 'White'
    const hex = this.colorMap[name]
    this.bus.send({ type: 'SET_SELECTED_TEXT_COLOR', color: hex })
  }

}
