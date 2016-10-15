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
var vacation_service_1 = require('./vacation.service');
var filter_service_1 = require('../../filter/filter.service');
var VacationCartComponent = (function () {
    function VacationCartComponent(vacationService, router, filterService) {
        this.vacationService = vacationService;
        this.router = router;
        this.filterService = filterService;
        this.vacations = null;
        this.errorMsg = null;
        this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }
    VacationCartComponent.prototype.ngAfterViewInit = function () {
        this.getVacations();
        $('.sub-menu').click(function () {
            $(this).data('clicked', !$(this).data('clicked'));
        });
        componentHandler.upgradeElement(document.getElementById("addVacFAB"));
    };
    VacationCartComponent.prototype.ngDoCheck = function () {
        if (filter_service_1.FilterService.isChanged) {
            this.getVacations();
        }
    };
    VacationCartComponent.prototype.getVacations = function () {
        if (filter_service_1.FilterService.filterTags.length > 0) {
            console.log("have a filter");
            vacation_service_1.VacationService.vacations = this.filterService.getVacationsByTag();
            this.vacations = vacation_service_1.VacationService.vacations;
        }
        else {
            console.log("haven't a filter");
            vacation_service_1.VacationService.vacations = this.vacationService.getVacations();
            this.vacations = vacation_service_1.VacationService.vacations;
        }
    };
    VacationCartComponent.prototype.gotoDetail = function (vacation) {
        this.router.navigate(['/vacations', vacation.id]);
    };
    VacationCartComponent.prototype.onClickVacTag = function (tagText) {
        if (!$('.sub-menu').data('clicked')) {
            $('.sub-menu').click();
        }
        filter_service_1.FilterService.filterTags.push(tagText);
        filter_service_1.FilterService.isChanged = true;
        this.getVacations();
    };
    VacationCartComponent.prototype.getMonthName = function (monthNum) {
        return this.monthNames[monthNum];
    };
    VacationCartComponent = __decorate([
        core_1.Component({
            selector: 'vacation-cart',
            templateUrl: 'app/feed/vacation/vacation-cart.template.html'
        }), 
        __metadata('design:paramtypes', [vacation_service_1.VacationService, router_1.Router, filter_service_1.FilterService])
    ], VacationCartComponent);
    return VacationCartComponent;
}());
exports.VacationCartComponent = VacationCartComponent;
//# sourceMappingURL=vacation-cart.component.js.map