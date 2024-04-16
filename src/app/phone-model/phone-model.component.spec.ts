import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneService } from '../phone.service';
import { PhoneModelComponent } from './phone-model.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhoneModel } from '../phone-model';

describe('PhoneModelComponent', () => {
  let component: PhoneModelComponent;
  let fixture: ComponentFixture<PhoneModelComponent>;

  const mockPhoneModel: PhoneModel = {
    id:1,
    name:"Phone",
    producer:"Apple",
    memory:20,
    year:22,
    color:"black",
    photo:"none",
    
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneModelComponent,ReactiveFormsModule,RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: PhoneService, useValue: mockPhoneModel }]
    }).compileComponents();
  });

  beforeEach(() => {
    // fixture = TestBed.createComponent(PhoneModelComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    
  });
});
