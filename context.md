# CoCharge context

Living notes for the India neighbourhood-charging pilot. Update this file when a product decision changes, a piece of the website ships, or work starts on the apps.

The website is a brochure and a waitlist. Bookings, payments, and accounts belong in the apps, which are not started.

## Product

CoCharge connects a host who has a charger or a 15A socket with a neighbour who needs to charge. The host rents time and a place to park. The driver pays for the booked slot. The host keeps paying their own electricity bill and sets the hourly rate.

This is regular charging someone can walk home from. Highway and one-off destination charging stay with public networks. Scooters, autos, and cars are all in scope when the plug matches.

### Slot rules

These rules are fixed for the product. They are explained on the site and enforced in the API.

- Shortest booking is 1 hour.
- Extra time is added in 30-minute steps.
- The next booking can start when the previous one ends.
- Five minutes before the end, the host and the driver both get a reminder to unplug and leave.
- A 10-minute grace period covers a slow return to the vehicle. After that, the host can report an overstay and call the driver. The driver can call the host.
- The planned overstay penalty is about ₹200 per extra half hour.
- The planned platform fee is about 12%, with the host paid about two days after the session.

Rates, the fee, and the penalty on the site are examples of the model. Nothing is charged today.

### How a session is meant to work

1. The host publishes the plug, approximate speed, free hours, and hourly rate.
2. The driver requests a slot. The host accepts or declines.
3. The first visit is in person: the host shows the socket.
4. The driver pays for the booked window, whether or not they unplug early.
5. Five minutes before the end, the host and the driver are reminded to unplug and leave. The vehicle moves when the slot ends.
6. After the 10-minute grace period, the host can report an overstay and call the driver. The driver can call the host. The planned penalty is about ₹200 per extra half hour.

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

## Build sequence

The API comes before the phone app. One step at a time.

1. **Slot rules in `api`.** Duration, overlap, and the 5-minute reminder time, with tests. Written locally. Not committed yet.
2. **Postgres.** Users, places, driver profiles, and bookings. Creating a booking uses the slot rules. Written locally, with an Alembic migration. Tests run on SQLite because Postgres is not installed on this machine. Not committed yet.
3. **Firebase phone sign-in** on the API.
4. **Host places.** Open hours and a nearby search of about 3 km.
5. **Accept or decline.** The host sees waiting requests and accepts or declines each one. Written locally. The Razorpay payment that follows acceptance is still ahead.
6. **Celery.** Five minutes before the end, notify the host and the driver to unplug and leave. At the end time, close the session and start the host payout. Ten minutes after the end, the overstay window opens so the host can report it.
7. **Expo app.** Sign-in, a preview code step, the host/charge switch, and a profile saved through the API into PostgreSQL `users`. Email must be verified before that save. Each host socket listing is stored on this phone against that account’s 10-digit mobile number (`localStorage` key `cocharge.host-listings`). Another number does not see it. The host chooses charger, socket, or both, then wattage and connector type, socket type, or all of those. The hourly price is suggested from the host's electricity tariff, charger power, a transfer-loss allowance, the 12% CoCharge fee, and a margin. Opens and Closes are rollers; the same hour on both means all day. Location photos are compressed to JPEG and stored under the API uploads folder, up to two. The confirmed address shows the map pin. The CoCharge header and menu are on every screen; the menu is hidden until a mobile number is present. Firebase phone OTP is not connected. What the app does is also written in `mobile/README.md`. Written locally. Not committed yet.
8. **Driver map and host calendar.** Request a slot, accept it, and report an overstay.

## Not built yet

The website does not take bookings, show a map, talk to a charger, or take payment. That is intentional.

Still ahead, in roughly this order:

1. **Turn the sheet on.** Create the Google Sheet, deploy `scripts/waitlist-google-sheet.gs` as a web app, set `WAITLIST_WEBHOOK_URL` on Vercel, and redeploy. Until that URL is set, production signups are not saved.
2. **Accounts.** Mobile OTP. A person can host, charge, or both. Identity check for hosts before they can list.
3. **Host listing.** Plug, speed, hourly rate, and a calendar of open hours.
4. **Slot engine.** Enforce the 1-hour minimum, 30-minute steps, and no overlapping bookings. Send the 5-minute unplug reminder.
5. **Request flow.** The driver can request a slot and the host can accept or decline it in the API. The first meeting is still in person, and the app screens for that flow are not built.
6. **Payments.** UPI collection of the slot price, planned platform fee, host payout about two days later. Overstay report and the planned penalty.
7. **Apps.** One Expo app from the `mobile` repo, talking only to the FastAPI service in `api`. See Architecture.
8. **Pilot launch.** One small radius, 10–15 hosts, only after the waitlist shows both sides in the same pincodes.

## Open items

- **One person, two roles, two places.** Not handled. Each signup is a single role and a single pincode. Someone who wants to host at home and charge near work cannot say that in one form. Submitting twice with the same mobile number stores two unrelated rows. Nothing links them, and nothing asks for a second area.
- **No dedupe.** The same phone can join the list many times. There is no account and no “you are already on the list” check.
- **Commercial terms are copy only.** The 12% fee, the two-day payout, and the ₹200 overstay figure are planned examples. They need a decision before any money moves.
- **Legal wording is product framing, not a legal opinion.** The site says the price is for time and a place to park, and that the host pays the electricity bill. That still needs a proper review before launch.
- **No company identity on the site.** No registered address, phone number, or app-store links, because those do not exist yet.
- **Pilot area is unknown.** Pincodes on the waitlist decide it. Lucknow layouts and Bengaluru corridors were only examples in early planning, not chosen markets.
- **Razorpay account is not opened.** The API is planned around Razorpay Route for the slot payment and the host transfer. The Route account and the host linked accounts still have to be created.
- **Identity document is chosen on the phone.** The profile asks for a photo, name, email, mobile, an alternate mobile, and an Aadhaar PDF. The PDF stays on the device. A KYC vendor is still not chosen, so CoCharge does not receive the file.

## Architecture

Working plan for the apps. The website stays a brochure. The phone shows a clock for a slot whose end time is already known. The API is the record of that end time, the 5-minute reminder, and the payment.

### Repositories

Three repositories. `website` already exists. Two are new.

| Repo | Stack | Job |
|---|---|---|
| `website` | Next.js | Marketing pages and the waitlist. No bookings. |
| `api` | FastAPI, Celery, Redis | Accounts, places, the slot engine, requests, payments, and deadline jobs. |
| `mobile` | Expo (React Native), TypeScript, Zustand | One app. EAS builds the App Store binary and the Play Store binary. |

Both store listings are built from `mobile`. JavaScript fixes that do not touch native code can ship over the air. The slot rules live only in `api`.

### Services

- **PostgreSQL + PostGIS.** Bookings are SQL rows. A place cannot be double-booked. Nearby search is a radius query, starting with chargers inside about 3 km of the driver.
- **Firebase Auth.** Indian mobile OTP. The API trusts the Firebase user id and stores the phone number on the CoCharge user.
- **Google Maps.** The host drops the socket with a fixed centre pin: the map moves underneath, search finds a street, and the address updates when the map settles. Maps JavaScript API, Places API, and Geocoding API share one key in `mobile/.env.local` as `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`. The key is not committed.
- **Razorpay Route.** The driver pays the slot amount when the host accepts. After the session, Route transfers the host share and keeps the platform fee, planned at about 12%. An overstay is a second charge the host can report after the 10-minute grace period, using the saved payment method.
- **Celery + Redis.** Each accepted booking schedules three jobs: a reminder 5 minutes before the end for the host and the driver, a close at the end time that starts the host payout, and a marker 10 minutes after the end when the host may report an overstay and the two sides may call each other.

### Request path

1. The app signs in with Firebase phone OTP.
2. The API loads one user. That user can have a host place, a driver profile, or both. Each place has its own pincode.
3. The driver sends a start time and a duration. The API accepts only 60 minutes plus 30-minute steps, and only when that slot is free.
4. The host accepts or declines. Acceptance writes the booking and the Celery deadlines, then collects the slot payment.
5. The app keeps the end time on the device so the countdown is still visible if the phone loses signal. Reconnecting refreshes that time from the API. The phone does not decide the fee.

API packages: `auth`, `users`, `places`, `availability`, `bookings`, `payments`. App screens: sign-in, nearby places, slot request, host calendar, incoming requests, and the booking screen with the overstay report.

Tests for the slot rules are pytest tests against the API. The phone flow is exercised with Maestro. A later Python script compares completed bookings with Razorpay settlement records before a payout is treated as final.

### Records

- **User.** Firebase id, phone number, name, and whether the host identity check has passed.
- **Place.** Owned by a user. Coordinates, pincode, area, plug, approximate speed, hourly rate, and open hours.
- **Driver profile.** Vehicles on that same user: scooter, auto, car, or several.
- **Booking.** Driver, place, start, end, and state: requested, accepted, completed, or declined. The reminder time is 5 minutes before the end.
- **Payment.** Booking, amount, fee, host share, Razorpay payment id, and transfer id.

The Google Sheet remains the waitlist until accounts exist. It is not the booking database.

## Update this file

When you change the slot rules, the waitlist fields, or start the app, edit the matching section here in the same change. If an open item is resolved, move the decision into Product or Built and delete it from Open items.
