// Simple EmailJS test utility
import emailjs from "@emailjs/browser";

export const testEmailJSConnection = async () => {
  console.log("🧪 Testing EmailJS connection...");

  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

  console.log("📋 Environment variables:");
  console.log("Public Key:", publicKey);
  console.log("Service ID:", serviceId);
  console.log("Template ID:", templateId);

  if (!publicKey || !serviceId || !templateId) {
    console.error("❌ Missing environment variables");
    return false;
  }

  try {
    // Initialize EmailJS
    emailjs.init(publicKey);

    // Test with minimal template params
    const testParams = {
      to_name: "Test",
      from_name: "Test User",
      from_email: "test@example.com",
      subject: "Test Subject",
      message: "Test message",
      reply_to: "test@example.com",
    };

    console.log("📤 Sending test email...");
    const result = await emailjs.send(serviceId, templateId, testParams);
    console.log("✅ EmailJS test successful:", result);
    return true;
  } catch (error: any) {
    console.error("❌ EmailJS test failed:", error);
    console.error("Error details:", {
      status: error?.status,
      text: error?.text,
      message: error?.message,
    });
    return false;
  }
};

// Make it available in browser console
if (typeof window !== "undefined") {
  (window as any).testEmailJS = testEmailJSConnection;
}
