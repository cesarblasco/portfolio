const speechBubbleTexts = [
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
    texts: [
      `I started my journey as a web developer back in 2016 when I decided my thesis application was going to be a web app. 
       I started learning PHP as my first web language and then I started learning the Laravel framework (a PHP framework) 
      in which I finally developed my app. Check out my "dental clinic app" in "My projects" section to see my thesis application.`,
      `PHP SUCKS MAN`,
      `WHY U DO DIS????`
    ]
  },
  {
    id: "React JS",
    texts: [`reactSpeechBubbleText1 `]
  },
  {
    id: "Spring Framework",
    texts: ["Ahh spring"]
  },
  {
    id: "Jquery",
    texts: [
      `One of the first javascript libraries I learned. Even though nowdays the web development world is shifting away from this library, I found it easy to understand and even
           learn more about DOM manipulation with it.`
    ]
  },
  {
    id: "Angular",
    texts: [
      `Angular was actually the first frontend framework I learned, even before Angular JS (yes that sounds weird right?) I got a opportunity to work at SOTEC consulting as a remote
           web developer. I completed some courses and trained myself and got the job, which allowed me to start getting web application experience right away.`
    ]
  },
  {
    id: "Angular JS",
    texts: [
      `I learned Angular JS when I shifted to my second job at Rankmi.com. The shift wasn't as hard as I thought it would be since the version that the company used was the 1.6.7
           that uses the component model for development, very similar to Angular 2's.`
    ]
  },
  {
    id: "Laravel",
    texts: ["LARAVEL"]
  },
  {
    id: "MySQL",
    texts: ["MYSQL"]
  },
  {
    id: "Underscore / Lodash ES",
    texts: ["UNDERSCORE LODASHFK"]
  },
  {
    id: "Git",
    texts: ["Git sss"]
  },
  {
    id: "Github",
    texts: ["Github"]
  },
  {
    id: "Typescript",
    texts: [
      `I learned typescript when I began developing apps in Angular 2 (since it's mandatory for the framework) and it's the best thing I could've done. Nowdays typescript keeps
           growing and the type safety has definitely helped me prevent bugs, have more readable, mantainable code and a better development experience.`
    ]
  },
  {
    id: "ES Lint",
    texts: ["Lint that shet"]
  },
  {
    id: "Visual Studio Code",
    texts: [
      `My favorite code editor. It's so simple yet powerful, an infinite amount of plugins and a huge community backing it up. I actually started with Sublime Text when I started
           learning web development, but now I can't go back. Some of my favorite plugins include: Live Server, Live Sass Compiler, Prettier, Bracket 
           Pair Colorizer and Annotator.`
    ]
  },
  {
    id: "Prettier",
    texts: ["Prettier"]
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

const technologySpeechBubbleTexts = [];

const [firstText] = speechBubbleTexts;

let currentTextIndex = 0;

let isTechnologySelected = false;
let selectedTechnology = null;

speechBubbleText.innerHTML = firstText;

speechScrollBtn.addEventListener("click", getNextSpeechBubbleDialog);

function getNextSpeechBubbleDialog() {
  const maxLengthOfCurrentSpeechBubbleTexts = !!selectedTechnology
    ? selectedTechnology.texts.length
    : speechBubbleTexts.length;

  currentTextIndex =
    currentTextIndex === maxLengthOfCurrentSpeechBubbleTexts - 1
      ? 0
      : currentTextIndex + 1;

  const keyToApply = !!selectedTechnology
    ? selectedTechnology.texts[currentTextIndex]
    : speechBubbleTexts[currentTextIndex];

  translateSpecificKey(speechBubbleText, "about", keyToApply);
}

function filterTechnologiesByCategory() {
  isTechnologySelected = false;
  const selectedCategory = this.getAttribute("data-category");
  techCategoryButtons.forEach(item => item.classList.remove("active"));
  this.classList.add("active");
  if (selectedCategory === "all") {
    speechBubbleText.innerHTML = speechBubbleTexts[0];
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

  const keyToApply = selectedTechnology
    ? selectedTechnology.texts[0]
    : speechBubbleTexts[0];

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
  const [firstTimelineEvent, , lastTimelineEvent] = timelineStackedEvents;

  const navigateBackwardArrow = document.getElementById(
    "tl-navigate-backwward"
  );

  timelineStackedContainer.removeChild(navigateBackwardArrow);
  timelineStackedContainer.appendChild(lastTimelineEvent);
  timelineStackedContainer.removeChild(firstTimelineEvent);

  timelineStackedEvents = document.querySelectorAll(".timeline-stacked-event");

  // timelineStackedContainer.removeChild(lastTimelineEvent);
  timelineStackedContainer.appendChild(lastTimelineEvent);
}

function changeTimelineLayout() {
  console.log(this.dataset);
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
