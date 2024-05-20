import { Component} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PhoneComponent } from './phone/phone.component';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PhoneComponent,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  constructor() {}
  title = 'my-angular-app';
}
