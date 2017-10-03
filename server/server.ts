import 'reflect-metadata';

import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as express from 'express';

import { Server } from 'http';
import { RequestHandler, Express, Router } from 'express';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ContentRoute } from './core/content.route';
import { HealthCheckRoute } from './core/healthcheck.route';

export interface ServerRouteConfig {
    apply(router: Router);
}

export interface ServiceModule extends ContainerModule {
    route: interfaces.Newable<ServerRouteConfig>;
}

export class AppServer {

    public server: Express;
    public http: Server;

    private container: Container;

    constructor(contentPath: string) {
        this.server = this.createExpressServer();
        this.http = http.createServer(this.server);
        this.container = new Container();

        this.loadBaseRoutes(contentPath);
    }

    public start() {
        this.http.listen(3000, () => {
            // tslint:disable-next-line:no-console
            console.log('Server listening on http://localhost:3000');
        });
    }

    public loadService(servicePath: string, serviceModule: ServiceModule, ...middleware: RequestHandler[]) {
        this.container.load(serviceModule);
        this.route('/api' + servicePath, this.container.get(serviceModule.route));
    }

    private createExpressServer(): Express {
        const server = express();
        server.use(cookieParser());
        server.use(bodyParser.urlencoded({
            extended: true
        }));
        server.use(bodyParser.json());

        return server;
    }

    private loadBaseRoutes(contentPath: string) {
        this.route('/', new ContentRoute(contentPath));
        this.route('/api/healthcheck', new HealthCheckRoute());
    }

    private route(servicePath: string, route: ServerRouteConfig, ...middleware: RequestHandler[]) {
        const router = Router();
        route.apply(router);

        this.server.use(servicePath, middleware, router);
    }
}
