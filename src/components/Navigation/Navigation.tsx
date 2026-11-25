import React, { useState } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { NavigationItem } from "../../types";
import logo from "../../assets/logo.png";
import "./Navigation.css";

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navigation: React.FC = () => {
  const { isScrolled } = useScrollPosition(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? "navigation--scrolled" : ""}`}>
      <div className="navigation__container">
        <div className="navigation__logo">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
          >
            <img src={logo} alt="Brandon Green, back to top" className="navigation__logo-img" />
          </a>
        </div>

        <ul
          id="primary-navigation"
          className={`navigation__menu ${
            isMenuOpen ? "navigation__menu--open" : ""
          }`}
        >
          {navigationItems.map((item) => (
            <li key={item.label} className="navigation__item">
              <a
                href={item.href}
                className="navigation__link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navigation__cta">
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navigation__mobile-toggle"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
