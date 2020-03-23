const defaultSpeechBubbleTexts = [
  `defaultSpeechBubbleText1`,
  `defaultSpeechBubbleText2`,
  `defaultSpeechBubbleText3`,
  `defaultSpeechBubbleText4`
];

const technologiesSpeechTexts = [
  {
    id: "HTML",
    texts: ["htmlSpeechBubbleText1"]
  },
  {
    id: "CSS3",
    texts: [`cssSpeechBubbleText1`]
  },
  {
    id: "Javascript / ES6",
    texts: ["jsSpeechBubbleText1"]
  },
  {
    id: "PHP",
    texts: [`phpSpeechBubbleText1`]
  },
  {
    id: "React JS",
    texts: [`reactSpeechBubbleText1`]
  },
  {
    id: "Spring Framework",
    texts: ["springSpeechBubbleText1"]
  },
  {
    id: "Jquery",
    texts: [`jquerySpeechBubbleText1`]
  },
  {
    id: "Angular",
    texts: [`angularSpeechBubbleText1`]
  },
  {
    id: "Angular JS",
    texts: [`angularjsSpeechBubbleText1`]
  },
  {
    id: "Laravel",
    texts: ["laravelSpeechBubbleText1"]
  },
  {
    id: "MySQL",
    texts: ["mySqlSpeechText1"]
  },
  {
    id: "Underscore / Lodash ES",
    texts: ["underscoreSpeechBubbleText1"]
  },
  {
    id: "Git",
    texts: ["gitSpeechBubbleText1", "gitSpeechBubbleText2"]
  },
  {
    id: "Github",
    texts: ["githubSpeechBubbleText1"]
  },
  {
    id: "Typescript",
    texts: [`typescriptSpeechBubbleText1`]
  },
  {
    id: "ES Lint",
    texts: ["esLintSpeechBubbleText1"]
  },
  {
    id: "Visual Studio Code",
    texts: [`vsCodeSpeechBubbleText1`, `vsCodeSpeechBubbleText2`]
  },
  {
    id: "Prettier",
    texts: ["prettierSpeechBubbleText1"]
  },
  {
    id: "Bootstrap 3 / 4",
    texts: ["bootstrapSpeechBubbleText"]
  }
];

const speechScrollBtn = document.getElementById("speech-scroll-btn");
const speechBubbleText = document.getElementById("speech-bubble-text");
const resetSpeechBubbleBtn = document.getElementById("reset-speech-bubble-btn");
const techCategoryButtons = document.querySelectorAll(".tech-category");
const technologyPills = document.querySelectorAll(".pill");
const experienceSection = document.getElementById("experience");
const timelineCategoriesButtons = document.querySelectorAll(
  ".timeline-category"
);

let timelineEvents = document.querySelectorAll(".timeline-event");
let timelineStackedEvents = document.querySelectorAll(
  ".timeline-stacked-event"
);
const navigateTimelineForward = document.getElementById("tl-navigate-forward");
const navigateTimelineBackward = document.getElementById(
  "tl-navigate-backward"
);

navigateTimelineBackward.addEventListener(
  "click",
  navigateStackedTimelineEventsBackward
);
navigateTimelineForward.addEventListener(
  "click",
  navigateStackedTimelineEventsForward
);
let timelineEventsCopy = document.querySelectorAll(".timeline-event");
let currentSelectedTimelineLayout = null;

const timelineContainer = document.getElementById("timeline-container");
const timelineStackedContainer = document.getElementById(
  "timeline-stacked-container"
);

techCategoryButtons.forEach(item =>
  item.addEventListener("click", filterTechnologiesByCategory)
);

technologyPills.forEach(item =>
  item.addEventListener("click", updateSpeechBubbleTextBySelectedTechnologyPill)
);

timelineCategoriesButtons.forEach(item =>
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
}

function filterTechnologiesByCategory() {
  isTechnologySelected = false;
  const selectedCategory = this.getAttribute("data-category");
  techCategoryButtons.forEach(item => item.classList.remove("active"));
  this.classList.add("active");
  if (selectedCategory === "all") {
    const [firstDefaultSpeechBubbleText] = defaultSpeechBubbleTexts;
    speechBubbleText.innerHTML = firstDefaultSpeechBubbleText;
    technologyPills.forEach(item => {
      item.classList.remove("hidden");
    });
  } else {
    technologyPills.forEach(item => {
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
  resetSpeechBubbleBtn.style.display = "initial";

  technologyPills.forEach(item => {
    item.classList.remove("pill-active");
  });

  selectedTechnology = technologiesSpeechTexts.find(
    ({ id }) => this.innerHTML === id
  );

  if (selectedTechnology) {
    this.classList.add("pill-active");

    speechScrollBtn.style.display =
      selectedTechnology.texts.length > 1 ? "initial" : "none";

    if (selectedTechnology.texts.length > 1) {
      speechScrollBtn.style.display = "initial";
      resetSpeechBubbleBtn.style.left = "85%";
    } else {
      speechScrollBtn.style.display = "none";
      resetSpeechBubbleBtn.style.left = "94%";
    }
  }

  const [selectedTechnologyFirstText] = selectedTechnology.texts;
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

  technologyPills.forEach(item => {
    item.classList.remove("pill-active");
  });

  translateSpecificKey(speechBubbleText, "about", "defaultSpeechBubbleText1");
}

function navigateStackedTimelineEventsForward() {
  const [firstTimelineEvent] = timelineStackedEvents;
  const navigateForwardArrow = document.getElementById("tl-navigate-forward");

  timelineStackedContainer.removeChild(navigateForwardArrow);
  timelineStackedContainer.removeChild(firstTimelineEvent);

  timelineStackedEvents = document.querySelectorAll(".timeline-stacked-event");

  timelineStackedContainer.appendChild(firstTimelineEvent);
  timelineStackedContainer.appendChild(navigateForwardArrow);
}

function navigateStackedTimelineEventsBackward() {
  const [firstTimelineEvent] = timelineStackedEvents;
  timelineStackedContainer.removeChild(firstTimelineEvent);

  timelineStackedEvents = document.querySelectorAll(".timeline-stacked-event");

  timelineStackedContainer.appendChild(firstTimelineEvent);
}

function changeTimelineLayout() {
  if (this.dataset.category.includes("stacked")) {
    timelineContainer.style.display = "none";
    timelineStackedContainer.style.display = "flex";
    experienceSection.style.height = "700px";
  } else {
    timelineContainer.style.display = "flex";
    timelineStackedContainer.style.display = "none";
    experienceSection.style.height = "100%";
  }

  timelineCategoriesButtons.forEach(item => item.classList.remove("active"));
  this.classList.add("active");
}
