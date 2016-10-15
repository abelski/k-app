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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var vacation_service_1 = require('../feed/vacation/vacation.service');
var url_util_1 = require('../utils/url.util');
var FilterService = (function () {
    function FilterService(http, vacationService) {
        this.http = http;
        this.vacationService = vacationService;
    }
    FilterService.prototype.getVacationsByTag = function () {
        var body = JSON.stringify(FilterService.filterTags);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // console.log(body);
        return this.http.post(url_util_1.UrlUtil.FILTER, '{ "tags":' + body + '}', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FilterService.prototype.extractData = function (res) {
        var body = res.json();
        var i = 0;
        var vacations = [];
        if (body.content) {
            // if response has more than one vac
            for (var _i = 0, _a = body.content; _i < _a.length; _i++) {
                var vac = _a[_i];
                vacations.push(JSON.parse(JSON.stringify(vac)));
            }
        }
        else {
            // if response has only one vac
            return body;
        }
        return vacations || {};
    };
    FilterService.prototype.handleError = function (error) {
        // we might use a remote logging
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    FilterService.filterTags = [];
    FilterService.isChanged = false;
    FilterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, vacation_service_1.VacationService])
    ], FilterService);
    return FilterService;
}());
exports.FilterService = FilterService;
//# sourceMappingURL=filter.service.js.map