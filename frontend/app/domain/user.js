"use strict";
var User = (function () {
    function User(firstName, lastName, gender, birth, region, skype, phone, avatar) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birth = birth;
        this.region = region;
        this.skype = skype;
        this.phone = phone;
        this.avatar = avatar;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map