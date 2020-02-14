const speechScrollBtn = document.getElementById("speech-scroll-btn");
const speechBubbleText = document.getElementById("speech-bubble-text");
const resetSpeechBubbleBtn = document.getElementById("reset-speech-bubble-btn");
const categoryButtons = document.querySelectorAll(".category");
const technologyPills = document.querySelectorAll(".pill");

categoryButtons.forEach(item =>
  item.addEventListener("click", filterTechnologiesByCategory)
);

technologyPills.forEach(item =>
  item.addEventListener("click", updateSpeechBubbleTextBySelectedTechnologyPill)
);

resetSpeechBubbleBtn.addEventListener("click", resetSpeechBubble);

const speechBubbleTexts = [
  `Hello! I am a web developer that cares about good practices and clean code. 
   My main focus is the frontend and I am currently an Angular developer 
   transitioning to React. I've also done some backend in Java and PHP with frameworks
  Lorem ipsum ssdf sdfdskfj dsfjsdf jdsfj sdfjsdfj sdiofjs dofijsdfijsdfisdjf sidjf`,
  `I consider myself to be a team player, always willing to help others whenever I can. `,
  `testing 3 again lol`,
  `xd look at this`
];

const technologiesSpeechTexts = [
  {
    id: "HTML",
    texts: ["The skeleton of the web"]
  },
  {
    id: "CSS3",
    texts: [
      `<p>The skin of the web, the layer where the beauty of the websites come from. I've worked with both regular CSS and frameworks.
          Flexbox is currently my favorite layout design pattern. I've also tried some CSS grid. This website is mostly flexbox and a bit
          of Grid</p>`
    ]
  },
  {
    id: "Javascript / ES6",
    texts: ["The brains of the web"]
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
    texts: [
      `I've been transitioning to React since the company where I work decided to migrate to React instead of Angular and so far I've loved it. It's easy to understand such a small
       but powerful library. I definitely like HTML in JS (JSX) instead of the other way around, it's much more flexible and powerful, and any little typo you make in your
       markup will be detected. `
    ]
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

  speechBubbleText.innerHTML = !!selectedTechnology
    ? selectedTechnology.texts[currentTextIndex]
    : speechBubbleTexts[currentTextIndex];
}

function filterTechnologiesByCategory() {
  isTechnologySelected = false;
  const selectedCategory = this.getAttribute("data-category");
  categoryButtons.forEach(item => item.classList.remove("active"));
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

  speechBubbleText.innerHTML = selectedTechnology
    ? selectedTechnology.texts[0]
    : speechBubbleTexts[0];
}

function resetSpeechBubble() {
  speechBubbleText.innerHTML = speechBubbleTexts[0];
  currentTextIndex = 0;
  selectedTechnology = null;
  resetSpeechBubbleBtn.style.display = "none";
  isTechnologySelected = false;
  speechScrollBtn.style.display = "initial";

  technologyPills.forEach(item => {
    item.classList.remove("pill-active");
  });
}
