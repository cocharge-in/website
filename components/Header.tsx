"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
import { nav } from "@/lib/site";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const hasForm = path === "/" || path === "/host" || path === "/charge" || path === "/about";
  const waitlistHref = hasForm ? "#waitlist" : "/#waitlist";

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="CoCharge home">
          <LogoMark />
          <span>CoCharge</span>
        </Link>
        <div className="header-end">
          <Link className="btn btn-primary header-join" href={waitlistHref} onClick={() => setOpen(false)}>
            Join
          </Link>
          <nav className={open ? "nav is-open" : "nav"} aria-label="Primary">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="nav-toggle-bars" aria-hidden="true" />
          </button>
          <div className="nav-links" id="site-nav">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={path === item.href ? "page" : undefined}
                onClick={() => {
                  window.setTimeout(() => setOpen(false), 0);
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link className="btn btn-primary" href={waitlistHref} onClick={() => setOpen(false)}>
              Join waitlist
            </Link>
          </div>
        </nav>
        </div>
      </div>
    </header>
  );
}
