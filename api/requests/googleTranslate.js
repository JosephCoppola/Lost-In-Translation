import Promise from 'bluebird';
import request from 'superagent';

const APIKEY = 'AIzaSyA1y8lTuaRw299bXOmS05bbR651RNinPKA';

function googleTranslatePOST(translateInfo) {
  return new Promise((resolve, reject) =>
    request
      .get('https://www.googleapis.com/language/translate/v2?key=AIzaSyA1y8lTuaRw299bXOmS05bbR651RNinPKA&q=hello%20world&source=en&target=de')
      .end((err, res) => {
        if (err || !res.ok) reject(console.log('Failed to tranlate text with Google Translate - Server'));
        else resolve(res);
      }));
}

export function googleTranslate(translateObj, response) {
  googleTranslatePOST(translateObj)
  .then((res) => {
    console.log(res.text);

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.parse(res.text));
    response.end();
  })
  .catch((err) => { console.log(err) });
}
