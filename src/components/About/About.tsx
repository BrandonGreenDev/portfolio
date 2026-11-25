import React, { useState } from "react";
import { profile } from "../../data/profile";
import "./About.css";

const initials = profile.name
  .split(" ")
  .map((part) => part.charAt(0))
  .join("")
  .toUpperCase();

const stats = [
  { number: "5+", label: "Years Experience" },
  { number: "314+", label: "Enterprise Cases Resolved" },
  { number: "9.8/10", label: "Customer Satisfaction" },
];

const About: React.FC = () => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__content">
          <div className="about__profile">
            <div className="about__photo-frame">
              {imageFailed ? (
                <div
                  className="about__photo-fallback"
                  role="img"
                  aria-label={`Headshot of ${profile.name} (placeholder)`}
                >
                  <span aria-hidden="true">{initials}</span>
                </div>
              ) : (
                <img
                  className="about__photo"
                  src={profile.headshotUrl}
                  alt={`Headshot of ${profile.name}`}
                  width={320}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>
            <p className="about__name">{profile.name}</p>
            <p className="about__location">{profile.location}</p>
          </div>

          <div className="about__text">
            <h2 className="about__title">About Me</h2>
            <div className="about__description">
              <p>
                I'm a front-end developer turned ServiceNow support engineer,
                based in Orlando. I spent four years at InvestCloud building
                React and Angular component libraries, and since December 2025
                I've been a Technical Support Engineer on the UX team at
                ServiceNow.
              </p>
              <p>
                I build accessible, responsive interfaces that meet WCAG, and I
                debug complex enterprise platforms under pressure. At ServiceNow
                I've resolved 314+ enterprise customer cases across AI Agents,
                Now Assist, Service Portal, UI Builder and Employee Center, own
                P1 escalations, and hold a 9.8/10 average CSAT.
              </p>
              <p>
                I'm looking for front-end, full-stack or ServiceNow developer
                roles in Orlando or remote.
              </p>
            </div>

            <div className="about__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <span className="stat__number">{stat.number}</span>
                  <span className="stat__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
