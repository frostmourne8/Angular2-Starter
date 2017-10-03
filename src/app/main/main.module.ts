import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { MainRoutes } from './main.routes';

@NgModule({
    declarations: [ MainComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(MainRoutes)
    ],
    exports: [ MainComponent ]
})
export class MainModule { }
