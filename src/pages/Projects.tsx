export interface Project {
  id: string;
  title: string;
  year: number;
  role: string;
  tags: string[];
  /** Cover block colour (any CSS colour) */
  color: string;
  summary: string;
  details: string;
  stack: string[];
  links: { download: string};
}

export interface ProjectPortfolioProps {
  projects?: Project[];
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "bubblegum",
    title: "Bubblegum Bandit",
    year: 2023,
    role: "Programmer, Composer, Artist",
    tags: ["Student Project"],
    color: "#db3bce",
    summary: "Colorful Action Platformer",
    details:
      "With the power of gravity manipulation and bubblegum, the Bubblegum Bandit wreaks havoc and takes revenge! Steal from evil robots and blow up their ships!",
    stack: ["Java", "Figma"],
    links: { download: "https://store.steampowered.com/app/2460680/Bubblegum_Bandit/"},
  },
  {
    id: "animalspies",
    title: "Animal Spies",
    year: 2025,
    role: "Team Lead, Developer",
    tags: ["Student Project"],
    color: "#dbdb3b",
    summary: "Multiplayer Trap-Building Multi-Tasking Race",
    details:
      "Race friends in a 1v1 multiplayer mobile game",
    stack: ["C++"],
    links: { download: "#"},
  },
  {
    id: "heaveninc",
    title: "Heaven Incorporated",
    year: 2025,
    role: "Developer",
    tags: ["Game Jam"],
    color: "#3b9edb",
    summary: "Stop the earth from exploding!",
    details:
      "Race friends in a 1v1 multiplayer mobile game",
    stack: ["Unity"],
    links: { download: "#"},
  },
];

export function ProjectItem(project : Project){
  return ( 
  <div>

    <div style={{ background: project.color }}>
      <span>{project.title}</span>
    </div>

    <h2>{project.title}</h2>

    <p>
      {project.role}, {project.year}
    </p>

    <p>{project.details}</p>

    <ul>
      {project.stack.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>

    <div>
      <a href={project.links.download}>Visit Game Page</a>
    </div>

    
    <div>
    </div>

  </div>       
  )
}




export default function ProjectPortfolio({projects = DEFAULT_PROJECTS}) {
  return (
    <div>
      {projects.map((project, index) => {
        return (
          <div key={index}>
            <ProjectItem {...project}></ProjectItem>
          </div>
        );
      })}
    </div>
  );
}
