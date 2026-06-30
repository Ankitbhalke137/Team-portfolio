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

// --- Mobile navigation (hamburger toggle + smooth scroll on link click) ---
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const backdrop = document.getElementById("nav-backdrop");

  if (!hamburger || !navMenu) return;

  function openNav() {
    navMenu.classList.add("open");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    if (backdrop) backdrop.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    navMenu.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.classList.remove("visible");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close nav on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) closeNav();
  });

  // Close nav when tapping backdrop
  if (backdrop) {
    backdrop.addEventListener("click", closeNav);
  }

  // Smooth-scroll nav links and close nav
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

// --- Bootstrap ---
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

// Run on DOMContentLoaded, or immediately if already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
