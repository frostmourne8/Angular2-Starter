import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';

import { UsersService } from './users.service';
import { UserEditComponent } from './components/user-edit';
import { User, UserInfo } from 'shared/users.model';

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
        this.editComponent.create((userInfo: UserInfo) => {
            this.service.create(userInfo).subscribe((user: User) => {
                this.users.push(user);
            });
        });
    }

    public editUser(user: User) {
        this.editComponent.edit(user, (userInfo: UserInfo) => {
            this.service.update(user.id, userInfo).subscribe((response: {success: boolean}) => {
                if(response.success) {
                    user.name = userInfo.name;
                    user.email = userInfo.email;
                    user.birthday = userInfo.birthday;
                }
            });
        });
    }

    public removeUser(user: User) {
        if(!confirm('Are you sure you want to delete ' + user.name)) { return; }

        const index = this.users.indexOf(user);
        this.service.delete(user.id).subscribe((response: {success: boolean}) => {
            if(response.success) {
                this.users.splice(index, 1);
            }
        });
    }
}
