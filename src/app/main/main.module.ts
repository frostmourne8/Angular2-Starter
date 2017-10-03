import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { MainRoutes } from './main.routes';
import { MainService } from './main.service';

@NgModule({
    declarations: [ MainComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(MainRoutes)
    ],
    providers: [ MainService ],
    exports: [ MainComponent ]
})
export class MainModule { }
