import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { HttpClientModule,HttpClient, provideHttpClient } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';

bootstrapApplication(AppComponent,{
  providers:[
    provideRouter(routeConfig),
    provideHttpClient(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
  ]
}).catch((err) => console.error(err));
