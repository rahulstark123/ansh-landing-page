import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

type PartnerPayload = {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  city?: string;
  website?: string;
  businessType?: string;
  experience?: string;
  whyPartner?: string;
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

  let body: PartnerPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const fullName = body.fullName?.trim() ?? "";
  const companyName = body.companyName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const city = body.city?.trim() ?? "";
  const website = body.website?.trim() ?? "";
  const businessType = body.businessType?.trim() ?? "";
  const experience = body.experience?.trim() ?? "";
  const whyPartner = body.whyPartner?.trim() ?? "";

  if (!fullName || !email || !phone || !city || !businessType || !whyPartner) {
    return NextResponse.json(
      { error: "Please fill in all required fields" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address" },
      { status: 400 }
    );
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json(
      { error: "Please provide a valid 10-digit phone number" },
      { status: 400 }
    );
  }

  const toEmail = process.env.PARTNERS_TO_EMAIL || process.env.FEEDBACK_TO_EMAIL || "hello@anshapps.com";
  const fromEmail =
    process.env.SMTP_FROM || `Ansh Apps <${process.env.SMTP_USER || toEmail}>`;

  const text = [
    "New ANSH Saathi Application — ANSH Apps",
    "",
    `Full Name: ${fullName}`,
    companyName ? `Company: ${companyName}` : "Company: —",
    `Email: ${email}`,
    `Phone: +91 ${phone}`,
    `City: ${city}`,
    website ? `Website / LinkedIn: ${website}` : "Website / LinkedIn: —",
    `Business Type: ${businessType}`,
    experience ? `Experience: ${experience}` : "Experience: —",
    "",
    "Why they want to become an ANSH Saathi:",
    whyPartner,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `ANSH Saathi Application: ${fullName}${companyName ? ` — ${companyName}` : ""}`,
      text,
    });
  } catch (error) {
    console.error("SMTP send error:", error);
    return NextResponse.json(
      { error: "Failed to send Saathi application" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
