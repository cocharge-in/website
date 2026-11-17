import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Charge your EV",
  description:
    "Book a nearby host by the hour if you cannot install a charger at home. Scooters, autos, and cars.",
};

const faqs = [
  {
    q: "Can I book 45 minutes?",
    a: "No. The shortest slot is one hour. After that you can add time in 30-minute steps, for example 90 minutes or two hours.",
  },
  {
    q: "What do I pay if I unplug early?",
    a: "You pay for the slot you booked. The price is for that window and the place to park, so the host’s hour is reserved either way.",
  },
  {
    q: "What if I am late to move the vehicle?",
    a: "You have a 10-minute grace period. After that the host can report an overstay, with a planned penalty of about ₹200 per extra half hour.",
  },
  {
    q: "Will I see the plug before I book?",
    a: "Yes. Listings show the plug and an approximate speed, such as a 15A socket at about 3.3 kW or a 7.2 kW charger, plus the hourly rate.",
  },
  {
    q: "Is this for a highway stop?",
    a: "Use a public fast charger for that. CoCharge is for charging you can walk home from, on a schedule you booked ahead.",
  },
];

export default function ChargePage() {
  return (
    <>
      <PageHero
        eyebrow="For drivers"
        title={
          <>
            Home charging, <em>without the charger.</em>
          </>
        }
        lede="If your building, landlord, or street will not allow a personal point, book a neighbour’s instead. Scooters, autos, and cars — as long as the plug fits."
      />

      <section className="section">
        <div className="card-grid">
          <article className="card">
            <h3>Close enough to walk</h3>
            <p>The useful charger is the one on your lane, not the one across the city. You leave the vehicle and go home.</p>
          </article>
          <article className="card">
            <h3>A slot you can plan around</h3>
            <p>Pick a start time. The end time starts at one hour and moves in half-hour steps. The next guest is buffered by 15 minutes.</p>
          </article>
          <article className="card">
            <h3>The rate is on the listing</h3>
            <p>Hosts price the hour. A slower household socket costs less time-value than a faster wallbox. You see both before you request.</p>
          </article>
          <article className="card">
            <h3>Regular, not a road trip</h3>
            <p>This is the Tuesday-night top-up. Highway and one-off destination charging stay with public networks.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>A session, from your side</h2>
        </div>
        <ol className="timeline panel">
          <li>
            <b>01</b>
            <div>
              <strong>Find a host near your pincode</strong>
              <p>Plug type, speed, and hourly rate are on the listing.</p>
            </div>
          </li>
          <li>
            <b>02</b>
            <div>
              <strong>Request a slot</strong>
              <p>At least one hour. Add 30 minutes as you need them. The host accepts or declines.</p>
            </div>
          </li>
          <li>
            <b>03</b>
            <div>
              <strong>Meet for the first charge</strong>
              <p>They show you the socket. You plug in, and the booked window is yours.</p>
            </div>
          </li>
          <li>
            <b>04</b>
            <div>
              <strong>Move the vehicle when the slot ends</strong>
              <p>Ten minutes of grace, then an overstay can be reported.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Who it is for</h2>
          <p>Anyone who can reach a shared socket and would use it more than once.</p>
        </div>
        <div className="trust-grid">
          <article className="trust">
            <h3>Apartment residents</h3>
            <p>When the association will not approve a personal connection, a neighbour’s point can still be a walk away.</p>
          </article>
          <article className="trust">
            <h3>Rented homes</h3>
            <p>No installation, no landlord conversation, no leftover hardware when you move.</p>
          </article>
          <article className="trust">
            <h3>Scooters and autos</h3>
            <p>A 15A socket and an hour is often the whole job. Cars can book longer on a faster plug.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Charging questions</h2>
        </div>
        <Faq items={faqs} />
      </section>

      <WaitlistForm
        source="charge"
        defaultRole="chargee"
        heading="Tell us where you need to charge"
        lede="Your pincode decides the pilot. We need drivers and hosts in the same few streets before the first slots open."
      />
    </>
  );
}
