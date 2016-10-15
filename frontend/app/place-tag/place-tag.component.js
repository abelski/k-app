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
var color_util_1 = require('../utils/color.util');
var PlaceTagComponent = (function () {
    function PlaceTagComponent(ref) {
        this.ref = ref;
        this.colorClass = "";
    }
    PlaceTagComponent.prototype.ngAfterViewInit = function () {
        this.textMsg = this.place.country.name + ", " + this.place.city.name;
        this.colorClass = color_util_1.ColorUtil.getColorClass(this.textMsg);
        this.ref.detectChanges();
    };
    __decorate([
        core_1.Input('place'), 
        __metadata('design:type', Object)
    ], PlaceTagComponent.prototype, "place", void 0);
    PlaceTagComponent = __decorate([
        core_1.Component({
            selector: 'place-tag',
            templateUrl: 'app/place-tag/place-tag.template.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], PlaceTagComponent);
    return PlaceTagComponent;
}());
exports.PlaceTagComponent = PlaceTagComponent;
//# sourceMappingURL=place-tag.component.js.map