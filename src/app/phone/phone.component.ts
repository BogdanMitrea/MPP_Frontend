import { Component, inject, OnInit,  ChangeDetectorRef } from '@angular/core';
import { PhoneModelComponent } from '../phone-model/phone-model.component';
import { PhoneModel } from '../phone-model';
import { CommonModule } from '@angular/common';
import { PhoneService } from '../phone.service';
import Chart from 'chart.js/auto';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Store } from '../../store';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [PhoneModelComponent,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})

export class PhoneComponent {
  phoneService: PhoneService = inject(PhoneService);
  authService: AuthService= inject(AuthService);
  private socket: WebSocket;
  chart: any;
  alertrequest: Boolean = false;
  
  showPhones : boolean = true;
  showForm: boolean = false;
  sorttype:boolean = false;
  isConnected: boolean=true;
  
  //for paging
  totalPages: number = 0;
  slicingindex: number = 0;

  localPhoneModelList: PhoneModel[]=[];
  phoneModelList: Observable<PhoneModel[]>=of([]);
  storesList: Observable<Store[]>=of([]);

  username: String='';
  
  crudform = new FormGroup({
    phonename: new FormControl(''),
    producer: new FormControl(''),
    yearOfRelease: new FormControl(''),
    color: new FormControl(''),
    phonememory: new FormControl(''),
    chosenphoto: new FormControl(''),
    chosenstore: new FormControl(''),
  });

  storeform = new FormGroup({
    storename: new FormControl(''),
  });

  constructor(private jwtHelper: JwtHelperService){
    if (!navigator.onLine) {
      this.showAlert("No internet connection available.");
    }
    // this.phoneService.getAllPhones().then((phones:PhoneModel[]) =>{
    // this.phoneModelList=phones;
    // this.createChart();
    // this.phoneService.updateServiceList(phones);}).catch(error => {
    //   this.showAlert("Error fetching data from the backend. Please try again later.");
    this.phoneService.checkInternetConnection().subscribe((connected:boolean) => {
      this.isConnected = connected;
      if (this.isConnected) {
          console.log('Internet connection is available.');
          // this.phoneModelList=this.phoneService.getAllPhones2();
          // this.phoneModelList.subscribe(
          //   (phoneslist: PhoneModel[]) => {
          //     this.phoneService.updateServiceList(phoneslist);
          //     this.createChart();
          //   },
          //   () => {
          //     this.showAlert("Error fetching data from the backend. Please try again later.");
          //   }
          // );
          this.fetchList();
      } else {
        // this.showAlert("No internet connection.");
      }
    });
    
    this.socket = new WebSocket('ws://localhost:5000/ws');
    this.socket.onopen = (event) => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      this.phoneService.checkInternetConnection().subscribe((connected:boolean) => {
        this.isConnected = connected;
        if (this.isConnected) {
          console.log('Received message from server:', event.data);
          this.fetchList();
        }
        else{
          this.showAlert("No internet connection.");
        }
    });
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    const token = localStorage.getItem('jwt_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.username = decodedToken.sub;
      this.phoneService.setToken(token);
    }
  
  }

  ngOnInit() {}

  fetchList(){
    this.phoneService.getPagedPhones(this.slicingindex + 1)
    .subscribe((response:any)  => {
      this.phoneModelList = of(response.data);
      this.totalPages = response.totalPages;
    });
    this.phoneService.executePendingOperations();
    this.storesList=this.phoneService.getAllStores();
    this.storesList.subscribe(()=>{});
  }

  // createChart() {
  //   const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: this.phoneService.getAllPhonesNames(),
  //       datasets: [{
  //         label: 'Memory',
  //         data: this.phoneService.getPhonesList().map(phone => phone.memory),
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }
  
  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

  sortelements(){
    this.sorttype=!this.sorttype;
    this.phoneService.sortelements(this.sorttype);
  }

  

  showAlert(message: string) {
    window.alert(message);
  }

  AddNewPhone(){
    this.phoneService.checkInternetConnection().subscribe((connected:boolean) => {
      this.isConnected = connected;
      if (this.isConnected) {
        this.showForm = false;
        this.phoneService.AddNewPhone(
          this.crudform.value.phonename ?? '',this.crudform.value.producer ?? '',this.crudform.value.yearOfRelease ?? '',this.crudform.value.color ?? '',
          this.crudform.value.phonememory ?? '',this.crudform.value.chosenphoto ?? '',this.crudform.value.chosenstore ?? '',
          ).subscribe(() => {
          this.fetchList();
        });
      } else {
        const newphone = {
          id: this.localPhoneModelList.length,
          name: this.crudform.value.phonename?? '',producer: this.crudform.value.producer ?? '',year: Number(this.crudform.value.yearOfRelease) ?? 2022,color: this.crudform.value.color ?? '',
          memory:Number(this.crudform.value.phonememory) ?? 0,photo: this.crudform.value.chosenphoto ?? '',store: Number(this.crudform.value.chosenstore) ?? 0, 
        };
        this.localPhoneModelList.push(newphone);
        this.phoneService.addPendingOperation('add',{
          id: this.localPhoneModelList.length,
          name: this.crudform.value.phonename?? '',
          producer: this.crudform.value.producer ?? '',
          year: Number(this.crudform.value.yearOfRelease),
          color: this.crudform.value.color ?? '',
          memory: Number(this.crudform.value.phonememory),
          photo: this.crudform.value.chosenphoto ?? '',
          store: Number(this.crudform.value.chosenstore) ?? 0,
        })
      }
    });
  }

  AddNewStore(){
    this.showForm = false;
    this.phoneService.AddNewStore(
      this.storeform.value.storename ?? '',
    ).subscribe(()=>{this.storesList=this.phoneService.getAllStores();
      this.storesList.subscribe();
    });
  }

  // showchartdata(){
  //   this.chart.destroy();
  //   this.createChart();
  //   this.chart.update();
  // }


  decIndex(){
    this.slicingindex--;
    this.fetchList();
  }

  incIndex(){
    this.slicingindex++;
    this.fetchList();
  }

  onPhoneModelDeleted(): void {
    this.fetchList();
  }
  
  onPhoneDeletedLocally(id:number):void{
    console.log("Delete");
    this.localPhoneModelList.splice(id,1);
  }

  toggleShowPhones(){
    this.showPhones = !this.showPhones;
  }

  deleteStore(storeId:number) {
    this.phoneService.deleteStore(storeId).subscribe(()=>{this.storesList=this.phoneService.getAllStores();
      this.storesList.subscribe();
    });
  }
}
