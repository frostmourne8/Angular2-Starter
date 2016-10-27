import { AppComponent }   from 'app/app.component';

describe('AppComponent', () => {

    let component;

    beforeEach(() => {
        component = new AppComponent();
    });

    it('should say what I tell it to say', () => {
        const theThingISaid = 'something to say';
        expect(component.saySomething(theThingISaid)).toBe('I said: ' + theThingISaid);
    });
});