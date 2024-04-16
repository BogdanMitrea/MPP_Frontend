import { Injectable,inject } from '@angular/core';
import { PhoneModel } from './phone-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Console } from 'console';
import { Observable, catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private ipaddr='192.168.1.130'; 
  private baseUrl = 'https://'+'localhost'+':7245/api/Phone';
  protected phoneModelsList: PhoneModel[] = [];
  constructor(private http : HttpClient) {
    
  }

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
    // phones.subscribe(
    //   (phoneslist: PhoneModel[]) => {
    //     console.log(phoneslist);
    //     this.phoneModelsList = phoneslist;
    //   },
    //   () => {
    //     console.error('Error fetching phones:');
    //   }
    // );
    return phones;
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

  getMaxId(): number {
    let maxId = 0;
    for (const element of this.phoneModelsList) {
      if (element.id > maxId) {
        maxId = element.id;
      }
    }
    return maxId;
  }

  AddNewPhone(phonename:string,producer:string,yearOfRelease:string,color:string,phonememory:string,chosenphoto:string){
    const newphone = {
      id: 0,
      name: phonename,
      producer: producer,
      year: Number(yearOfRelease),
      color: color,
      memory: Number(phonememory),
      photo: chosenphoto
    };
    
    return this.http.post(this.baseUrl, newphone)
  }

  deletePhone(phoneModelId:number){
    return this.http.delete<void>(`${this.baseUrl}/${phoneModelId}`);
  }

  updatePhone(phoneModelId:number, phonename:string,producer:string,yearOfRelease:string,color:string,phonememory:string,chosenphoto:string){
    // const index = this.phoneModelsList.findIndex(item => item.id === phoneModelId);
    // if (index !== -1) {
      const updateData = {
        name: phonename,
        producer: producer,
        year: Number(yearOfRelease),
        color: color,
        memory: Number(phonememory),
        photo: chosenphoto
      };
      return this.http.put<any>(`${this.baseUrl}/${phoneModelId}`, updateData)
    //   .subscribe(response => {
    //     console.log('Phone Updated:', response);
    //     this.phoneModelsList[index].name = phonename;
    //     this.phoneModelsList[index].producer = producer;
    //     this.phoneModelsList[index].year = Number(yearOfRelease);
    //     this.phoneModelsList[index].color = color;
    //     this.phoneModelsList[index].memory = Number(phonememory);
    //     this.phoneModelsList[index].photo = chosenphoto;
    //   }, error => {
    //     console.error('Error updating the phone:', error);
    //   });
    // } else {
    //     console.error('Phone model not found for update');
    // }
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
}
