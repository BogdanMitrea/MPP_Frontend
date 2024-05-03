import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../store';
import { PhoneService } from '../phone.service';
import { Observable, of } from 'rxjs';
import { PhoneModel } from '../phone-model';
import { CommonModule } from '@angular/common';
import { PhoneModelComponent } from '../phone-model/phone-model.component';

@Component({
  selector: 'app-phonesbystore',
  standalone: true,
  imports: [PhoneModelComponent,CommonModule],
  templateUrl: './phonesbystore.component.html',
  styleUrl: './phonesbystore.component.css'
})
export class PhonesbystoreComponent {
  phoneService= inject(PhoneService); 
  store: Store | undefined;
  route: ActivatedRoute=inject(ActivatedRoute);
  phoneModelList: Observable<PhoneModel[]>=of([]);
  slicingindex:number=0;

  constructor(){
    const storeId=Number(this.route.snapshot.params['id'])
    this.phoneService.getStoreById(storeId).then((store)=>{
      this.store=store;
    })


    this.phoneModelList=this.phoneService.getPhonesByStore(this.route.snapshot.params['id']);
    this.phoneModelList.subscribe(
      (phoneslist: PhoneModel[]) => {
      },
      () => {
        
      }
    );
  }

  decIndex(){
    this.slicingindex--;
  }

  incIndex(){
    this.slicingindex++;
  }

  onPhoneModelDeleted(): void {
    this.phoneModelList=this.phoneService.getPhonesByStore(this.route.snapshot.params['id']);
    this.phoneModelList.subscribe(
      (phoneslist: PhoneModel[]) => {
      },
      () => {
        
      }
    );
  }
}
