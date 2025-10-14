import React from "react";
import CalcDemoImg from "../../assets/CalcDemo.JPG";
import toDoDemo from "../../assets/todo.JPG";
import windowsXPImg from "../../assets/windowsxp.JPG";
import cryptoImg from "../../assets/crypto.JPG";
import lavaImg from "../../assets/lava.png";
import bwImg from "../../assets/bw.png";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";
import "./Projects.css";

// Sample project data - this would typically come from an API or CMS
const projects: Project[] = [
  {
    id: "1",
    title: "Windows XP emulated in React",
    description: "this is a front end UI experience of old school windows",
    longDescription:
      "Enjoy the nostalgia with many functioning windows apps and features. we have folder navigation, text editor, file saving, file explorer, start menu, DOS games such as DOOM, minesweeper, and Solitaire. classic windows sounds and more! Click around and have fun!",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Tailwind CSS",
      "CSS Grid",
    ],
    imageUrl: windowsXPImg,
    demoUrl: "https://windows-xp-orpin.vercel.app/",
    codeUrl: "https://github.com/username/weather-dashboard",
    featured: true,
  },
  {
    id: "2",
    title: "A Simple Calculator",
    description: "A simple calculator really.. what did you expect",
    longDescription:
      "I wanted to see if I could take an image of a calcuator and embed logic into it as if you were actually using a physical calculator!",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl: CalcDemoImg,
    demoUrl: "https://brandongreendev.github.io/anothercalculator/",
    codeUrl: "https://github.com/BrandonGreenDev/anothercalculator",
    featured: false,
  },
  {
    id: "3",
    title: "crypto Currency Portfolio/Tracker",
    description:
      "A modern crypto currency tracker and portfolio management app",
    longDescription:
      "This project is just a small showcase of beautiful UI/UX design and animations and back end integration with a third party API to fetch real-time crypto data.",
    technologies: [
      "React",
      "TypeScript",
      "JSX/TSX",
      "Vite",
      "Tailwind CSS",
      "PostCSS",
      "Autoprefixer",
      "Axios",
      "Recharts",
      "ESLint",
      "Prettier",
    ],
    imageUrl: cryptoImg,
    demoUrl: "https://bg-dev-cryptotracker.vercel.app/",
    codeUrl: "https://github.com/BrandonGreenDev/cryptotracker",
    featured: true,
  },
  {
    id: "4",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates",
    longDescription:
      "Developed a simple to-do app that mimics needed behaviors such as sectional filtering, date-time filtering, important task filtering.",
    technologies: ["React", "TypeScript", "LocalStorage", "Material-UI"],
    imageUrl: toDoDemo,
    demoUrl: "https://brandongreendev.github.io/ThingsAlternative/",
    codeUrl: "https://github.com/BrandonGreenDev/ThingsAlternative",
    featured: false,
  },

  {
    id: "5",
    title: "Lava Wall",
    description:
      "this is a not so simple lava lamp emulator but on your computer screen!",
    longDescription:
      "this lava wall application uses Vector math utility functions for 2D calculations, Class constructors for object initialization, Instance methods for object behavior,Arrow functions for event handling and preserving context, and more!",
    technologies: [
      "TypeScript",
      "HTML5",
      "CSS3",
      "Vite",
      "ES Modules",
      "WebGL",
      "Canvas API",
    ],
    imageUrl: lavaImg,
    demoUrl: "https://lava-wall.vercel.app/",
    codeUrl: "https://github.com/BrandonGreenDev/lava-wall",
    featured: true,
  },
  {
    id: "6",
    title: "Beautiful Weather",
    description:
      "as a mostly UX/UI designer I had to showcase at least one weather app",
    longDescription:
      "Everyone and their mother can write a weather app but I wanted to focus on modern design and making it beautiful. This weather app uses meteo api to fetch real time weather data and display it in a clean and modern way.",
    technologies: ["TypeScript", "HTML5", "CSS3", "Vite", "Open-Meteo API"],
    imageUrl: bwImg,
    demoUrl: "https://beautiful-weather-one.vercel.app/",
    codeUrl: "https://github.com/BrandonGreenDev/beautiful-weather",
    featured: true,
  },
];

const Projects: React.FC = () => {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="projects__header">
          <h2 className="projects__title">Featured Projects</h2>
          <p className="projects__subtitle">
            A showcase of my recent work in web development, featuring modern
            technologies and best practices in user experience design.
          </p>
        </div>

        <div className="projects__featured">
          <div className="projects__grid projects__grid--featured">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </div>

        {otherProjects.length > 0 && (
          <div className="projects__other">
            <h3 className="projects__section-title">Other Projects</h3>
            <div className="projects__grid">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        <div className="projects__cta">
          <p className="projects__cta-text">
            Want to see more of my work or discuss a project?
          </p>
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
