import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VacationService } from './vacation.service';
import { Vacation } from '../../domain/vacation';
import * as Collections from 'typescript-collections';
import { Observable } from 'rxjs/Observable';
import { ColorUtil } from '../../utils/color.util';
import { FilterService } from '../../filter/filter.service';
import { FilterComponent } from '../../filter/filter.component';
import { Tag } from '../../domain/tag';

declare var componentHandler: any;
declare var $: any;

@Component({
    selector: 'vacation-cart',
    templateUrl: 'app/feed/vacation/vacation-cart.template.html'
    // providers: [VacationService, FilterService, FilterComponent]
})
export class VacationCartComponent {
    vacations: Observable<Vacation[]> = null;
    errorMsg: string = null;
    isUpdating = false;
    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    constructor(
        private vacationService: VacationService,
        private router: Router,
        private filterService: FilterService) {
    }

    ngAfterViewInit() {
        this.getVacations();

        $('.sub-menu').click(function () {
            $(this).data('clicked', !$(this).data('clicked'));
        });
        componentHandler.upgradeElement(document.getElementById("addVacFAB"));
    }

    ngDoCheck() {
        if (FilterService.isChanged) {
            this.getVacations();
        }
    }

    public getVacations() {
        this.isUpdating = true;
        if (FilterService.filterTags.length > 0) {
            console.log("have a filter");
            VacationService.vacations = this.filterService.getFilteredVacations();
            this.vacations = VacationService.vacations;
        } else {
            console.log("haven't a filter");
            VacationService.vacations = this.vacationService.getVacations();
            this.vacations = VacationService.vacations;
        }
        this.vacations.subscribe(() => {
            this.isUpdating = false;
        });
    }

    gotoDetail(vacation: Vacation) {
        this.router.navigate(['/vacations', vacation.id]);
    }

    onClickVacTag(tagText: Tag) {
        if (!$('.sub-menu').data('clicked')) {
            $('.sub-menu').click();
        }

        FilterService.filterTags.push(tagText);
        FilterService.isChanged = true;
        this.getVacations();
    }

    getMonthName(monthNum) {
        return this.monthNames[monthNum];
    }
}