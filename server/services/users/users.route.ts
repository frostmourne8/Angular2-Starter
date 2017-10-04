import { injectable } from 'inversify';
import { Request, Response, NextFunction, Router } from 'express';

import { ServerRouteConfig } from '../../server';
import { UsersService } from './users.service';
import { User } from './users.model';

@injectable()
export class UsersRoute implements ServerRouteConfig {

    private service: UsersService;

    constructor(service: UsersService) {
        this.service = service;
    }

    public apply(router: Router) {
        router.get('/', this.users);
        router.post('/', this.create);
        router.put('/:id', this.update);
        router.delete('/:id', this.delete);
    }

    private users = (req: Request, res: Response, next: NextFunction) => {
        return this.service.users().then((users: User[]) => {
            res.status(201).send(users);
        }).catch(next);
    }

    private create = (req: Request, res: Response, next: NextFunction) => {
        return this.service.create(req.body).then((user: User) => {
            res.status(201).send(user);
        }).catch(next);
    }

    private update = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const update = req.body;

        return this.service.update(id, update).then((response: {success: boolean}) => {
            res.status(201).send(response);
        }).catch(next);
    }

    private delete = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        return this.service.delete(id).then((response: {success: boolean}) => {
            res.status(201).send(response);
        }).catch(next);
    }
}
