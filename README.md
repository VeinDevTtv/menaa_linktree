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

## Discord announcements (frontend-triggered)

This app posts event reminders to a Discord channel via webhook, triggered from the browser.

1. Set environment variable (Project Settings → Environment Variables):

   - `DISCORD_EVENT_WEBHOOK_URL` = your Discord webhook URL

2. How it works

   - `components/event-announcer.tsx` runs client-side and schedules three GETs to `/api/announce` at 2PM, 3PM, and 5PM PT.
   - The API route `GET /api/announce?phase=pre|start|end` sends the corresponding message to Discord.
   - LocalStorage is used to avoid duplicate sends on the same device.

3. Timezone

   - Hardcoded for the mixer date: 2PM, 3PM, 5PM in `America/Los_Angeles`.
   - Adjust dates/times in `components/event-announcer.tsx` for future events.
