import { Component, Input } from '@angular/core';
import { Vacation } from '../domain/vacation';
import { UserService } from './user.service';
import { User } from '../domain/user';
declare var $: any;

@Component({
    selector: 'user-picker',
    templateUrl: 'app/user-picker/user-picker.template.html',
    providers: [UserService]
})

export class UserPickerComponent {
    // private userList = ["Aaron A. Aaronson", "Nima Laszlo", "Khalil Seachnall", "Platon I'timad", "Sakhr Ranulf", "Valentin Haroun",
    //     "Gallagher Baldur", "Jafar Aodhan", "Eyvindur Kajetan", "Einion Leary", "Augusto Kristof", "Nasir Miloslav", "Bearach Murchadh",
    //     "Fechin Darragh", "Dionisio Maximiliano", "Aracely Woerner", "Silvia Giehl", "Eugenia Houston", "Ofelia Ali", "Þordis Petocs", "Bergljot Hanigan",
    //     "Herodotus Adamsen", "Susann Danielsen", "Luciana Hummel", "Rasmus Hermansen", "Abraham Falk", "Theodoulos Steensen", "Grete Landvik", "Pomponia Carlson"];

    private userList: User[] = [];

    constructor(private userService: UserService) {
        this.userService.getAllUsers().subscribe(user => this.userList.push(user));
        // makes Case Insensitive 'contains'
        $.extend($.expr[":"], {
            "containsIN": function (elem, i, match, array) {
                return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
        });
    }

    ngAfterViewInit() {
        $("#user-filter-input").bind("input", function () {
            var filterText = $(this).val();
            $(".user-pick-item").removeClass("hidden");
            $(".user-pick-item:not(:containsIN('" + filterText + "'))").addClass("hidden");
        });
        
        $(".user-pick-item").click(function() {
            $(this).toggleClass("selected");
        });
    }

    public init() {
        $("#user-filter-input").val("");
        $(".user-pick-item").removeClass("hidden");
    }
}