import { injectable } from 'inversify';

import { User, UserInfo } from './users.model';

@injectable()
export class UsersService {

    public users(): Promise<User[]> {
        return Promise.resolve(this.createUsers(10));
    }

    public create(user: UserInfo): Promise<User> {
        return Promise.resolve({
            id: 'anId',
            name: user.name,
            birthday: user.birthday,
            email: user.email
        });
    }

    public update(id: string, user: UserInfo): Promise<{success: boolean}> {
        return Promise.resolve({success: true});
    }

    public delete(id: string): Promise<{success: boolean}> {
        return Promise.resolve({success: true});
    }

    private createUsers(count: number) {
        const users = [];
        for(let i = 0; i < count; i++) {
            users.push(this.createUser(i));
        }

        return users;
    }

    private createUser(index: number): User {
        return {
            id: 'id_' + index,
            name: 'User ' + index,
            birthday: new Date(),
            email: 'user' + index + '@email.com'
        };
    }
}
