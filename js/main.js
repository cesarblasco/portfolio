const menuNav = document.getElementById("menu-nav");
const menu = document.querySelector(".menu");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");
const languagesDropdownBtn = document.getElementById("languages-dropdown-btn");
const languagesDropdownIcon = document.getElementById(
  "languages-dropdown-icon"
);
const languagesDropdown = document.getElementById("languages-dropdown");
let showMenu = false;
let scrollPos = 0;
let displayLanguagesDropdown = false;

languagesDropdownBtn.addEventListener("click", () => {
  displayLanguagesDropdown = !displayLanguagesDropdown;
  languagesDropdown.style.display = displayLanguagesDropdown ? "block" : "none";

  languagesDropdownIcon.classList.remove("fa-chevron-down");
  languagesDropdownIcon.classList.remove("fa-chevron-up");

  const newIconClass = displayLanguagesDropdown
    ? "fa-chevron-up"
    : "fa-chevron-down";
  languagesDropdownIcon.classList.add(newIconClass);
});

window.addEventListener("scroll", () => {
  // https://codepen.io/lehollandaisvolant/pen/ryrrGx
  let opacityFactor = 0;

  if (document.body.getBoundingClientRect().top > scrollPos) {
    menuNav.style.opacity = 1;
    opacityFactor = -0.2;
    languagesDropdown.style.display = displayLanguagesDropdown
      ? "block"
      : "none";

    // setInterval(() => {
    //   menuNav.style.opacity = menuNav.style.opacity - opacityFactor;
    // }, 100);
    console.log("scrolling UP biatch");
  } else {
    menuNav.style.opacity = 0;
    opacityFactor = 0.2;
    languagesDropdown.style.display = "none";

    // setInterval(() => {
    //   menuNav.style.opacity = menuNav.style.opacity - opacityFactor;
    // }, 100);

    console.log("scrolling DOWN biatch");
  }

  scrollPos = document.body.getBoundingClientRect().top;
});

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));
  }
  showMenu = !showMenu;
}
