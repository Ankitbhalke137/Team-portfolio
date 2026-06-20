import { renderTeamGrid } from "./team.js";
import { renderProjects } from "./projects.js";
import { loadSavedTheme, setupThemeToggle, setupFormValidation } from "./utils.js";
import {
  initRevealAnimations,
  initCursorFollower,
  initCardMouseGlow,
  initTeamCardTilt,
  initNavScrollBehavior,
  initHeroParallax,
  initParticleSystem,
} from "./motion.js";

function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  function closeNav() {
    navMenu.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) closeNav();
  });

  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeNav();
    }
  });

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      closeNav();
    });
  });
}

function init() {
  loadSavedTheme();
  renderTeamGrid();
  renderProjects();
  setupThemeToggle();
  setupFormValidation();
  initMobileNav();

  initRevealAnimations();
  initCardMouseGlow();
  initTeamCardTilt();
  initNavScrollBehavior();
  initHeroParallax();
  initParticleSystem();
  initCursorFollower();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
