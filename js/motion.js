const MOTION = {
  observer: null,
  cursor: null,
  cursorX: 0,
  cursorY: 0,
  particles: [],
};

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function initRevealAnimations() {
  if (REDUCED_MOTION) return;
  if ("IntersectionObserver" in window === false) return;

  const elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

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

export function initCursorFollower() {
  if (REDUCED_MOTION) return;
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
  if (REDUCED_MOTION) return;
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;
  const scrollThreshold = 100;

  function onScroll() {
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
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
}

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

export function initParticleSystem() {
  if (REDUCED_MOTION) return;
  const container = document.getElementById("hero-particles");
  if (!container) return;

  const canvas = document.createElement("canvas");
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const count = Math.min(30, Math.floor(window.innerWidth / 50));
  const particles = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1.5 + Math.random() * 2.5,
      speedY: 0.3 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: 0.2 + Math.random() * 0.5,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = document.documentElement.classList.contains("dark-theme");
    const color = isDark ? "212, 175, 55" : "0, 102, 204";

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
      ctx.fill();

      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y + p.size < 0) {
        p.y = canvas.height + p.size;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -p.size) p.x = canvas.width + p.size;
      if (p.x > canvas.width + p.size) p.x = -p.size;
    }

    requestAnimationFrame(draw);
  }

  draw();

  const resizeObserver = new ResizeObserver(() => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  });
  resizeObserver.observe(container);
}
