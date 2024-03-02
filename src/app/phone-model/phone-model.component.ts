import { Component,Input } from '@angular/core';
import { PhoneModel } from '../phone-model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-phone-model',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './phone-model.component.html',
  styleUrl: './phone-model.component.css'
})
export class PhoneModelComponent {
  @Input() PhoneModel!:PhoneModel;
}
