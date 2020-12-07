const menuNav = document.getElementById("menu-nav");
const menu = document.querySelector(".menu");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");
const languagesDropdownBtn = document.getElementById("languages-dropdown-btn");
const languagesDropdownIcon = document.getElementById(
  "languages-dropdown-icon"
);
const languagesDropdown = document.getElementById("languages-dropdown");
const currentYear = document.getElementById("current-year");
const menuMobileBtn = document.getElementById("menu-mobile-btn");
let showMenu = false;
let scrollPos = 0;
let displayLanguagesDropdown = false;

function getCurrentYear() {
  const currentDate = new Date();
  if (currentYear) {
    currentYear.innerHTML = currentDate.getFullYear();
  }
}

getCurrentYear();

languagesDropdownBtn.addEventListener("click", () => {
  displayLanguagesDropdown = !displayLanguagesDropdown;
  displayLanguagesDropdown
    ? languagesDropdownBtn.classList.add("active")
    : languagesDropdownBtn.classList.remove("active");

  languagesDropdown.style.display = displayLanguagesDropdown ? "block" : "none";

  languagesDropdownIcon.classList.remove("fa-chevron-down");
  languagesDropdownIcon.classList.remove("fa-chevron-up");

  const newIconClass = displayLanguagesDropdown
    ? "fa-chevron-up"
    : "fa-chevron-down";

  languagesDropdownBtn.setAttribute("aria-expanded",displayLanguagesDropdown ? "true" : "false");
  languagesDropdownIcon.classList.add(newIconClass);
});
