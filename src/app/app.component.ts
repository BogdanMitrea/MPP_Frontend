import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PhoneComponent } from './phone/phone.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PhoneComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
}
