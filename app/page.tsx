import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { ListingCard } from "@/components/ListingCard";
import { StreetScene } from "@/components/StreetScene";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: { absolute: "CoCharge — Neighbourhood EV charging in India" },
  description:
    "Book a neighbour’s charger by the hour. Hosts set the rate and the hours. One hour minimum, then 30-minute steps.",
};

const faqs = [
  {
    q: "What am I paying for?",
    a: "A booked window of charger access and a place to park. The host pays their own electricity bill and sets an hourly rate that makes the time worth sharing.",
  },
  {
    q: "Does CoCharge talk to the charger?",
    a: "No. A standard 15A socket is enough. The host keeps control of access. CoCharge is the schedule, the introduction, and the payment.",
  },
  {
    q: "How long can I book?",
    a: "One hour minimum. After that, time is added in 30-minute steps. Every confirmed booking keeps a 15-minute buffer so the next person is not waiting in the same spot.",
  },
  {
    q: "Who can use it?",
    a: "Scooters, autos, and cars, whenever the plug matches. It is for regular charging you can walk home from, in neighbourhoods where a private socket already exists.",
  },
  {
    q: "When do the apps open?",
    a: "After a pincode has enough hosts and drivers on this list. The website takes no bookings. Join with your pincode and we will open one tight area at a time.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Neighbourhood charging · India</p>
          <h1>
            Your street already has chargers. <em>They’re just private.</em>
          </h1>
          <p className="lede">
            CoCharge lets a host rent their charger and a parking spot by the hour, and lets a
            neighbour book it. One hour to start, then half hours. The host sets the price.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/host">
              Host a charger
            </Link>
            <Link className="btn btn-secondary" href="/charge">
              Charge your EV
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <StreetScene />
          <ListingCard />
        </div>
      </section>

      <section className="stats" aria-label="Booking rules">
        <div>
          <strong>1 hour</strong>
          <span>Minimum booking</span>
        </div>
        <div>
          <strong>+30 min</strong>
          <span>Every step after that</span>
        </div>
        <div>
          <strong>15 min</strong>
          <span>Buffer between sessions</span>
        </div>
        <div>
          <strong>Your rate</strong>
          <span>Hosts price the hour</span>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Two sides. One street.</h2>
          <p>The same account idea, two jobs. Tell us which one you are so the pilot can pair them.</p>
        </div>
        <div className="paths">
          <Link className="path path-dark" href="/host">
            <span className="kicker">Hosts</span>
            <h3>A socket that sits idle can earn.</h3>
            <p>
              Set the hours you are comfortable with, set an hourly rate, and accept the requests
              you want. A 15A point on the ground floor is a valid start.
            </p>
            <span>See how hosting works</span>
          </Link>
          <Link className="path" href="/charge">
            <span className="kicker">Drivers</span>
            <h3>Charge near home, then walk back.</h3>
            <p>
              For scooters, autos, and cars whose owners cannot fit a charger where they live.
              Book a slot you can count on, close enough to leave the vehicle and go home.
            </p>
            <span>See how charging works</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>How a booking will work</h2>
          <p>The apps come after this waitlist. The rules are already fixed.</p>
        </div>
        <div className="steps">
          <article className="step">
            <span>01</span>
            <strong>The host opens hours</strong>
            <p>They block the times the socket is free and publish the plug type and hourly rate.</p>
          </article>
          <article className="step">
            <span>02</span>
            <strong>A driver books a slot</strong>
            <p>Start time, then an end time of at least one hour, stepping by 30 minutes.</p>
          </article>
          <article className="step">
            <span>03</span>
            <strong>They meet the first time</strong>
            <p>The host shows the socket and how to start. Later visits can be simpler, if the host allows it.</p>
          </article>
          <article className="step">
            <span>04</span>
            <strong>The slot is paid</strong>
            <p>Payment is for the booked time. A planned platform fee is about 12%, then the host is paid.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Time on a driveway, priced by the hour.</h2>
          <p>
            Public chargers sell energy and often ask you to wait somewhere else. CoCharge is a
            booked hour on a street you already know.
          </p>
        </div>
        <div className="compare-wrap">
          <table className="compare">
            <caption>What a CoCharge hour is for</caption>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">CoCharge</th>
                <th scope="col">A public charger</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Where</th>
                <td>A host’s socket, a short walk from home</td>
                <td>Malls, highways, and depot queues</td>
              </tr>
              <tr>
                <th scope="row">What you pay</th>
                <td>The host’s hourly rate for a booked slot</td>
                <td>A tariff per unit, plus time you spend waiting</td>
              </tr>
              <tr>
                <th scope="row">How it starts</th>
                <td>A request the host can accept or decline</td>
                <td>Whoever arrives first</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="split-note">
          <div>
            <h2>Made for the way India actually charges.</h2>
            <p>
              Most new electric vehicles here are scooters and three-wheelers. Many owners live in
              apartments where a resident association has said no to a personal charger, or in
              homes with no parking of their own. The socket they need is often already installed
              one lane away.
            </p>
            <div className="pills" aria-label="Vehicles and plugs">
              <span>Scooters</span>
              <span>Autos</span>
              <span>Cars</span>
              <span>15A socket</span>
              <span>3.3 kW</span>
              <span>7.2 kW</span>
            </div>
          </div>
          <div className="card">
            <h3>Open one neighbourhood, then the next.</h3>
            <p>
              A scattered map of single hosts does not help a driver who needs a reliable Tuesday
              slot. We will launch inside a small radius once the waitlist shows hosts and drivers
              in the same pincodes.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Trust before the first plug-in.</h2>
        </div>
        <div className="trust-grid">
          <article className="trust">
            <h3>People are verified</h3>
            <p>Mobile OTP for everyone. Hosts also complete an identity check before they can list.</p>
          </article>
          <article className="trust">
            <h3>The host decides</h3>
            <p>Hours, price, and each request stay with the person who owns the socket.</p>
          </article>
          <article className="trust">
            <h3>Overstay has a cost</h3>
            <p>
              A 10-minute grace period, then the host can report an overstay. The planned penalty
              is about ₹200 for each extra half hour.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Questions</h2>
        </div>
        <Faq items={faqs} />
      </section>

      <WaitlistForm source="home" />
    </>
  );
}
