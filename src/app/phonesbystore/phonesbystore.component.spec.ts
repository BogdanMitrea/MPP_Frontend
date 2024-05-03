import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesbystoreComponent } from './phonesbystore.component';

describe('PhonesbystoreComponent', () => {
  let component: PhonesbystoreComponent;
  let fixture: ComponentFixture<PhonesbystoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhonesbystoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhonesbystoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
