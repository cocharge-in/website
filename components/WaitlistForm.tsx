"use client";

import { FormEvent, useState } from "react";
import { socketOptions, vehicleOptions } from "@/lib/site";

type Role = "host" | "chargee";

type Props = {
  defaultRole?: Role;
  source: string;
  heading?: string;
  lede?: string;
};

const empty = {
  name: "",
  phone: "",
  pincode: "",
  city: "",
  area: "",
  socket: "",
  vehicle: "",
};

export function WaitlistForm({
  defaultRole,
  source,
  heading = "Join the pilot waitlist",
  lede = "Share your pincode and whether you can host or need to charge. The first neighbourhoods open where both sides cluster.",
}: Props) {
  const [role, setRole] = useState<Role | "">(defaultRole ?? "");
  const [fields, setFields] = useState(empty);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<{ pincode: string; role: Role } | null>(null);

  function update(key: keyof typeof empty, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);

    if (!role) {
      setError("Choose whether you want to host or charge.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          phone: fields.phone,
          pincode: fields.pincode,
          city: fields.city,
          area: fields.area,
          role,
          socket: fields.socket,
          vehicle: fields.vehicle,
          source,
          company: String(data.get("company") ?? ""),
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error || "Something went wrong. Try again.");
        return;
      }
      setDone({ pincode: fields.pincode.trim(), role });
    } catch {
      setError("Could not reach the waitlist. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="waitlist" id="waitlist">
      <div className="waitlist-copy">
        <p className="eyebrow eyebrow-light">Pilot waitlist</p>
        <h2>{heading}</h2>
        <p>{lede}</p>
        <ul>
          <li>We use this only to plan the first neighbourhoods and to contact you.</li>
          <li>A mobile OTP and an identity check come before anyone meets.</li>
          <li>No app download yet. This list is the start.</li>
        </ul>
      </div>
      {done ? (
        <div className="form-card success" role="status">
          <p className="eyebrow">You’re on the list</p>
          <h3>
            {done.role === "host" ? "Host" : "Driver"} · {done.pincode}
          </h3>
          <p>
            We’ll get in touch when your pincode has enough hosts and drivers to open a small pilot.
            Until then, nothing is booked and nothing is charged.
          </p>
        </div>
      ) : (
        <form className="form-card" onSubmit={onSubmit} noValidate>
          <div className="hp" aria-hidden="true">
            <label htmlFor={`${source}-company`}>Company</label>
            <input id={`${source}-company`} name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <fieldset className="role-switch">
            <legend>I want to</legend>
            <label className={role === "host" ? "is-selected" : ""}>
              <input
                type="radio"
                name="role"
                value="host"
                checked={role === "host"}
                onChange={() => setRole("host")}
              />
              Host a charger
            </label>
            <label className={role === "chargee" ? "is-selected" : ""}>
              <input
                type="radio"
                name="role"
                value="chargee"
                checked={role === "chargee"}
                onChange={() => setRole("chargee")}
              />
              Charge an EV
            </label>
          </fieldset>
          <div className="form-grid">
            <label>
              Full name
              <input
                name="name"
                autoComplete="name"
                value={fields.name}
                onChange={(event) => update("name", event.target.value)}
                required
              />
            </label>
            <label>
              Mobile
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="98765 43210"
                value={fields.phone}
                onChange={(event) => update("phone", event.target.value)}
                required
              />
            </label>
            <label>
              Pincode
              <input
                name="pincode"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="560001"
                value={fields.pincode}
                onChange={(event) => update("pincode", event.target.value)}
                required
              />
            </label>
            <label>
              City
              <input
                name="city"
                autoComplete="address-level2"
                value={fields.city}
                onChange={(event) => update("city", event.target.value)}
              />
            </label>
            <label className="span-2">
              Society or area <span className="optional">Optional</span>
              <input
                name="area"
                value={fields.area}
                onChange={(event) => update("area", event.target.value)}
              />
            </label>
            {role === "host" ? (
              <label className="span-2">
                What can you share?
                <select
                  name="socket"
                  value={fields.socket}
                  onChange={(event) => update("socket", event.target.value)}
                >
                  <option value="">Choose one</option>
                  {socketOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            {role === "chargee" ? (
              <label className="span-2">
                What do you ride or drive?
                <select
                  name="vehicle"
                  value={fields.vehicle}
                  onChange={(event) => update("vehicle", event.target.value)}
                >
                  <option value="">Choose one</option>
                  {vehicleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="btn btn-primary btn-block" type="submit" disabled={pending}>
            {pending ? "Saving…" : "Join the waitlist"}
          </button>
          <p className="form-fine">
            By joining you agree we can contact you about the CoCharge pilot. Read the{" "}
            <a href="/privacy">privacy note</a>.
          </p>
        </form>
      )}
    </section>
  );
}
