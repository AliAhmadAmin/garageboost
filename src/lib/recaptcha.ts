export interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

export async function verifyRecaptcha(token: string): Promise<{ valid: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey || secretKey.includes("YOUR_RECAPTCHA")) {
    if (process.env.NODE_ENV === "development") {
      console.warn("RECAPTCHA_SECRET_KEY not configured - skipping verification in development");
      return { valid: true, score: 0.9 }; // Allow in development
    }
    return { valid: false, score: 0 };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data: RecaptchaResponse = await response.json();

    if (!data.success) {
      if (process.env.NODE_ENV === "development") {
        console.error("reCAPTCHA verification failed:", data.error_codes);
      }
      return { valid: false, score: 0 };
    }

    return { valid: data.score > 0.3, score: data.score };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("reCAPTCHA verification error:", error);
    }
    return { valid: false, score: 0 };
  }
}
