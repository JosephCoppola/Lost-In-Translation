import { googleTranslate } from './requests/googleTranslate';

export function initRoutes (server, index) {

  server.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text'});
    res.write(index);
    res.end();
  });

  server.post('/googleTranslate', (req, res) => {
    googleTranslate(req.body, res);
  });
}
