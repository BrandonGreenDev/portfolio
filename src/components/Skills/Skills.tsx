import React from "react";
import { skills, skillCategories } from "../../data/skills";
import "./Skills.css";

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills section" aria-labelledby="skills-title">
      <div className="container">
        <h2 id="skills-title" className="skills__title">
          Skills &amp; Technologies
        </h2>

        <div className="skills__grid">
          {skillCategories.map(({ id, title }) => {
            const items = skills.filter((skill) => skill.category === id);
            if (items.length === 0) return null;
            const headingId = `skills-group-${id}`;

            return (
              <div key={id} className="skills__group">
                <h3 id={headingId} className="skills__group-title">
                  {title}
                </h3>
                <ul className="skills__list" aria-labelledby={headingId}>
                  {items.map((skill) => (
                    <li key={skill.name} className="skills__chip">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
