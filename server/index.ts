import * as path from 'path';
import { AppServer } from './server';
import { UsersModule } from './services/users/users.module';

const contentPath = path.resolve(__dirname, 'src');

const server = new AppServer(contentPath);
server.loadService('/users', new UsersModule());

server.start();
