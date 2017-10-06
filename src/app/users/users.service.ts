import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User, UserInfo } from 'shared/users.model';

@Injectable()
export class UsersService {

    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public users(): Observable<User[]> {
        return this.http.get('api/users').map((response: Response) => {
            return response.json();
        });
    }

    public create(info: UserInfo): Observable<User> {
        const payload = this.toUserInfoPayload(info);
        return this.http.post('api/users', payload).map((response: Response) => {
            return this.fromUserPayload(response.json());
        });
    }

    public update(userId: string, info: UserInfo): Observable<{success: boolean}> {
        const payload = this.toUserInfoPayload(info);
        return this.http.put('api/users/' + userId, payload).map((response: Response) => {
            return response.json();
        });
    }

    public delete(id: string): Observable<{success: boolean}> {
        return this.http.delete('api/users/' + id).map((response: Response) => {
            return response.json();
        });
    }

    private toUserInfoPayload(userInfo: UserInfo) {
        return _.extend(userInfo, {
            birthday: moment(userInfo.birthday).valueOf()
        });
    }

    private fromUserPayload(payload): User {
        return _.extend(payload, {
            birthday: moment(payload.birthday).toDate()
        });
    }
}
