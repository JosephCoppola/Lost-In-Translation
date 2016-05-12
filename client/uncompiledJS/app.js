let textToTranslateDOM;
let fromLanguageDOM;
let toLanguageDOM;
let apiDOM;

function initPage() {
  textToTranslateDOM = document.querySelector('#textToTranslate');
  fromLanguageDOM =  document.querySelector('#from');
  toLanguageDOM = document.querySelector('#to');
  apiDOM = document.querySelector('#api');
}

window.onload = initPage;
