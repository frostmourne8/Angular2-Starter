import * as express from 'express';
import * as path from 'path';

import { Router, Request, Response, NextFunction } from 'express';
import { ServerRouteConfig } from '../server';

export class HealthCheckRoute implements ServerRouteConfig {

    public apply(router: express.Router) {
        try {
            router.get('/', this.healthCheck);
        } catch(err) {
            console.error(err);
        }
    }

    private healthCheck = (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).send({ healthy: true });
    }
}