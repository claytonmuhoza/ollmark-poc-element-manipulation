import {Component, input} from '@angular/core';
import {FormComponent} from '../../components/form-component/form-component';

@Component({
  selector: 'app-home-page',
  imports: [
    FormComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  title = input.required<string>()
}
