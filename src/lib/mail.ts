import nodemailer from "nodemailer";

const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};

const transporter = nodemailer.createTransport(smtpConfig);

export interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

export const sendEmail = async ({ to, subject, html, from }: SendEmailParams) => {
    // Check rate limit using the recipient's email as the identifier (or could be sender IP if available in context)
    // For simplicity here, we limit by recipient email to prevent spamming a single user,
    // but typically you'd want to limit by SENDER or IP. Since this is a backend function,
    // we assume the caller handles user-based rate limiting. 
    // However, to demonstrate protection, let's limit simply by "global_email_limit" or similar if we want global throttle,
    // or by `to` address to prevent spamming one person.
    // Let's assume we want to protect the system from sending too many emails generally? 
    // No, usually it's per user. Since we don't have user context here easily without passing it,
    // let's use a generic identifier or the 'to' address.

    // Better approach: The CALLER should check rate limits based on the requesting user.
    // But as a safeguard, we can rate limit by 'to' address to prevent accidental loops.
    const { checkRateLimit } = await import("./ratelimit");
    // Explicitly use 'email' rate limit (2 per 10s)
    const rateLimit = await checkRateLimit(`email:${to}`, "email");

    if (!rateLimit.success) {
        console.warn(`Rate limit exceeded for email to ${to}`);
        return { success: false, error: "Rate limit exceeded. Please try again later." };
    }

    const fromAddress = from || process.env.SMTP_FROM || '"Zharnyx EdTech" <no-reply@zharnyx.com>';

    try {
        const info = await transporter.sendMail({
            from: fromAddress,
            to,
            subject,
            html,
        });
        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
