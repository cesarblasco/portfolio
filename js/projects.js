const viewInfoButtons = document.querySelectorAll(".project-info");
const projectModalInfo = document.getElementById("modal");
const categoryButtons = document.querySelectorAll(".category");
const projectsHtml = document.querySelectorAll(".project");
const closeModalIcon = document.getElementsByClassName("close")[0];
const modalBtn = document.getElementById("modal-btn");
const projectLink = document.getElementById("project-link");
const carouselContainer = document.getElementById("carousel");

let currentProject = null;

// my carousel.js
const previousImageButton = document.getElementById("previous");
// const currentCarouselImage = document.getElementById("current-carousel-image");
const nextImageButton = document.getElementById("next");
const currentImageCaption = document.getElementById("current-caption");
const carouselPagesContainer = document.getElementById(
  "carousel-pages-container"
);
let currentImageIndex = 0;
let carouselPagesElementCollection = null;

let prefixImageDirectory = "images/projects/";
let carouselInterval = null;

const projects = [
  {
    id: "dental",
    title: "Dental Clinic",
    icon: "fas fa-tooth",
    description: "Dental clinic management web app",
    summary: `My largest application yet. 
                  This application handles the whole flow of work in a dental clinic. It features the following modules:
                  appointments module, patient management, dentist management, patient history, interactive teeth view, 
                  billing, PDF and Excel reports`,
    technologies: ["Laravel Framework, Bootstrap 3, JQuery, Raphael.js, mySQL"],
    link: "http://www.gooogle.com",
    images: [
      { fileName: "project1.jpg", caption: "Login Screen" },
      { fileName: "project2.jpg", caption: "Appointments view" },
      { fileName: "project3.jpg", caption: "Managing patients" },
      { fileName: "project4.jpg", caption: "Teeth View" },
      { fileName: "project5.jpg", caption: "Billing" },
      { fileName: "project3.jpg", caption: "PDF report sample" },
      { fileName: "project2.jpg", caption: "Excel report sample" }
    ]
  },
  {
    id: "tribute",
    title: "Tribute page",
    icon: "fas fa-book",
    description: "A small bio page about Alan Turing",
    summary: `Part of the Free Code Camp challenges and frontend certificate`,
    technologies: ["Bootstrap 3"],
    link: "https://codepen.io/Cesar1337/pen/VmzzRL",
    images: [{ fileName: "tribute-page.jpg", caption: "Sample of the page" }]
  },
  {
    id: "lab",
    title: "CSS Lab",
    icon: "fas fa-flask",
    description: "A repository where I play around with CSS",
    summary: `Mini proyects where I apply css to create stuff like drawings or some basic layouts`,
    technologies: ["Basic HTML and CSS"],
    link: "https://cesarblasco.github.io/css-lab/",
    images: [
      { fileName: "css-lab-2.jpg", caption: "Animated compass" },
      { fileName: "css-lab-3.jpg", caption: "Cartoon building" },
      { fileName: "css-lab-4.jpg", caption: "CSS Box sample" }
    ]
  },
  {
    id: "search",
    title: "Github Search",
    icon: "fab fa-github",
    description:
      "Angular JS app that uses Github's API to search for users and see repository details",
    summary: `This project was the technical assessment sent to aspiring frontend developers for 
                  <a style="color: blue;" href="https://www.rankmi.com" target="_blank" noopener noreferrer>Rankmi.com</a> 
                  which I passed and got accepted into the team.`,
    technologies: [
      "Angular JS, UI Router, Bootstrap 3, TypeScript, Github API"
    ],
    link: "http://www.cesarblasco.github.io/angular-search",
    images: [
      {
        fileName: "github-search-1.jpg",
        caption: "Loading search from github user endpoint"
      },
      {
        fileName: "github-search-2.jpg",
        caption: "Search results for Angular user"
      },
      {
        fileName: "github-search-3.jpg",
        caption: "Selected repository detail"
      },
      {
        fileName: "github-search-4.jpg",
        caption: "End of repository detail with back button"
      }
    ]
  },
  {
    id: "math",
    title: "Math Game",
    icon: "fas fa-gamepad",
    description: "A little game developed in Unity 2D",
    summary: `A game I made while I was playing around with Unity 2D. Solve basic math problems and collect coins. You can get a sword
    if you have 10 coins by touching the golden treasures and use it with the spacebar`,
    technologies: ["Unity 2D, C#"],
    link: "https://cesarblasco.github.io/learnmaths/",
    images: [
      { fileName: "maths-1.jpg", caption: "Game start" },
      { fileName: "maths-2.jpg", caption: "Chasing some coins" },
      {
        fileName: "maths-3.jpg",
        caption: "Solve the problem and get more coins!"
      },
      {
        fileName: "maths-4.jpg",
        caption: "Problem solved! You get paid based on the answer"
      },
      {
        fileName: "maths-5.jpg",
        caption: "Just bought my sword with my hard earned money!"
      },
      { fileName: "maths-6.jpg", caption: "Swing that master sword!" }
    ]
  }
];

viewInfoButtons.forEach(item =>
  item.addEventListener("click", openProjectInformationModal)
);
closeModalIcon.addEventListener("click", closeProjectInformationModal);
modalBtn.addEventListener("click", closeProjectInformationModal);
categoryButtons.forEach(item =>
  item.addEventListener("click", filterProjectsBySelectedCategory)
);
previousImageButton.addEventListener("click", setPreviousImageOfCurrentProject);
nextImageButton.addEventListener("click", setNextImageOfCurrentProject);

function openProjectInformationModal() {
  carouselInterval = setInterval(() => {
    if (currentProject && carouselPagesElementCollection) {
      handleImageChange("forward");
    }
  }, 4500);

  currentImageIndex = 0;
  const selectedProjectId = this.getAttribute("data-project");
  currentProject = projects.find(({ id }) => selectedProjectId === id);

  console.log("selected project id", selectedProjectId, currentProject);
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalSummary = document.getElementById("modal-summary");
  const modalTechnologies = document.getElementById("modal-technologies");
  const carouselPagesContainer = document.getElementById(
    "carousel-pages-container"
  );
  const modalIcons = document.getElementsByClassName("modal-icon");

  modalTitle.innerHTML = currentProject.title;
  modalDescription.innerHTML = currentProject.description;
  modalSummary.innerHTML = currentProject.summary;
  projectLink.setAttribute("href", currentProject.link);
  // currentCarouselImage.setAttribute(
  //   "src",
  //   `${prefixImageDirectory}${currentProject.id}/${currentProject.images[currentImageIndex].fileName}`
  // );
  const path = `${prefixImageDirectory}${currentProject.id}/${currentProject.images[currentImageIndex].fileName}`;
  const urlString = `url(${path})`;
  carousel.style.backgroundImage = urlString;
  currentImageCaption.innerHTML =
    currentProject.images[currentImageIndex].caption;

  for (let i = 0; i < modalIcons.length; i++) {
    modalIcons[i].className = `modal-icon fa-2x ${currentProject.icon}`;
  }

  removeAllChildsFromNode(modalTechnologies);

  const node = document.createElement("span");
  const textnode = document.createTextNode(`${currentProject.technologies}`);
  node.appendChild(textnode);
  document.getElementById("modal-technologies").appendChild(node);

  removeAllChildsFromNode(carouselPagesContainer);

  currentProject.images.forEach(() => {
    const node = document.createElement("i");
    node.classList = "fas fa-circle carousel-page";
    document.getElementById("carousel-pages-container").appendChild(node);
  });

  carouselPagesElementCollection = document.getElementsByClassName(
    "carousel-page"
  );
  carouselPagesElementCollection[currentImageIndex].classList.add("active");
  projectModalInfo.style.display = "block";
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
  categoryButtons.forEach(item => item.classList.remove("active"));
  this.classList.add("active");

  if (selectedCategory === "all") {
    projectsHtml.forEach(item => {
      item.classList.remove("hidden");
    });
  } else {
    projectsHtml.forEach(item => {
      if (item.getAttribute("data-category") !== selectedCategory) {
        item.classList.add("hidden");
      } else {
        item.classList.remove("hidden");
      }
    });
  }
}

function handleImageChange(direction) {
  carouselPagesElementCollection[currentImageIndex].classList.remove("active");
  currentImageIndex =
    direction === "forward"
      ? (currentImageIndex + 1) % currentProject.images.length
      : (currentImageIndex - 1 + currentProject.images.length) %
        currentProject.images.length;
  carouselPagesElementCollection[currentImageIndex].classList.add("active");
  // currentCarouselImage.setAttribute(
  //   "src",
  //   `${prefixImageDirectory}${currentProject.id}/${currentProject.images[currentImageIndex].fileName}`
  // );
  const path = `${prefixImageDirectory}${currentProject.id}/${currentProject.images[currentImageIndex].fileName}`;
  const urlString = `url(${path})`;
  carousel.style.backgroundImage = urlString;
  currentImageCaption.innerHTML =
    currentProject.images[currentImageIndex].caption;
}

function setNextImageOfCurrentProject() {
  handleImageChange("forward");
}

function setPreviousImageOfCurrentProject() {
  handleImageChange("backward");
}
