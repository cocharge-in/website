export const ROLES = ["host", "chargee"] as const;
export type Role = (typeof ROLES)[number];

export const SOCKETS = ["15a", "3.3", "7.2", "unsure"] as const;
export const VEHICLES = ["scooter", "auto", "car", "several"] as const;

export type Lead = {
  name: string;
  phone: string;
  pincode: string;
  city: string;
  area: string;
  role: Role;
  socket: string;
  vehicle: string;
  source: string;
  createdAt: string;
};

export type LeadInput = {
  name?: unknown;
  phone?: unknown;
  pincode?: unknown;
  city?: unknown;
  area?: unknown;
  role?: unknown;
  socket?: unknown;
  vehicle?: unknown;
  source?: unknown;
  company?: unknown;
};

const NAME = /^[\p{L}][\p{L} .'-]{1,79}$/u;

export function parseLead(
  input: LeadInput,
): { ok: true; lead: Lead } | { ok: false; error: string } | { ok: true; spam: true } {
  if (typeof input.company === "string" && input.company.trim() !== "") {
    return { ok: true, spam: true };
  }

  const name = clean(input.name, 80);
  if (!NAME.test(name)) {
    return { ok: false, error: "Enter your name." };
  }

  const phone = normalizePhone(input.phone);
  if (!phone) {
    return { ok: false, error: "Enter a valid 10-digit Indian mobile number." };
  }

  const pincode = clean(input.pincode, 6);
  if (!/^[1-9]\d{5}$/.test(pincode)) {
    return { ok: false, error: "Enter a 6-digit pincode." };
  }

  const role = input.role;
  if (role !== "host" && role !== "chargee") {
    return { ok: false, error: "Choose whether you want to host or charge." };
  }

  const city = clean(input.city, 60);
  const area = clean(input.area, 80);
  const source = clean(input.source, 40) || "website";
  const socket = role === "host" ? oneOf(input.socket, SOCKETS) : "";
  const vehicle = role === "chargee" ? oneOf(input.vehicle, VEHICLES) : "";

  return {
    ok: true,
    lead: {
      name,
      phone,
      pincode,
      city,
      area,
      role,
      socket,
      vehicle,
      source,
      createdAt: new Date().toISOString(),
    },
  };
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f]/g, "").trim().slice(0, max);
}

function oneOf(value: unknown, allowed: readonly string[]) {
  return typeof value === "string" && allowed.includes(value) ? value : "";
}

function normalizePhone(value: unknown) {
  if (typeof value !== "string") return "";
  let digits = value.replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (/^[6-9]\d{9}$/.test(digits)) return digits;
  return "";
}
