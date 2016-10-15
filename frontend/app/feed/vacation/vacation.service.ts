import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Vacation } from '../../domain/vacation';
import { Observable } from 'rxjs/Observable';
import { UrlUtil } from '../../utils/url.util';
import { User } from '../../domain/user';

@Injectable()
export class VacationService {

    public static vacations: Observable<Vacation[]>;

    constructor(private http: Http) { }

    public getVacations(): Observable<Vacation[]> {
        console.log("FETCHING VACS");
        return this.http.get(UrlUtil.GET_ALL_VACATIONS)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getVacation(id: number): Observable<Vacation> {
        return this.http.get(UrlUtil.GET_VACATION + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public addMember(id: number, member: User) {
        let body = JSON.stringify(member);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(UrlUtil.ADD_MEMBER + id, body, options)
            .map(this.extractData)
            .catch(this.handleError);;
    }

    public createVacation(vacation: Vacation) {
        let body = JSON.stringify(vacation);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("VAC CREATED" + body);
        return this.http.post(UrlUtil.ADD_VACATION, body, options)
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(vac => {
                console.log(vac); 
                return vac; 
            });
    }

    private extractData(res: Response) {
        let body = res.json();
        let i: number = 0;
        let vacations: Vacation[] = [];
        // console.log(body.content[0]);
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