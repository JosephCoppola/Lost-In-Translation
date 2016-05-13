import { googleTranslate } from './requests/googleTranslate'

let textToTranslateDOM;
let fromLanguageDOM;
let toLanguageDOM;
let apiDOM;

function onSubmitClick() {
  let translateInfo = {};

  translateInfo.text = textToTranslateDOM.value;
  translateInfo.targetLang = toLanguageDOM.value;
  translateInfo.sourceLang = fromLanguageDOM.value;

  if(apiDOM.value === 'google') {
    googleTranslate(translateInfo)
    .then((translatedResponse) => console.log(translatedResponse))
    .catch((err) => { alert(err); });
  }
}

function initPage() {
  textToTranslateDOM = document.querySelector('#textToTranslate');
  fromLanguageDOM =  document.querySelector('#from');
  toLanguageDOM = document.querySelector('#to');
  apiDOM = document.querySelector('#api');

  document.querySelector('#submit').onclick = onSubmitClick;
}

window.onload = initPage;
