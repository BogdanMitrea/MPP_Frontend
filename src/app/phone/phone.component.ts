import { Component, inject } from '@angular/core';
import { PhoneModelComponent } from '../phone-model/phone-model.component';
import { PhoneModel } from '../phone-model';
import { CommonModule } from '@angular/common';
import { PhoneService } from '../phone.service';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [PhoneModelComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent {
  phoneModelList: PhoneModel[]=[];
  phoneService: PhoneService = inject(PhoneService);
  showForm: boolean = false;
  crudform = new FormGroup({
    phonename: new FormControl(''),
    producer: new FormControl(''),
    yearOfRelease: new FormControl(''),
    color: new FormControl(''),
    phonememory: new FormControl(''),
    chosenphoto: new FormControl(''),
  });

  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

  constructor(){
    this.phoneModelList=this.phoneService.getAllPhones();
  }

  AddNewPhone(){
    this.phoneService.AddNewPhone(
      this.crudform.value.phonename ?? '',
      this.crudform.value.producer ?? '',
      this.crudform.value.yearOfRelease ?? '',
      this.crudform.value.color ?? '',
      this.crudform.value.phonememory ?? '',
      this.crudform.value.chosenphoto ?? '',
    )
  }
}
