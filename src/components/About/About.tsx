import React from "react";
import { Skill } from "../../types";
import "./About.css";

const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", proficiency: 5 },
  { name: "TypeScript", category: "frontend", proficiency: 5 },
  { name: "JavaScript", category: "frontend", proficiency: 5 },
  { name: "HTML5", category: "frontend", proficiency: 5 },
  { name: "CSS3", category: "frontend", proficiency: 5 },
  { name: "Sass/SCSS", category: "frontend", proficiency: 4 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 4 },
  { name: "Next.js", category: "frontend", proficiency: 4 },
  { name: "Vue.js", category: "frontend", proficiency: 3 },

  // Backend
  { name: "Node.js", category: "backend", proficiency: 4 },
  { name: "Express.js", category: "backend", proficiency: 4 },
  { name: "Python", category: "backend", proficiency: 4 },
  { name: "PostgreSQL", category: "backend", proficiency: 4 },
  { name: "MongoDB", category: "backend", proficiency: 3 },
  { name: "GraphQL", category: "backend", proficiency: 3 },
  { name: "REST APIs", category: "backend", proficiency: 5 },

  // Tools
  { name: "Git", category: "tools", proficiency: 5 },
  { name: "Docker", category: "tools", proficiency: 3 },
  { name: "AWS", category: "tools", proficiency: 3 },
  { name: "Webpack", category: "tools", proficiency: 4 },
  { name: "Jest", category: "tools", proficiency: 4 },
  { name: "Figma", category: "tools", proficiency: 4 },
];

const About: React.FC = () => {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryTitles = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    tools: "Tools & Technologies",
    other: "Other Skills",
  };

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__content">
          <div className="about__text">
            <h2 className="about__title">About Me</h2>
            <div className="about__description">
              <p>
                I'm a passionate full-stack developer with over 5 years of
                experience creating modern web applications. I love turning
                complex problems into simple, beautiful, and intuitive
                solutions.
              </p>
              <p>
                My journey in web development started with a curiosity about how
                websites work, and it has evolved into a deep passion for
                creating exceptional user experiences. I believe in writing
                clean, maintainable code and staying up-to-date with the latest
                technologies and best practices.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community through blog posts and mentoring.
              </p>
            </div>

            <div className="about__stats">
              <div className="stat">
                <span className="stat__number">20+</span>
                <span className="stat__label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat__number">5+</span>
                <span className="stat__label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat__number">20+</span>
                <span className="stat__label">Technologies</span>
              </div>
            </div>
          </div>

          <div className="about__skills">
            <h3 className="about__skills-title">Skills & Technologies</h3>
            <div className="skills-grid">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <div key={category} className="skill-category">
                    <h4 className="skill-category__title">
                      {categoryTitles[category as keyof typeof categoryTitles]}
                    </h4>
                    <div className="skill-list">
                      {categorySkills.map((skill) => (
                        <div key={skill.name} className="skill-item">
                          <div className="skill-item__header">
                            <span className="skill-item__name">
                              {skill.name}
                            </span>
                            {skill.proficiency && (
                              <div className="skill-item__proficiency">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <span
                                    key={i}
                                    className={`proficiency-dot ${
                                      i < (skill.proficiency || 0)
                                        ? "proficiency-dot--active"
                                        : ""
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
