import Promise from 'bluebird';
import request from 'superagent';

export const googleTranslate = (translateInfo) =>
  new Promise((resolve, reject) =>
    request
      .post('/googleTranslate')
      .send(translateInfo)
      .end((err, res) => {
        if (err || !res.ok) reject(console.log('Failed to tranlate text with Google Translate'));
        else resolve(res);
      }));
