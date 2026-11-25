import React from "react";
import { jobs, certifications, education } from "../../data/experience";
import { profile } from "../../data/profile";
import "./Experience.css";

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="experience section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <header className="experience__header">
          <h2 id="experience-title" className="experience__title">
            Experience
          </h2>
          <a
            href={profile.resumeUrl}
            download
            className="btn btn-primary experience__resume"
          >
            Download Resume
          </a>
        </header>

        <ol className="timeline">
          {jobs.map((job) => (
            <li key={job.id} className="timeline__item">
              <span className="timeline__marker" aria-hidden="true"></span>
              <article className="timeline__card">
                <div className="timeline__top">
                  <h3 className="timeline__role">{job.role}</h3>
                  <p className="timeline__dates">
                    <time dateTime={job.start.iso}>{job.start.label}</time>
                    {" – "}
                    {job.end ? (
                      <time dateTime={job.end.iso}>{job.end.label}</time>
                    ) : (
                      <span className="timeline__current">Present</span>
                    )}
                  </p>
                </div>
                <p className="timeline__meta">
                  <span className="timeline__company">{job.company}</span>
                  {job.team && <span>{job.team}</span>}
                  <span>{job.location}</span>
                </p>
                <ul className="timeline__highlights">
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>

        <div className="experience__group">
          <h3 className="experience__subtitle">Certifications</h3>
          <ul className="credentials">
            {certifications.map((cert) => (
              <li key={cert.id} className="credential credential--cert">
                <span className="credential__badge" aria-hidden="true">
                  {cert.abbreviation}
                </span>
                <div className="credential__body">
                  <h4 className="credential__name">
                    {cert.issuer} {cert.name} ({cert.abbreviation})
                  </h4>
                  <p className="credential__detail">
                    <time dateTime={cert.date.iso}>{cert.date.label}</time>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="experience__group">
          <h3 className="experience__subtitle">Education</h3>
          <ul className="credentials">
            {education.map((edu) => (
              <li key={edu.id} className="credential">
                <div className="credential__body">
                  <h4 className="credential__name">{edu.credential}</h4>
                  <p className="credential__detail">
                    {edu.institution}
                    <span className="timeline__sep" aria-hidden="true">
                      ·
                    </span>
                    <time dateTime={edu.year}>{edu.year}</time>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
