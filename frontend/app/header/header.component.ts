import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { RegistrationService } from '../registration/registration.service';
import { User } from '../domain/user';

declare var UUI: any;
declare var $: any;

@Component({
    selector: 'header-login',
    templateUrl: 'app/header/header.template.html',
    providers: [RegistrationService]
})

export class HeaderComponent {
    private user: User;
    private authInProgress: boolean = false;
    private authenticated: boolean = false;

    constructor(private registrationService: RegistrationService, private ref: ChangeDetectorRef) {
        this.registrationService.setListener(this);
    }

    startGoogleAuth() {
        this.authInProgress = true;
        this.registrationService.startGoogleAuth();
    }

    startYammerAuth() {
        this.authInProgress = true;
        this.registrationService.startYammerAuth();
    }

    logoutGoogle() {
        this.registrationService.doLogout();
        this.authenticated = false;
        this.user = null;
        return false;
    }

    onUserLogin(user: User) {
        if (!user) {
            // TODO handle if a case
            return;
        }
        this.user = user;
        this.authenticated = true;
        this.onUserRegister();
        this.ref.detectChanges();
    }

    onUserRegister() {
        if (this.authInProgress) {
            this.authInProgress = false;
            $("#loginDialog .close").trigger("click");
        }
    }

    ngAfterViewInit() {
        UUI.Header_Tools.init();

        let user = this.registrationService.tryLogin();
        this.onUserLogin(user);
    }
}

/*
{
    "kind":"plus#person",
    "etag":"\"xw0en60W6-NurXn4VBU-CMjSPEw/y94uXrhVwFkI8XQxnu_rVuN3X4k\"",
    "gender":"male",
    "objectType":"person",
    "id":"117000538289220516067",
    "displayName":"Егор Фролов",
    "name":{
        "familyName":"Фролов",
        "givenName":"Егор"
    },
    "url":"https://plus.google.com/117000538289220516067",
    "image":{
        "url":"https://lh5.googleusercontent.com/-I0wwBw5zi_w/AAAAAAAAAAI/AAAAAAAADXI/YVedgBlyWDw/photo.jpg?sz=50",
        "isDefault":false
    },
    "placesLived":[{"value":"Гомель"}],
    "isPlusUser":true,
    "language":"ru",
    "circledByCount":8,
    "verified":false,
    "cover":{"layout":"banner","coverPhoto":{"url":"https://lh3.googleusercontent.com/6gsqFS0yW1Z4g9Dywq-xGrggr78J2B-yEYcsWs4xCCNIltECBdUH9PVaijDyAl8svjrfpHJ3=s630-fcrop64=1,00000000ffffffff","height":530,"width":940},"coverInfo":{"topImageOffset":0,"leftImageOffset":0}}
}
*/