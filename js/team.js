export const TEAM_MEMBERS = [
  {
    name: "Kshitij Das",
    role: "Frontend Developer",
    avatarUrl: "https://ui-avatars.com/api/?name=Kshitij+Das&background=d97706&color=fff&size=150",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    githubLink: "https://github.com/kshitijdas",
    linkedinLink: "https://linkedin.com/in/kshitijdas"
  },
  {
    name: "Ankit Bhalke",
    role: "Full-Stack Developer",
    avatarUrl: "https://ui-avatars.com/api/?name=Ankit+Bhalke&background=92400e&color=fff&size=150",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    githubLink: "https://github.com/ankitbhalke",
    linkedinLink: "https://linkedin.com/in/ankitbhalke"
  },
  {
    name: "Sai Shendge",
    role: "UI/UX Designer",
    avatarUrl: "https://ui-avatars.com/api/?name=Sai+Shendge&background=b45309&color=fff&size=150",
    skills: ["Figma", "CSS", "Prototyping", "Accessibility"],
    githubLink: "https://github.com/saishendge",
    linkedinLink: "https://linkedin.com/in/saishendge"
  },
  {
    name: "Dhruv Teja",
    role: "DevOps Engineer",
    avatarUrl: "https://ui-avatars.com/api/?name=Dhruv+Teja&background=78350f&color=fff&size=150",
    skills: ["Docker", "CI/CD", "AWS", "Linux"],
    githubLink: "https://github.com/dhruvteja",
    linkedinLink: "https://linkedin.com/in/dhruvteja"
  }
];

export function createTeamCard(member) {
  const skillsHtml = member.skills
    .map(skill => `<span class="team-skill">${skill}</span>`)
    .join("");

  const card = document.createElement("article");
  card.className = "team-card";
  card.setAttribute("data-reveal", "");
  card.innerHTML = `
    <img
      src="${member.avatarUrl}"
      alt="${member.name}"
      class="team-avatar"
      loading="lazy"
      width="100"
      height="100"
    >
    <h3 class="team-name">${member.name}</h3>
    <p class="team-role">${member.role}</p>
    <div class="team-skills">${skillsHtml}</div>
    <div class="team-socials">
      <a
        href="${member.githubLink}"
        class="team-social-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${member.name}'s GitHub profile"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
      <a
        href="${member.linkedinLink}"
        class="team-social-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${member.name}'s LinkedIn profile"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
    </div>
  `;
  return card;
}

export function renderTeamGrid() {
  const grid = document.getElementById("team-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  TEAM_MEMBERS.forEach((member, index) => {
    const card = createTeamCard(member);
    card.setAttribute("data-reveal-delay", String(index * 100));
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}
