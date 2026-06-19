const STORAGE_KEY = "portfolio-theme";

export function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

export function loadSavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved === "light") {
    applyTheme("light");
    return "light";
  }

  if (saved === "dark" || prefersDark) {
    applyTheme("dark");
    return "dark";
  }

  applyTheme("dark");
  return "dark";
}

export function setupThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    toggle.style.transform = "rotate(180deg)";
    setTimeout(() => { toggle.style.transform = ""; }, 300);
  });
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(name, value) {
  switch (name) {
    case "name":
      return value.trim().length === 0 ? "Please enter your name." : "";
    case "email":
      return EMAIL_REGEX.test(value.trim())
        ? ""
        : "Please enter a valid email address.";
    case "message":
      return value.trim().length === 0 ? "Please write a message." : "";
    default:
      return "";
  }
}

export function setupFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("client-name");
  const emailInput = document.getElementById("client-email");
  const messageInput = document.getElementById("client-message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const successBanner = document.getElementById("form-success");

  const fields = [
    { input: nameInput, error: nameError, name: "name" },
    { input: emailInput, error: emailError, name: "email" },
    { input: messageInput, error: messageError, name: "message" },
  ];

  fields.forEach(({ input, error, name }) => {
    input.addEventListener("input", () => {
      const msg = validateField(name, input.value);
      error.textContent = msg;
      input.classList.toggle("invalid", !!msg);
    });

    input.addEventListener("blur", () => {
      const msg = validateField(name, input.value);
      error.textContent = msg;
      input.classList.toggle("invalid", !!msg);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (successBanner) successBanner.hidden = true;

    let hasError = false;

    fields.forEach(({ input, error, name }) => {
      const msg = validateField(name, input.value);
      error.textContent = msg;
      input.classList.toggle("invalid", !!msg);
      if (msg) hasError = true;
    });

    if (!hasError) {
      if (successBanner) {
        successBanner.hidden = false;
      }
      form.reset();
      fields.forEach(({ error }) => {
        error.textContent = "";
      });
    }
  });
}
