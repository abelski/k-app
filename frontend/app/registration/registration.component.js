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
var registration_service_1 = require('./registration.service');
var RegistrationFormComponent = (function () {
    function RegistrationFormComponent(registrationService) {
        this.registrationService = registrationService;
    }
    RegistrationFormComponent.prototype.doRegistration = function (value) {
        // this.result =  this.registrationService.register(value);
        // JSON.stringify(this.result);
    };
    RegistrationFormComponent = __decorate([
        core_1.Component({
            selector: 'registration-form',
            templateUrl: 'app/registration/registration.template.html',
            providers: [registration_service_1.RegistrationService]
        }), 
        __metadata('design:paramtypes', [registration_service_1.RegistrationService])
    ], RegistrationFormComponent);
    return RegistrationFormComponent;
}());
exports.RegistrationFormComponent = RegistrationFormComponent;
//# sourceMappingURL=registration.component.js.map