import { Component, inject } from '@angular/core';
import { PhoneModelComponent } from '../phone-model/phone-model.component';
import { PhoneModel } from '../phone-model';
import { CommonModule } from '@angular/common';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [PhoneModelComponent,CommonModule],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent {
  phoneModelList: PhoneModel[]=[];
  phoneService: PhoneService = inject(PhoneService);

  constructor(){
    this.phoneModelList=this.phoneService.getAllPhones();
  }
}
