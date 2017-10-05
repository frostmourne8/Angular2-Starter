import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';

import { UsersService } from './users.service';
import { UserEditComponent } from './components/user-edit';
import { User } from 'shared/users.model';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {

    @ViewChild(UserEditComponent)
    public editComponent: UserEditComponent;

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

    public createNewUser() {
        this.editComponent.create();
    }

    public editUser(user: User) {
        this.editComponent.edit(user);
    }

    public removeUser(user: User) {
        alert('I want to remove the user');
    }
}
