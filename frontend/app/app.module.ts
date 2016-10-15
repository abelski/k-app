import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent, routing, appRoutingProviders }  from './app.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
],
  declarations: [ AppComponent
//   , VacationCartComponent, SidebarComponent, HeaderComponent, ProfileComponent, FooterComponent, VacationDetailPageComponent,
    //   UserPickerComponent, CommentComponent, AddCommentComponent, FilterComponent, HashTagComponent, WhatsupComponent, MyTravelComponent 
      ],
  bootstrap:    [ AppComponent ],
  providers:    [ appRoutingProviders, 
//   OAuthService, WindowService, VacationService, FilterService, FilterComponent, UserService 
  ]
})
export class AppModule { }