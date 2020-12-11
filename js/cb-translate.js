const translatableElements = document.querySelectorAll("[data-translate]");
const urlLocation = window.location.href;
const currentUrl = new URL(urlLocation);
const currentLang = currentUrl.searchParams.get("lang");
const loader = document.querySelector(".loader");
const mainElement = document.querySelector("main");
const navElement = document.querySelector("nav");
const translatableHTMLElements = ["TEXTAREA", "INPUT", "IMG", "DIV"];
let translationsJSON = null;

addOrReplaceLangInURL();
translateAllPageKeys();

function getAttributeToTranslate(element) {
  if (element.getAttribute("type") === "submit") {
    return "value";
  }
  else if (element.getAttribute("alt")){
    return "alt";
  }
  else if (element.getAttribute("title")){
    return "title";
  }
  return "placeholder";
}

async function translateAllPageKeys() {
  loader.style.display = "block";
  if (currentLang) {
    const translationKeysToLoad = `./i18n/${currentLang}/i18n-${currentLang}.json`;
    const response = await fetch(translationKeysToLoad, { mode: "no-cors" });
    translationsJSON = await response.json();
    translatableElements.forEach((element) => {
      const splittedTranslationKeys = element.dataset.translate.split(".");
      const baseKey = splittedTranslationKeys[0];
      const elementTranslationKey = splittedTranslationKeys[1];
      const elementKeyValue = translationsJSON[baseKey][elementTranslationKey];
      const attributeToModify = translatableHTMLElements.includes(
        element.nodeName
      )
        ? getAttributeToTranslate(element)
        : "innerHTML";
      element[attributeToModify] = elementKeyValue || element.dataset.translate;
    });
    loader.style.display = "none";
    mainElement.style.display = "block";
  }
}

function translateSpecificKey(element, baseKey, key) {
  const elementKeyValue = translationsJSON[baseKey][key];
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
    const userLang = navigator.language || navigator.userLanguage;
    const urlLangParam = userLang.includes("es") ? "es" : "en";

    currentUrl.searchParams.set("lang", urlLangParam);
    history.replaceState(null, null, currentUrl);
    location.reload();
  }
}
