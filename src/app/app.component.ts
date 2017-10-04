import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    public logoSrc: string;

    constructor() {
        this.logoSrc = require('../images/logo.png');
    }
}
