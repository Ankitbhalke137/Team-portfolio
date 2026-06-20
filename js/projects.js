export const PROJECTS = [
  {
    title: "Team Portfolio",
    description: "The central hub — introducing our collective and linking every project in the ecosystem.",
    status: "Active",
    icon: "layout",
    repoUrl: "https://github.com/Ankitbhalke137/Team-portfolio",
    liveUrl: "https://ankitbhalke137.github.io/Team-portfolio"
  },
  {
    title: "Interactive Quiz",
    description: "Adaptive quiz engine with real-time scoring, state management, and dynamic feedback.",
    status: "Completed",
    icon: "play",
    repoUrl: "https://github.com/slndtsripati/Interactive_Quiz_App",
    liveUrl: "https://slndtsripati.github.io/Interactive_Quiz_App"
  },
  {
    title: "Expense Tracker",
    description: "Full CRUD ledger with array reduction, filters, and localStorage persistence.",
    status: "Completed",
    icon: "dollar",
    repoUrl: "https://github.com/Ankitbhalke137/Expense-tracker",
    liveUrl: "https://ankitbhalke137.github.io/Expense-tracker"
  },
  {
    title: "Live News Feed",
    description: "Async news aggregator with live API fetching, search, and category filtering.",
    status: "Completed",
    icon: "mail",
    repoUrl: "https://github.com/Ankitbhalke137/LIVE-NEWS-FEED",
    liveUrl: "https://ankitbhalke137.github.io/LIVE-NEWS-FEED"
  },
  {
    title: "GitHub Explorer",
    description: "Multi-endpoint API tool revealing user profiles, repos, and language analytics.",
    status: "Completed",
    icon: "github",
    repoUrl: "https://github.com/kshitij-das-01/github_dev_explorer",
    liveUrl: "https://kshitij-das-01.github.io/github_dev_explorer"
  },
  {
    title: "Kanban Board",
    description: "Drag-and-drop task board with complex state persistence across columns.",
    status: "Completed",
    icon: "grid",
    repoUrl: "https://github.com/saishendge6/Kanban",
    liveUrl: "https://saishendge6.github.io/Kanban"
  }
];

const ICON_PATHS = {
  layout: `<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>`,
  play: `<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>`,
  dollar: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
  mail: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`,
  github: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`,
  grid: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`
};

export function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.setAttribute("data-reveal", "");
  card.setAttribute("data-reveal-delay", String(index * 100));

  const iconPath = ICON_PATHS[project.icon] || ICON_PATHS.layout;

  card.innerHTML = `
    <div class="project-icon" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        ${iconPath}
      </svg>
    </div>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-desc">${project.description}</p>
    <span class="project-badge">${project.status}</span>
    <div class="project-actions">
      <a href="${project.repoUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer" aria-label="View ${project.title} repository">GitHub Repo</a>
      <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label="View live ${project.title}">Live Demo</a>
    </div>
  `;

  return card;
}

export function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const fragment = document.createDocumentFragment();
  PROJECTS.forEach((project, index) => {
    fragment.appendChild(createProjectCard(project, index));
  });

  grid.appendChild(fragment);
}
