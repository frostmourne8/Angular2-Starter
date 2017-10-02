import 'reflect-metadata';

import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import { Server } from 'http';
import { RequestHandler, Express, Router } from 'express';
import { Container, ContainerModule, interfaces } from 'inversify';


export interface ServerRouteConfig {
    apply(router: Router);
}

export interface ServiceModule extends ContainerModule {
    route: interfaces.Newable<ServerRouteConfig>;
}

export class AppServer {

    public server: Express;
    public http: Http;

    private container: Container;

    constructor() {
        this.server = this.createExpressServer();
        this.http = http.createServer(this.server);
        this.container = new Container();
    }

    public start() {
        this.http.listen(3000, () => {
            // tslint:disable-next-line:no-console
            console.log('Server listening on http://localhost:3000');
        });
    }

    public loadService(servicePath: string, serviceModule: ServiceModule, ...middleware: RequestHandler[]) {
        this.container.load(serviceModule);

        const route = this.container.get(serviceModule.route);
        const router = Router();
        route.apply(router);

        if(middleware) {
            this.server.use(servicePath, middleware, router);
        } else {
            this.server.use(servicePath, router);
        }
    }

    private createExpressServer(): Express {
        const server = new Express();
        server.use(cookieParser());
        server.use(bodyParser.urlencoded({
            extended: true
        }));
        server.use(bodyParser.json());

        return server;
    }
}
