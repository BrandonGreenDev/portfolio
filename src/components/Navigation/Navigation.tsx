import React from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { NavigationItem } from "../../types";
import "./Navigation.css";

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navigation: React.FC = () => {
  const { isScrolled } = useScrollPosition(50);

  const handleNavClick = (href: string) => {
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
            <div className="logo-placeholder">
              <span>LOGO</span>
            </div>
          </a>
        </div>

        <ul className="navigation__menu">
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
          aria-label="Toggle mobile menu"
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
