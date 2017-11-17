import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Component({
    selector: 'modal-loader',
    templateUrl: './modal-loader.component.html',
    styleUrls: ['./modal-loader.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalLoaderComponent {

    @ViewChild(LoaderComponent)
    public loader: LoaderComponent;

    public show: boolean;
    public message: string;

    constructor() {
        this.show = false;
    }

    public startLoading(message: string) {
        this.show = true;
        this.message = message;
        this.loader.startLoading();
    }

    public markSuccess(message: string, closeWaitTime?: number) {
        this.loader.markSuccess();
        this.message = message;
        this.waitAndClose(closeWaitTime);
    }

    public markFailure(message: string, closeWaitTime?: number) {
        this.loader.markFailure();
        this.message = message;
        this.waitAndClose(closeWaitTime);
    }

    private waitAndClose(closeWaitTime?: number) {
        if(!closeWaitTime) { closeWaitTime = 1500; }
        setTimeout(() => {
            this.show = false;
        }, closeWaitTime);
    }
}
