import * as express from 'express';
import * as path from 'path';

import { Router, Request, Response, NextFunction } from 'express';
import { ServerRouteConfig } from '../server';

export class ContentRoute implements ServerRouteConfig {

    private contentPath: string;

    constructor(contentPath: string) {
        this.contentPath = contentPath;
    }

    public apply(router: Router) {
        try {
            router.get('/', express.static(this.contentPath));
            router.get('/', this.serveFile);
        } catch(err) {
            console.error(err);
        }
    }

    private serveFile = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.sendFile(path.resolve(this.contentPath, 'index.html'));
        } catch(err) {
            next(err);
        }
    }
}
