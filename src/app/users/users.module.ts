import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { UsersRoutes } from './users.routes';
import { UsersService } from './users.service';
import { UserEditComponent } from './components/user-edit';

@NgModule({
    declarations: [
        UsersComponent,
        UserEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(UsersRoutes),
        ReactiveFormsModule
    ],
    providers: [ UsersService ],
    exports: [ UsersComponent ]
})
export class UsersModule { }
