import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "CoCharge is a neighbourhood charging pilot for India. The website builds the waitlist. The apps come next.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Charge where people <em>already live.</em>
          </>
        }
        lede="India’s electric vehicles are arriving faster than private parking and resident-association approvals. CoCharge uses the chargers that are already installed."
      />

      <section className="section prose">
        <h2>The gap</h2>
        <p>
          A lot of riders and drivers live in apartments, rented rooms, and lanes with no wall of
          their own to mount a charger. Public points cluster at malls and highways. The everyday
          top-up needs to happen near home, on a timetable, without a queue.
        </p>
        <p>
          On the other side of the same lane, ground-floor homes and small shops already have 15A
          sockets and, sometimes, a faster charger. Those points are busy for an hour and quiet
          for the rest of the day.
        </p>
      </section>

      <section className="section prose">
        <h2>The offer</h2>
        <p>
          A host rents time and a place to stand the vehicle. A driver books that time. The price
          is an hourly rate the host chooses. The host continues to pay their electricity bill.
          CoCharge keeps a planned fee of about 12% and passes the rest on about two days later.
        </p>
        <p>
          Bookings start at one hour and grow by 30 minutes. A 15-minute buffer sits between
          sessions so two vehicles are not negotiating the same spot. A 10-minute grace period
          covers a slow walk back. After that, an overstay can be reported.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>How the pilot opens</h2>
        </div>
        <div className="steps">
          <article className="step">
            <span>01</span>
            <strong>This website</strong>
            <p>Explain the model and collect a waitlist of hosts and drivers, with pincodes.</p>
          </article>
          <article className="step">
            <span>02</span>
            <strong>One small area</strong>
            <p>Open where the list is dense — a housing layout or a short commuter stretch, not a whole city.</p>
          </article>
          <article className="step">
            <span>03</span>
            <strong>The apps</strong>
            <p>Android and iOS, after the slot rules and payments have been proven with real neighbours.</p>
          </article>
          <article className="step">
            <span>04</span>
            <strong>The next pincode</strong>
            <p>Repeat only where both sides of the marketplace show up together.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>What this site will not do</h2>
          <p>There is no map, no booking, and no payment here. Those belong in the apps, once a neighbourhood is ready.</p>
        </div>
        <div className="trust-grid">
          <article className="trust">
            <h3>No live inventory</h3>
            <p>Any rate or clock time you see is an example of the slot model.</p>
          </article>
          <article className="trust">
            <h3>No electricity retail</h3>
            <p>The product is booked time on someone else’s charger and parking spot.</p>
          </article>
          <article className="trust">
            <h3>No empty launch</h3>
            <p>Apps wait until hosts and drivers share the same few streets.</p>
          </article>
        </div>
      </section>

      <WaitlistForm
        source="about"
        heading="Put your pincode on the map"
        lede="Host or driver, the waitlist is how we choose the first streets."
      />
    </>
  );
}
