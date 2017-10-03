import * as path from 'path';
import { AppServer } from './server';
import { MainModule } from './services/main/main.module';

const contentPath = path.resolve(__dirname, 'src');

const server = new AppServer(contentPath);
server.loadService('/object', new MainModule());

server.start();
