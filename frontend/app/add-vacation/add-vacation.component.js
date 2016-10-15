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
var registration_service_1 = require('../registration/registration.service');
var user_picker_component_1 = require("../user-picker/user-picker.component");
var router_1 = require('@angular/router');
var Globals = require('../globals');
var vacation_service_1 = require('../feed/vacation/vacation.service');
var vacation_1 = require('../domain/vacation');
var tag_1 = require('../domain/tag');
var image_1 = require('../domain/image');
var user_service_1 = require('../user-picker/user.service');
var vacation_status_1 = require('../domain/enums/vacation-status');
var AddVacationComponent = (function () {
    function AddVacationComponent(registrationService, router, userPickerComponent, vacationService, userService) {
        this.registrationService = registrationService;
        this.router = router;
        this.userPickerComponent = userPickerComponent;
        this.vacationService = vacationService;
        this.userService = userService;
        this.placeStyles = ["_fuchsia", "_red", "_orange", "_lime-green", "_blue", "_raspberry", "_violet", "_plum", "_indigo", "_blue_blue", "_green"];
        this.placesStore = {
            "Albania": ["Tirana"],
            "Belarus": ["Gomel", "Grodno", "Vitebsk", "Pruzhany"],
            "Belgium": ["Antverpen", "Brussel"],
            "Germany": ["Moenchengladbach", "Dortmund", "Koeln", "Munich", "Frankfutn-am-Oder"],
            "Poland": ["Warsaw", "Krakow", "Gdansk", "Bialystok"],
            "Russia": ["Pskov", "Tver", "Smolensk", "Riazan", "Yarolslavl"],
            "Spain": ["Cordova", "Valensia", "Barcelona", "Madrid"],
            "Turkey": ["Ankara", "Istanbul", "Genchler", "Diarbakyr"],
            "Ukraine": ["Harkiv", "Donetsk", "Odessa", "Kyiv", "Lviv", "Ivano-Frankovsk"],
            "United Kingdom": ["London", "Manchester", "Liverpool", "Newcastle", "Glasgow", "Edinburgh", "Cardiff", "Bristol"]
        };
        this.countries = [];
        this.cities = [];
        this.places = [];
        this.participants = [];
        this.ownerAdded = false;
        this.tagsStandard = ["Summer", "Eurotour", "Winter Sports", "Sightseeing", "Castles", "Wild Nature"];
        this.editMode = false;
        this.vacEdited = {};
        this.currentUser = Globals.userInfo;
        this.members = [];
        this.tags = [];
    }
    AddVacationComponent.prototype.ngAfterViewInit = function () {
        var that = this;
        $('#pickerDateRange').uui_datepicker({ todayHighlight: true });
        $('.fileinput').fileinput();
        $('#pickerDateRange').uui_datepicker({
            format: "dd/mm/yyyy"
        }).on('change', function () {
            $('.datepicker-dropdown').hide();
        });
        $('#pickerDateRange .beginDate')
            .on('change', function (dateText, inst) {
            var d = new Date();
            d = $(this).uui_datepicker('getDate');
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();
            that.beginDate = curr_year + "-" + ((curr_month < 10) ? "0" : "") + curr_month + "-" + ((curr_date < 10) ? "0" : "") + curr_date;
        });
        $('#pickerDateRange .endDate')
            .on('change', function (dateText, inst) {
            var d = new Date();
            d = $(this).uui_datepicker('getDate');
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();
            that.endDate = curr_year + "-" + ((curr_month < 10) ? "0" : "") + curr_month + "-" + ((curr_date < 10) ? "0" : "") + curr_date;
        });
        $('.selectpicker').selectpicker();
        this.loadCountriesList();
        // load cities
        $(".vac-form-table").on("change", "#countries-input", function (event) {
            var cntCode = that.countries[this.value];
            that.loadCitiesForCountry(cntCode);
        });
        $(".vac-form-table").on("change", "#cities-input", function (event) {
            if (!event.bubbles) {
                var placeName = $("#countries-input").val() + ", " + $("#cities-input").val();
                if (!that.places.includes(placeName)) {
                    $("#cities-input").removeClass("error");
                    that.places.push(placeName);
                    $("#cities-input").val("");
                }
                else {
                    $("#cities-input").addClass("error");
                }
            }
        });
        $("#tags-input").change(function () {
            var tag = new tag_1.Tag('', this.value);
            if (tag.name !== '' && !that.tags.includes(tag)) {
                that.tags.push(tag);
                this.value = '';
                $("#tags-input").removeClass("error");
            }
            else {
                $("#tags-input").addClass("error");
            }
        });
        // remove place
        $("#places-block").on("click", ".place .fa", function () {
            var cityView = $(this).closest(".place");
            var cityName = cityView.text().trim();
            that.places.splice(that.places.indexOf(cityName), 1);
        });
        // remove tag
        $("#tags-block").on("click", ".tag .fa", function () {
            var tagView = $(this).closest(".tag");
            var tagText = tagView.text().trim();
            that.tags.splice(that.tags.indexOf(tagText), 1);
        });
        // colorize places
        $("#places-block").on("DOMNodeInserted", ".place", function () {
            var place = this;
            setTimeout(function () {
                var placeContent = place.innerText;
                var magicNumber = 0;
                for (var i = 0; i < placeContent.length; i++) {
                    magicNumber += placeContent.charCodeAt(i);
                }
                var index = magicNumber % that.placeStyles.length;
                $(place).addClass(that.placeStyles[index]);
            }, 50);
        });
        // colorize tags
        $("#tags-block").on("DOMNodeInserted", ".tag", function () {
            var tag = this;
            setTimeout(function () {
                var tagText = tag.innerText;
                var magicNumber = 0;
                for (var i = 0; i < tagText.length; i++) {
                    magicNumber += tagText.charCodeAt(i);
                }
                var index = magicNumber % that.placeStyles.length;
                $(tag).addClass(that.placeStyles[index]);
            }, 50);
        });
        // remove participant
        $("#participants-block").on("click", ".participant .fa", function () {
            var prtView = $(this).closest(".participant");
            var prtName = prtView.text().trim();
            if (prtName == that.registrationService.getUserName()) {
                that.ownerAdded = false;
            }
            that.participants.splice(that.participants.indexOf(prtName), 1);
        });
        //this.initFormMode();
    };
    /*private initFormMode() {
        var path = window.location.pathname;
        if (path.indexOf(Globals.PATH_VAC_EDIT) > -1) {

            var vacId;
            var matched = path.match(new RegExp(Globals.PATH_VAC_EDIT + "/(\\d+)"));
            if (matched.length > 1) {
                vacId = matched[1];
                console.log("ID=" + vacId);
                this.editMode = true;
            } else {
                console.log("Could not parse URL to find ID: " + path);
                return;
            }

            // call sservice and get vac info
        }
    }*/
    AddVacationComponent.prototype.loadCountriesList = function () {
        var that = this;
        $("#countries-input").prop("disabled", true);
        $("#depart-country-input").prop("disabled", true);
        $("#cntr-spinner").show();
        $("#dep-cntr-spinner").show();
        $.get({
            url: "http://api.geonames.org/countryInfo?username=ksuhiyp",
            success: function (data) {
                var cntNames = [];
                $(data).find("country").each(function (index, element) {
                    var cnt = {};
                    var code = $(element).find("countryCode").text();
                    var name = $(element).find("countryName").text();
                    that.countries[name] = code;
                    cntNames.push(name);
                });
                that.initAutocompleteComponent("#countries-input", cntNames);
                that.initAutocompleteComponent("#depart-country-input", cntNames);
                $("#cntr-spinner").hide();
                $("#dep-cntr-spinner").hide();
                $("#countries-input").prop("disabled", false);
                $("#depart-country-input").prop("disabled", false);
            },
            error: function () {
                alert("Error obtaining list of countries");
                $("#cntr-spinner").hide();
                $("#dep-cntr-spinner").hide();
                $("#countries-input").prop("disabled", false);
                $("#depart-country-input").prop("disabled", false);
            }
        });
    };
    AddVacationComponent.prototype.loadCitiesForCountry = function (cntCode) {
        var that = this;
        $("#cities-input").prop("disabled", true);
        $("#city-spinner").show();
        $.get({
            url: "http://api.geonames.org/searchJSON?username=ksuhiyp&country=" + cntCode + "&style=SHORT",
            success: function (data) {
                var citiesNames = [];
                data.geonames.forEach(function (city, index) {
                    that.cities[city.name] = city.geonameId;
                    citiesNames.push(city.name);
                });
                that.initAutocompleteComponent("#cities-input", citiesNames);
                $("#city-spinner").hide();
                $("#cities-input").prop("disabled", false);
                $("#cities-input").focus();
            },
            error: function () {
                alert("Error loading cities for country code " + cntCode);
                $("#city-spinner").hide();
                $("#cities-input").prop("disabled", false);
            }
        });
    };
    AddVacationComponent.prototype.initAutocompleteComponent = function (compSelector, optionsNames) {
        var cntComponent = $(compSelector).prop('outerHTML');
        $(compSelector).replaceWith(cntComponent);
        $(compSelector).uui_autocomplete({
            source: optionsNames,
            items: 10
        });
    };
    /*
        private initCitiesComponent(cities) {
            var citiesComponent = $("#cities-input").prop('outerHTML');
            $("#cities-input").remove();
            $("#countries-input").after(citiesComponent);
            $("#cities-input").uui_autocomplete({
                source: cities,
                items: 8
            });
    
            var that = this;
            $("#cities-input").change(function (event) {
                if (!event.bubbles) {
                    var placeName = $("#countries-input").val() + ", " + $("#cities-input").val();
                    if (!that.places.includes(placeName)) {
                        $("#cities-input").removeClass("error");
    
                        that.places.push(placeName);
                        $("#cities-input").val("");
                    } else {
                        $("#cities-input").addClass("error");
                    }
                }
            });
        }*/
    AddVacationComponent.prototype.onOpenUserPicker = function () {
        this.userPickerComponent.init();
    };
    AddVacationComponent.prototype.onUserPickerReturn = function () {
        var that = this;
        //that.participants = [];
        $("#user-picker-modal-body .selected").each(function (index, el) {
            var name = $(el).text();
            var id = +$(el).attr('id');
            var member;
            that.userService.getUserById(id).subscribe(function (m) { return member = m; });
            if (that.members.indexOf(member) == -1) {
                that.members.push(name);
            }
            $(el).removeClass("selected");
        });
    };
    AddVacationComponent.prototype.addOwner = function () {
        this.participants.push(this.registrationService.getUserName());
        this.ownerAdded = true;
    };
    AddVacationComponent.prototype.saveTrip = function () {
        this.vacation = new vacation_1.Vacation(this.owner, this.members, this.title, this.description, this.beginDate, this.endDate, this.tags, this.estimatedCost, this.minMembers, vacation_status_1.VacationStatus.OPEN, this.plannedActivities, null, null, new image_1.Image("", "", ".jpg", "vac_1", "ds"), this.days, this.transoprt, this.departureCountry, this.targetCountry, this.targetCity);
        this.vacationService.createVacation(this.vacation);
    };
    AddVacationComponent.prototype.cancelVacCreation = function () {
        var answer = confirm("Are you sure you want to leave this page?");
        if (answer) {
            this.router.navigate(["vacations"]);
        }
        return false;
    };
    AddVacationComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/add-vacation/add-vacation.template.html',
            providers: [registration_service_1.RegistrationService, user_picker_component_1.UserPickerComponent, user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [registration_service_1.RegistrationService, router_1.Router, user_picker_component_1.UserPickerComponent, vacation_service_1.VacationService, user_service_1.UserService])
    ], AddVacationComponent);
    return AddVacationComponent;
}());
exports.AddVacationComponent = AddVacationComponent;
//# sourceMappingURL=add-vacation.component.js.map