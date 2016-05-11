import fs from 'fs';
import express from 'express';
import path from 'path';

const server = express();

const index = fs.readFileSync(__dirname + '/client/client.html');
const js = fs.readFileSync(__dirname + '/build/js/app.js');

server.use('**/js', express.static(path.resolve(`${__dirname}/build/js`)));

server.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text'});
  res.write(index);
  res.end();
});

server.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');
