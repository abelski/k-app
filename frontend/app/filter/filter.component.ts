import { Component, OnInit, Injectable, Input, ViewChild } from '@angular/core';
import { VacationCartComponent } from '../feed/vacation/vacation-cart.component';
import { FilterService } from '../filter/filter.service';
import { ColorUtil } from '../utils/color.util';
import { VacationService } from '../feed/vacation/vacation.service';

declare var $: any;

@Component({
    selector: 'filter',
    templateUrl: 'app/filter/filter.template.html',
    providers: [FilterService]
})
export class FilterComponent implements OnInit {
    public beginDate;
    private filterTags = [];
    private isChanged: boolean = false;

    constructor(public filterService: FilterService) { }

    ngOnInit() { }

    ngAfterViewInit() {

        $('#filterDatepicker').uui_datepicker({ todayHighlight: true });

        $('#filterDatepicker').uui_datepicker({
            format: "dd/mm/yyyy"
        }).on('change', function () {
            $('.datepicker-dropdown').hide();
        });

        $('.selectpicker').selectpicker();

        $('#filterDatepicker input').uui_datepicker()
            .on('change', function (dateText, inst) {
                this.beginDate = $(this).uui_datepicker('getDate'); //the getDate method
                console.log(this.beginDate);
            });
    }

    ngDoCheck() {
        if (FilterService.isChanged) {
            this.filterTags = FilterService.filterTags;

            FilterService.isChanged = false;
        }
    }

    onChange(value) {
        // console.log(value);
    }

    dateFilter() {
        // console.log(this.beginDate);
    }

    deleteFilterTag(tagText) {
        let index = FilterService.filterTags.indexOf(tagText);
        if (index >= 0) {
            console.log("delete");
            FilterService.filterTags.splice(index, 1);
        }
        this.filterTags = FilterService.filterTags;
        VacationService.vacations = this.filterService.getVacationsByTag();
        FilterService.isChanged = true;

        if (this.filterTags.length === 0) {
            $('.sub-menu').click();
        }
    }
}