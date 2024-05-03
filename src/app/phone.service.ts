import { Injectable,inject } from '@angular/core';
import { PhoneModel } from './phone-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Console } from 'console';
import { Observable, catchError, map, of } from 'rxjs';
import { Store } from '../store';


@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private ipaddr='192.168.1.130'; 
  private baseUrl = 'https://'+'localhost'+':7061/api/Phone';
  private storeUrl = 'https://localhost:7061/api/Store';
  protected phoneModelsList: PhoneModel[] = [];
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
    console.log("Fetching");
    var phones = this.http.get<PhoneModel[]>(this.baseUrl);
    return phones;
  }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.storeUrl);
  }

  getPhonesList() : PhoneModel[]{
    return this.phoneModelsList;
  }

  getURL()
  {
    return this.baseUrl;
  }

  getAllPhonesNames(): String[] {
    return this.phoneModelsList.map(phone => phone.name);
  }

  async getPhoneById(id:number): Promise<PhoneModel | undefined>{
    const data=await fetch(`${this.baseUrl}/${id}`);
    return await data.json() ?? {};
  }

  async getStoreById(id:number): Promise<Store | undefined>{
    const data=await fetch(`${this.storeUrl}/${id}`);
    return await data.json() ?? {};
  }

  getMaxId(): number {
    let maxId = 0;
    for (const element of this.phoneModelsList) {
      if (element.id > maxId) {
        maxId = element.id;
      }
    }
    return maxId;
  }

  AddNewPhone(phonename:string,producer:string,yearOfRelease:string,color:string,phonememory:string,chosenphoto:string,chosenstore:string){
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
    
    return this.http.post(this.baseUrl, newphone)
  }

  AddNewStore(storename:string,){
    const newstore = {
      id: 0,
      name: storename,
    };
    console.log(newstore);
    return this.http.post(this.storeUrl, newstore);
  }

  deletePhone(phoneModelId:number){
    return this.http.delete<void>(`${this.baseUrl}/${phoneModelId}`);
  }

  deleteStore(storeId:number){
    return this.http.delete<void>(`${this.storeUrl}/${storeId}`);
  }

  updatePhone(phoneModelId:number, phonename:string,producer:string,yearOfRelease:string,color:string,phonememory:string,chosenphoto:string,chosenstore:string){
      const updateData = {
        name: phonename,
        producer: producer,
        year: Number(yearOfRelease),
        color: color,
        memory: Number(phonememory),
        photo: chosenphoto,
        store:Number(chosenstore)
      };
      return this.http.put<any>(`${this.baseUrl}/${phoneModelId}`, updateData)
  }

  sortelements(sorttype:boolean){
    if(sorttype)
      this.phoneModelsList=this.phoneModelsList.sort((a,b)=> b.name.localeCompare(a.name));
    else
    this.phoneModelsList=this.phoneModelsList.sort((a,b)=>  a.name.localeCompare(b.name));
  }

  updateServiceList(phoneModelList:PhoneModel[])
  {
    this.phoneModelsList=phoneModelList;
  }

  getServiceList() : PhoneModel[]
  {
    return this.phoneModelsList;
  }

  getPhonesByStore(id:number): Observable<PhoneModel[]>
  {
    return this.http.get<PhoneModel[]>(this.baseUrl+'/store/'+id);
  }

}
