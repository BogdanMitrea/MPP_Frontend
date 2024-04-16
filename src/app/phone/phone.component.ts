import { Component, inject, OnInit,  ChangeDetectorRef } from '@angular/core';
import { PhoneModelComponent } from '../phone-model/phone-model.component';
import { PhoneModel } from '../phone-model';
import { CommonModule } from '@angular/common';
import { PhoneService } from '../phone.service';
import Chart from 'chart.js/auto';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [PhoneModelComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent {
  phoneService: PhoneService = inject(PhoneService);
  alertrequest: Boolean = false;
  private socket: WebSocket;
  chart: any;
  ngOnInit() {
    
  }
  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.phoneService.getAllPhonesNames(),
        datasets: [{
          label: 'Memory',
          data: this.phoneService.getPhonesList().map(phone => phone.memory),
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
  // phoneModelList: PhoneModel[]=[];
  phoneModelList: Observable<PhoneModel[]>=of([]);
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
  isConnected: boolean=true;
  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

  sortelements(){
    this.sorttype=!this.sorttype;
    this.phoneService.sortelements(this.sorttype);
  }

  

  constructor(){
    if (!navigator.onLine) {
      this.showAlert("No internet connection available.");
    }
    // this.phoneService.getAllPhones().then((phones:PhoneModel[]) =>{
    // this.phoneModelList=phones;
    // this.createChart();
    // this.phoneService.updateServiceList(phones);}).catch(error => {
    //   this.showAlert("Error fetching data from the backend. Please try again later.");

    //   this.alertrequest = true;
    //   });;


    // this.phoneService.getAllPhones2().subscribe(
    //   (phones: PhoneModel[]) => {
    //     this.phoneModelList = phones;
    //     this.createChart();
    //     //this.phoneService.updateServiceList(phones);
    //   },
    //   () => {
    //     console.error('Error fetching phones:');
    //   }
    // );
    this.phoneService.checkInternetConnection().subscribe((connected:boolean) => {
      this.isConnected = connected;
      if (this.isConnected) {
        console.log('Internet connection is available.');
        this.phoneModelList=this.phoneService.getAllPhones2();
       this.phoneModelList.subscribe(
        (phoneslist: PhoneModel[]) => {
        this.phoneService.updateServiceList(phoneslist);
        this.createChart();
      },
      () => {
        this.showAlert("Error fetching data from the backend. Please try again later.");
      }
    );

      } else {
        this.showAlert("No internet connection.");
      }
    });
    


    this.socket = new WebSocket('ws://localhost:5000/ws');
    console.log('WebSocket created');
    this.socket.onopen = (event) => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      this.phoneService.checkInternetConnection().subscribe((connected:boolean) => {
        this.isConnected = connected;
        if (this.isConnected) {
          console.log('Received message from server:', event.data);
          this.phoneModelList=this.phoneService.getAllPhones2();
          this.phoneModelList.subscribe(
            (phoneslist: PhoneModel[]) => {
              this.phoneService.updateServiceList(phoneslist);
            },
            () => {
              this.showAlert("Error fetching data from the backend. Please try again later.");
            }
          );
        }
        else
        {
          this.showAlert("No internet connection.");
        }
    });
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };
  }

  showAlert(message: string) {
    window.alert(message);
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
    ).subscribe(() => {
      this.phoneModelList=this.phoneService.getAllPhones2();
      this.phoneModelList.subscribe(
        (phoneslist: PhoneModel[]) => {
          this.phoneService.updateServiceList(phoneslist);
          this.showchartdata();
        },
        () => {
          console.error('Error fetching phones:');
        }
      );
    });
    
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

  onPhoneModelDeleted(): void {
    this.phoneModelList = this.phoneService.getAllPhones2();
    this.phoneModelList.subscribe(
      (phoneslist: PhoneModel[]) => {
        this.phoneService.updateServiceList(phoneslist);
        this.showchartdata();
      },
      () => {
        console.error('Error fetching phones:');
      }
    );
  }
}
