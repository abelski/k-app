import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UrlUtil } from '../utils/url.util';
import { Observable } from 'rxjs/Observable';
import { Vacation } from '../domain/vacation';

@Injectable()
export class ProfileService {

    constructor(private http: Http) { }

    public getActiveVacations(userId: number): Observable<Vacation[]> {
        return this.http.get(UrlUtil.GET_ACTIVE_VACATION + userId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getPastVacations(userId: number): Observable<Vacation[]> {
        return this.http.get(UrlUtil.GET_ACTIVE_VACATION + userId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getOwnedVacations(userId: number): Observable<Vacation[]> {
        return this.http.get(UrlUtil.GET_OWNED_VACATION + userId + "/vacations")
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