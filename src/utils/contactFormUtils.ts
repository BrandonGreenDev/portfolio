import { rateLimitConfig, spamProtectionConfig } from "../config/emailConfig";

// Rate limiting utilities
export interface SubmissionRecord {
  timestamp: number;
  count: number;
}

export const checkRateLimit = (): boolean => {
  try {
    const stored = localStorage.getItem(rateLimitConfig.storageKey);
    if (!stored) return true;

    const submissions: SubmissionRecord[] = JSON.parse(stored);
    const now = Date.now();

    // Filter out old submissions outside the time window
    const recentSubmissions = submissions.filter(
      (sub) => now - sub.timestamp < rateLimitConfig.timeWindow
    );

    // Count total submissions in the time window
    const totalSubmissions = recentSubmissions.reduce(
      (sum, sub) => sum + sub.count,
      0
    );

    return totalSubmissions < rateLimitConfig.maxSubmissions;
  } catch (error) {
    console.error("Error checking rate limit:", error);
    return true; // Allow submission if there's an error
  }
};

export const recordSubmission = (): void => {
  try {
    const stored = localStorage.getItem(rateLimitConfig.storageKey);
    const submissions: SubmissionRecord[] = stored ? JSON.parse(stored) : [];
    const now = Date.now();

    // Filter out old submissions
    const recentSubmissions = submissions.filter(
      (sub) => now - sub.timestamp < rateLimitConfig.timeWindow
    );

    // Add new submission
    recentSubmissions.push({
      timestamp: now,
      count: 1,
    });

    localStorage.setItem(
      rateLimitConfig.storageKey,
      JSON.stringify(recentSubmissions)
    );
  } catch (error) {
    console.error("Error recording submission:", error);
  }
};

// Spam protection utilities
export const validateFormTiming = (startTime: number): boolean => {
  const fillTime = Date.now() - startTime;
  return (
    fillTime >= spamProtectionConfig.minFillTime &&
    fillTime <= spamProtectionConfig.maxFillTime
  );
};

export const validateHoneypot = (honeypotValue: string): boolean => {
  return honeypotValue === "";
};

// Content analysis for spam detection
export const analyzeContent = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): boolean => {
  const { name, email, subject, message } = formData;

  // Check for obvious spam patterns (made less strict)
  const suspiciousPatterns = [
    /\b(viagra|cialis|casino|lottery winner|congratulations.*winner)\b/i,
    /\b(click here now|visit now urgent|act now limited)\b/i,
    /\$\$\$\$+|!{5,}/, // Multiple dollar signs or excessive exclamation marks
    /\b(free money now|make money fast|earn \$\d+)\b/i,
  ];

  const allText = `${name} ${email} ${subject} ${message}`.toLowerCase();

  // Check for suspicious patterns (only very obvious spam)
  if (suspiciousPatterns.some((pattern) => pattern.test(allText))) {
    return false;
  }

  // Check for excessive repetition (made more lenient)
  const words = allText.split(/\s+/).filter((word) => word.length > 2); // Ignore short words
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxRepetition = Math.max(...Object.values(wordCount));
  if (maxRepetition > words.length * 0.5) {
    // More than 50% repetition (was 30%)
    return false;
  }

  // Check for excessive links (made more lenient)
  const linkCount = (allText.match(/https?:\/\//g) || []).length;
  if (linkCount > 5) {
    // Allow up to 5 links (was 2)
    return false;
  }

  // Check for suspicious email patterns (made less strict)
  const suspiciousEmailPatterns = [
    /\d{8,}@/, // Many numbers in email (8+ instead of 5+)
    /[a-z]{30,}@/, // Very long username (30+ instead of 20+)
    /\.(tk|ml|ga|cf)$/, // Keep suspicious TLDs check
  ];

  if (suspiciousEmailPatterns.some((pattern) => pattern.test(email))) {
    return false;
  }

  return true;
};

// Sanitize form data
export const sanitizeFormData = (formData: { [key: string]: string }) => {
  const sanitized: { [key: string]: string } = {};

  Object.keys(formData).forEach((key) => {
    let value = formData[key];

    // Remove HTML tags
    value = value.replace(/<[^>]*>/g, "");

    // Remove excessive whitespace
    value = value.replace(/\s+/g, " ").trim();

    // Limit length for safety
    const maxLengths: { [key: string]: number } = {
      name: 100,
      email: 254,
      subject: 200,
      message: 2000,
    };

    if (maxLengths[key] && value.length > maxLengths[key]) {
      value = value.substring(0, maxLengths[key]);
    }

    sanitized[key] = value;
  });

  return sanitized;
};

// Generate a simple CSRF-like token
export const generateFormToken = (): string => {
  return btoa(Date.now().toString() + Math.random().toString()).substring(
    0,
    16
  );
};

// Validate form token (basic implementation)
export const validateFormToken = (
  token: string,
  startTime: number
): boolean => {
  try {
    const decoded = atob(token);
    const tokenTime = parseInt(decoded.substring(0, 13));
    const timeDiff = Math.abs(tokenTime - startTime);

    // Token should be generated around the same time as form start
    return timeDiff < 60000; // Within 1 minute
  } catch {
    return false;
  }
};

// Email validation utility
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Check if email domain exists (basic check)
export const checkEmailDomain = async (email: string): Promise<boolean> => {
  try {
    const domain = email.split("@")[1];
    if (!domain) return false;

    // Basic domain validation
    const domainRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  } catch {
    return false;
  }
};
