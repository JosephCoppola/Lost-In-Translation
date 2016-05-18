import Promise from 'bluebird';
import request from 'superagent';

const APIKEY = 'AIzaSyA1y8lTuaRw299bXOmS05bbR651RNinPKA';

function googleTranslatePOST(translateInfo) {
  return new Promise((resolve, reject) =>
    request
      .get('https://www.googleapis.com/language/translate/v2?key='
      + APIKEY + '&q=' + encodeURI(translateInfo.text) + '&source=' + translateInfo.sourceLang + '&target=' + translateInfo.targetLang)
      .end((err, res) => {
        if (err || !res.ok) reject(console.log('Failed to tranlate text with Google Translate - Server'));
        else resolve(res);
      }));
}

export function googleTranslate(translateObj, response) {
  googleTranslatePOST(translateObj)
  .then((res) => {

    const responseText = JSON.parse(res.text);
    console.log(responseText.data.translations);

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify({text: responseText.data.translations[0].translatedText}));
    response.end();
  })
  .catch((err) => { console.log(err) });
}
