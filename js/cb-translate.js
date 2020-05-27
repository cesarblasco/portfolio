const translatableElements = document.querySelectorAll("[data-translate]");
const urlLocation = window.location.href;
const currentUrl = new URL(urlLocation);
const currentLang = currentUrl.searchParams.get("lang");
const loader = document.querySelector(".loader");
const mainElement = document.querySelector("main");
const navElement = document.querySelector("nav");
const htmlElementsWithPlaceholder = ["TEXTAREA", "INPUT"];

addOrReplaceLangInURL();
translateAllPageKeys();

function translateAllPageKeys() {
  loader.style.display = "block";
  if (currentLang) {
    const translationKeysToLoad = `./i18n/${currentLang}/i18n-${currentLang}.json`;
    fetch(translationKeysToLoad, { mode: "no-cors" })
      .then((response) => response.json())
      .then((data) => {
        jsonData = data;
        translatableElements.forEach((element) => {
          const splittedTranslationKeys = element.dataset.translate.split(".");
          const baseKey = splittedTranslationKeys[0];
          const elementTranslationKey = splittedTranslationKeys[1];
          const elementKeyValue = data[baseKey][elementTranslationKey];
          const attributeToModify = htmlElementsWithPlaceholder.includes(
            element.nodeName
          )
            ? "placeholder"
            : "innerHTML";
          element[attributeToModify] =
            elementKeyValue || element.dataset.translate;
        });
        loader.style.display = "none";
        mainElement.style.display = "block";
      });
  }
}

function translateSpecificKey(element, baseKey, key) {
  const elementKeyValue = jsonData[baseKey][key];
  element.innerHTML = elementKeyValue;
}

function addOrReplaceLangInURL() {
  const urlLocation = window.location.href;
  const currentUrl = new URL(urlLocation);
  let currentLanguage = currentUrl.searchParams.get("lang");
  const availableLanguages = ["en", "es"];

  if (currentLanguage && availableLanguages.includes(currentLanguage)) {
    const navbarLinks = document.querySelectorAll(".nav-link");
    navbarLinks.forEach((link) => {
      link.href = `${link.href}?lang=${currentLanguage}`;
    });
  } else {
    currentUrl.searchParams.set("lang", "en");
    history.replaceState(null, null, currentUrl);
    location.reload();
  }
}
