import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersRoutes } from './users.routes';
import { UsersService } from './users.service';

@NgModule({
    declarations: [ UsersComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(UsersRoutes)
    ],
    providers: [ UsersService ],
    exports: [ UsersComponent ]
})
export class UsersModule { }
