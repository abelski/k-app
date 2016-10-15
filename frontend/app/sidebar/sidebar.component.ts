import { Component } from '@angular/core';
import { FilterService } from '../filter/filter.service';
import { Router }   from '@angular/router';
import Globals = require('../globals');

declare var UUI: any;
declare var $:any;

@Component({
    selector: 'sidebar',
    templateUrl: 'app/sidebar/sidebar.template.html',
    providers: [FilterService]
    
})

export class SidebarComponent {

    constructor(private router: Router) { }

    doSomthing(value: any) {
        
    }

    ngAfterViewInit() {
        UUI.Sidebar.init({open: true, animate: true});
       window.onbeforeunload = function() {
            console.log(window.location.href);
        };
        this.router.events.subscribe((val) => {
            this.showHide();
        });

    }

    private showHide() {
        if (window.location.pathname == "/" + Globals.PATH_VACS) {
            $("#side-filter").show();
        } else {
            $("#side-filter").hide();
        }
    }
}