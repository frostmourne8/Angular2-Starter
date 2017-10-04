import { ContainerModule, interfaces } from 'inversify';

import { ServiceModule } from '../../server';
import { UsersRoute } from './users.route';
import { UsersService } from './users.service';

export class UsersModule extends ContainerModule implements ServiceModule {

    public route = UsersRoute;

    constructor() {
        super((bind: interfaces.Bind) => {
            bind(UsersRoute).toSelf();
            bind(UsersService).toSelf();
        });
    }
}
