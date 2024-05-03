import { Routes } from "@angular/router";
import { PhoneComponent } from "./phone/phone.component";
import { DetailsComponent } from "./details/details.component";
import { PhonesbystoreComponent } from "./phonesbystore/phonesbystore.component";

const routeConfig: Routes=[
    {
        path: '',
        component: PhoneComponent,
        title: 'Home Page'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page'
    },
    {
        path: 'phonesbystore/:id',
        component: PhonesbystoreComponent,
        title: 'Store Page'
    }
]

export default routeConfig;