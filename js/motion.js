const MOTION = {
  observer: null,
  cursor: null,
  cursorX: 0,
  cursorY: 0,
  particles: [],
};

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function initRevealAnimations() {
  if ("IntersectionObserver" in window === false) return;

  const elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

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

export function staggerCardsOnScroll() {
  const grids = [document.getElementById("team-grid"), document.getElementById("projects-grid")];

  grids.forEach((grid) => {
    if (!grid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    grid.classList.add("stagger-children");
    observer.observe(grid);
  });
}

export function initCursorFollower() {
  const cursor = document.getElementById("cursor-follower");
  if (!cursor) return;

  MOTION.cursor = cursor;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!cursor.classList.contains("visible")) {
      cursor.classList.add("visible");
    }
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("visible");
  });

  const hoverTargets = document.querySelectorAll(
    "a, button, .team-card, .project-card, .btn"
  );

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
  });

  function animate() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;

    if (
      Math.abs(currentX - targetX) > 0.01 ||
      Math.abs(currentY - targetY) > 0.01
    ) {
      requestAnimationFrame(animate);
    } else {
      currentX = targetX;
      currentY = targetY;
      requestAnimationFrame(animate);
    }
  }

  animate();
}

export function initCardMouseGlow() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });
}

export function initTeamCardTilt() {
  const cards = document.querySelectorAll(".team-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

export function initNavScrollBehavior() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 100;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;

      if (currentScroll > scrollThreshold) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );
}

export function initHeroParallax() {
  const heroBg = document.querySelector(".hero-bg");
  if (!heroBg) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector(".hero")?.offsetHeight || window.innerHeight;
    if (scrollY > heroHeight) return;
    const offset = scrollY * 0.35;
    heroBg.style.transform = `translateY(${offset}px) scale(1.1)`;
  }, { passive: true });
}

export function initParticleSystem() {
  const container = document.getElementById("hero-particles");
  if (!container) return;

  const particleCount = Math.min(20, Math.floor(window.innerWidth / 40));

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "hero-particle";
    const size = 2 + Math.random() * 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${12 + Math.random() * 18}s`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(particle);
  }
}
