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
var tag_1 = require('../domain/tag');
var HashTagComponent = (function () {
    function HashTagComponent(ref) {
        this.ref = ref;
        this.colorClass = "";
    }
    HashTagComponent.prototype.ngAfterViewInit = function () {
        this.colorClass = color_util_1.ColorUtil.getColorClass(this.tag.name);
        this.ref.detectChanges();
    };
    __decorate([
        core_1.Input('tag'), 
        __metadata('design:type', tag_1.Tag)
    ], HashTagComponent.prototype, "tag", void 0);
    HashTagComponent = __decorate([
        core_1.Component({
            selector: 'hash-tag',
            templateUrl: 'app/hash-tag/hash-tag.template.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], HashTagComponent);
    return HashTagComponent;
}());
exports.HashTagComponent = HashTagComponent;
//# sourceMappingURL=hash-tag.component.js.map