import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

type FeedbackPayload = {
  name?: string;
  business?: string;
  phone?: string;
  message?: string;
  lang?: string;
};

function getSmtpTransporter() {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function POST(request: Request) {
  const transporter = getSmtpTransporter();
  if (!transporter) {
    console.error("SMTP_USER or SMTP_PASS is not configured");
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 }
    );
  }

  let body: FeedbackPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const business = body.business?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const lang = body.lang ?? "en";

  if (!name || !message) {
    return NextResponse.json(
      { error: "Name and feedback message are required" },
      { status: 400 }
    );
  }

  if (phone && !/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json(
      { error: "Please provide a valid 10-digit WhatsApp number" },
      { status: 400 }
    );
  }

  const toEmail = process.env.FEEDBACK_TO_EMAIL || "hello@anshapps.com";
  const fromEmail =
    process.env.SMTP_FROM || `Ansh Apps <${process.env.SMTP_USER || toEmail}>`;

  const text = [
    "New feedback from the Ansh Apps landing page",
    "",
    `Name: ${name}`,
    business ? `Business: ${business}` : null,
    phone ? `WhatsApp: +91 ${phone}` : null,
    `Language: ${lang}`,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: `New Feedback from ${name} — Ansh Apps`,
      text,
    });
  } catch (error) {
    console.error("SMTP send error:", error);
    return NextResponse.json(
      { error: "Failed to send feedback email" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
