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
var router_1 = require('@angular/router');
var vacation_service_1 = require('../feed/vacation/vacation.service');
var Globals = require('../globals');
var VacationDetailPageComponent = (function () {
    //    private place = {
    //        country: {name: "Germany"},
    //        city: {name: "Dortmund"},
    //    }
    function VacationDetailPageComponent(vacationService, route, router) {
        this.vacationService = vacationService;
        this.route = route;
        this.router = router;
        this.isInVac = false;
        this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.currentUser = Globals.userInfo;
    }
    VacationDetailPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.vacationService.getVacation(id)
                .subscribe(function (vac) {
                _this.vacation = vac;
                setTimeout(function () {
                    $("#vac-carousel .carousel-indicators li").each(function (index) {
                        $(this).attr("data-slide-to", index);
                        console.log(index);
                    });
                }, 50);
            });
        });
    };
    VacationDetailPageComponent.prototype.askToInvite = function () {
        this.isInVac = this.vacation.members.includes(this.currentUser);
        if (!this.isInVac) {
            this.vacationService.addMember(this.vacation.id, this.currentUser);
            this.vacation.members.push(this.currentUser);
            this.isInVac = true;
        }
    };
    VacationDetailPageComponent.prototype.getMonthName = function (monthNum) {
        return this.monthNames[monthNum];
    };
    VacationDetailPageComponent = __decorate([
        core_1.Component({
            selector: 'vdp',
            templateUrl: 'app/vacation-detail-page/vacation-detail-page.template.html',
            providers: [vacation_service_1.VacationService]
        }), 
        __metadata('design:paramtypes', [vacation_service_1.VacationService, router_1.ActivatedRoute, router_1.Router])
    ], VacationDetailPageComponent);
    return VacationDetailPageComponent;
}());
exports.VacationDetailPageComponent = VacationDetailPageComponent;
//# sourceMappingURL=vacation-detail-page.component.js.map