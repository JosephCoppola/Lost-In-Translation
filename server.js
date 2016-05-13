import fs from 'fs';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { initRoutes } from './api/routes';

const server = express();

const index = fs.readFileSync(__dirname + '/client/client.html');

server.use('**/js', express.static(path.resolve(`${__dirname}/build/js`)));
server.use('**/css', express.static(path.resolve(`${__dirname}/client/stylesheets`)));
server.use('**/media', express.static(path.resolve(`${__dirname}/client/media`)));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

initRoutes(server, index);
server.listen(1337);

console.log('_________________________________________________________________________ \n');
console.log('Server running at http://127.0.0.1:1337/');
