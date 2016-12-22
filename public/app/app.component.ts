import { Component, ViewEncapsulation } from '@angular/core';

require('images/favicon.ico');

@Component({
  selector: 'body',
  templateUrl: 'app.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    private clicked: boolean = false;

    public saySomething(something: string): string {
        return 'I said: ' + something;
    }

    public clickComponent() {
        this.clicked = true;
    }

    public wasClicked() {
        return this.clicked;
    }
 }