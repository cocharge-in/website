import { createHash, randomInt, timingSafeEqual } from "crypto";
import nodemailer from "nodemailer";

type PendingCode = {
  hash: string;
  expires: number;
  attempts: number;
  sentAt: number;
};

const pending = new Map<string, PendingCode>();
const TEN_MINUTES = 10 * 60 * 1000;
const RESEND_WAIT = 30 * 1000;

function hashCode(email: string, code: string) {
  return createHash("sha256").update(`${email}:${code}`).digest();
}

function mailer() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("Email is not configured.");
  }
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });
}

function message(name: string, code: string) {
  const who = name.trim() || "there";
  const text = [
    `Hello ${who},`,
    "",
    "Use this code to confirm your email on CoCharge:",
    "",
    code,
    "",
    "It expires in 10 minutes. If you did not ask for this, you can ignore the message.",
    "",
    "CoCharge",
  ].join("\n");

  const html = `<div style="background:#f7f3ea;padding:32px;font-family:Georgia,serif">
    <div style="max-width:480px;margin:0 auto;background:#fffdf8;border-radius:16px;padding:28px">
      <p style="margin:0;color:#0f6e62;font-weight:700;letter-spacing:0.3px">CoCharge</p>
      <h1 style="margin:16px 0 8px;color:#14241c;font-size:28px">Confirm your email</h1>
      <p style="color:#3e5147;font-size:16px;line-height:1.5">Hello ${escapeHtml(who)}, use this code to save your profile. It expires in 10 minutes.</p>
      <p style="margin:24px 0;font-size:32px;letter-spacing:8px;font-weight:700;color:#14241c">${code}</p>
      <p style="color:#3e5147;font-size:14px">If you did not ask for this, you can ignore the message.</p>
    </div>
  </div>`;

  return { text, html };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendVerificationCode(email: string, name: string) {
  const key = email.toLowerCase();
  const existing = pending.get(key);
  if (existing && Date.now() - existing.sentAt < RESEND_WAIT) {
    throw new Error("Wait a moment before asking for another code.");
  }
  const code = String(randomInt(100000, 1000000));
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const { text, html } = message(name, code);
  await mailer().sendMail({
    from: `CoCharge <${from}>`,
    to: email,
    subject: "Your CoCharge email code",
    text,
    html,
  });
  pending.set(key, {
    hash: hashCode(key, code).toString("hex"),
    expires: Date.now() + TEN_MINUTES,
    attempts: 0,
    sentAt: Date.now(),
  });
}

export function verifyCode(email: string, code: string) {
  const key = email.toLowerCase();
  const row = pending.get(key);
  if (!row || row.expires < Date.now()) {
    pending.delete(key);
    return false;
  }
  row.attempts += 1;
  if (row.attempts > 5) {
    pending.delete(key);
    return false;
  }
  const expected = Buffer.from(row.hash, "hex");
  const actual = hashCode(key, code.trim());
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return false;
  }
  pending.delete(key);
  return true;
}
