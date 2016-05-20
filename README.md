# Lost-In-Translation

Demo hosted [here]. (Will be slow to open on first visit, server is starting up. This is normal)

###Contributors
Tyler Sargent: Frontend Developer

Joe Coppola: Backend Developer

###Overview
Node.js project. Backend used to serve the page and hit translation APIs. Frontend used for user input and sending data to the server.

In ENGL 216, we discussed translations of literature and the implications of reading translated text. Like the phone game, sometimes meaning is lost after a series of translations. Some web apps like [Translation Party] take a phrase and translate it for a certain amount of times. Lost In Translation does something similar. With this app you can translate a phrase into any language using two different translation APIs. A phrase or series of phrases are translated six times back and forth between the source and target language. At the end, the original text and the final translated text are compared showing how different APIs and languages translate back and forth. Having run short on time, we weren't able to provide much user feedback while translating, therefore please wait a couple of moments for the translations as each API translate at different speeds. We learned that each API can handle different character loads differently, with Google being much faster. However Google provides more borked responses for even one word translations. Each API seems to have it advantages and disadvantages. 

###APIs
We were able to find two translate APIs with easy and quick to use response data in the form of JSON. Currently we support all Google Translate languages, some of which Yandex does not support.

* Google Translate API
* Yandex Translate API

###Node Modules

* babel-core
* babel-cli
* babel-loader
* babel-preset-es2015
* babel-preset-stage-2
* bluebird
* body-parser
* compression
* diff-match-patch
* express
* nodemon
* superagent
* webpack
* yandex-translate-api


###Build Process
The client code consists of ES6 javascript that is converted to ES5 using Webpack and babel. The server is also written in ES6 that is converted to ES5 by babel. Communication between the client and server is mainly handled by express, with routes defined in `api/routes.js`. `Superagent` is used to simplify AJAX calls while promises are used from `bluebird` to help ensure asyn operations are called at the right times with the right response data. 

[here]:http://lost-in-translation.herokuapp.com/
[Translation Party]:http://translationparty.com/
