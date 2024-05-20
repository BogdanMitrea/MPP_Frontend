import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  authService: AuthService = inject(AuthService);

  constructor(private router: Router) { }

  loginForm = {
    username: '',
    password: ''
  };

  registerForm = {
    username: '',
    usermail: '',
    password: '',
  };

  showRegisterForm = false;

  login() {
    this.authService.login(this.loginForm.username ?? '',this.loginForm.password?? '').subscribe(
      () => {
        this.router.navigate(['home']);
        this.authService.setIsAuthenticated(true);
      },
      error => {
        console.error('Login failed:', error);
        this.authService.setIsAuthenticated(true);
      }
    );
    
  }

  register() {
    this.authService.register(this.registerForm.usermail?? '',this.registerForm.username ?? '',this.registerForm.password?? '').subscribe(
      () => {
        this.showRegisterForm = !this.showRegisterForm;
      },
      error => {
        console.error('Register failed:', error);
      }
    );
  }

  toggleForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }
}
