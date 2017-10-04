import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { User } from 'shared/users.model';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {

    public users: User[];

    private service: UsersService;

    constructor(service: UsersService) {
        this.service = service;
    }

    public ngOnInit(): void {
        this.service.users().subscribe((users: User[]) => {
            this.users = users;
        });
    }
}
