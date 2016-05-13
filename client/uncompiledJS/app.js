//Import helper function from requests folder
import { googleTranslate } from './requests/googleTranslate'

// Cached DOM elements that provide values and can be used to set vaules
let textToTranslateDOM;
let textAfterOneDOM;
let textAfterManyDOM;
let fromLanguageDOM;
let toLanguageDOM;
let apiDOM;

let MAX_TRANSLATIONS;

let translationsLeft;
let currentlyTranslating;
let fromSourceToTarget;

let currentTranslateInfo;

// Event listner for when the translate button is pressed.
// Grabs all the values needed to hit the translation API and
// checks which API is selected. From there it calls the appropriate
// imported helper funcion
function onSubmitClick() {
  if(!currentlyTranslating){
    currentTranslateInfo = {};
    textAfterOneDOM.value = "";
    textAfterManyDOM.value = "";

    currentTranslateInfo.text = textToTranslateDOM.value;
    currentTranslateInfo.targetLang = toLanguageDOM.value;
    currentTranslateInfo.sourceLang = fromLanguageDOM.value;

    if(apiDOM.value === 'google') {
      translationsLeft = MAX_TRANSLATIONS;
      currentlyTranslating = true;
      fromSourceToTarget = true;
      translate(currentTranslateInfo);
    }
  }
}

function translate(translateInfo) {
  // Call helper function, also a promise, once complete (.then()), take translatedResponse
  // and do what we want with it. For the time being it populates the 'translatedOnce' input field
  googleTranslate(translateInfo)
  .then((translatedResponse) => {

    const resObj = JSON.parse(translatedResponse.text);
    console.log(resObj);

    if(translationsLeft === MAX_TRANSLATIONS && fromSourceToTarget){

      console.log("Translations left: " + translationsLeft + " Translating from source to target: " + fromSourceToTarget);

      // Resend the translated text to be translated back to the original language
      fromSourceToTarget = false;
      let translateInfo = {};
      translateInfo.text = resObj.data.translations[0].translatedText;
      translateInfo.targetLang = currentTranslateInfo.sourceLang;
      translateInfo.sourceLang = currentTranslateInfo.targetLang;
      translate(translateInfo);
    }if(translationsLeft === MAX_TRANSLATIONS && !fromSourceToTarget){
      textAfterOneDOM.value = resObj.data.translations[0].translatedText;

      console.log("Translations left: " + translationsLeft + " Translating from source to target: " + fromSourceToTarget);

      translationsLeft -= 1;

      // Resend the translated text to be translated back to the original language
      fromSourceToTarget = false;
      let translateInfo = {};
      translateInfo.text = resObj.data.translations[0].translatedText;
      translateInfo.targetLang = currentTranslateInfo.sourceLang;
      translateInfo.sourceLang = currentTranslateInfo.targetLang;
      translate(translateInfo);
    } else if (translationsLeft > 0 && !fromSourceToTarget) {

      fromSourceToTarget = true;

      console.log("Translations left: " + translationsLeft + " Translating from source to target: " + fromSourceToTarget);

      let translateInfo = {};
      translateInfo.text = resObj.data.translations[0].translatedText;
      translateInfo.targetLang = currentTranslateInfo.targetLang;
      translateInfo.sourceLang = currentTranslateInfo.sourceLang;
      translate(translateInfo);
    } else if(translationsLeft > 0 && fromSourceToTarget){

      translationsLeft -= 1;

      fromSourceToTarget = false;

      console.log("Translations left: " + translationsLeft + " Translating from source to target: " + fromSourceToTarget);

      let translateInfo = {};
      translateInfo.text = resObj.data.translations[0].translatedText;
      translateInfo.targetLang = currentTranslateInfo.sourceLang;
      translateInfo.sourceLang = currentTranslateInfo.targetLang;
      translate(translateInfo);
    }else if(translationsLeft === 0){

      textAfterManyDOM.value = resObj.data.translations[0].translatedText;
      currentlyTranslating = false;
      fromSourceToTarget = false;
      translationsLeft = 0;
    }
  })
  .catch((err) => { alert(err); });
}

// Called on window load to initialize needed code
function initPage() {
  textToTranslateDOM = document.querySelector('#textToTranslate');
  textAfterOneDOM = document.querySelector('#oneTranslation');
  textAfterManyDOM = document.querySelector('#manyTranslation');
  fromLanguageDOM =  document.querySelector('#from');
  toLanguageDOM = document.querySelector('#to');
  apiDOM = document.querySelector('#api');

  document.querySelector('#submit').onclick = onSubmitClick;

  MAX_TRANSLATIONS = 3;

  translationsLeft = 0;
  currentlyTranslating = false;
  fromSourceToTarget = false;
}

window.addEventListener('load', initPage);
