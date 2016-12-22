import { Type, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect, tick } from '@angular/core/testing';

export class ComponentTestFixture<T> {

    private fixture: ComponentFixture<T>;

    constructor(componentModule: Type<any>, componentType: Type<T>) {
        TestBed.configureTestingModule({
            imports: [ componentModule ],
            providers: [ { provide: ComponentFixtureAutoDetect, useValue: true } ]
        });

        this.fixture = TestBed.createComponent(componentType);
        this.fixture.detectChanges();   
    }

    public component(): T {
        return this.fixture.componentInstance;
    }

    public verify(verifyFunc: () => void): void {
        this.fixture.whenStable().then(verifyFunc);
    }

    protected elementText(id: string): string {
        return this.element(id).nativeElement.textContent;
    }

    protected clickElement(id: string) {
        this.element(id).triggerEventHandler('click', {button: 0});
    }

    protected hoverElement(id: string) {
        this.element(id).triggerEventHandler('mouseenter', {});
    }

    protected unhoverElement(id: string) {
        this.element(id).triggerEventHandler('mouseleave', {});
    }

    protected element(id: string): DebugElement {
        return this.fixture.debugElement.query(By.css('#' + id));
    }

    protected elementByClass(cssClass: string): DebugElement {
        return this.fixture.debugElement.query(By.css('.' + cssClass));
    }
}