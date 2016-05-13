import { googleTranslate } from './requests/googleTranslate'

let textToTranslateDOM;
let fromLanguageDOM;
let toLanguageDOM;
let apiDOM;

function onSubmitClick() {
  let translateInfo = {};

  translateInfo.test = 'you';

  if(apiDOM.value === 'google') {
    googleTranslate(translateInfo)
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
