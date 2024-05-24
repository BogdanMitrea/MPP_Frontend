import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  login(username: string, password: string) {
    const newuser = {
      username:username,
      password:password,
      email:''
    };
    return this.http.post<any>('https://mppbackend-production-bec6.up.railway.app/api/Auth/login', newuser)
      .pipe(
        tap(response => {
          const token = response.token;
          localStorage.setItem('jwt_token', token);
        })
      );
  }

  register(usermail:string, username: string, password: string) {
    const newuser = {
      username:username,
      password:password,
      email:usermail
    };
    return this.http.post<any>('https://mppbackend-production-bec6.up.railway.app/api/Auth/register', newuser);    
  }

  logout() {
    console.log("logut");
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('jwt_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  setIsAuthenticated(newval:boolean){
    this.isAuthenticated=newval;
  }

}
