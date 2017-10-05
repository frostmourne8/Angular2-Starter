import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from 'shared/users.model';

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

    constructor() {
        this.header = 'edit';
        this.show = false;

        this.form = new FormGroup({
            id: new FormControl(null),
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            birthday: new FormControl(null, Validators.required)
        });
    }

    public create() {
        this.header = 'Create new user';
        this.primaryAction = 'Create';
        this.form.reset();
        this.show = true;
    }

    public edit(user: User) {
        this.header = 'Edit user';
        this.primaryAction = 'Update';
        this.form.setValue(user);
        this.show = true;
    }

    public cancel() {
        this.show = false;
    }

    public accept() {
        this.show = false;
    }
}
