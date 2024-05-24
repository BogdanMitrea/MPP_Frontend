import { Injectable,inject } from '@angular/core';
import { PhoneModel } from './phone-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Console } from 'console';
import { Observable, catchError, map, of } from 'rxjs';
import { Store } from '../store';
import { PhoneComponent } from './phone/phone.component';


interface Pair {
  key: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private ipaddr='192.168.1.130'; 
  private baseUrl = 'https://mppbackend-production-bec6.up.railway.app/api/Phone';
  private storeUrl = 'https://mppbackend-production-bec6.up.railway.app/api/Store';
  private pageSize = 5;
  // protected phoneModelsList: PhoneModel[] = [];
  private pendingoperations: Pair[] = [];
  token : any=null; 

  constructor(private http : HttpClient) {}
  // async getAllPhones(): Promise<PhoneModel[]>{
  //   console.log("Fetching");
  //   const data = await fetch(this.baseUrl);
  //   return await data.json() ?? [];
  // }
  checkInternetConnection(): Observable<boolean> {
    return this.http.get('https://corsproxy.io/?https://corsproxy.io').pipe(
      map(() => true),
      catchError(((error: HttpErrorResponse) =>{if (error.status === 522) {
        return of(true);}
      return of(false); 
    }))
    );
  }
  
  getAllPhones2(): Observable<PhoneModel[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<PhoneModel[]>(this.baseUrl,{headers:headers});
  }

  getPagedPhones(pagenr: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    var phones = this.http.get<PhoneModel[]>(`${this.baseUrl}/${this.pageSize}/${pagenr}`,{headers:headers});
    return phones;
  }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.storeUrl);
  }

  // getPhonesList() : PhoneModel[]{
  //   return this.phoneModelsList;
  // }

  getURL()
  {
    return this.baseUrl;
  }

  // getAllPhonesNames(): String[] {
  //   return this.phoneModelsList.map(phone => phone.name);
  // }

  async getPhoneById(id:number): Promise<PhoneModel | undefined>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const data=await fetch(`${this.baseUrl}/${id}`);
    return await data.json() ?? {};
  }

  async getStoreById(id:number): Promise<Store | undefined>{
    const data=await fetch(`${this.storeUrl}/${id}`);
    return await data.json() ?? {};
  }

  // getMaxId(): number {
  //   let maxId = 0;
  //   for (const element of this.phoneModelsList) {
  //     if (element.id > maxId) {
  //       maxId = element.id;
  //     }
  //   }
  //   return maxId;
  // }

  AddNewPhone(phonename:string,producer:string,yearOfRelease:string,color:string,phonememory:string,chosenphoto:string,chosenstore:string){
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`
    });
    const newphone = {
      id: 0,
      name: phonename,
      producer: producer,
      year: Number(yearOfRelease),
      color: color,
      memory: Number(phonememory),
      photo: chosenphoto,
      store:Number(chosenstore)
    };
    
    return this.http.post(this.baseUrl, newphone,{headers:headers})
  }

  AddNewStore(storename:string,){
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`
    });
    const newstore = {
      id: 0,
      name: storename,
    };
    console.log(newstore);
    return this.http.post(this.storeUrl, newstore,{headers:headers});
  }

  deletePhone(phoneModelId:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<void>(`${this.baseUrl}/${phoneModelId}`,{headers:headers});
  }

  deleteStore(storeId:number){
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`
    });
    return this.http.delete<void>(`${this.storeUrl}/${storeId}`,{headers:headers});
  }

  updatePhone(phoneModelId:number, phonename:string,producer:string,yearOfRelease:string,color:string,phonememory:string,chosenphoto:string,chosenstore:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
      const updateData = {
        name: phonename,
        producer: producer,
        year: Number(yearOfRelease),
        color: color,
        memory: Number(phonememory),
        photo: chosenphoto,
        store:Number(chosenstore)
      };
      return this.http.put<any>(`${this.baseUrl}/${phoneModelId}`, updateData,{headers:headers})
  }

  sortelements(sorttype:boolean){
    // if(sorttype)
    //   this.phoneModelsList=this.phoneModelsList.sort((a,b)=> b.name.localeCompare(a.name));
    // else
    // this.phoneModelsList=this.phoneModelsList.sort((a,b)=>  a.name.localeCompare(b.name));
  }

  // updateServiceList(phoneModelList:PhoneModel[])
  // {
  //   this.phoneModelsList=phoneModelList;
  // }

  // getServiceList() : PhoneModel[]
  // {
  //   return this.phoneModelsList;
  // }

  getPhonesByStore(id:number): Observable<PhoneModel[]>
  {
    return this.http.get<PhoneModel[]>(this.baseUrl+'/store/'+id);
  }


  addPendingOperation(opname: string, val: any)
  {
    this.pendingoperations.push({key: opname,value:val});
  }

  executePendingOperations()
  {
    var listToSync: PhoneModel[]=[];
    while(this.pendingoperations.length>0)
    {
      var op=this.pendingoperations.shift();
      console.log(op);
      if(op?.key=='add')
      {
        listToSync.push(op.value);
      }
      if(op?.key=='del')
      {
        const index=listToSync.findIndex(elem => elem.id===Number(op?.value));
        listToSync.splice(index+1,1);
      }
    }
    while(listToSync.length>0)
    {
      var newelem=listToSync.shift();
      if(newelem)
        this.http.post(this.baseUrl, newelem).subscribe();
    }
  }

  setToken(token:any)
  {
    this.token=token;
  }
}
