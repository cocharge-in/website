import Link from "next/link";

export default function NotFound() {
  return (
    <header className="page-hero">
      <p className="eyebrow">404</p>
      <h1>That page is not on the map.</h1>
      <p className="lede">The waitlist, hosting, and charging pages are the whole site for now.</p>
      <div className="page-actions">
        <Link className="btn btn-primary" href="/">
          Back home
        </Link>
      </div>
    </header>
  );
}
