import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { parseLead, type LeadInput } from "@/lib/waitlist";

const hits = new Map<string, number[]>();

export async function POST(request: Request) {
  if (!allow(request)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: LeadInput;
  try {
    body = (await request.json()) as LeadInput;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  if ("spam" in parsed) {
    return NextResponse.json({ ok: true });
  }

  try {
    await store(parsed.lead);
  } catch {
    return NextResponse.json(
      { ok: false, error: "The waitlist could not be saved. Try again shortly." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function store(lead: unknown) {
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    const response = await postJson(webhook, lead);
    if (!response.ok) throw new Error("Webhook failed");
    const text = await response.text();
    if (text.includes('"ok":false') || text.includes('"ok": false')) {
      throw new Error("Webhook failed");
    }
    return;
  }

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "waitlist.jsonl"), `${JSON.stringify(lead)}\n`, "utf8");
}

async function postJson(url: string, payload: unknown) {
  const posted = await fetch(url, {
    method: "POST",
    redirect: "manual",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (posted.status < 300 || posted.status >= 400) return posted;

  const location = posted.headers.get("location");
  if (!location) return posted;
  return fetch(new URL(location, url), { method: "GET", redirect: "follow" });
}

function allow(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "local";
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 8) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
