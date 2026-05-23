# LaunchOS — SEO Engine

AI-powered SEO operating system for SaaS founders, indie hackers, and AI startups.

**SEO for founders who hate SEO.**

## Stack

- **Next.js 15+** App Router
- **TypeScript** + **Tailwind CSS**
- **Shadcn-style UI** (Radix primitives)
- **Framer Motion**
- **Supabase** PostgreSQL + **Prisma** ORM
- **Whop embed** (CSP `frame-ancestors`; auth gated by Whop for MVP)
- **Gemini 2.0 Flash** for AI generation

## Features

- SEO Dashboard with scores & activity
- Landing Page SEO Generator
- Programmatic SEO Generator
- SaaS Blog Generator (TOFU/MOFU/BOFU)
- Metadata Generator
- Keyword Engine
- SEO Swipe Vault
- Saved Projects

## Quick Start

### 1. Clone & install

```bash
cd launchos
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

| Variable | Source |
|----------|--------|
| `DATABASE_URL` | Supabase → Settings → Database (pooler URL) |
| `DIRECT_URL` | Supabase → Direct connection URL |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com) |

### 3. Database setup

```bash
npx prisma db push
npx prisma generate
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

Repository: [github.com/abdallahabdelnbii338-ai/SEO-engine-whop](https://github.com/abdallahabdelnbii338-ai/SEO-engine-whop)

1. Go to [vercel.com/new](https://vercel.com/new) and import **SEO-engine-whop**.
2. Set **Root Directory** to `.` (repo root is the Next.js app).
3. Framework preset: **Next.js** (default). Build command: `npm run build`.
4. Add environment variables from `.env.example` (same values as your local `.env.local`).
5. Deploy.

After the first deploy, run against production Supabase:

```bash
npm run db:push
```

(Use your production `DATABASE_URL` / `DIRECT_URL` locally, or run `prisma db push` from Vercel with env vars loaded.)

**Clerk:** In the Clerk dashboard, add your Vercel URL to allowed origins and redirect URLs (e.g. `https://your-app.vercel.app`).

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/dashboard/   # Protected app routes
│   ├── api/                     # API routes
│   ├── sign-in/ sign-up/        # Clerk auth
│   └── page.tsx                 # Marketing landing
├── components/
│   ├── ui/                      # Design system
│   ├── marketing/               # Landing page
│   ├── layout/                  # Sidebar, headers
│   └── tools/                   # Generators & outputs
├── lib/
│   ├── ai/                      # Gemini + prompts
│   ├── swipes/                  # Swipe vault data
│   └── prisma.ts
└── types/
```

LaunchOS is **free to use** — no paid tiers or upgrade flows in the product.

## License

MIT
