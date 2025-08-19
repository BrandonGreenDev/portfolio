import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ContactInfo } from "../../types";
import {
  useFormValidation,
  nameValidation,
  emailValidation,
  subjectValidation,
  messageValidation,
} from "../../hooks/useFormValidation";
import {
  checkRateLimit,
  recordSubmission,
  validateFormTiming,
  validateHoneypot,
  analyzeContent,
  sanitizeFormData,
  generateFormToken,
  validateFormToken,
  checkEmailDomain,
} from "../../utils/contactFormUtils";
import {
  emailConfig,
  spamProtectionConfig,
  validationMessages,
} from "../../config/emailConfig";
// Import reset utility for development
import "../../utils/resetContactForm";
import "../../utils/testEmailJS";
import "./Contact.css";

const contactInfo: ContactInfo = {
  email: "brandon.green.cx@gmail.com",
  linkedin: "https://www.linkedin.com/in/brandon-d-green/",
  github: "https://github.com/BrandonGreenDev",
};

const validationRules = {
  name: nameValidation,
  email: emailValidation,
  subject: subjectValidation,
  message: messageValidation,
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    [spamProtectionConfig.honeypotField]: "", // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [formStartTime] = useState(Date.now());
  const [formToken] = useState(generateFormToken());
  const formRef = useRef<HTMLFormElement>(null);

  const {
    errors,
    validateForm,
    validateSingleField,
    setFieldTouched,
    clearErrors,
    hasError,
    isFieldValid,
  } = useFormValidation(validationRules);

  // Initialize EmailJS
  useEffect(() => {
    if (
      emailConfig.publicKey &&
      emailConfig.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY"
    ) {
      emailjs.init(emailConfig.publicKey);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear submit status when user starts typing again
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }

    // Validate field on change if it was previously touched
    if (name !== spamProtectionConfig.honeypotField) {
      validateSingleField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name !== spamProtectionConfig.honeypotField) {
      setFieldTouched(name);
      validateSingleField(name, value);
    }
  };

  const validateEmailDomain = async (email: string): Promise<boolean> => {
    try {
      return await checkEmailDomain(email);
    } catch {
      return true; // Allow submission if domain check fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    console.log("🚀 Form submission started");
    console.log("📝 Form data:", formData);
    console.log("⚙️ EmailJS config:", {
      publicKey: emailConfig.publicKey?.substring(0, 10) + "...",
      serviceId: emailConfig.serviceId,
      templateId: emailConfig.templateId,
    });

    try {
      // Basic form validation
      const isFormValid = validateForm(formData);
      if (!isFormValid) {
        console.log("❌ Form validation failed");
        setSubmitStatus("error");
        setSubmitMessage("Please fix the errors above and try again.");
        return;
      }
      console.log("✅ Form validation passed");

      // Simplified spam protection - only check honeypot
      if (!validateHoneypot(formData[spamProtectionConfig.honeypotField])) {
        console.log("❌ Honeypot check failed");
        setSubmitStatus("error");
        setSubmitMessage("Spam detected. Please try again.");
        return;
      }
      console.log("✅ Honeypot check passed");

      // Sanitize form data
      const sanitizedData = sanitizeFormData(formData);
      console.log("🧹 Sanitized data:", sanitizedData);

      // Check EmailJS configuration
      if (
        !emailConfig.publicKey ||
        emailConfig.publicKey === "YOUR_EMAILJS_PUBLIC_KEY" ||
        !emailConfig.serviceId ||
        emailConfig.serviceId === "YOUR_EMAILJS_SERVICE_ID" ||
        !emailConfig.templateId ||
        emailConfig.templateId === "YOUR_EMAILJS_TEMPLATE_ID"
      ) {
        console.log("⚠️ EmailJS not configured properly");
        setSubmitStatus("success");
        setSubmitMessage(
          "Thank you! Your message has been received. (EmailJS configuration needed for actual email delivery)"
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          [spamProtectionConfig.honeypotField]: "",
        });
        clearErrors();
        return;
      }

      console.log("📧 Attempting to send email via EmailJS...");

      // Send email via EmailJS
      const templateParams = {
        to_name: "Brandon Green",
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        reply_to: sanitizedData.email,
      };

      console.log("📋 Template params:", templateParams);

      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      );

      console.log("✅ EmailJS send result:", result);

      // Success
      setSubmitStatus("success");
      setSubmitMessage(validationMessages.success);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        [spamProtectionConfig.honeypotField]: "",
      });
      clearErrors();
      recordSubmission();

      console.log("🎉 Form submission completed successfully!");
    } catch (error: any) {
      console.error("💥 Form submission error:", error);
      console.error("Error details:", {
        name: error?.name,
        message: error?.message,
        status: error?.status,
        text: error?.text,
      });

      // Handle specific EmailJS errors
      if (error?.status === 400) {
        setSubmitMessage(
          "Invalid form data. Please check your inputs and try again."
        );
      } else if (error?.status === 401) {
        setSubmitMessage(
          "Email service authentication failed. Please check your EmailJS credentials."
        );
      } else if (error?.status === 403) {
        setSubmitMessage(
          "Email service access denied. Please check your EmailJS service configuration."
        );
      } else if (error?.status >= 500) {
        setSubmitMessage("EmailJS server error. Please try again later.");
      } else if (error?.name === "NetworkError" || !navigator.onLine) {
        setSubmitMessage(
          "Network error. Please check your connection and try again."
        );
      } else {
        setSubmitMessage(
          `Error: ${
            error?.message || "An unexpected error occurred. Please try again."
          }`
        );
      }

      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact__header">
          <h2 className="contact__title">Let's Work Together</h2>
          <p className="contact__subtitle">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you. Let's create something amazing together.
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__card">
              <h3 className="contact__card-title">Get In Touch</h3>
              <p className="contact__card-description">
                I'm always open to discussing new opportunities, interesting
                projects, or just having a chat about web development.
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

              <div className="contact__social">
                <h4 className="contact__social-title">Follow Me</h4>
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
                  {contactInfo.twitter && (
                    <a
                      href={contactInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Twitter profile"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
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
            </div>
          </div>

          <div className="contact__form-container">
            <form
              ref={formRef}
              className={`contact__form ${isSubmitting ? "submitting" : ""}`}
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Honeypot field for spam protection - hidden from users */}
              <div className="honeypot-field" style={{ display: "none" }}>
                <label htmlFor={spamProtectionConfig.honeypotField}>
                  Website
                </label>
                <input
                  type="text"
                  id={spamProtectionConfig.honeypotField}
                  name={spamProtectionConfig.honeypotField}
                  value={formData[spamProtectionConfig.honeypotField]}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

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
                  onBlur={handleBlur}
                  className={`form-input ${
                    hasError("name") ? "form-input--error" : ""
                  } ${isFieldValid("name") ? "form-input--valid" : ""}`}
                  placeholder="Your full name"
                  required
                  aria-describedby={hasError("name") ? "name-error" : undefined}
                  aria-invalid={hasError("name")}
                />
                {hasError("name") && (
                  <div id="name-error" className="form-error" role="alert">
                    {errors.name}
                  </div>
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
                  onBlur={handleBlur}
                  className={`form-input ${
                    hasError("email") ? "form-input--error" : ""
                  } ${isFieldValid("email") ? "form-input--valid" : ""}`}
                  placeholder="your.email@example.com"
                  required
                  aria-describedby={
                    hasError("email") ? "email-error" : undefined
                  }
                  aria-invalid={hasError("email")}
                />
                {hasError("email") && (
                  <div id="email-error" className="form-error" role="alert">
                    {errors.email}
                  </div>
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
                  onBlur={handleBlur}
                  className={`form-input ${
                    hasError("subject") ? "form-input--error" : ""
                  } ${isFieldValid("subject") ? "form-input--valid" : ""}`}
                  placeholder="What's this about?"
                  required
                  aria-describedby={
                    hasError("subject") ? "subject-error" : undefined
                  }
                  aria-invalid={hasError("subject")}
                />
                {hasError("subject") && (
                  <div id="subject-error" className="form-error" role="alert">
                    {errors.subject}
                  </div>
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
                  onBlur={handleBlur}
                  className={`form-textarea ${
                    hasError("message") ? "form-input--error" : ""
                  } ${isFieldValid("message") ? "form-input--valid" : ""}`}
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  required
                  aria-describedby={
                    hasError("message") ? "message-error" : undefined
                  }
                  aria-invalid={hasError("message")}
                />
                {hasError("message") && (
                  <div id="message-error" className="form-error" role="alert">
                    {errors.message}
                  </div>
                )}
                <div className="form-hint">
                  {formData.message.length}/1000 characters
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn--full"
                disabled={isSubmitting}
                aria-describedby={
                  submitStatus !== "idle" ? "submit-message" : undefined
                }
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {(submitStatus === "success" || submitStatus === "error") && (
                <div
                  id="submit-message"
                  className={`form-message form-message--${submitStatus}`}
                  role="alert"
                  aria-live="polite"
                >
                  {submitMessage ||
                    (submitStatus === "success"
                      ? validationMessages.success
                      : "An error occurred. Please try again.")}
                </div>
              )}

              {/* Form security notice */}
              <div className="form-security-notice">
                <p>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Your information is secure and will only be used to respond to
                  your message.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
