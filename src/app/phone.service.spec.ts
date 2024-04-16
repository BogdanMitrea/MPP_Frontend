import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PhoneService } from './phone.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PhoneService', () => {
  let service: PhoneService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PhoneService);
    providers: [PhoneService]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
