import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Host a charger",
  description:
    "List a 15A socket or home charger by the hour. You set the rate, the hours, and which requests you accept.",
};

const faqs = [
  {
    q: "Do I need a fast charger?",
    a: "No. A ground-floor 15A socket that a scooter or car can reach is enough to begin. Faster wallboxes can carry a higher hourly rate because the driver gets more range in the same slot.",
  },
  {
    q: "Who pays the electricity bill?",
    a: "You do. Your hourly rate is how you cover that cost and earn for the time and space. CoCharge does not buy or resell units.",
  },
  {
    q: "Can I refuse a booking?",
    a: "Yes. Requests wait for your yes. You can also close hours whenever the socket is for your own vehicle.",
  },
  {
    q: "What if they stay too long?",
    a: "There is a 10-minute grace period. After that you can report an overstay and call the driver. The planned charge is about ₹200 per extra half hour.",
  },
  {
    q: "When do I get paid?",
    a: "The planned settlement is about two days after the session, after a platform fee of about 12%. These terms will be fixed before any real payment is taken.",
  },
];

export default function HostPage() {
  return (
    <>
      <PageHero
        eyebrow="For hosts"
        title={
          <>
            Let an idle socket <em>earn its hours.</em>
          </>
        }
        lede="If you have a charger or a 15A point and a place to park, you can offer it to a neighbour for the hours you choose. You set the rate. You approve every request."
      />

      <section className="section">
        <div className="card-grid">
          <article className="card">
            <h3>You publish the facts</h3>
            <p>Plug type, roughly how fast it charges, the hours it is free, and your price per hour.</p>
          </article>
          <article className="card">
            <h3>You keep the calendar</h3>
            <p>Block family time, festivals, or the evenings you need the point yourself. Closed hours cannot be booked.</p>
          </article>
          <article className="card">
            <h3>A slower plug is still useful</h3>
            <p>A scooter often needs a modest top-up, not a highway charger. Say what you have and price the hour accordingly.</p>
          </article>
          <article className="card">
            <h3>An example, not a promise</h3>
            <p>Someone might list a 15A socket at ₹40 an hour, or a 7.2 kW charger at ₹100. Your street and your bill decide.</p>
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
              <strong>List the point</strong>
              <p>Location, plug, and the hours you are willing to share.</p>
            </div>
          </li>
          <li>
            <b>02</b>
            <div>
              <strong>Accept a slot</strong>
              <p>One hour minimum, then 30-minute steps. Five minutes before the end, you and the driver are reminded to unplug and leave.</p>
            </div>
          </li>
          <li>
            <b>03</b>
            <div>
              <strong>Meet them once</strong>
              <p>Show the socket, the switch, and where the vehicle should stand. Stay or step away — your choice after that.</p>
            </div>
          </li>
          <li>
            <b>04</b>
            <div>
              <strong>Get paid for the time</strong>
              <p>The driver has paid for the slot. Your share follows after the platform fee.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Your home stays yours.</h2>
        </div>
        <div className="trust-grid">
          <article className="trust">
            <h3>Verified drivers</h3>
            <p>Mobile OTP, and identity checks, before someone can request your socket.</p>
          </article>
          <article className="trust">
            <h3>First visit in person</h3>
            <p>The first session is a handover, not a stranger walking in unannounced.</p>
          </article>
          <article className="trust">
            <h3>You can stop</h3>
            <p>Close the calendar any day. Hosting is a choice you can pause.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Hosting questions</h2>
        </div>
        <Faq items={faqs} />
      </section>

      <WaitlistForm
        source="host"
        defaultRole="host"
        heading="List your pincode as a host"
        lede="Tell us the socket you have and where it is. We open a pilot only when drivers in the same pincodes are waiting too."
      />
    </>
  );
}
