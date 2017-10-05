import * as moment from 'moment';

import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User, UserInfo } from 'shared/users.model';

const DATE_INPUT_FORMAT = 'YYYY-MM-DD';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: [ './user-edit.component.css' ]
})
export class UserEditComponent {

    public header: string;
    public primaryAction: string;
    public show: boolean;

    public form: FormGroup;

    private callback: (userInfo: UserInfo) => void;

    constructor() {
        this.header = 'edit';
        this.show = false;

        this.form = new FormGroup({
            id: new FormControl(null),
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            birthday: new FormControl(null, Validators.required)
        });
    }

    public create(callback: (userInfo: UserInfo) => void) {
        this.callback = callback;
        this.header = 'Create new user';
        this.primaryAction = 'Create';
        this.form.reset();
        this.show = true;
    }

    public edit(user: User, callback: (userInfo: UserInfo) => void) {
        this.callback = callback;
        this.header = 'Edit user';
        this.primaryAction = 'Update';
        this.setUser(user);
        this.show = true;
    }

    public cancel() {
        this.show = false;
    }

    public accept() {
        this.show = false;
        if(this.callback) {
            this.callback(this.getUser());
        }
    }

    private setUser(user: User) {
        const dateString = moment(user.birthday).format(DATE_INPUT_FORMAT);
        this.form.setValue(user);
        this.form.get('birthday').setValue(dateString);
    }

    private getUser(): UserInfo {
        return {
            name: this.form.value.name,
            email: this.form.value.email,
            birthday: moment(this.form.value.birthday, DATE_INPUT_FORMAT).toDate()
        };
    }
}
