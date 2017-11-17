import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { MainModule } from './main/main.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [ AppComponent, LoaderComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        RouterModule.forRoot(AppRoutes),
        MainModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
