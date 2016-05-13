//Import helper function from requests folder
import { googleTranslate } from './requests/googleTranslate'

// Cached DOM elements that provide values and can be used to set vaules
let textToTranslateDOM;
let textAfterOneDOM;
let fromLanguageDOM;
let toLanguageDOM;
let apiDOM;

// Event listner for when the translate button is pressed.
// Grabs all the values needed to hit the translation API and
// checks which API is selected. From there it calls the appropriate
// imported helper funcion
function onSubmitClick() {
  let translateInfo = {};

  translateInfo.text = textToTranslateDOM.value;
  translateInfo.targetLang = toLanguageDOM.value;
  translateInfo.sourceLang = fromLanguageDOM.value;

  if(apiDOM.value === 'google') {
    // Call helper function, also a promise, once complete (.then()), take translatedResponse
    // and do what we want with it. For the time being it populates the 'translatedOnce' input field
    googleTranslate(translateInfo)
    .then((translatedResponse) => {

      const resObj = JSON.parse(translatedResponse.text);
      console.log(resObj);

      textAfterOneDOM.value = resObj.data.translations[0].translatedText;
    })
    .catch((err) => { alert(err); });
  }
}

// Called on window load to initialize needed code
function initPage() {
  textToTranslateDOM = document.querySelector('#textToTranslate');
  textAfterOneDOM = document.querySelector('#oneTranslation');
  fromLanguageDOM =  document.querySelector('#from');
  toLanguageDOM = document.querySelector('#to');
  apiDOM = document.querySelector('#api');

  document.querySelector('#submit').onclick = onSubmitClick;
}

window.onload = initPage;
