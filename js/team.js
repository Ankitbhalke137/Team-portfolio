export const TEAM_MEMBERS = [
  {
    name: "Kshitij Das",
    role: "Frontend Developer",
    avatarUrl: "https://ui-avatars.com/api/?name=Kshitij+Das&background=d97706&color=fff&size=150",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    githubLink: "https://github.com/kshitijdas"
  },
  {
    name: "Priya Sharma",
    role: "UI / UX Designer",
    avatarUrl: "https://ui-avatars.com/api/?name=Priya+Sharma&background=b45309&color=fff&size=150",
    skills: ["Figma", "CSS", "Accessibility", "Prototyping"],
    githubLink: "https://github.com/priyasharma"
  },
  {
    name: "Rahul Verma",
    role: "Backend Developer",
    avatarUrl: "https://ui-avatars.com/api/?name=Rahul+Verma&background=92400e&color=fff&size=150",
    skills: ["Node.js", "APIs", "Databases", "Python"],
    githubLink: "https://github.com/rahulverma"
  },
  {
    name: "Sneha Patel",
    role: "Full Stack Developer",
    avatarUrl: "https://ui-avatars.com/api/?name=Sneha+Patel&background=78350f&color=fff&size=150",
    skills: ["JavaScript", "HTML", "CSS", "MongoDB"],
    githubLink: "https://github.com/snehapatel"
  },
  {
    name: "Arjun Nair",
    role: "DevOps Engineer",
    avatarUrl: "https://ui-avatars.com/api/?name=Arjun+Nair&background=451a03&color=f0b429&size=150",
    skills: ["Docker", "CI/CD", "Linux", "Cloud"],
    githubLink: "https://github.com/arjunnair"
  },
  {
    name: "Ananya Gupta",
    role: "Quality Analyst",
    avatarUrl: "https://ui-avatars.com/api/?name=Ananya+Gupta&background=292524&color=f0b429&size=150",
    skills: ["Testing", "Cypress", "Jest", "Accessibility"],
    githubLink: "https://github.com/ananyagupta"
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
    <a
      href="${member.githubLink}"
      class="team-github"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${member.name}'s GitHub profile"
    >
      GitHub &rarr;
    </a>
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
