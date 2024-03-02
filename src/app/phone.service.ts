import { Injectable } from '@angular/core';
import { PhoneModel } from './phone-model';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  protected phoneModelsList: PhoneModel[]=[
    {
      id: 1,
      name: "iPhone 13",
      producer: "Apple",
      year: 2021,
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
      name: "Pixel 6",
      producer: "Google",
      year: 2021,
      color: "Sorta Sage",
      memory: 128,
      photo:"./assets/pixel6.jpg"
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

  getPhoneById(id:number): PhoneModel | undefined{
    return this.phoneModelsList.find(PhoneModel => PhoneModel.id===id);
  }
}
