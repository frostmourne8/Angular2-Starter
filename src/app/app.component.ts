import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';

import { LoaderComponent } from './components/loader/loader.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    @ViewChild(LoaderComponent)
    public loader: LoaderComponent;

    public ngOnInit(): void {
        this.loader.markFailure();
    }
 }
