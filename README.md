This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Scheduled Discord announcements

This app can post event reminders to a Discord channel via webhook.

1. Set the environment variable in Vercel:

   - `DISCORD_EVENT_WEBHOOK_URL` = your Discord webhook URL

2. Cron schedules are defined in `vercel.json` to hit the following routes:

   - `GET /api/announce-2pm` → "Only 1 hour left!"
   - `GET /api/announce-3pm` → "It's 3PM — event is starting now!"
   - `GET /api/announce-5pm` → "That's a wrap! It was fun having everyone — see you next time!"

3. Timezone

   Vercel Cron uses UTC by default. This project targets San Francisco time (`America/Los_Angeles`).

   - Current (PDT, UTC−7): 2PM → 21:00 UTC, 3PM → 22:00 UTC, 5PM → 00:00 UTC (next day)
   - Standard time (PST, UTC−8): 2PM → 22:00 UTC, 3PM → 23:00 UTC, 5PM → 01:00 UTC (next day)

   If DST changes, update `vercel.json` accordingly.
