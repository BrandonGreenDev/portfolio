// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create an account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your Public Key, Service ID, and Template ID
// 5. Replace the values below with your actual EmailJS credentials

export const emailConfig = {
  // Your EmailJS Public Key (found in Account > API Keys)
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "kHmdG5s4gD5yKyc4m",

  // Your EmailJS Service ID (found in Email Services)
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_djrav9k",

  // Your EmailJS Template ID (found in Email Templates)
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_cgid3rm",
};

// Rate limiting configuration
export const rateLimitConfig = {
  // Maximum submissions per time window
  maxSubmissions: 5,
  // Time window in milliseconds (30 minutes)
  timeWindow: 30 * 60 * 1000,
  // Storage key for rate limiting
  storageKey: "contact_form_submissions",
};

// Spam protection configuration
export const spamProtectionConfig = {
  // Honeypot field name (should be hidden from users)
  honeypotField: "website",
  // Minimum time to fill form (in milliseconds) - prevents bots (reduced for better UX)
  minFillTime: 1000, // 1 second instead of 3
  // Maximum time to fill form (in milliseconds) - prevents stale submissions
  maxFillTime: 60 * 60 * 1000, // 1 hour instead of 30 minutes
};

// Form validation messages
export const validationMessages = {
  required: (field: string) => `${field} is required`,
  email: "Please enter a valid email address",
  minLength: (field: string, min: number) =>
    `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) =>
    `${field} must be no more than ${max} characters`,
  invalidName:
    "Name can only contain letters, spaces, hyphens, and apostrophes",
  rateLimited:
    "Too many submissions. Please wait before sending another message.",
  spamDetected: "Submission blocked. Please try again.",
  networkError: "Network error. Please check your connection and try again.",
  serverError: "Server error. Please try again later.",
  success: "Thank you! Your message has been sent successfully.",
};

// EmailJS template variables mapping
// Make sure your EmailJS template includes these variables:
// {{from_name}} - sender's name
// {{from_email}} - sender's email
// {{subject}} - message subject
// {{message}} - message content
// {{to_name}} - your name (recipient)
export const templateParams = {
  to_name: "Brandon Green", // Your name
  from_name: "", // Will be filled from form
  from_email: "", // Will be filled from form
  subject: "", // Will be filled from form
  message: "", // Will be filled from form
  reply_to: "", // Will be filled from form email
};
