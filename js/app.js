import { renderTeamGrid } from "./team.js";
import { loadSavedTheme, setupThemeToggle, setupFormValidation } from "./utils.js";
import {
  initRevealAnimations,
  staggerCardsOnScroll,
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

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

function init() {
  loadSavedTheme();
  renderTeamGrid();
  setupThemeToggle();
  setupFormValidation();
  initMobileNav();

  initRevealAnimations();
  staggerCardsOnScroll();
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
