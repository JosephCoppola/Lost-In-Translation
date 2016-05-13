// Import needed 3rd party plugins
import Promise from 'bluebird';
import request from 'superagent';

// Export helper function that returns a promise. This
// promise POSTs the data to the server, where the server
// then makes the API call
export const googleTranslate = (translateInfo) =>
  new Promise((resolve, reject) =>
    request
      .post('/googleTranslate')
      .send(translateInfo)
      .end((err, res) => {
        if (err || !res.ok) reject(console.log('Failed to tranlate text with Google Translate'));
        else resolve(res);
      }));
