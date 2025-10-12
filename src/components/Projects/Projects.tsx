import React from "react";
import CalcDemoImg from "../../assets/CalcDemo.JPG";
import toDoDemo from "../../assets/todo.JPG";
import windowsXPImg from "../../assets/windowsxp.JPG";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";
import "./Projects.css";

// Sample project data - this would typically come from an API or CMS
const projects: Project[] = [
  {
    id: "1",
    title: "Windows XP emulated in React",
    description:
      "A responsive weather application with location-based forecasts",
    longDescription:
      "Created a weather dashboard that provides current conditions and 7-day forecasts. Features include geolocation, search functionality, favorite locations, and weather alerts.",
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
    featured: true,
  },
  {
    id: "3",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates",
    longDescription:
      "Developed a simple to-do app that mimics needed behaviors such as sectional filtering, date-time filtering, important task filtering.",
    technologies: ["React", "TypeScript", "LocalStorage", "Material-UI"],
    imageUrl: toDoDemo,
    demoUrl: "https://brandongreendev.github.io/ThingsAlternative/",
    codeUrl: "https://github.com/BrandonGreenDev/ThingsAlternative",
    featured: true,
  },

  {
    id: "4",
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React and TypeScript",
    longDescription:
      "Designed and developed a clean, minimalist portfolio website featuring smooth animations, responsive design, and optimized performance. Includes project showcase, contact forms, and blog integration.",
    technologies: ["React", "TypeScript", "CSS3", "Framer Motion", "Netlify"],
    imageUrl:
      "https://via.placeholder.com/400x250/1a1f2e/4a9eff?text=Portfolio+Website",
    demoUrl: "https://portfolio.example.com",
    codeUrl: "https://github.com/username/portfolio",
    featured: false,
  },
  {
    id: "5",
    title: "Social Media Analytics",
    description: "A data visualization dashboard for social media metrics",
    longDescription:
      "Built a comprehensive analytics dashboard that aggregates data from multiple social media platforms. Features interactive charts, custom date ranges, and automated reporting.",
    technologies: ["React", "D3.js", "Python", "FastAPI", "Redis", "Docker"],
    imageUrl:
      "https://via.placeholder.com/400x250/1a1f2e/4a9eff?text=Analytics+Dashboard",
    demoUrl: "https://demo-analytics.example.com",
    codeUrl: "https://github.com/username/social-analytics",
    featured: false,
  },
  {
    id: "6",
    title: "Recipe Finder App",
    description:
      "A mobile-first recipe discovery app with ingredient-based search",
    longDescription:
      "Developed a recipe discovery application that allows users to search by ingredients, dietary restrictions, and cuisine types. Includes meal planning, shopping lists, and nutritional information.",
    technologies: [
      "React Native",
      "Expo",
      "Firebase",
      "Spoonacular API",
      "AsyncStorage",
    ],
    imageUrl:
      "https://via.placeholder.com/400x250/1a1f2e/4a9eff?text=Recipe+Finder",
    demoUrl: "https://demo-recipes.example.com",
    codeUrl: "https://github.com/username/recipe-finder",
    featured: false,
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
