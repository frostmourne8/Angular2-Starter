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

    describe('clicking', () => {

        it('should not have been clicked on initialization', () => {
            expect(component.wasClicked()).toBe(false);
        });

        it('should be clicked after "clickComponent" is called', () => {
            component.clickComponent();
            expect(component.wasClicked()).toBe(true);
        });
    });
});