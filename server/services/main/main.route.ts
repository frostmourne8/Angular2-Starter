import { injectable } from 'inversify';
import { Request, Response, NextFunction, Router } from 'express';

import { ServerRouteConfig } from '../../server';
import { MainService } from './main.service';
import { MainObject } from './main.model';

@injectable()
export class MainRoute implements ServerRouteConfig {

    private service: MainService;

    constructor(service: MainService) {
        this.service = service;
    }

    public apply(router: Router) {
        router.get('/', this.objects);
    }

    private objects = (req: Request, res: Response, next: NextFunction) => {
        return this.service.object().then((object: MainObject) => {
            res.status(201).send(object);
        }).catch(next);
    }
}
