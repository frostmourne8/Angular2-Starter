import 'rxjs/add/operator/map';

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
        return this.http.post('api/users', info).map((response: Response) => {
            return response.json();
        });
    }

    public update(user: User): Observable<{success: boolean}> {
        return this.http.put('api/users' + user.id, user).map((response: Response) => {
            return response.json();
        });
    }

    public delete(id: string): Observable<{success: boolean}> {
        return this.http.delete('api/users' + id).map((response: Response) => {
            return response.json();
        });
    }
}
