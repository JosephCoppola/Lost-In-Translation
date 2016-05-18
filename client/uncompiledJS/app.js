//Import helper function from requests folder
import { googleTranslate } from './requests/googleTranslate'
import { yandexTranslate } from './requests/yandexTranslate'
import Promise from 'bluebird';
import diff_match_patch from 'diff-match-patch';

// Cached DOM elements that provide values and can be used to set vaules
let textToTranslateDOM;
let textBeforeDOM;
let textAfterDOM;
let fromLanguageDOM;
let toLanguageDOM;
let apiDOM;

let diffMatchPatch;

let MAX_TRANSLATIONS;
let startingTranslations;

let translationsLeft;
let currentlyTranslating;
let calculatingDiff;
let fromSourceToTarget;

let currentTranslateInfo;
let sourceTranslateInfo;

// Event listner for when the translate button is pressed.
// Grabs all the values needed to hit the translation API and
// checks which API is selected. From there it calls the appropriate
// imported helper funcion
function onSubmitClick() {
  if(!currentlyTranslating){
    sourceTranslateInfo = {};
    textBeforeDOM.value = "";
    textAfterDOM.value = "";

    sourceTranslateInfo.text = textToTranslateDOM.value;
    sourceTranslateInfo.targetLang = toLanguageDOM.value;
    sourceTranslateInfo.sourceLang = fromLanguageDOM.value;

    currentTranslateInfo = sourceTranslateInfo;

    if(apiDOM.value === 'google') {
      startingTranslations = MAX_TRANSLATIONS;
      translationsLeft = MAX_TRANSLATIONS;
      currentlyTranslating = true;
      fromSourceToTarget = true;
      translateLoop(googleTranslate);
    }
    else if(apiDOM.value === 'yandex') {
      startingTranslations = MAX_TRANSLATIONS;
      translationsLeft = MAX_TRANSLATIONS;
      currentlyTranslating = true;
      fromSourceToTarget = true;
      translateLoop(yandexTranslate);
    }
  }
}

function resolveTranslation(resObj) {

  currentTranslateInfo = {};

  resObj = JSON.parse(resObj.text);

  if( translationsLeft === 0) {
    textBeforeDOM.innerHTML = textToTranslateDOM.value;
    textAfterDOM.innerHTML = resObj.text;
    currentlyTranslating = false;
    calculatingDiff = true;
    fromSourceToTarget = false;
    
    calculateDiff();
  }

  if(fromSourceToTarget) {
    fromSourceToTarget = false;

    currentTranslateInfo.text = resObj.text;
    currentTranslateInfo.targetLang = sourceTranslateInfo.sourceLang;
    currentTranslateInfo.sourceLang = sourceTranslateInfo.targetLang;
  }
  else {
    fromSourceToTarget = true;

    currentTranslateInfo.text = resObj.text;
    currentTranslateInfo.targetLang = sourceTranslateInfo.targetLang;
    currentTranslateInfo.sourceLang = sourceTranslateInfo.sourceLang;
  }
}

let promiseFor = Promise.method(function(condition, action, value) {
    if (!condition(value)) return value;
    return action(value).then(promiseFor.bind(null, condition, action));
});

function translateLoop(translateCall) {
    promiseFor(() => { return translationsLeft > 0; },
               () => {
                 return translateCall(currentTranslateInfo)
                        .then((res) => {
                          translationsLeft--;
                          resolveTranslation(res);
                          return;
                        });
               }, translationsLeft)
               .then((res) => console.log("Done"));
}

function calculateDiff(text1, text2){
    // Returns an array of differences between the two texts
    var diffArray = diffMatchPatch.diff_main(textBeforeDOM.innerHTML, textAfterDOM.innerHTML);
    diffMatchPatch.diff_cleanupSemantic(diffArray);
    
    // Split the diff into two different texts
    var textBeforeDiff = "";
    var textAfterDiff = "";
    
    diffArray.forEach(function(item, index){
        if(item[0] == -1){
            textBeforeDiff += "<span class=\"diff\">" + item[1] + "</span>";
        } else if(item[0] === 0){
            textBeforeDiff += item[1];
            textAfterDiff += item[1];
        }else if(item[0] === 1){
            textAfterDiff += "<span class=\"diff\">" + item[1] + "</span>";
        }
    });
    
    textBeforeDOM.innerHTML = textBeforeDiff;
    textAfterDOM.innerHTML = textAfterDiff;
    
    console.log(diffArray);
}

// Called on window load to initialize needed code
function initPage() {
  textToTranslateDOM = document.querySelector('#textToTranslate');
  textBeforeDOM = document.querySelector('#beforeTranslation');
  textAfterDOM = document.querySelector('#afterTranslation');
  fromLanguageDOM =  document.querySelector('#from');
  toLanguageDOM = document.querySelector('#to');
  apiDOM = document.querySelector('#api');

  document.querySelector('#submit').onclick = onSubmitClick;

  MAX_TRANSLATIONS = 6;
  translationsLeft = 0;
  
  currentlyTranslating = false;
  calculatingDiff = false;
  fromSourceToTarget = false;
  
  diffMatchPatch = new diff_match_patch();
  
  currentTranslateInfo = {};
}

window.addEventListener('load', initPage);
