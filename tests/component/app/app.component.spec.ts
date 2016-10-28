import { AppComponent } from 'app/app.component';
import { AppComponentFixture } from './app.component.fixture';

describe('AppComponent', () => {

    let fixture: AppComponentFixture;

    beforeEach(() => {
        fixture = new AppComponentFixture();
    });

    it('should start with the click status as false', () => {
        expect(fixture.component().wasClicked()).toBe(false);
    });

    it('should set the clicked status to true when the clickMe button is clicked', () => {
        fixture.clickMe();
        expect(fixture.component().wasClicked()).toBe(true);
    });

    it('should have the correct label for the clickMe button', () => {
        expect(fixture.clickMeLabel()).toBe('Click Me');
    });
});