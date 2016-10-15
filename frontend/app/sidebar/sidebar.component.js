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
var router_1 = require('@angular/router');
var Globals = require('../globals');
var SidebarComponent = (function () {
    function SidebarComponent(router) {
        this.router = router;
    }
    SidebarComponent.prototype.doSomthing = function (value) {
    };
    SidebarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        UUI.Sidebar.init({ open: true, animate: true });
        window.onbeforeunload = function () {
            console.log(window.location.href);
        };
        this.router.events.subscribe(function (val) {
            _this.showHide();
        });
    };
    SidebarComponent.prototype.showHide = function () {
        if (window.location.pathname == "/" + Globals.PATH_VACS) {
            $("#side-filter").show();
        }
        else {
            $("#side-filter").hide();
        }
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar',
            templateUrl: 'app/sidebar/sidebar.template.html',
            providers: [filter_service_1.FilterService]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map