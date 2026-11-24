import { NextResponse } from "next/server";
import { sendVerificationCode, verifyCode } from "@/lib/email-otp";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors });
}

export async function POST(request: Request) {
  let body: { action?: string; email?: string; code?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400, headers: cors });
  }

  const email = (body.email || "").trim();
  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400, headers: cors });
  }

  if (body.action === "send") {
    try {
      await sendVerificationCode(email, body.name || "");
    } catch (error) {
      const message = error instanceof Error ? error.message : "The code could not be sent.";
      const status = message === "Email is not configured." ? 503 : 400;
      return NextResponse.json({ ok: false, error: message }, { status, headers: cors });
    }
    return NextResponse.json({ ok: true }, { headers: cors });
  }

  if (body.action === "verify") {
    const ok = verifyCode(email, body.code || "");
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "That code is not valid." },
        { status: 400, headers: cors },
      );
    }
    return NextResponse.json({ ok: true }, { headers: cors });
  }

  return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400, headers: cors });
}
