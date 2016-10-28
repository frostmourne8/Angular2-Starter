import { Type, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';

export class ComponentTestFixture<T> {

    private fixture: ComponentFixture<T>;

    constructor(componentModule: Type<any>, componentType: Type<T>) {
        TestBed.configureTestingModule({
            //imports: [ componentModule ],
            declarations: [ componentType ]
        });

        this.fixture = TestBed.createComponent(componentType);
    }

    public component(): T {
        return this.fixture.componentInstance;
    }

    protected elementText(id: string): string {
        return this.element(id).nativeElement.textContent;
    }

    protected clickElement(id: string) {
        this.element(id).nativeElement.click();
    }

    protected element(id: string): DebugElement {
        return this.fixture.debugElement.query(By.css('#' + id));
    }
}