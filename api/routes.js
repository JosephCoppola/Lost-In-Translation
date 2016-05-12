export function initRoutes (server, index) {

  server.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text'});
    res.write(index);
    res.end();
  });

  server.get('/googleTranslate', (req, res) => {
    console.log('API TIME');
  });
}
