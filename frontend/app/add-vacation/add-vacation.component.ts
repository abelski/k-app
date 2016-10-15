import { Component } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { UserPickerComponent } from "../user-picker/user-picker.component";
import { Router }   from '@angular/router';
import Globals = require('../globals');
import { VacationService } from '../feed/vacation/vacation.service';
import { Vacation } from '../domain/vacation';
import { User } from '../domain/user';
import { Tag } from '../domain/tag';
import { Activity } from '../domain/activity';
import { Image } from '../domain/image';
import { UserService } from '../user-picker/user.service';
import { VacationStatus } from '../domain/enums/vacation-status';
import { UrlUtil } from '../utils/url.util';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
    templateUrl: 'app/add-vacation/add-vacation.template.html',
    providers: [RegistrationService, UserPickerComponent, UserService],
})

export class AddVacationComponent {

    private placeStyles = ["_fuchsia", "_red", "_orange", "_lime-green", "_blue", "_raspberry", "_violet", "_plum", "_indigo", "_blue_blue", "_green"];

    private placesStore = {
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
    private countries = [];
    private cities = [];
    private places = [];
    private participants = [];
    private ownerAdded = false;

    private tagsStandard = ["Summer", "Eurotour", "Winter Sports", "Sightseeing", "Castles", "Wild Nature"];

    private editMode = false;
    private vacEdited = {};

    private currentUser: User = Globals.userInfo;
    private owner: User;
    private members: User[] = [];
    private title: String;
    private description: String;
    private beginDate: String;
    private endDate: String;
    private tags: Tag[] = [];
    private estimatedCost: number;
    private minMembers: number;
    private status: VacationStatus;
    private plannedActivities: Activity[];
    private comments: Comment[];
    private gallery: Image[];
    private titleImg: Image; //change to Image 
    private days: number;
    private transoprt: string;
    private departureCountry: string;
    private targetCountry: string;
    private targetCity: string;

    private vacation: Vacation;

    constructor(private registrationService: RegistrationService,
        private router: Router,
        private userPickerComponent: UserPickerComponent,
        private vacationService: VacationService,
        private userService: UserService) {

    }

    ngAfterViewInit() {
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
                } else {
                    $("#cities-input").addClass("error");
                }
            }
        });

        $("#tags-input").change(function () {
            var tag: Tag = new Tag('', this.value);
            if (tag.name !== '' && !that.tags.includes(tag)) {
                that.tags.push(tag);
                this.value = '';
                $("#tags-input").removeClass("error");
            } else {
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
            if (prtName == that.registrationService.getUserName()) { // TODO use IDs instead of names
                that.ownerAdded = false;
            }
            that.participants.splice(that.participants.indexOf(prtName), 1);
        });

        //this.initFormMode();
    }

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

    private loadCountriesList() {
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
                    var cnt = {/*code: null, name: null*/ };
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
    }

    private loadCitiesForCountry(cntCode: string) {
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
    }

    private initAutocompleteComponent(compSelector: any, optionsNames: any[]) {
        var cntComponent = $(compSelector).prop('outerHTML');
        $(compSelector).replaceWith(cntComponent);
        $(compSelector).uui_autocomplete({
            source: optionsNames,
            items: 10
        });
    }
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

    onOpenUserPicker() {
        this.userPickerComponent.init();
    }

    onUserPickerReturn() {
        var that = this;
        //that.participants = [];
        $("#user-picker-modal-body .selected").each(function (index, el) {
            var name = $(el).text();
            var id = $(el).attr('id');
            var member = that.userService.getUserById(id);
            member.subscribe(m => {
                debugger;
                if (that.participants.indexOf(m) == -1) {
                    that.participants.push(m);
                }
                $(el).removeClass("selected");
            });
        });
    }

    addOwner() {
        this.participants.push(this.registrationService.getUserName());
        this.ownerAdded = true;
    }

    saveTrip() {
        var that = this;
        $(document).ready(function (e) {
            var formData = new FormData(this);
            $.ajax({
                type: 'POST',
                url: UrlUtil.UPLOAD_IMAGE,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    that.titleImg = new Image(data.id, data.altText, data.extension, data.uri, data.description)

                    this.vacation = new Vacation(this.owner, this.members, this.title, this.description,
                        this.beginDate, this.endDate, this.tags, this.estimatedCost, this.minMembers, VacationStatus.OPEN,
                        this.plannedActivities, null, null, this.titleImg, this.days, this.transoprt, this.departureCountry,
                        this.targetCountry, this.targetCity);

                    this.vacationService.createVacation(this.vacation);
                },
                error: function (data) {
                    console.log("error");
                    console.log(data);
                }
            });
        });
    }

    cancelVacCreation() {
        var answer = confirm("Are you sure you want to leave this page?")
        if (answer) {
            this.router.navigate(["vacations"]);
        }
        return false;
    }
}