import { NextResponse } from "next/server";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type FeedbackPayload = {
  name?: string;
  business?: string;
  phone?: string;
  message?: string;
  lang?: string;
};

export async function POST(request: Request) {
  let body: FeedbackPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const business = body.business?.trim() ?? "";
  const phoneRaw = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const lang = body.lang ?? "en";

  if (!name || !message) {
    return NextResponse.json(
      { error: "Name and feedback message are required" },
      { status: 400 }
    );
  }

  let countryCode: string | null = null;
  let phone: string | null = null;

  if (phoneRaw) {
    const parsed = parsePhoneNumberFromString(phoneRaw);
    if (!parsed || !parsed.isValid()) {
      return NextResponse.json(
        { error: "Please provide a valid WhatsApp number" },
        { status: 400 }
      );
    }
    countryCode = `+${parsed.countryCallingCode}`;
    phone = parsed.nationalNumber;
  }

  try {
    await prisma.anshFeedback.create({
      data: {
        name,
        business: business || null,
        countryCode,
        phone,
        message,
        lang,
      },
    });
  } catch (error) {
    console.error("Failed to save feedback:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
