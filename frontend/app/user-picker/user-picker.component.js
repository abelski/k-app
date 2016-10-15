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
var user_service_1 = require('./user.service');
var UserPickerComponent = (function () {
    function UserPickerComponent(userService) {
        var _this = this;
        this.userService = userService;
        // private userList = ["Aaron A. Aaronson", "Nima Laszlo", "Khalil Seachnall", "Platon I'timad", "Sakhr Ranulf", "Valentin Haroun",
        //     "Gallagher Baldur", "Jafar Aodhan", "Eyvindur Kajetan", "Einion Leary", "Augusto Kristof", "Nasir Miloslav", "Bearach Murchadh",
        //     "Fechin Darragh", "Dionisio Maximiliano", "Aracely Woerner", "Silvia Giehl", "Eugenia Houston", "Ofelia Ali", "Þordis Petocs", "Bergljot Hanigan",
        //     "Herodotus Adamsen", "Susann Danielsen", "Luciana Hummel", "Rasmus Hermansen", "Abraham Falk", "Theodoulos Steensen", "Grete Landvik", "Pomponia Carlson"];
        this.userList = [];
        this.userService.getAllUsers().subscribe(function (user) { return _this.userList.push(user); });
        // makes Case Insensitive 'contains'
        $.extend($.expr[":"], {
            "containsIN": function (elem, i, match, array) {
                return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
        });
    }
    UserPickerComponent.prototype.ngAfterViewInit = function () {
        $("#user-filter-input").bind("input", function () {
            var filterText = $(this).val();
            $(".user-pick-item").removeClass("hidden");
            $(".user-pick-item:not(:containsIN('" + filterText + "'))").addClass("hidden");
        });
        $(".user-pick-item").click(function () {
            $(this).toggleClass("selected");
        });
    };
    UserPickerComponent.prototype.init = function () {
        $("#user-filter-input").val("");
        $(".user-pick-item").removeClass("hidden");
    };
    UserPickerComponent = __decorate([
        core_1.Component({
            selector: 'user-picker',
            templateUrl: 'app/user-picker/user-picker.template.html',
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserPickerComponent);
    return UserPickerComponent;
}());
exports.UserPickerComponent = UserPickerComponent;
//# sourceMappingURL=user-picker.component.js.map