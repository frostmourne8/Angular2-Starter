import { injectable } from 'inversify';

import { MainObject } from './main.model';

@injectable()
export class MainService {

    public object(): Promise<MainObject> {
        return Promise.resolve({
             property: 'a string from the server'
        });
    }
}
