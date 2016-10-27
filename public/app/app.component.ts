import { Component } from '@angular/core';

@Component({
  selector: 'application',
  templateUrl: 'app.html'
})
export class AppComponent {

    public saySomething(something: string): string {
        return 'I said: ' + something;
    }
 }