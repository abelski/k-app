import { Component } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { Router } from '@angular/router';
import Globals = require('../globals');
import { User } from '../domain/user';
import { Vacation } from '../domain/vacation';
import { ProfileService } from './profile.service';
import { VacationStatus } from '../domain/enums/vacation-status';

declare var $: any;

@Component({
    //selector: 'header-login',
    templateUrl: 'app/profile/profile.template.html',
    providers: [RegistrationService, ProfileService]
})

export class ProfileComponent {
    private user: User;
    private authenticated: boolean = false;
    private isMyProfile = false;
    private activeVacation: Vacation[];
    private pastVacation: Vacation[];
    private ownedVacation: Vacation[];
    private monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    constructor(private registrationService: RegistrationService, private router: Router, private profileService: ProfileService) {
        router.events.subscribe((val) => this.initProfileView());
        this.user = Globals.userInfo;
        this.profileService.getActiveVacations(this.user.id)
            .subscribe(vacs => {
                this.activeVacation = vacs.filter(vac => vac.status === VacationStatus.OPEN)
            });

        this.profileService.getPastVacations(this.user.id)
            .subscribe(vacs => {
                this.pastVacation = vacs.filter(vac => vac.status === VacationStatus.CLOSED)
            });

        this.profileService.getOwnedVacations(this.user.id).subscribe(vacs => this.ownedVacation = vacs);
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
        } else if (id === "birth") {
            this.user.birth = inputValue;
        } else if (id === "region") {
            this.user.region = inputValue;
        }

        // TODO update user on server

        $('i.' + value.id).hide();
    }

    getMonthName(monthNum) {
        return this.monthNames[monthNum];
    }
}