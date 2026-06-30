// Shared state for motion systems
const MOTION = {
  observer: null,
};

// Check user's motion preference once at init
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Custom easing: starts fast, decelerates to zero
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// --- Scroll-triggered reveal animations via IntersectionObserver ---
export function initRevealAnimations() {
  if (REDUCED_MOTION) return;
  if ("IntersectionObserver" in window === false) return;

  const elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

  // Reveal elements already in view on init (without animation)
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 60 && rect.bottom > 0;
  }

  elements.forEach((el) => {
    if (isInViewport(el)) {
      el.style.transition = "none";
      el.classList.add("revealed");
      requestAnimationFrame(() => { el.style.transition = ""; });
    }
  });

  MOTION.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          MOTION.observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => MOTION.observer.observe(el));
}

// --- Auto-hide header on scroll down, show on scroll up ---
export function initNavScrollBehavior() {
  if (REDUCED_MOTION) return;
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;
  const scrollThreshold = 100;

  function onScroll() {
    const currentScroll = window.scrollY;

    // Add border once past hero
    if (currentScroll > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Hide when scrolling down, reveal when scrolling up
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  // Throttled via requestAnimationFrame
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
}

// --- Hero background parallax ---
// Moves background image at 35% of scroll speed, constrained to hero height
export function initHeroParallax() {
  if (REDUCED_MOTION) return;
  const heroBg = document.querySelector(".hero-bg");
  if (!heroBg) return;

  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector(".hero")?.offsetHeight || window.innerHeight;
    if (scrollY <= heroHeight) {
      const offset = scrollY * 0.35;
      heroBg.style.transform = `translateY(${offset}px) scale(1.1)`;
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
}
