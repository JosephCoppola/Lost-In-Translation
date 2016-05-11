import http from 'http';
import fs from 'fs';

const index = fs.readFileSync(__dirname + '/client/client.html');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(index);
  res.end();
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
