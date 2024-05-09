import { Component,Input, inject, Output, EventEmitter } from '@angular/core';
import { PhoneModel } from '../phone-model';
import { CommonModule } from '@angular/common';
import { PhoneService } from '../phone.service';
import { RouterModule } from '@angular/router';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-phone-model',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './phone-model.component.html',
  styleUrl: './phone-model.component.css'
})
export class PhoneModelComponent {
  @Input() PhoneModel!:PhoneModel;
  @Output() phoneModelDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() phoneDeletedLocally: EventEmitter<number> = new EventEmitter<number>();

  phoneService= inject(PhoneService); 
  showForm: boolean = false;
  entryToUpdate:number=-1;
  isConnected: boolean=true;
  updateform = new FormGroup({
    newname: new FormControl(''),
    producer: new FormControl(''),
    yearOfRelease: new FormControl(''),
    color: new FormControl(''),
    phonememory: new FormControl(''),
    chosenphoto: new FormControl(''),
    chosenstore: new FormControl(''),
  });

  deleteEntry(phoneModelId:number) {
    if(this.entryToUpdate===phoneModelId)
      this.entryToUpdate=-1;
    this.phoneService.checkInternetConnection().subscribe((connected:boolean) => {
      this.isConnected = connected;
      if (this.isConnected) {
        this.phoneService.deletePhone(phoneModelId).subscribe(() => {
              this.phoneModelDeleted.emit();
            },
            () => {
              console.error('Error fetching phones:');
            }
          );
      }
      else
      {
        this.phoneDeletedLocally.emit(phoneModelId);
        
        this.phoneService.addPendingOperation('del',phoneModelId);
      }
    });
  }

  updatePhone(phoneModelId:number) {
    this.phoneService.updatePhone(
      phoneModelId,
      this.updateform.value.newname ?? '',
      this.updateform.value.producer ?? '',
      this.updateform.value.yearOfRelease ?? '',
      this.updateform.value.color ?? '',
      this.updateform.value.phonememory ?? '',
      this.updateform.value.chosenphoto ?? '',
      this.updateform.value.chosenstore ?? '',
      ).subscribe(() => {
        this.phoneModelDeleted.emit();
      },
      () => {
        console.error('Error fetching phones:');
      }
    );
      this.showForm=!this.showForm;
  }

  updateEntryButton(phoneModelId:number) {
    this.entryToUpdate=phoneModelId;
    this.showForm=!this.showForm;
  }

}
