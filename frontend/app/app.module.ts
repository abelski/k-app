import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent, routing, appRoutingProviders }  from './app.component';
import { RegistrationFormComponent } from './registration/registration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { OAuthService } from "angular2-oauth2/oauth-service";
import { VacationCartComponent } from "./feed/vacation/vacation-cart.component";
import {WindowService} from "./registration/window.service";
import { FooterComponent } from "./footer/main-footer.component";
import { UserPickerComponent } from "./user-picker/user-picker.component";
import { VacationDetailPageComponent } from './vacation-detail-page/vacation-detail-page.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { FilterComponent } from './filter/filter.component';
import { HashTagComponent } from './hash-tag/hash-tag.component';
import { PlaceTagComponent } from './place-tag/place-tag.component';
import { WhatsupComponent } from './whatsup/whatsup.component';
import { MyTravelComponent } from './my-travel/my-travel.component';
import { VacationService } from './feed/vacation/vacation.service';
import { FilterService } from './filter/filter.service';
import { UserService } from './user-picker/user.service';


@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
],
  declarations: [ AppComponent, VacationCartComponent, SidebarComponent, HeaderComponent, ProfileComponent, FooterComponent, VacationDetailPageComponent,
      UserPickerComponent, CommentComponent, AddCommentComponent, FilterComponent, HashTagComponent, PlaceTagComponent, WhatsupComponent, MyTravelComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ OAuthService, WindowService, appRoutingProviders, VacationService, FilterService, FilterComponent, UserService ]
})
export class AppModule { }
