// EmailJS Configuration
export const emailConfig = {
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "kHmdG5s4gD5yKyc4m",
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_djrav9k",
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_cgid3rm",
};

// Form validation messages
export const validationMessages = {
  required: (field: string) => `${field} is required`,
  email: "Please enter a valid email address",
  minLength: (field: string, min: number) =>
    `${field} must be at least ${min} characters`,
  networkError: "Network error. Please check your connection and try again.",
  serverError: "Server error. Please try again later.",
  success: "Thank you! Your message has been sent successfully.",
};

// EmailJS template variables mapping
export const templateParams = {
  to_name: "Brandon Green",
  from_name: "",
  from_email: "",
  subject: "",
  message: "",
  reply_to: "",
};
