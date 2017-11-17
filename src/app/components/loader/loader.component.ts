import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: [ './loader.component.css' ]
})
export class LoaderComponent {

    @Input('large')
    public large: boolean;

    public loading: boolean;
    public success: boolean;
    public failure: boolean;

    constructor() {
        this.clear();
    }

    public clear() {
        this.loading = false;
        this.success = false;
        this.failure = false;
    }

    public startLoading() {
        this.loading = true;
        this.success = false;
        this.failure = false;
    }

    public markSuccess() {
        this.loading = false;
        this.success = true;
        this.failure = false;
    }

    public markFailure() {
        this.loading = false;
        this.success = false;
        this.failure = true;
    }
}
