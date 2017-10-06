import { UserEditComponent } from '../user-edit.component';
import { User, UserInfo } from 'shared/users.model';

describe('UserEditComponent', () => {

    let component: UserEditComponent;
    let callback: (info: UserInfo) => void;

    it('should be hidden by default', () => {
        expect(component.show).toBe(false);
    });

    describe('create', () => {

        it('should set the header to the correct value', () => {
            expect(component.header).toBe('Create new user');
        });

        it('should set the primary action label to the correct value', () => {
            expect(component.primaryAction).toBe('Create');
        });

        it('should reset the form', () => {
            expect(component.form.reset).toHaveBeenCalled();
        });

        it('should show', () => {
            expect(component.show).toBe(true);
        });

        describe('accept', () => {

            let info: UserInfo;

            it('should hide', () => {
                expect(component.show).toBe(false);
            });

            it('should call the callback with the user info', () => {
                expect(callback).toHaveBeenCalledWith(info);
            });

            beforeEach(() => {
                info = createUserInfo();
                component.form.patchValue(info);
                component.accept();
            });
        });

        describe('cancel', () => {

            it('should hide', () => {
                expect(component.show).toBe(false);
            });

            beforeEach(() => {
                component.cancel();
            });
        });

        beforeEach(() => {
            spyOn(component.form, 'reset');
            component.create(callback);
        });
    });

    describe('edit', () => {

        let user: User;
        let info: UserInfo;

        it('should set the header to the correct value', () => {
            expect(component.header).toBe('Edit user');
        });

        it('should set the primary action to the correct value', () => {
            expect(component.primaryAction).toBe('Update');
        });

        it('should set the form with the passed user', () => {
            expect(component.form.setValue).toHaveBeenCalledWith(user);
        });

        it('should show', () => {
            expect(component.show).toBe(true);
        });

        describe('accept', () => {

            it('should hide', () => {
                expect(component.show).toBe(false);
            });

            it('should call the callback with the user info', () => {
                expect(callback).toHaveBeenCalledWith(info);
            });

            beforeEach(() => {
                component.form.patchValue(info);
                component.accept();
            });
        });

        describe('cancel', () => {

            it('should hide', () => {
                expect(component.show).toBe(false);
            });

            beforeEach(() => {
                component.cancel();
            });
        });

        beforeEach(() => {
            info = createUserInfo();
            user = {
                id: 'anId',
                name: info.name,
                email: info.email,
                birthday: info.birthday
            };

            spyOn(component.form, 'setValue');

            component.edit(user, callback);
        });
    });

    beforeEach(() => {
        callback = jasmine.createSpy('callback');
        component = new UserEditComponent();
    });
});

function createUserInfo(): UserInfo {
    return {
        name: 'aName',
        email: 'aName@email.com',
        birthday: new Date()
    };
}
