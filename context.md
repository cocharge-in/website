# CoCharge context

Living notes for the India neighbourhood-charging pilot. Update this file when a product decision changes, a piece of the website ships, or work starts on the apps.

The website is a brochure and a waitlist. Bookings, payments, and accounts belong in the apps, which are not started.

## Product

CoCharge connects a host who has a charger or a 15A socket with a neighbour who needs to charge. The host rents time and a place to park. The driver pays for the booked slot. The host keeps paying their own electricity bill and sets the hourly rate.

This is regular charging someone can walk home from. Highway and one-off destination charging stay with public networks. Scooters, autos, and cars are all in scope when the plug matches.

### Slot rules

These rules are fixed for the product. They are explained on the site. They are not implemented as a booking engine yet.

- Shortest booking is 1 hour.
- Extra time is added in 30-minute steps.
- A 15-minute buffer is held after every confirmed booking so the next vehicle is not waiting in the same spot.
- A 10-minute grace period covers a slow return to the vehicle. After that, the host can report an overstay.
- The planned overstay penalty is about ₹200 per extra half hour.
- The planned platform fee is about 12%, with the host paid about two days after the session.

Rates, the fee, and the penalty on the site are examples of the model. Nothing is charged today.

### How a session is meant to work

1. The host publishes the plug, approximate speed, free hours, and hourly rate.
2. The driver requests a slot. The host accepts or declines.
3. The first visit is in person: the host shows the socket.
4. The driver pays for the booked window, whether or not they unplug early.
5. The vehicle moves when the slot ends.

People are verified before they meet: mobile OTP for everyone, plus an identity check for hosts. That verification does not exist yet.

### Pilot

Open one dense area at a time, only where hosts and drivers share the same pincodes. A scattered map of single hosts is not a launch. The waitlist is how that first area gets chosen. No city is committed.

## Built: website

Repo: `website`. Next.js app. Run with `npm install` and `npm run dev`.

Pages:

- `/` — Home. Pitch, slot rules, host and driver paths, comparison with public charging, trust, FAQ, waitlist.
- `/host` — For people who can share a socket. Host role is pre-selected on the form.
- `/charge` — For drivers. Driver role is pre-selected. Vehicle choices: scooter, auto, car, or more than one.
- `/about` — Why the pilot exists, and the order of website then one area then apps.
- `/privacy` — What the waitlist stores.
- A simple not-found page.

The waitlist form asks for name, Indian mobile number, pincode, and role (`host` or `chargee`). City, society or area, plug, and vehicle are optional. Plug choices for hosts: 15A household socket, about 3.3 kW, 7.2 kW or faster, or not sure.

`POST /api/waitlist` validates the payload, ignores honeypot hits, and rate-limits repeats. Locally, each accepted signup is one JSON object per line in `data/waitlist.jsonl` (gitignored). In production, set `WAITLIST_WEBHOOK_URL` to the Google Apps Script web app from `scripts/waitlist-google-sheet.gs`. That script appends a row to a Google Sheet named Waitlist. The API follows Apps Script’s redirect and posts the JSON body again, because a normal redirect would drop it. `source` records which page the form was on: `home`, `host`, `charge`, or `about`.

Phone numbers are stored as 10 digits. A leading `0` or `+91` is accepted.

## Not built yet

The website does not take bookings, show a map, talk to a charger, or take payment. That is intentional.

Still ahead, in roughly this order:

1. **Turn the sheet on.** Create the Google Sheet, deploy `scripts/waitlist-google-sheet.gs` as a web app, set `WAITLIST_WEBHOOK_URL` on Vercel, and redeploy. Until that URL is set, production signups are not saved.
2. **Accounts.** Mobile OTP. A person can host, charge, or both. Identity check for hosts before they can list.
3. **Host listing.** Plug, speed, hourly rate, and a calendar of open hours.
4. **Slot engine.** Enforce the 1-hour minimum, 30-minute steps, 15-minute buffer, and no overlapping bookings.
5. **Request flow.** Driver requests, host accepts or declines, first meeting is in person.
6. **Payments.** UPI collection of the slot price, planned platform fee, host payout about two days later. Overstay report and the planned penalty.
7. **Apps.** Android and iOS on the same API, after the slot rules and payments have been tried with real neighbours. Stack is not chosen.
8. **Pilot launch.** One small radius, 10–15 hosts, only after the waitlist shows both sides in the same pincodes.

## Open items

- **One person, two roles, two places.** Not handled. Each signup is a single role and a single pincode. Someone who wants to host at home and charge near work cannot say that in one form. Submitting twice with the same mobile number stores two unrelated rows. Nothing links them, and nothing asks for a second area.
- **No dedupe.** The same phone can join the list many times. There is no account and no “you are already on the list” check.
- **Commercial terms are copy only.** The 12% fee, the two-day payout, and the ₹200 overstay figure are planned examples. They need a decision before any money moves.
- **Legal wording is product framing, not a legal opinion.** The site says the price is for time and a place to park, and that the host pays the electricity bill. That still needs a proper review before launch.
- **No company identity on the site.** No registered address, phone number, or app-store links, because those do not exist yet.
- **Pilot area is unknown.** Pincodes on the waitlist decide it. Lucknow layouts and Bengaluru corridors were only examples in early planning, not chosen markets.
- **App stack and data model are unset.** Users, chargers, and bookings have not been designed as a schema.

## Update this file

When you change the slot rules, the waitlist fields, or start the app, edit the matching section here in the same change. If an open item is resolved, move the decision into Product or Built and delete it from Open items.
