import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { UsersModule } from './users/users.module';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        RouterModule.forRoot(AppRoutes),
        UsersModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
