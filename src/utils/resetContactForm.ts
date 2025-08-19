// Utility to reset contact form rate limiting
// This can be used during development or if users are having issues

import { rateLimitConfig } from "../config/emailConfig";

export const clearRateLimit = (): void => {
  try {
    localStorage.removeItem(rateLimitConfig.storageKey);
    console.log("Contact form rate limit cleared");
  } catch (error) {
    console.error("Error clearing rate limit:", error);
  }
};

// Function to check current rate limit status
export const checkRateLimitStatus = (): {
  submissions: number;
  timeWindow: string;
} => {
  try {
    const stored = localStorage.getItem(rateLimitConfig.storageKey);
    if (!stored) {
      return { submissions: 0, timeWindow: "30 minutes" };
    }

    const submissions = JSON.parse(stored);
    const now = Date.now();
    const recentSubmissions = submissions.filter(
      (sub: any) => now - sub.timestamp < rateLimitConfig.timeWindow
    );

    return {
      submissions: recentSubmissions.length,
      timeWindow: "30 minutes",
    };
  } catch (error) {
    console.error("Error checking rate limit status:", error);
    return { submissions: 0, timeWindow: "30 minutes" };
  }
};

// Call this in browser console if needed: clearRateLimit()
if (typeof window !== "undefined") {
  (window as any).clearContactFormRateLimit = clearRateLimit;
  (window as any).checkContactFormStatus = checkRateLimitStatus;
}
