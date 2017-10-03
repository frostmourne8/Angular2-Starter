import { ContainerModule, interfaces } from 'inversify';

import { ServiceModule } from '../../server';
import { MainRoute } from './main.route';
import { MainService } from './main.service';

export class MainModule extends ContainerModule implements ServiceModule {

    public route = MainRoute;

    constructor() {
        super((bind: interfaces.Bind) => {
            bind(MainRoute).toSelf();
            bind(MainService).toSelf();
        });
    }
}
