import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from '../phone.service';
import { PhoneModel } from '../phone-model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  phoneService= inject(PhoneService); 
  phoneModel: PhoneModel | undefined;
  route: ActivatedRoute=inject(ActivatedRoute);
  phoneModelId=0;

  constructor(){
    const phoneModelId=Number(this.route.snapshot.params['id'])
    this.phoneModel=this.phoneService.getPhoneById(phoneModelId);
  }
}
