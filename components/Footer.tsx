import Link from "next/link";
import { LogoMark } from "./Logo";
import { nav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link href="/" className="brand brand-on-dark" aria-label="CoCharge home">
            <LogoMark />
            <span>CoCharge</span>
          </Link>
          <p>
            Neighbourhood EV charging for India. Hosts rent charger time and a place to park.
            Drivers book it by the hour.
          </p>
        </div>
        <div>
          <p className="footer-label">Pages</p>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/#waitlist">Waitlist</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-label">The model</p>
          <ul>
            <li>1 hour minimum</li>
            <li>Then 30-minute steps</li>
            <li>15-minute handover buffer</li>
            <li>Host sets the hourly rate</li>
          </ul>
        </div>
      </div>
      <div className="footer-base">
        <p>CoCharge is a pilot. The apps are not open yet.</p>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
