import { Component } from '@angular/core';
import { FilterService } from '../filter/filter.service';

declare var UUI: any;
//declare var $:any;

@Component({
    selector: 'sidebar',
    templateUrl: 'app/sidebar/sidebar.template.html',
    providers: [FilterService]
    
})

export class SidebarComponent {

    constructor() { }

    doSomthing(value: any) {
        
    }

    ngAfterViewInit() {
        UUI.Sidebar.init({open: true, animate: true});
    }
}