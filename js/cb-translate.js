const translatableElements = document.querySelectorAll("[data-translate]");

const urlLocation = window.location.href;
const currentUrl = new URL(urlLocation);
const currentLang = currentUrl.searchParams.get("lang");

addOrReplaceLangInURL();
translateAllPageKeys();

function translateAllPageKeys() {
  if (currentLang) {
    loadTranslationKeysFromCurrentLanguageJSON(response => {
      // Parse JSON string into object
      jsonData = JSON.parse(response);
      translatableElements.forEach(element => {
        const splittedTranslationKeys = element.dataset.translate.split(".");
        const baseKey = splittedTranslationKeys[0];
        const elementTranslationKey = splittedTranslationKeys[1];
        const elementKeyValue = jsonData[baseKey][elementTranslationKey];
        element.innerHTML = elementKeyValue || element.dataset.translate;
      });
    });
  }
}

function translateSpecificKey(element, baseKey, key) {
  const elementKeyValue = jsonData[baseKey][key];
  element.innerHTML = elementKeyValue;
}

function loadTranslationKeysFromCurrentLanguageJSON(callback) {
  const translationKeysToLoad = `./i18n/${currentLang}/i18n-${currentLang}.json`;
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", translationKeysToLoad, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function addOrReplaceLangInURL() {
  const urlLocation = window.location.href;
  const currentUrl = new URL(urlLocation);
  let currentLanguage = currentUrl.searchParams.get("lang");

  if (currentLanguage) {
    const navbarLinks = document.querySelectorAll(".nav-link");
    navbarLinks.forEach(link => {
      link.href = `${link.href}?lang=${currentLanguage}`;
    });
  } else {
    currentUrl.searchParams.set("lang", "en");
    history.replaceState(null, null, currentUrl);
    location.reload();
  }
}
