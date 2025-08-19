import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
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
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <p className="footer__text">
              © 2024 Brandon Green. Built with React and TypeScript.
            </p>
            <div className="footer__links">
              <a href="#home" className="footer__link">
                Home
              </a>
              <a href="#about" className="footer__link">
                About
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
