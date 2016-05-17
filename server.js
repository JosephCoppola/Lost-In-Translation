import fs from 'fs';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { initRoutes } from './api/routes';

// Start express
const server = express();

//Load in HTML file
const index = fs.readFileSync(__dirname + '/client/client.html');
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Serve Assets
server.use('**/js', express.static(path.resolve(`${__dirname}/build/js`)));
server.use('**/css', express.static(path.resolve(`${__dirname}/client/stylesheets`)));
server.use('**/media', express.static(path.resolve(`${__dirname}/client/media`)));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Initialize server route and run
initRoutes(server, index);
server.listen(port);

console.log('_________________________________________________________________________ \n');
console.log('Server running at http://127.0.0.1:3000/');
