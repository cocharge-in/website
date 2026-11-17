# CoCharge website

Informational site for the India neighbourhood-charging pilot, plus a waitlist for hosts and drivers.

What is built, what is still ahead, and open decisions live in [context.md](context.md).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Waitlist

Signups are appended to `data/waitlist.jsonl` on this machine. That file is gitignored.

To forward each signup as JSON in production, set `WAITLIST_WEBHOOK_URL`. See `.env.example`.
