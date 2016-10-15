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
var vacation_1 = require('../domain/vacation');
var registration_service_1 = require('../registration/registration.service');
var comment_1 = require('../domain/comment');
var comment_service_1 = require('../comment/comment.service');
var Globals = require('../globals');
var AddCommentComponent = (function () {
    function AddCommentComponent(registrationService, commentService) {
        this.registrationService = registrationService;
        this.commentService = commentService;
        // delete when registered user will be converted in object
        this.currentUser = Globals.userInfo;
    }
    AddCommentComponent.prototype.ngOnInit = function () { };
    AddCommentComponent.prototype.addComment = function (textComment) {
        var _this = this;
        if (textComment !== null && textComment !== "") {
            var comment = new comment_1.Comment("", this.currentUser, textComment);
            this.vacation.comments.push(comment);
            this.commentService.addComment(comment).
                subscribe(function (com) { return _this.vacation.comments.push(com); });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', vacation_1.Vacation)
    ], AddCommentComponent.prototype, "vacation", void 0);
    AddCommentComponent = __decorate([
        core_1.Component({
            selector: 'add-comment',
            templateUrl: 'app/add-comment/add-comment.template.html',
            providers: [registration_service_1.RegistrationService, comment_service_1.CommentService]
        }), 
        __metadata('design:paramtypes', [registration_service_1.RegistrationService, comment_service_1.CommentService])
    ], AddCommentComponent);
    return AddCommentComponent;
}());
exports.AddCommentComponent = AddCommentComponent;
//# sourceMappingURL=add-comment.component.js.map