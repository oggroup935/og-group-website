# OG GROUP — Website Build Status

Cleveland off-market real estate **platform** (sellers ↔ investors ↔ partners).
Built from the Master Bible + Build Kit. Stack: **Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion**.

## Run it
```bash
cd og-group
npm run dev      # http://localhost:3000
npm run build    # production build (passes, 16 routes prerendered)
```

## Locked design (do not change without sign-off)
- Colors: Navy `#071B3B` · Gold `#D4AF37` · Cream `#F7F5F2` (defined in `app/globals.css` `@theme`).
- Fonts: **Fraunces** (display serif) + **Inter** (sans) via `next/font`.
- Home hero headline + **"Get a Cash Offer"** CTA = locked (not the soft version).
- Positioning = Platform / investment firm. **Truth-Only**: no fake stats anywhere.

## Pages (all built)
`/` `/sell` `/opportunities` `/opportunities/[id]` `/buyers` `/partners` `/about` `/faq` `/contact`
Plus `robots.txt` + `sitemap.xml`.

## Content source of truth
All copy lives in `data/*.ts` (not hardcoded in components). Edit there.

## ⚠️ Placeholders / TODO (need real content)
- `data/faq.ts` — answers now WRITTEN in brand voice (Truth-Only). Review/adjust wording.
- `data/about.ts` — **"A Note From The Founders"** still a placeholder (marked in UI).
- Hero image = a stock Unsplash photo placeholder (`data/home.ts` → `hero.image`). Swap for a real Cleveland property photo. Opportunity cards still show "available to investors" placeholders.

## Two-layer opportunity model (important)
`types/index.ts` → `Opportunity`. Public-safe fields render everywhere.
**Never render** `price`, `arv`, `repairCost`, `assignmentFee`, or exact `address` publicly.
`PublicOpportunity` is the safe projection.

## Supabase — CODE FULLY WIRED, just needs your project + keys
The app code, client, insert logic, and SQL migration are all done. The forms
already write to Supabase the moment env keys exist; with no keys they fall back
to a simulated success so the site keeps working. **Creating the cloud project +
keys must be done by you (it needs your Supabase login).**

Do this:
1. Create a **separate** Supabase project named `og-group` at supabase.com
   (do NOT touch the existing app's project).
2. SQL Editor → run **`supabase/schema.sql`** (creates the 5 tables, RLS so anon
   can submit but not read leads, and a public-safe `public_opportunities` view).
3. Project Settings → API → copy the **Project URL** + **anon public key** into
   `.env.local` (copy from `.env.local.example`).
4. Restart `npm run dev`. Submit a test form → check the table in the dashboard.
   Done — `lib/leads.ts` + `lib/supabase.ts` handle the rest.
5. Later: swap `sampleOpportunities` (`data/opportunities.ts`) for reads from the
   `public_opportunities` view in the opportunities pages.
6. Deploy to Vercel (set the same env vars in the Vercel project).
