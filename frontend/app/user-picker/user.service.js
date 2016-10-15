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
var url_util_1 = require('../utils/url.util');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAllUsers = function () {
        return this.http.get(url_util_1.UrlUtil.GET_ALL_USERS)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.getUserById = function (id) {
        return this.http.get(url_util_1.UrlUtil.GET_USER_BY_ID)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        var i = 0;
        var users = [];
        if (body.content) {
            console.log(body.content);
            // if response has more than one vac
            for (var _i = 0, _a = body.content; _i < _a.length; _i++) {
                var user = _a[_i];
                users.push(JSON.parse(JSON.stringify(user)));
            }
        }
        else {
            console.log(body);
            // if response has only one vac
            return body;
        }
        return users || {};
    };
    UserService.prototype.handleError = function (error) {
        // we might use a remote logging
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map