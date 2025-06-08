import { Component } from '@angular/core';
import {CitizenFormComponent} from '../../citizen-form/citizen-form.component';
import {CitizenFormPageComponent} from '../citizen-form-page/citizen-form-page.component';

@Component({
  selector: 'app-citizen-dashboard',
  imports: [
    CitizenFormComponent,
    CitizenFormPageComponent
  ],
  templateUrl: './citizen-dashboard.component.html',
  styleUrl: './citizen-dashboard.component.scss'
})
export class CitizenDashboardComponent {

}
