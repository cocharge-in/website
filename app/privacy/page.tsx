import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What the CoCharge waitlist stores, and why.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="What the waitlist keeps"
        lede="The form asks for a name, a mobile number, a pincode, and whether you want to host or charge. City, area, plug, and vehicle are optional."
      />
      <section className="section prose" style={{ paddingBottom: 80 }}>
        <p>We use those details to see where a first pilot is possible and to contact you about it.</p>
        <p>We do not sell the list. We do not take payment on this website.</p>
        <p>
          If you want your details removed before the pilot opens, reply to any message we send
          you, or write from the same mobile number you used on the form.
        </p>
        <p>Bookings, identity checks, and payments will have their own terms when the apps open.</p>
      </section>
    </>
  );
}
