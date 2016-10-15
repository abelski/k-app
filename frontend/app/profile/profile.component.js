"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var registration_service_1 = require('../registration/registration.service');
var router_1 = require('@angular/router');
var Globals = require('../globals');
var ProfileComponent = (function () {
    function ProfileComponent(registrationService, router) {
        var _this = this;
        this.registrationService = registrationService;
        this.router = router;
        this.authenticated = false;
        this.isMyProfile = false;
        router.events.subscribe(function (val) { return _this.initProfileView(); });
        this.user = Globals.userInfo;
    }
    ProfileComponent.prototype.ngAfterViewInit = function () {
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
    };
    ProfileComponent.prototype.initProfileView = function () {
        var user = this.registrationService.tryLogin();
        this.isMyProfile = this.router.url.indexOf(Globals.PATH_MY_PROFILE) > -1;
        if (this.isMyProfile) {
            if (!user) {
                this.router.navigate(["/"]);
            }
            else {
                this.authenticated = true;
                this.user = user;
            }
        }
        else {
        }
    };
    ProfileComponent.prototype.resizeImageUrl = function (str, size) {
        return str.replace(/\?sz=\d+/g, "?sz=" + size);
    };
    ProfileComponent.prototype.onFocus = function (value) {
        $('i.' + value).show();
    };
    ProfileComponent.prototype.onBlur = function (value) {
        var id = value.id;
        var inputValue = value.value;
        if (id === "gender") {
            this.user.gender = inputValue;
        }
        else if (id === "birth") {
            this.user.birth = inputValue;
        }
        else if (id === "region") {
            this.user.region = inputValue;
        }
        // TODO update user on server
        $('i.' + value.id).hide();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            //selector: 'header-login',
            templateUrl: 'app/profile/profile.template.html',
            providers: [registration_service_1.RegistrationService]
        }), 
        __metadata('design:paramtypes', [registration_service_1.RegistrationService, router_1.Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map