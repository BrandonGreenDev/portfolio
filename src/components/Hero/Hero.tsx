import React from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
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
            <p className="hero__subtitle">Full-Stack Developer</p>
            <h1 className="hero__title">
              Building Modern
              <br />
              <span className="hero__title-accent">Web Experiences</span>
            </h1>
            <p className="hero__description">
              I create responsive, performant web applications using modern
              technologies. Specializing in React, Vite, TypeScript, Next.js,
              Express.js, Tailwind CSS, and APIs. I focus on creating a strong
              user experience for the average user, always staying up to date
              with the latest technologies.
            </p>

            <div className="hero__actions">
              <button
                className="btn btn-primary"
                onClick={handleScrollToProjects}
              >
                View My Work
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleScrollToContact}
              >
                Get In Touch
              </button>
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
  skills: ["React", "Vite", "TypeScript", "Node.js", Next.js", "Express.js", "Tailwind CSS"],
  passion: "Creating amazing experiences",
  
  buildProject: () => {
    return "Something awesome!";
  }
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
