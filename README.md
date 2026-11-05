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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Geist.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy
Deploy with `docker-compose.deploy.yaml`, which builds the `Dockerfile` and joins the `dokploy-network` network. The app listens on port 3000.

Put these in `.env` next to the compose file: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_IMAGE_URL`, `R2_PUBLIC_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` and `REVALIDATE_SECRET`. The build reads the same file and generates pages from the database, so it must be able to reach Supabase. Rebuild after changing `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_IMAGE_URL` or `R2_PUBLIC_URL`.
