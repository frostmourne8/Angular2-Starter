import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { UsersService } from '../users.service';
import { User, UserInfo } from 'shared/users.model';

describe('UsersService', () => {

    let http: Http;
    let service: UsersService;

    describe('users', () => {

        let users: User[];
        let response: Observable<User[]>;

        it('should call the correct url', () => {
            expect(http.get).toHaveBeenCalledWith('api/users');
        });

        it('should return the expected response', (done: DoneFn) => {
            response.subscribe((serviceResponse) => {
                expect(serviceResponse).toBe(users);
                done();
            });
        });

        beforeEach(() => {
            users = [];
            setResponse((http.get as jasmine.Spy), users);
            response = service.users();
        });
    });

    describe('create', () => {

        let info: UserInfo;
        let user: User;
        let response: Observable<User>;

        it('should call the correct url', () => {
            const body = {
                name: info.name,
                email: info.email,
                birthday: info.birthday.valueOf()
            };

            expect(http.post).toHaveBeenCalledWith('api/users', body);
        });

        it('should return the expected response', (done: DoneFn) => {
            response.subscribe((serviceResponse) => {
                expect(serviceResponse).toEqual(user);
                done();
            });
        });

        beforeEach(() => {
            info = createInfo();
            user = {
                id: 'anId',
                name: info.name,
                email: info.email,
                birthday: info.birthday
            };

            setResponse((http.post as jasmine.Spy), {
                id: user.id,
                name: info.name,
                email: info.email,
                birthday: info.birthday.valueOf()
            });

            response = service.create(info);
        });
    });

    describe('update', () => {

        let id: string;
        let info: UserInfo;
        let response: Observable<{success: boolean}>;

        it('should called the correct url', () => {
            const body = {
                name: info.name,
                email: info.email,
                birthday: info.birthday.valueOf()
            };

            expect(http.put).toHaveBeenCalledWith('api/users/' + id, body);
        });

        it('should return the expected response', (done: DoneFn) => {
            response.subscribe((serviceResponse) => {
                expect(serviceResponse).toEqual({success: true});
                done();
            });
        });

        beforeEach(() => {
            id = 'anId';
            info = createInfo();
            setResponse((http.put as jasmine.Spy), {success: true});

            response = service.update(id, info);
        });
    });

    describe('update', () => {

        let id: string;
        let response: Observable<{ success: boolean }>;

        it('should called the correct url', () => {
            expect(http.delete).toHaveBeenCalledWith('api/users/' + id);
        });

        it('should return the expected response', (done: DoneFn) => {
            response.subscribe((serviceResponse) => {
                expect(serviceResponse).toEqual({ success: true });
                done();
            });
        });

        beforeEach(() => {
            id = 'anId';
            setResponse((http.delete as jasmine.Spy), { success: true });

            response = service.delete(id);
        });
    });

    function createInfo(): UserInfo {
        return {
            name: 'aName',
            email: 'aName@email.com',
            birthday: new Date()
        };
    }

    function setResponse(spy: jasmine.Spy, response: object) {
        spy.and.returnValue(Observable.of({
            json: jasmine.createSpy('json').and.returnValue(response)
        }));
    }

    beforeEach(() => {
        http = jasmine.createSpyObj('http', ['get', 'put', 'post', 'delete']);
        service = new UsersService(http);
    });
});
