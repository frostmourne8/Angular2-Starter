import * as _ from 'lodash';
import { injectable } from 'inversify';
import { v1 } from 'uuid';
import { MongoClient, Db, MongoError, Collection, UpdateWriteOpResult,
         DeleteWriteOpResultObject, InsertOneWriteOpResult } from 'mongodb';

import { User, UserInfo } from './users.model';

// tslint:disable-next-line:max-line-length
const MONGO_URL = 'mongodb://epic:3mdj89YnxfepNG0C@epic-users-shard-00-00-7cipg.mongodb.net:27017,epic-users-shard-00-01-7cipg.mongodb.net:27017,epic-users-shard-00-02-7cipg.mongodb.net:27017/test?ssl=true&replicaSet=epic-users-shard-0&authSource=admin';

@injectable()
export class UsersService {

    private mongo: Collection<User>;

    constructor() {
        MongoClient.connect(MONGO_URL, (err: MongoError, db: Db) => {
            if(err) { throw err; }
            this.mongo = db.collection('users');
        });
    }

    public users(): Promise<User[]> {
        const cursor = this.mongo.find();
        return Promise.resolve(cursor.toArray());
    }

    public create(info: UserInfo): Promise<User> {
        const user = _.extend(info, {
            _id: v1(),
            balance: 0.0
        });

        return this.mongo.insert(user).then((result: InsertOneWriteOpResult) => {
            return user;
        });
    }

    public update(id: string, user: UserInfo): Promise<{success: boolean}> {
        return this.mongo.updateOne({_id: id}, {$set: user}).then((results: UpdateWriteOpResult) => {
            return { success: results.modifiedCount === 1 };
        });
    }

    public delete(id: string): Promise<{success: boolean}> {
        return this.mongo.deleteOne({_id: id}).then((result: DeleteWriteOpResultObject) => {
            return { success: result.deletedCount === 1 };
        });
    }

    public updateBalance(id: string, amount: number) {
        return this.mongo.updateOne({_id: id}, {$inc: {balance: amount}}).then((results: UpdateWriteOpResult) => {
            return { success: results.modifiedCount === 1 };
        });
    }
}
