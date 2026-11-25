import React from "react";
import { profile } from "../../data/profile";
import "./Hero.css";

const Hero: React.FC = () => {
  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero__background">
        <div className="hero__gradient"></div>
        <div className="hero__pattern"></div>
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <p className="hero__subtitle">Front-End Developer · ServiceNow</p>
            <h1 className="hero__title">
              Building Modern
              <br />
              <span className="hero__title-accent">Web Experiences</span>
            </h1>
            <p className="hero__description">
              I build accessible, responsive interfaces in React, Angular and
              TypeScript, from reusable component libraries to apps that meet
              WCAG. Today I'm a Technical Support Engineer at ServiceNow,
              debugging enterprise platforms across UI Builder, Service Portal
              and Now Assist.
            </p>

            <div className="hero__actions">
              <button
                className="btn btn-primary"
                onClick={handleScrollToProjects}
              >
                View My Work
              </button>
              <a
                href={profile.resumeUrl}
                download
                className="btn btn-secondary"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__code-preview">
              <div className="code-window">
                <div className="code-window__header">
                  <div className="code-window__dots">
                    <span className="dot dot--red"></span>
                    <span className="dot dot--yellow"></span>
                    <span className="dot dot--green"></span>
                  </div>
                  <span className="code-window__title">portfolio.tsx</span>
                </div>
                <div className="code-window__content">
                  <pre className="code">
                    {`const developer = {
  name: "Brandon Green",
  skills: [
    "Angular", "React", "Vite",
    "TypeScript", "JavaScript",
    "Node.js", "Next.js",
    "Express.js", "Tailwind CSS",
    "Ruby", "Rails", "Python",
    "Django", "SQL", "NoSQL",
    "GraphQL", "REST APIs", "Git",
    "Docker", "CI/CD", "ServiceNow",
  ],
  certifications: [
    "ServiceNow CSA",
    "ServiceNow CAD",
  ],
  focus: "Accessible UIs",
};`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__scroll-indicator">
          <div className="scroll-arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
