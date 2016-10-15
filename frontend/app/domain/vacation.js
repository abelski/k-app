"use strict";
var Vacation = (function () {
    function Vacation(owner, members, title, description, beginDate, endDate, tags, estimatedCost, minMembers, status, plannedActivities, comments, gallery, titleImg, //change to Image,
        days, transoprt, departureCountry, targetCountry, targetCity, id) {
        this.owner = owner;
        this.members = members;
        this.title = title;
        this.description = description;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.tags = tags;
        this.estimatedCost = estimatedCost;
        this.minMembers = minMembers;
        this.status = status;
        this.plannedActivities = plannedActivities;
        this.comments = comments;
        this.gallery = gallery;
        this.titleImg = titleImg;
        this.days = days;
        this.transoprt = transoprt;
        this.departureCountry = departureCountry;
        this.targetCountry = targetCountry;
        this.targetCity = targetCity;
        this.id = id;
    }
    return Vacation;
}());
exports.Vacation = Vacation;
//# sourceMappingURL=vacation.js.map