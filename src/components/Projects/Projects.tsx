import React from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "../../data/projects";
import "./Projects.css";

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
