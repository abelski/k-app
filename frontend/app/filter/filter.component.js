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
var filter_service_1 = require('../filter/filter.service');
var vacation_service_1 = require('../feed/vacation/vacation.service');
var FilterComponent = (function () {
    function FilterComponent(filterService) {
        this.filterService = filterService;
        this.filterTags = [];
        this.isChanged = false;
    }
    FilterComponent.prototype.ngOnInit = function () { };
    FilterComponent.prototype.ngAfterViewInit = function () {
        $('#filterDatepicker').uui_datepicker({ todayHighlight: true });
        $('#filterDatepicker').uui_datepicker({
            format: "dd/mm/yyyy"
        }).on('change', function () {
            $('.datepicker-dropdown').hide();
        });
        $('.selectpicker').selectpicker();
        $('#filterDatepicker input').uui_datepicker()
            .on('change', function (dateText, inst) {
            this.beginDate = $(this).uui_datepicker('getDate'); //the getDate method
            console.log(this.beginDate);
        });
    };
    FilterComponent.prototype.ngDoCheck = function () {
        if (filter_service_1.FilterService.isChanged) {
            this.filterTags = filter_service_1.FilterService.filterTags;
            filter_service_1.FilterService.isChanged = false;
        }
    };
    FilterComponent.prototype.onChange = function (value) {
        // console.log(value);
    };
    FilterComponent.prototype.dateFilter = function () {
        // console.log(this.beginDate);
    };
    FilterComponent.prototype.deleteFilterTag = function (tagText) {
        var index = filter_service_1.FilterService.filterTags.indexOf(tagText);
        if (index >= 0) {
            console.log("delete");
            filter_service_1.FilterService.filterTags.splice(index, 1);
        }
        this.filterTags = filter_service_1.FilterService.filterTags;
        vacation_service_1.VacationService.vacations = this.filterService.getVacationsByTag();
        filter_service_1.FilterService.isChanged = true;
        if (this.filterTags.length === 0) {
            $('.sub-menu').click();
        }
    };
    FilterComponent = __decorate([
        core_1.Component({
            selector: 'filter',
            templateUrl: 'app/filter/filter.template.html',
            providers: [filter_service_1.FilterService]
        }), 
        __metadata('design:paramtypes', [filter_service_1.FilterService])
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
//# sourceMappingURL=filter.component.js.map