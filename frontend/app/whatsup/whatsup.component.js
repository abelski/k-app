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
var WhatsupComponent = (function () {
    function WhatsupComponent() {
        this.imgMinHeight = 50;
        this.imgMaxHeight = 350;
        this.instImages = [];
    }
    WhatsupComponent.prototype.ngAfterViewInit = function () {
        this.loadInstPictures("cheerleader");
    };
    WhatsupComponent.prototype.loadInstPictures = function (hashtag) {
        $("#insta-images .fa-spin").show();
        var that = this;
        $.get({
            url: "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?access_token=4027454714.8e6503f.c0dd220c575e4ad6bf6331e4cc22c914&callback=?",
            dataType: 'jsonp',
            success: function (data) {
                $("#insta-images .fa-spin").hide();
                data.data.forEach(function (obj, i) {
                    var url = obj.images.low_resolution.url;
                    if (that.instImages.indexOf(url) == -1) {
                        that.instImages.push(url);
                    }
                });
            }
        });
    };
    WhatsupComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/whatsup/whatsup.template.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], WhatsupComponent);
    return WhatsupComponent;
}());
exports.WhatsupComponent = WhatsupComponent;
//# sourceMappingURL=whatsup.component.js.map