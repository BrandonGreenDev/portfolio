import React from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";
import "./Projects.css";

// Sample project data - this would typically come from an API or CMS
const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and PostgreSQL",
    longDescription:
      "Built a complete e-commerce platform featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Implemented responsive design and optimized for performance.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
    ],
    imageUrl:
      "https://via.placeholder.com/400x250/1a1f2e/4a9eff?text=E-Commerce+Platform",
    demoUrl: "https://demo-ecommerce.example.com",
    codeUrl: "https://github.com/username/ecommerce-platform",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates",
    longDescription:
      "Developed a team collaboration tool with drag-and-drop functionality, real-time notifications, file attachments, and project analytics. Features include team management and progress tracking.",
    technologies: ["React", "Socket.io", "Express", "MongoDB", "Material-UI"],
    imageUrl:
      "https://via.placeholder.com/400x250/1a1f2e/4a9eff?text=Task+Manager",
    demoUrl: "https://demo-taskmanager.example.com",
    codeUrl: "https://github.com/username/task-manager",
    featured: true,
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "A responsive weather application with location-based forecasts",
    longDescription:
      "Created a weather dashboard that provides current conditions and 7-day forecasts. Features include geolocation, search functionality, favorite locations, and weather alerts.",
    technologies: [
      "React",
      "TypeScript",
      "OpenWeather API",
      "Chart.js",
      "CSS Grid",
    ],
    imageUrl:
      "https://via.placeholder.com/400x250/1a1f2e/4a9eff?text=Weather+Dashboard",
    demoUrl: "https://demo-weather.example.com",
    codeUrl: "https://github.com/username/weather-dashboard",
    featured: false,
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
    featured: true,
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
