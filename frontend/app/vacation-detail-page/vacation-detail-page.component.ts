import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Vacation } from '../domain/vacation';
import { VacationService } from '../feed/vacation/vacation.service';
import { Image } from '../domain/image';
import { Comment } from '../domain/comment';
import { User } from '../domain/user';
import Globals = require('../globals');

declare var $: any;

@Component({
    selector: 'vdp',
    templateUrl: 'app/vacation-detail-page/vacation-detail-page.template.html',
    providers: [VacationService]
})
export class VacationDetailPageComponent implements OnInit {
   private vacation: Vacation;
   private currentUser: User;
   private isInVac: boolean = false;
   monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    constructor(
        private vacationService: VacationService,
        private route: ActivatedRoute,
        private router: Router) {
            this.currentUser = Globals.userInfo;
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.vacationService.getVacation(id)
                .subscribe(vac => { 
                    this.vacation = vac;
                    setTimeout(function(){
                        $("#vac-carousel .carousel-indicators li").each(function(index) {
                            $(this).attr("data-slide-to", index);
                            console.log(index);
                        });
                    }, 50);
                });
        });
    }

    askToInvite() {
        this.isInVac = this.vacation.members.includes(this.currentUser)
        if(!this.isInVac) {
            this.vacationService.addMember(this.vacation.id, this.currentUser);
            this.vacation.members.push(this.currentUser);
            this.isInVac = true;   
        }
    }

    getMonthName(monthNum) {
        return this.monthNames[monthNum];
    }
}