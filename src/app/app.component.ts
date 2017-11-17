import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';

import { ModalLoaderComponent } from './components/modal-loader/modal-loader.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    @ViewChild(ModalLoaderComponent)
    public loader: ModalLoaderComponent;

    public ngOnInit(): void {
        this.loader.startLoading('Loading the things');
        this.loader.markFailure('Error loading the things');
    }
 }
