import { googleTranslate } from './requests/googleTranslate';

// Initialize Routes for the server
export function initRoutes (server, index) {

//Root
  server.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text'});
    res.write(index);
    res.end();
  });

//googleTranslate API
  server.post('/googleTranslate', (req, res) => {
    googleTranslate(req.body, res);
  });
}
