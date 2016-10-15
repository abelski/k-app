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
var url_util_1 = require('../utils/url.util');
var Observable_1 = require('rxjs/Observable');
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
    }
    ProfileService.prototype.getActiveVacations = function (userId) {
        return this.http.get(url_util_1.UrlUtil.GET_ACTIVE_VACATION + userId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProfileService.prototype.getPastVacations = function (userId) {
        return this.http.get(url_util_1.UrlUtil.GET_ACTIVE_VACATION + userId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProfileService.prototype.getOwnedVacations = function (userId) {
        return this.http.get(url_util_1.UrlUtil.GET_OWNED_VACATION + userId + "/vacations")
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProfileService.prototype.extractData = function (res) {
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
    ProfileService.prototype.handleError = function (error) {
        // we might use a remote logging
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map