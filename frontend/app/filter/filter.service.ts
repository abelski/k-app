import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Vacation } from '../domain/vacation';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { VacationService } from '../feed/vacation/vacation.service';
import { UrlUtil } from '../utils/url.util';
import { VacationCartComponent } from '../feed/vacation/vacation-cart.component';
import { Tag } from '../domain/tag';

@Injectable()
export class FilterService {

    public static filterDate = null;
    public static filterTags: Tag[] = [];
    public static isChanged = false;

    constructor(private http: Http, private vacationService: VacationService) { }

    public getFilteredVacations(): Observable<Vacation[]> {
        let body = '{';
        if (FilterService.filterTags.length != 0) {
            body += '"tags":'+ JSON.stringify(FilterService.filterTags);
        }
        if (FilterService.filterDate != null) {
            body += '"startDate":' + JSON.stringify(FilterService.filterDate);
        }
        body += '}'

        console.log("FILTERS: " + body);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        // console.log(body);
        return this.http.post(UrlUtil.FILTER, body, options)
                .map(this.extractData)
                .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let i: number = 0;
        let vacations: Vacation[] = [];
        if (body.content) {
            // if response has more than one vac
            for (let vac of body.content) {
                vacations.push(JSON.parse(JSON.stringify(vac)));
            }
        } else {
            // if response has only one vac
            return body;
        }
        return vacations || {};
    }

    private handleError(error: any) {
        // we might use a remote logging
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}