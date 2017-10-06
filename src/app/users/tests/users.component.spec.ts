import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../users.service';
import { UsersComponent } from '../users.component';
import { UserEditComponent } from '../components/user-edit';
import { User, UserInfo } from 'shared/users.model';

describe('UsersComponent', () => {

    let service: UsersService;
    let component: UsersComponent;

    describe('onInit', () => {

        let users: User[];

        it('should query for users from the service', () => {
            expect(service.users).toHaveBeenCalled();
        });

        it('should expose the users returned from the service', () => {
            expect(component.users).toBe(users);
        });

        beforeEach(() => {
            users = [];
            (service.users as jasmine.Spy).and.returnValue(Observable.of(users));
            component.ngOnInit();
        });
    });

    describe('createNewUser', () => {

        let newUser: User;

        it('should start creation using the edit component', () => {
            expect(component.editComponent.create).toHaveBeenCalled();
        });

        describe('after info entered', () => {

            let info: UserInfo;
            let user: User;
            let callback: (info: UserInfo) => void;

            it('should trigger creation with the service', () => {
                expect(service.create).toHaveBeenCalledWith(info);
            });

            it('should add the users to the list when the service returns', () => {
                expect(component.users[0]).toBe(user);
            });

            beforeEach(() => {
                info =  createInfo();
                user = createUser();
                const createSpy = (component.editComponent.create as jasmine.Spy);
                callback = createSpy.calls.mostRecent().args[0];
                (service.create as jasmine.Spy).and.returnValue(Observable.of(user));

                callback(info);
            });
        });

        beforeEach(() => {
            newUser = createUser();
            (service.create as jasmine.Spy).and.returnValue(Observable.of(newUser));
            component.createNewUser();
        });
    });

    describe('editUser', () => {

        let user: User;
        let info: UserInfo;

        describe('success', () => {

            it('should trigger an edit with the edit component', () => {
                expect(component.editComponent.edit).toHaveBeenCalled();
            });

            it('should pass the selected user to the edit compoent', () => {
                const editSpy = (component.editComponent.edit as jasmine.Spy);
                const passedUser = editSpy.calls.mostRecent().args[0];

                expect(passedUser).toBe(user);
            });

            it('should update the passed user with the entered info', () => {
                expect(user.name).toBe(info.name);
                expect(user.email).toBe(info.email);
                expect(user.birthday).toBe(info.birthday);
            });

            beforeEach(() => {
                triggerEdit(true);
            });
        });

        describe('failure', () => {

            it('should not alter the passed user', () => {
                expect(user.name).not.toBe(info.name);
                expect(user.email).not.toBe(info.email);
                expect(user.birthday).not.toBe(info.birthday);
            });

            beforeEach(() => {
                triggerEdit(false);
            });
        });

        beforeEach(() => {
            user = createUser();
            info = {
                name: 'aDifferentName',
                email: 'another@different.com',
                birthday: new Date(0)
            };

            component.editUser(user);
        });

        function triggerEdit(success: boolean) {
            const editSpy = (component.editComponent.edit as jasmine.Spy);
            const callback = editSpy.calls.mostRecent().args[1];
            (service.update as jasmine.Spy).and.returnValue(Observable.of({ success }));

            callback(info);
        }
    });

    describe('removeUser', () => {

        let user: User;

        it('should confirm the deletion', () => {
            component.removeUser(user);
            expect(window.confirm).toHaveBeenCalled();
        });

        describe('confirmed', () => {

            it('should delete the user with the service', () => {
                expect(service.delete).toHaveBeenCalledWith(user.id);
            });

            it('should remove the user from the component users', () => {
                expect(component.users.length).toBe(0);
            });

            describe('service failure', () => {

                it('should not remove the user from the component users', () => {
                    expect(component.users[0]).toBe(user);
                });

                beforeEach(() => {
                    component.users.push(user);
                    triggerDelete(false);
                });
            });

            beforeEach(() => {
                (window.confirm as jasmine.Spy).and.returnValue(true);
                triggerDelete(true);
            });

            function triggerDelete(success: boolean) {
                (service.delete as jasmine.Spy).and.returnValue(Observable.of({ success }));
                component.removeUser(user);
            }
        });

        describe('rejected', () => {

            it('should do nothing', () => {
                expect(service.delete).not.toHaveBeenCalled();
            });

            beforeEach(() => {
                (window.confirm as jasmine.Spy).and.returnValue(false);
                component.removeUser(user);
            });
        });

        beforeEach(() => {
            user = createUser();
            component.users.push(user);
            spyOn(window, 'confirm');

        });
    });

    beforeEach(() => {
        service = jasmine.createSpyObj('service', ['users', 'create', 'update', 'delete']);
        component = new UsersComponent(service);
        component.editComponent = jasmine.createSpyObj('editComponent', ['edit', 'create']);;
    });
});

function createUser(): User {
    const info = createInfo();
    return {
        id: 'anId',
        name: info.name,
        email: info.email,
        birthday: info.birthday
    };
}

function createInfo(): UserInfo {
    return {
        name: 'aName',
        email: 'aName@email.com',
        birthday: new Date()
    };
}
