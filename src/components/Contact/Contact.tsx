import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { ContactInfo } from "../../types";
import { useFormValidation } from "../../hooks/useFormValidation";
import {
  emailConfig,
  validationMessages,
  templateParams,
} from "../../config/emailConfig";
import "./Contact.css";

const contactInfo: ContactInfo = {
  email: "brandon.green.cx@gmail.com",
  linkedin: "https://www.linkedin.com/in/brandon-d-green/",
  github: "https://github.com/BrandonGreenDev",
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "">(
    ""
  );

  const { errors, validateForm, clearErrors } = useFormValidation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear submit message when user starts typing
    if (submitMessage) {
      setSubmitMessage("");
      setSubmitStatus("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus("");

    try {
      // Prepare template parameters
      const emailParams = {
        ...templateParams,
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      // Send email using EmailJS
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        emailParams,
        emailConfig.publicKey
      );

      // Success
      setSubmitMessage(validationMessages.success);
      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      clearErrors();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitMessage(validationMessages.serverError);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact__header">
          <h2 className="contact__title">Get In Touch</h2>
          <p className="contact__subtitle">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you.
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__card">
              <h3 className="contact__card-title">Let's Connect</h3>
              <p className="contact__card-description">
                Feel free to reach out through the form or connect with me on
                social media.
              </p>

              <div className="contact__details">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="contact__detail"
                  aria-label="Send email"
                >
                  <div className="contact__detail-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="22,6 12,13 2,6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="contact__detail-content">
                    <span className="contact__detail-label">Email</span>
                    <span className="contact__detail-value">
                      {contactInfo.email}
                    </span>
                  </div>
                </a>
              </div>

              {(contactInfo.linkedin || contactInfo.github) && (
                <div className="contact__social">
                  <h4 className="contact__social-title">Connect with me</h4>
                  <div className="contact__social-links">
                    {contactInfo.linkedin && (
                      <a
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="LinkedIn profile"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="2"
                            y="9"
                            width="4"
                            height="12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="4"
                            cy="4"
                            r="2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}

                    {contactInfo.github && (
                      <a
                        href={contactInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="GitHub profile"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="contact__form-container">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.name ? "form-input--error" : ""
                  }`}
                  required
                />
                {errors.name && (
                  <span className="form-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.email ? "form-input--error" : ""
                  }`}
                  required
                />
                {errors.email && (
                  <span className="form-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.subject ? "form-input--error" : ""
                  }`}
                  required
                />
                {errors.subject && (
                  <span className="form-error" role="alert">
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-textarea ${
                    errors.message ? "form-input--error" : ""
                  }`}
                  rows={5}
                  required
                />
                {errors.message && (
                  <span className="form-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {submitMessage && (
                <div
                  className={`form-message form-message--${submitStatus}`}
                  role="alert"
                >
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn--full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
