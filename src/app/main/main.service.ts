import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MainObject } from 'shared/main.model';

@Injectable()
export class MainService {

    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public object(): Observable<MainObject> {
        return this.http.get('api/object').map((response: Response) => {
            return response.json();
        });
    }
}
