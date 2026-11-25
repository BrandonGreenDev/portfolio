import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <p className="footer__text">
              © {new Date().getFullYear()} Brandon Green. Built with React and TypeScript.
            </p>
            <div className="footer__links">
              <a href="#home" className="footer__link">
                Home
              </a>
              <a href="#about" className="footer__link">
                About
              </a>
              <a href="#experience" className="footer__link">
                Experience
              </a>
              <a href="#skills" className="footer__link">
                Skills
              </a>
              <a href="#projects" className="footer__link">
                Projects
              </a>
              <a href="#contact" className="footer__link">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
