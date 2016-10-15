import { Component } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { Router }   from '@angular/router';
import Globals = require('../globals');
import { User } from '../domain/user';

declare var $: any;

@Component({
    //selector: 'header-login',
    templateUrl: 'app/profile/profile.template.html',
    providers: [RegistrationService]
})

export class ProfileComponent {
    private user: User;
    private authenticated: boolean = false;
    private isMyProfile = false;

    constructor(private registrationService: RegistrationService, private router: Router) {
        router.events.subscribe((val) => this.initProfileView());
        this.user = Globals.userInfo;
    }

    ngAfterViewInit() {
        this.initProfileView();

        $('#birth').uui_datepicker({ todayHighlight: true });
        $('.fileinput').fileinput();

        $('#birth').uui_datepicker({
            format: "dd/mm/yyyy"
        }).on('change', function () {
            $('.datepicker-dropdown').hide();
        });

        $("#vacationsList h2 a").click(function (event) {

            var blockId = $(this).attr("href");
            console.log(blockId);
            $(".vacs-wrapper").hide();
            $(blockId).show();
            $("#vacationsList h2 a").removeClass("active");
            $(this).addClass("active");

            event.preventDefault();
            return false;
        });

        $("#vacationsList h2 a[href='#vacs-active']").trigger("click");
    }

    private initProfileView() {
        let user: User = this.registrationService.tryLogin();
        this.isMyProfile = this.router.url.indexOf(Globals.PATH_MY_PROFILE) > -1;
        if (this.isMyProfile) {
            if (!user) {
                this.router.navigate(["/"]);
            } else {
                this.authenticated = true;
                this.user = user;
            }
        } else {
            // load user data here
        }
    }

    private resizeImageUrl(str: string, size: number) {
        return str.replace(/\?sz=\d+/g, "?sz=" + size);
    }

    onFocus(value) {
        $('i.' + value).show();
    }

    onBlur(value) {
        let id = value.id;
        let inputValue = value.value;
        if (id === "gender") {
            this.user.gender = inputValue; 
        } else if (id === "birth"){
            this.user.birth = inputValue;
        } else if (id === "region") {
            this.user.region = inputValue;
        }

        // TODO update user on server

         $('i.' + value.id).hide();
    }
}