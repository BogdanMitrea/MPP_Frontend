import { Injectable } from '@angular/core';
import { PhoneModel } from './phone-model';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  protected phoneModelsList: PhoneModel[]=[
    {
      id: 1,
      name: "iPhone 15",
      producer: "Apple",
      year: 2023,
      color: "Black",
      memory: 128,
      photo: "./assets/iphone13.jpg"
  },
  {
      id: 2,
      name: "Galaxy S21",
      producer: "Samsung",
      year: 2021,
      color: "Phantom Gray",
      memory: 256,
      photo:"./assets/s21.jpg"
  },
  {
      id: 3,
      name: "Huawei P50",
      producer: "Huawei",
      year: 2022,
      color: "Blue",
      memory: 128,
      photo:"./assets/huaweip50.jpg"
  },
  {
      id: 4,
      name: "OnePlus 9 Pro",
      producer: "OnePlus",
      year: 2020,
      color: "Morning Mist",
      memory: 256,
      photo:"./assets/oneplus9.jpg"
  },
  {
      id: 5,
      name: "Xperia 1 III",
      producer: "Sony",
      year: 2021,
      color: "Frosted Black",
      memory: 256,
      photo:"./assets/xperia1.jpg"
  }
  ];
  constructor() { }

  getAllPhones(): PhoneModel[] {
    return this.phoneModelsList;
  }

  getAllPhonesNames(): String[] {
    return this.phoneModelsList.map(phone => phone.name);
  }

  getPhoneById(id:number): PhoneModel | undefined{
    return this.phoneModelsList.find(PhoneModel => PhoneModel.id===id);
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

      this.phoneModelsList.push({id: this.getMaxId()+1,
        name: phonename,
        producer: producer,
        year: Number(yearOfRelease),
        color: color,
        memory: Number(phonememory),
        photo:chosenphoto})
  }

  deletePhone(phoneModelId:number){
    const index = this.phoneModelsList.findIndex(item => item.id === phoneModelId);
    if (index !== -1) {
      this.phoneModelsList.splice(index, 1);
    }
  }

  updatePhone(phoneModelId:number, phonename:string,producer:string,yearOfRelease:string,color:string,phonememory:string,chosenphoto:string){
    const index = this.phoneModelsList.findIndex(item => item.id === phoneModelId);
    if (index !== -1) {
        this.phoneModelsList[index].name = phonename;
        this.phoneModelsList[index].producer = producer;
        this.phoneModelsList[index].year = Number(yearOfRelease);
        this.phoneModelsList[index].color = color;
        this.phoneModelsList[index].memory = Number(phonememory);
        this.phoneModelsList[index].photo = chosenphoto;
    } else {
        console.error('Phone model not found for update');
    }
  }

  sortelements(sorttype:boolean){
    // if(sorttype)
    //   this.phoneModelsList=this.phoneModelsList.sort((a,b)=> b.year-a.year);
    // else
    // this.phoneModelsList=this.phoneModelsList.sort((a,b)=> a.year-b.year);

    if(sorttype)
      this.phoneModelsList=this.phoneModelsList.sort((a,b)=> b.name.localeCompare(a.name));
    else
    this.phoneModelsList=this.phoneModelsList.sort((a,b)=>  a.name.localeCompare(b.name));
  }
}
