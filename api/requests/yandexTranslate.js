import Promise from 'bluebird';

const APIKEY = 'trnsl.1.1.20160518T000759Z.057ba40e37e11897.71fcd44e94935e82ddf9da88e33da38cd67bda0e';
const translateAPI = require('yandex-translate-api')(APIKEY);

function yandexTranslatePOST(translateInfo) {
  return new Promise((resolve, reject) => {
    translateAPI.translate(translateInfo.text, {to: translateInfo.targetLang }, (err, res) => {
      if (err) reject(console.log('Failed to tranlate text with yandex Translate - Server'));
      else resolve(res);
    });
  });
}

export function yandexTranslate(translateObj, response) {
  yandexTranslatePOST(translateObj)
  .then((res) => {
    console.log(res);
    let responseText = '';

    if (res.code !== 200) {
      responseText = "Language not supported with Yandex";
    }
    else {
      responseText = res.text[0];
    }

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify({text: responseText}));
    response.end();
  })
  .catch((err) => { console.log(err) });
}
