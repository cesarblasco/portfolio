const translatableElements = document.querySelectorAll("[data-translate]");

const urlLocation = window.location.href;
const currentUrl = new URL(urlLocation);
const currentLang = currentUrl.searchParams.get("lang");

addOrReplaceLangInUrl();

if (currentLang) {
  loadTranslationKeysFromCurrentLanguageJSON(response => {
    // Parse JSON string into object
    jsonData = JSON.parse(response);
    console.log({ jsonData });
    translatableElements.forEach(element => {
      const splittedTranslationKeys = element.dataset.translate.split(".");
      const baseKey = splittedTranslationKeys[0];
      const elementTranslationKey = splittedTranslationKeys[1];
      const elementKeyValue = jsonData[baseKey][elementTranslationKey];
      element.innerHTML = elementKeyValue || element.dataset.translate;
    });
  });
}

function loadTranslationKeysFromCurrentLanguageJSON(callback) {
  const translationKeysToLoad = `./i18n/${currentLang}/i18n-${currentLang}.json`;
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", translationKeysToLoad, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function addOrReplaceLangInUrl() {
  const urlLocation = window.location.href;
  const currentUrl = new URL(urlLocation);
  let currentLanguage = currentUrl.searchParams.get("lang");

  if (currentLanguage) {
    const navbarLinks = document.querySelectorAll(".nav-link");
    navbarLinks.forEach(link => {
      link.href = `${link.href}?lang=${currentLanguage}`;
    });
  }

  if (!currentLanguage) {
    currentUrl.searchParams.set("lang", "en");
    history.replaceState(null, null, currentUrl);
    location.reload();
  }
}
