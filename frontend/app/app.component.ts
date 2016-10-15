import { Component, ModuleWithProviders } from "@angular/core";
import { VacationCartComponent } from "./feed/vacation/vacation-cart.component";
import { AddVacationComponent } from "./add-vacation/add-vacation.component";
import { RegistrationFormComponent } from "./registration/registration.component";
import { ProfileComponent } from "./profile/profile.component";
import { WhatsupComponent } from "./whatsup/whatsup.component";
import { MyTravelComponent } from './my-travel/my-travel.component';
import { VacationDetailPageComponent } from './vacation-detail-page/vacation-detail-page.component';

import { Routes, RouterModule }   from '@angular/router';
import Globals = require('./globals');

const appRoutes = [
    { path: '', redirectTo: Globals.PATH_VACS, pathMatch: 'full'},
    { path: Globals.PATH_VACS, component: VacationCartComponent, useAsDefault: true},
    { path: Globals.PATH_VAC_ADD, component: AddVacationComponent},
    { path: Globals.PATH_VAC_EDIT + '/:id', component: AddVacationComponent},
    { path: Globals.PATH_MY_TRAVEL, component: MyTravelComponent },
    { path: Globals.PATH_USER_PROFILE + '/:id', component: ProfileComponent },
    { path: Globals.PATH_MY_PROFILE, component: ProfileComponent },
    { path: Globals.PATH_VACS + '/:id', component: VacationDetailPageComponent },
    { path: Globals.PATH_WHATSUP, component: WhatsupComponent }
];

@Component({
    selector: "app",
    templateUrl: "app/app.template.html"
})

export class AppComponent {

}

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
