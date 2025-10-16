import {Component, input} from '@angular/core';

@Component({
  selector: 'app-section-container',
  imports: [],
  templateUrl: './section-container.html',
  styleUrl: './section-container.css'
})
export class SectionContainer {
  title = input.required<string>()
}
