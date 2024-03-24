import { Component, inject, OnInit } from '@angular/core';
import { PhoneModelComponent } from '../phone-model/phone-model.component';
import { PhoneModel } from '../phone-model';
import { CommonModule } from '@angular/common';
import { PhoneService } from '../phone.service';
import Chart from 'chart.js/auto';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [PhoneModelComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent {
  phoneService: PhoneService = inject(PhoneService);
  chart: any;
  ngOnInit() {
    this.createChart();
  }
  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.phoneService.getAllPhonesNames(),
        datasets: [{
          label: 'Memory',
          data: this.phoneService.getAllPhones().map(phone => phone.memory),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  slicingindex:number=0;
  phoneModelList: PhoneModel[]=[];
  slicedPhoneModelList: PhoneModel[]=[];
  showForm: boolean = false;
  crudform = new FormGroup({
    phonename: new FormControl(''),
    producer: new FormControl(''),
    yearOfRelease: new FormControl(''),
    color: new FormControl(''),
    phonememory: new FormControl(''),
    chosenphoto: new FormControl(''),
  });
  sorttype:boolean = false;

  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

  sortelements(){
    this.sorttype=!this.sorttype;
    this.phoneService.sortelements(this.sorttype);
  }

  constructor(){
    this.phoneModelList=this.phoneService.getAllPhones();
  }

  AddNewPhone(){
    this.showForm = false;
    this.phoneService.AddNewPhone(
      this.crudform.value.phonename ?? '',
      this.crudform.value.producer ?? '',
      this.crudform.value.yearOfRelease ?? '',
      this.crudform.value.color ?? '',
      this.crudform.value.phonememory ?? '',
      this.crudform.value.chosenphoto ?? '',
    )
    // this.showchartdata();
  }


  showchartdata(){
    this.chart.destroy();
    this.createChart();
    this.chart.update();
  }


  decIndex(){
    this.slicingindex--;
  }

  incIndex(){
    this.slicingindex++;
  }
}
