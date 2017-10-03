import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { MainService } from './main.service';
import { MainObject } from 'shared/main.model';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.css' ]
})
export class MainComponent implements OnInit {

    public value: string;

    private service: MainService;

    constructor(service: MainService) {
        this.service = service;
    }

    public ngOnInit(): void {
        this.service.object().subscribe((object: MainObject) => {
            this.value = object.property;
        });
    }
}
