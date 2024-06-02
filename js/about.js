const defaultSpeechBubbleTexts = [
  `defaultSpeechBubbleText1`,
  `defaultSpeechBubbleText2`,
  `defaultSpeechBubbleText3`,
  `defaultSpeechBubbleText4`,
];

// Texts is an array that contains translation keys (found in i18n-es.json and i18n-en.json)
const technologiesSpeechTextsDictionary = {
  HTML: {
    id: "HTML",
  },
  CSS3: {
    texts: [`cssSpeechBubbleText1`],
  },
  "Javascript / ES6": {
    texts: ["jsSpeechBubbleText1", "jsSpeechBubbleText2"],
  },
  PHP: {
    texts: [`phpSpeechBubbleText1`],
  },
  "React JS": {
    texts: [`reactSpeechBubbleText1`],
  },
  Redux: {
    texts: [`reduxSpeechBubbleText1`],
  },
  JQuery: {
    texts: [`jquerySpeechBubbleText1`],
  },
  Angular: {
    texts: [`angularSpeechBubbleText1`],
  },
  "Angular JS": {
    texts: [`angularjsSpeechBubbleText1`],
  },
  Laravel: {
    texts: ["laravelSpeechBubbleText1"],
  },
  MySQL: {
    texts: ["mySqlSpeechText1"],
  },
  "Underscore / Lodash ES": {
    texts: ["underscoreSpeechBubbleText1"],
  },
  Git: {
    texts: ["gitSpeechBubbleText1", "gitSpeechBubbleText2"],
  },
  Github: {
    texts: ["githubSpeechBubbleText1"],
  },
  Typescript: {
    texts: [`typescriptSpeechBubbleText1`],
  },
  "ES Lint": {
    texts: ["esLintSpeechBubbleText1"],
  },
  "Visual Studio Code": {
    texts: [`vsCodeSpeechBubbleText1`, `vsCodeSpeechBubbleText2`],
  },
  Prettier: {
    texts: ["prettierSpeechBubbleText1"],
  },
  "Bootstrap 3 / 4": {
    texts: ["bootstrapSpeechBubbleText1"],
  },
  "SCSS / SCSS Modules": {
    texts: ["scssModulesSpeechBubbleText1", "scssModulesSpeechBubbleText2"],
  },
  "Jest / Enzyme": {
    texts: ["jestSpeechBubbleText1", "jestSpeechBubbleText2"],
  },
  "Font Awesome": {
    texts: ["fontAwesomeBubbleText1"],
  },
  "VisX Charts": {
    texts: ["visXChartsBubbleText1"],
  },
};

const speechScrollBtn = document.getElementById("speech-scroll-btn");
const speechBubbleText = document.getElementById("speech-bubble-text");
const resetSpeechBubbleBtn = document.getElementById("reset-speech-bubble-btn");
// const techCategoryButtons = document.querySelectorAll(".tech-category");
const technologyPills = document.querySelectorAll(".pill");
const experienceSection = document.getElementById("experience");
const timelineCategoriesButtons =
  document.querySelectorAll(".timeline-category");

let timelineEvents = document.querySelectorAll(".timeline-event");
let timelineStackedEvents = document.querySelectorAll(
  ".timeline-stacked-event"
);
const navigateTimelineForward = document.getElementById("tl-navigate-forward");
const navigateTimelineBackward = document.getElementById(
  "tl-navigate-backward"
);

let timelineEventsCopy = document.querySelectorAll(".timeline-event");
let currentSelectedTimelineLayout = null;

// const timelineContainer = document.getElementById("timeline-container");
// techCategoryButtons.forEach((item) =>
//   item.addEventListener("click", filterTechnologiesByCategory)
// );

technologyPills.forEach((item) =>
  item.addEventListener("click", updateSpeechBubbleTextBySelectedTechnologyPill)
);

timelineCategoriesButtons.forEach((item) =>
  item.addEventListener("click", changeTimelineLayout)
);

resetSpeechBubbleBtn.addEventListener("click", resetSpeechBubble);

const [firstText] = defaultSpeechBubbleTexts;

let currentTextIndex = 0;

let isTechnologySelected = false;
let selectedTechnology = null;

speechBubbleText.innerHTML = firstText;

speechScrollBtn.addEventListener("click", getNextSpeechBubbleDialog);

function getNextSpeechBubbleDialog() {
  const maxLengthOfCurrentSpeechBubbleTexts = !!selectedTechnology
    ? selectedTechnology.texts.length
    : defaultSpeechBubbleTexts.length;

  currentTextIndex =
    currentTextIndex === maxLengthOfCurrentSpeechBubbleTexts - 1
      ? 0
      : currentTextIndex + 1;

  const keyToApply = !!selectedTechnology
    ? selectedTechnology.texts[currentTextIndex]
    : defaultSpeechBubbleTexts[currentTextIndex];

  translateSpecificKey(speechBubbleText, "about", keyToApply);
  speechBubbleText.focus();
}

function filterTechnologiesByCategory() {
  isTechnologySelected = false;
  const selectedCategory = this.getAttribute("data-category");
  // techCategoryButtons.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
  if (selectedCategory === "all") {
    const [firstDefaultSpeechBubbleText] = defaultSpeechBubbleTexts;
    speechBubbleText.innerHTML = firstDefaultSpeechBubbleText;
    technologyPills.forEach((item) => {
      item.classList.remove("hidden");
    });
  } else {
    technologyPills.forEach((item) => {
      if (!item.getAttribute("data-category").includes(selectedCategory)) {
        item.classList.add("hidden");
      } else {
        item.classList.remove("hidden");
      }
    });
  }
  resetSpeechBubble();
}

function smoothscroll() {
  const currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothscroll);
    window.scrollTo(0, currentScroll - currentScroll / 7);
  }
}

function updateSpeechBubbleTextBySelectedTechnologyPill() {
  smoothscroll();

  isTechnologySelected = true;
  resetSpeechBubbleBtn.style.display = "block";

  technologyPills.forEach((item) => {
    item.classList.remove("pill-active");
  });

  selectedTechnology = technologiesSpeechTextsDictionary[this.innerHTML];
  let selectedTechnologyFirstText = "";

  if (selectedTechnology) {
    this.classList.add("pill-active");
    [selectedTechnologyFirstText] = selectedTechnology.texts;
    speechScrollBtn.style.display =
      selectedTechnology.texts.length > 1 ? "block" : "none";

    if (selectedTechnology.texts.length > 1) {
      resetSpeechBubbleBtn.classList.remove("reset-speech-no-more-text");
      resetSpeechBubbleBtn.classList.add("reset-speech-with-more-text");
    } else {
      resetSpeechBubbleBtn.classList.remove("reset-speech-with-more-text");
      resetSpeechBubbleBtn.classList.add("reset-speech-no-more-text");
    }
  }

  const [firstDefaultSpeechBubbleText] = defaultSpeechBubbleTexts;

  const keyToApply = selectedTechnology
    ? selectedTechnologyFirstText
    : firstDefaultSpeechBubbleText;

  translateSpecificKey(speechBubbleText, "about", keyToApply);
}

function resetSpeechBubble() {
  currentTextIndex = 0;
  selectedTechnology = null;
  resetSpeechBubbleBtn.style.display = "none";
  isTechnologySelected = false;
  speechScrollBtn.style.display = "initial";

  technologyPills.forEach((item) => {
    item.classList.remove("pill-active");
  });

  translateSpecificKey(speechBubbleText, "about", "defaultSpeechBubbleText1");
  speechBubbleText.focus();
}
