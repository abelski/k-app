import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../domain/user';
import { UrlUtil } from '../utils/url.util';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    public getAllUsers(): Observable<User> {
        return this.http.get(UrlUtil.GET_ALL_USERS)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getUserById(id: any) {
        return this.http.get(UrlUtil.GET_USER_BY_ID + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let i: number = 0;
        let users: User[] = [];
        if (body.content) {
            // if response has more than one vac
            for (let user of body.content) {
                users.push(JSON.parse(JSON.stringify(user)));
            }
        } else {
            // if response has only one vac
            return body;
        }
        return users || {};
    }

    private handleError(error: any) {
        // we might use a remote logging
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}