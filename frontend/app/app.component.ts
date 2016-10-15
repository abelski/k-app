import { Component, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule }   from '@angular/router';
import { VacationCartComponent } from "./feed/vacation/vacation-cart.component";

import Globals = require('./globals');

const appRoutes = [
    { path: '', redirectTo: Globals.PATH_VACS, pathMatch: 'full'},
    { path: Globals.PATH_VACS, component: VacationCartComponent, useAsDefault: true},
    // { path: Globals.PATH_VAC_ADD, component: AddVacationComponent},
    // { path: Globals.PATH_VAC_EDIT + '/:id', component: AddVacationComponent},
    // { path: Globals.PATH_MY_TRAVEL, component: MyTravelComponent },
    // { path: Globals.PATH_USER_PROFILE + '/:id', component: ProfileComponent },
    // { path: Globals.PATH_MY_PROFILE, component: ProfileComponent },
    // { path: Globals.PATH_VACS + '/:id', component: VacationDetailPageComponent },
    // { path: Globals.PATH_WHATSUP, component: WhatsupComponent }
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