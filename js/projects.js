const projects = [
  {
    id: "dental",
    title: "dentalClinicTitle",
    icon: "fas fa-tooth",
    description: "dentalClinicDescription",
    summary: "dentalClinicSummary",
    technologies: [
      "Laravel Framework",
      "Bootstrap 3",
      "JQuery",
      "Raphael.js",
      "mySQL",
    ],
    images: [
      { fileName: "dental-clinic.jpg", caption: "dentalClinicCaption1" },
      { fileName: "dental-clinic-1.jpg", caption: "dentalClinicCaption2" },
      { fileName: "dental-clinic-2.jpg", caption: "dentalClinicCaption3" },
      { fileName: "dental-clinic-3.jpg", caption: "dentalClinicCaption4" },
      { fileName: "dental-clinic-4.jpg", caption: "dentalClinicCaption5" },
      { fileName: "dental-clinic-5.jpg", caption: "dentalClinicCaption6" },
      { fileName: "dental-clinic-6.jpg", caption: "dentalClinicCaption7" },
      { fileName: "dental-clinic-7.jpg", caption: "dentalClinicCaption8" },
      { fileName: "dental-clinic-8.jpg", caption: "dentalClinicCaption9" },
      { fileName: "dental-clinic-9.jpg", caption: "dentalClinicCaption10" },
      { fileName: "dental-clinic-10.jpg", caption: "dentalClinicCaption11" },
      { fileName: "dental-clinic-11.jpg", caption: "dentalClinicCaption12" },
      { fileName: "dental-clinic-12.jpg", caption: "dentalClinicCaption13" },
    ],
  },
  // {
  //   id: "tribute",
  //   title: "tributePageTitle",
  //   icon: "fas fa-book",
  //   description: "tributePageDescription",
  //   summary: `tributePageSummary`,
  //   technologies: ["Bootstrap 3"],
  //   link: "https://codepen.io/Cesar1337/pen/VmzzRL",
  //   images: [
  //     { fileName: "tribute-page.jpg", caption: "tributePageCaption1" },
  //     { fileName: "tribute-page-2.jpg", caption: "tributePageCaption2" },
  //   ],
  // },
  {
    id: "lab",
    title: "cssLabTitle",
    icon: "fas fa-flask",
    description: "cssLabDescription",
    summary: `cssLabSummary`,
    technologies: ["HTML", "CSS"],
    link: "https://cesarblasco.github.io/css-lab/",
    images: [
      { fileName: "css-lab-2.jpg", caption: "cssLabCaption1" },
      { fileName: "css-lab-3.jpg", caption: "cssLabCaption2" },
      { fileName: "css-lab-4.jpg", caption: "cssLabCaption3" },
    ],
  },
  {
    id: "search",
    title: "githubSearchTitle",
    icon: "fab fa-github",
    description: "githubSearchDescription",
    summary: "githubSearchSummary",
    technologies: [
      "Angular JS",
      "UI Router",
      "Bootstrap 3",
      "TypeScript",
      "Github API",
    ],
    link: "https://cesarblasco.github.io/RKM-Test-Base",
    images: [
      {
        fileName: "github-search-1.jpg",
        caption: "githubSearchCaption2",
      },
      {
        fileName: "github-search-2.jpg",
        caption: "githubSearchCaption3",
      },
      {
        fileName: "github-search-3.jpg",
        caption: "githubSearchCaption4",
      },
    ],
  },
  // {
  //   id: "math",
  //   title: "mathGameTitle",
  //   icon: "fas fa-gamepad",
  //   description: "mathGameDescription",
  //   summary: `mathGameSummary`,
  //   technologies: ["Unity 2D", "C#"],
  //   link: "https://cesarblasco.github.io/learnmaths/",
  //   images: [
  //     { fileName: "maths-1.jpg", caption: "mathGameCaption1" },
  //     { fileName: "maths-2.jpg", caption: "mathGameCaption2" },
  //     {
  //       fileName: "maths-3.jpg",
  //       caption: "mathGameCaption3",
  //     },
  //     {
  //       fileName: "maths-4.jpg",
  //       caption: "mathGameCaption4",
  //     },
  //     {
  //       fileName: "maths-5.jpg",
  //       caption: "mathGameCaption5",
  //     },
  //     { fileName: "maths-6.jpg", caption: "mathGameCaption6" },
  //   ],
  // },
  {
    id: "crypto",
    title: "cryptoTitle",
    icon: "fab fa-bitcoin",
    description: "cryptoDescription",
    summary: `cryptoSummary`,
    technologies: [
      "React JS / Hooks V 16.13.18",
      "React Tooltip",
      "Tailwind CSS",
      "Nivo.rocks charts",
      "Typescript",
      "Coincap.io API",
    ],
    link: "https://cesarblasco.github.io/crypto-compare/",
    images: [
      { fileName: "crypto-1.jpg", caption: "cryptoCaption1" },
      { fileName: "crypto-2.jpg", caption: "cryptoCaption2" },
      { fileName: "crypto-3.jpg", caption: "cryptoCaption3" },
      { fileName: "crypto-4.jpg", caption: "cryptoCaption4" },
      { fileName: "crypto-5.jpg", caption: "cryptoCaption5" },
      { fileName: "crypto-6.jpg", caption: "cryptoCaption6" },
      { fileName: "crypto-7.jpg", caption: "cryptoCaption7" },
      { fileName: "crypto-8.jpg", caption: "cryptoCaption8" },
      { fileName: "crypto-9.jpg", caption: "cryptoCaption9" },
    ],
  },
  {
    id: "portfolio",
    title: "portfolioTitle",
    icon: "fas fa-suitcase",
    description: "portfolioDescription",
    summary: `portfolioSummary`,
    technologies: [
      "HTML",
      "SASS ---> CSS via Watch SASS VS code plugin",
      "JS / ES6",
      "JSON",
      "Font Awesome 5",
    ],
    images: [
      { fileName: "portfolio-1.jpg", caption: "portfolioCaption1" },
      { fileName: "portfolio-2.jpg", caption: "portfolioCaption2" },
      { fileName: "portfolio-3.jpg", caption: "portfolioCaption3" },
      { fileName: "portfolio-4.jpg", caption: "portfolioCaption4" },
    ],
  },
];

const viewInfoButtons = document.querySelectorAll(".project-info");
const projectModalInfo = document.getElementById("modal");
const categoryButtons = document.querySelectorAll(".category");
const projectsHtml = document.querySelectorAll(".project");
const closeModalIcon = document.getElementsByClassName("close")[0];
const modalBtn = document.getElementById("modal-btn");
const modalSeeProjectBtn = document.getElementById("modal-see-project");
const projectLink = document.getElementById("project-link");
const carouselContainer = document.getElementById("carousel");

let currentProject = null;

// my carousel.js
const previousImageButton = document.getElementById("previous");
const nextImageButton = document.getElementById("next");
const currentImageCaption = document.getElementById("current-caption");
const carouselPagesContainer = document.getElementById(
  "carousel-pages-container"
);
const carouselIntervalProgressbar = document.getElementById(
  "carousel-interval-progressbar"
);
let currentImageIndex = 0;
let carouselPagesElementCollection = null;

let prefixImageDirectory = "images/projects";
let carouselInterval = null;

viewInfoButtons.forEach((item) =>
  item.addEventListener("click", openProjectInformationModal)
);

closeModalIcon.addEventListener("click", closeProjectInformationModal);
modalBtn.addEventListener("click", closeProjectInformationModal);

categoryButtons.forEach((item) =>
  item.addEventListener("click", filterProjectsBySelectedCategory)
);

previousImageButton.addEventListener("click", () => {
  return setNextOrPreviousImageOfCurrentProject("backward");
});

nextImageButton.addEventListener("click", () => {
  return setNextOrPreviousImageOfCurrentProject("forward");
});

function setCarouselInterval() {
  carouselInterval = setInterval(() => {
    if (currentProject && carouselPagesElementCollection) {
      handleImageChange("forward");
    }
  }, 4500);
}

function openProjectInformationModal() {
  setCarouselInterval();

  currentImageIndex = 0;
  const selectedProjectId = this.getAttribute("data-project");
  currentProject = projects.find(({ id }) => selectedProjectId === id);

  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalSummary = document.getElementById("modal-summary");
  const modalTechnologies = document.getElementById("modal-technologies");
  const carouselPagesContainer = document.getElementById(
    "carousel-pages-container"
  );
  const modalIcons = document.getElementsByClassName("modal-icon");

  translateSpecificKey(modalTitle, "projects", currentProject.title);
  translateSpecificKey(
    modalDescription,
    "projects",
    currentProject.description
  );
  translateSpecificKey(modalSummary, "projects", currentProject.summary);
  if (currentProject.link) {
    modalSeeProjectBtn.style.display = "inline-block";
    projectLink.setAttribute("href", currentProject.link);
  } else {
    modalSeeProjectBtn.style.display = "none";
  }

  const path = `${prefixImageDirectory}/${currentProject.id}/${currentProject.images[currentImageIndex].fileName}`;
  const urlString = `url(${path})`;
  carousel.style.backgroundImage = urlString;

  translateSpecificKey(
    currentImageCaption,
    "projects",
    currentProject.images[currentImageIndex].caption
  );

  for (let i = 0; i < modalIcons.length; i++) {
    modalIcons[i].className = `modal-icon fa-2x ${currentProject.icon}`;
  }

  removeAllChildsFromNode(modalTechnologies);

  currentProject.technologies.forEach((technology) => {
    const node = document.createElement("div");
    node.classList = "pill presentational-pill";
    const textnode = document.createTextNode(`${technology}`);
    node.appendChild(textnode);
    document.getElementById("modal-technologies").appendChild(node);
  });

  removeAllChildsFromNode(carouselPagesContainer);

  currentProject.images.forEach((image, index) => {
    const node = document.createElement("i");
    node.classList = "fas fa-circle carousel-page";
    node.dataset.index = index;
    document.getElementById("carousel-pages-container").appendChild(node);
  });

  carouselPagesElementCollection = document.getElementsByClassName(
    "carousel-page"
  );

  const carouselPagesNodeCollection = document.querySelectorAll(
    ".carousel-page"
  );

  carouselPagesElementCollection[currentImageIndex].classList.add("active");
  projectModalInfo.style.display = "block";

  carouselPagesNodeCollection.forEach((node) => {
    node.addEventListener("click", handleImageChangeOnClickedCarouselPage);
  });
}

function removeAllChildsFromNode(node) {
  while (node.firstChild) {
    node.firstChild.remove();
  }
}

function closeProjectInformationModal() {
  projectModalInfo.style.display = "none";
  currentProject = null;
  clearInterval(carouselInterval);
}

function filterProjectsBySelectedCategory() {
  const selectedCategory = this.getAttribute("data-category");
  categoryButtons.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");

  if (selectedCategory === "all") {
    projectsHtml.forEach((item) => {
      item.classList.remove("hidden");
    });
  } else {
    projectsHtml.forEach((item) => {
      item.getAttribute("data-category") !== selectedCategory
        ? item.classList.add("hidden")
        : item.classList.remove("hidden");
    });
  }
}

function handleImageChangeOnClickedCarouselPage() {
  resetCarouselIntervalProgressbar();
  handleImageChange("forward", this.dataset.index);
}

function handleImageChange(direction, selectedCarouselPageIndex = "") {
  carouselPagesElementCollection[currentImageIndex].classList.remove("active");

  if (!!selectedCarouselPageIndex) {
    currentImageIndex = +selectedCarouselPageIndex;
  } else {
    currentImageIndex =
      direction === "forward"
        ? (currentImageIndex + 1) % currentProject.images.length
        : (currentImageIndex - 1 + currentProject.images.length) %
          currentProject.images.length;
  }

  carouselPagesElementCollection[currentImageIndex].classList.add("active");
  const path = `${prefixImageDirectory}/${currentProject.id}/${currentProject.images[currentImageIndex].fileName}`;
  const urlString = `url(${path})`;
  carousel.style.backgroundImage = urlString;

  translateSpecificKey(
    currentImageCaption,
    "projects",
    currentProject.images[currentImageIndex].caption
  );
}

function resetCarouselIntervalProgressbar() {
  clearInterval(carouselInterval);
  setCarouselInterval();
  carouselIntervalProgressbar.classList.remove("carousel-interval-progressbar");
  void carouselIntervalProgressbar.offsetWidth;
  carouselIntervalProgressbar.classList.add("carousel-interval-progressbar");
}

function setNextOrPreviousImageOfCurrentProject(direction) {
  resetCarouselIntervalProgressbar();
  handleImageChange(direction);
}
