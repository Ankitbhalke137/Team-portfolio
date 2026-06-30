const STORAGE_KEY = "portfolio-theme";

// Apply a theme by toggling the .dark-theme class on <html>
export function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark-theme");
  } else {
    document.documentElement.classList.remove("dark-theme");
  }
}

// Load saved theme from localStorage, fall back to OS preference, default to dark
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

// Wire up the theme toggle button – saves preference, adds rotation animation feedback
export function setupThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark-theme");
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    toggle.style.transform = "rotate(180deg)";
    setTimeout(() => { toggle.style.transform = ""; }, 300);
  });
}

// --- Form validation ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_REGEX = /^[A-Za-z\s]+$/;

// Returns an error message string (empty string = no error)
export function validateField(name, value) {
  switch (name) {
    case "name": {
      const trimmed = value.trim();
      if (trimmed.length === 0) return "Please enter your name.";
      if (trimmed.length < 3) return "Name must be at least 3 characters.";
      if (!NAME_REGEX.test(trimmed)) return "Name can only contain letters and spaces.";
      return "";
    }
    case "email":
      return EMAIL_REGEX.test(value.trim())
        ? ""
        : "Please enter a valid email address.";
    case "message":
      return value.trim().length < 20
        ? "Message must be at least 20 characters."
        : "";
    default:
      return "";
  }
}

// Attach real-time validation to all form fields, handle submit with simulated loading
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

  function hideSuccess() {
    if (successBanner) successBanner.classList.remove("visible");
  }

  function showSuccess() {
    if (successBanner) successBanner.classList.add("visible");
  }

  // Real-time validation on input and blur
  fields.forEach(({ input, error, name }) => {
    input.addEventListener("input", () => {
      hideSuccess();
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

  const submitBtn = form.querySelector(".btn-submit");

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle("btn-loading", loading);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    hideSuccess();

    // Re-validate all fields on submit
    let hasError = false;

    fields.forEach(({ input, error, name }) => {
      const msg = validateField(name, input.value);
      error.textContent = msg;
      input.classList.toggle("invalid", !!msg);
      if (msg) hasError = true;
    });

    if (hasError) return;

    // Simulate loading, then reset form and show success banner
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      form.reset();
      fields.forEach(({ error }) => {
        error.textContent = "";
      });
      showSuccess();

      // Auto-dismiss success after 4 seconds
      setTimeout(hideSuccess, 4000);
    }, 1500);
  });
}
