# Handoff: raj.aivet.work (Raj's personal portfolio)

Read this first. It is written for whoever picks this project up next, human or AI,
on any account.

## What this is

The personal portfolio of **Nagarajan Shunmugam**, who goes by **Raj S.** He is an
AI engineer, CRISPR researcher, founder, and final-year veterinary student who
qualifies as a veterinarian in December 2026. The site targets European employers
and research collaborators.

- **Live:** https://raj.aivet.work
- **Repo:** `TinyAnts/raj-portfolio`, production branch **`master`** (not `main`)
- **Hosting:** Cloudflare Pages, auto-deploys on push to `master`
- **Contact email on the site:** `ai.vet.ml@gmail.com`

> The production branch here is `master` while every other repo in the family uses
> `main`. Check before you push.

## Stack

Vite + React + TypeScript + Tailwind v4 (`@tailwindcss/vite`), shadcn/ui
components, Framer Motion for animation. Almost the whole site lives in one file:

```
src/pages/Home.tsx      ~1000 lines, the entire page and all its data
src/index.css           design tokens and utility classes
public/Raj-S-CV.pdf     the downloadable CV
public/404.html         branded not-found page
scripts_gen_cv.py       legacy CV generator, see the CV note below
```

```bash
npm install
npm run dev      # local dev
npm run build    # outputs to dist/
npx tsc --noEmit # type check
```

Cloudflare build settings: framework preset **React (Vite)**, build command
`npm run build`, output directory `dist`.

## Design system: "Swiss print"

The owner rejected two earlier designs for looking AI-generated. The current one
survived review. Do not restyle it without being asked.

- paper `hsl(40 45% 96%)`, ink `hsl(40 12% 11%)`
- forest green `hsl(152 26% 24%)` is the primary, brass `hsl(38 48% 44%)` the accent
- Poppins for headings, Inter for body, JetBrains Mono for labels and metadata
- Recurring motif: **corner brackets** on cards and images, plus `fig. 01` style
  mono captions. Decorative floating icons come from the `FloatIcon` component.

Two rules learned the hard way:

- **Hover states must not move layout.** Use `border-l-2 border-transparent` going
  to `border-accent` on hover. An earlier version shifted padding on hover and the
  rows visibly jittered.
- **No black-and-white photo treatment and no heavy black.** Use forest green.

## Content that has been corrected before

Get these right, they were each fixed after a review:

- Preferred name is **Raj S.**; full name appears once in the hero as
  `(Nagarajan Shunmugam)` in lowercase brass brackets.
- He is a **veterinarian graduating December 2026**, described as a future vet.
- He is **bilingual**: English (IELTS C1) and Tamil. Do not present Tamil alone as
  his only native language; he works in Europe and the English level matters.
- His California-era role was **not** veterinary work.
- Zaide.ai: he built private, custom large language models for healthcare and life
  sciences, local LLMs so sensitive clinical data never leaves the organization.
- ClaimPilot is **co-authored**: `Hoang, M.L. and Shunmugam, N.` He is not the sole
  author. This was wrong once and had to be corrected in two places.

## Page sections in order

hero, about, experience (14 entries, filterable), education (6 institutions,
Hirszfeld Institute first), **publications**, **side projects**, skills, contact.

The `PUBLICATIONS` and `PROJECTS` arrays near the top of `Home.tsx` drive their
sections. A second, smaller publications summary card also exists inside the skills
section; if you add a publication, consider both places.

Side projects currently list `radar.aivet.work` and `varianthound.aivet.work`.
**The Radar description is a placeholder.** Its site blocks automated readers, so
nobody has been able to verify what it does. Ask the owner for one accurate line
and replace it. VariantHound's description was verified from its live site:
explainable phenotype-aware gene prioritization for canine inherited disease
research.

## The CV

`public/Raj-S-CV.pdf` is now **Raj's real general CV**, uploaded by the owner. The
Download CV buttons link to `/Raj-S-CV.pdf`.

`scripts_gen_cv.py` is the older reportlab generator that used to produce that file.
It is kept for reference but **is no longer the source of the live CV**. If you run
it, it will overwrite the real CV with the generated one. Do not run it unless the
owner asks for a regenerated CV. If you ever do, it registers Poppins TTFonts
because the default Helvetica cannot render the Polish letter in "Wroclaw".

The live CV does not currently list the publications. The owner was offered that
and has not asked for it yet.

## House rules (apply to every site in this family)

These are the owner's standing preferences. Breaking them means redoing work.

1. **Never use em-dashes or en-dashes (the long dash characters) in site copy.**
   The owner considers them a tell that text was written by AI. Use commas,
   colons, semicolons, or the middot separator instead. Check with a search for
   the long dash characters before shipping.
2. **No invented testimonials, reviews, or endorsements presented as real.**
   Placeholder social proof stays behind a flag that is off in production.
3. **Free tiers only.** No paid subscriptions, no Stripe, no payment processors,
   nothing that would require registering a business.
4. **Write like a person.** Short punchy fragments stacked together read as
   machine-written. Prefer plain sentences in the first person.
5. **Preview before shipping.** Build, screenshot, and show the owner a preview.
   The owner reviews visually and gives precise feedback.
6. **Forms and interactive elements must stay accessible** (labels, focus states,
   reduced-motion fallbacks for animations).

## How deployment works

Every site follows the same path:

```
git push  ->  GitHub (TinyAnts/<repo>)  ->  Cloudflare Pages auto-build  ->  live domain
```

Cloudflare Pages watches the production branch of the GitHub repo and rebuilds on
every push. Nothing is uploaded by hand. Cloudflare account id:
`3869409b5f0d6bec2fa88ebf6106b5f1`.

If a push lands on GitHub but the site does not change, the Pages project has lost
its Git connection. Fix it at Cloudflare dashboard -> Workers & Pages -> the project
-> Settings -> Build -> Git repository -> Connect. If the repo is missing from the
dropdown, grant the Cloudflare Pages GitHub App access to it at
github.com/settings/installations. This has happened before on this account.

Custom domains are managed in the Pages project under Custom domains. DNS is
already on Cloudflare nameservers, so adding a subdomain there creates the DNS
record automatically. Give it a few minutes and expect browser/ISP DNS caching to
lag; testing in incognito does not bypass an OS-level DNS cache.

## The other sites in this family

| Repo | Live at | Stack |
|---|---|---|
| `TinyAnts/oliwia-portfolio` | oliwiakonieczna.info | static HTML, no build |
| `TinyAnts/oliwia-from-poland` | poland.oliwiakonieczna.info | Vite + React + TS |
| `TinyAnts/oliwia-yoga` | yoga.oliwiakonieczna.info | Vite + React + TS |
| `TinyAnts/career-copilot-360` | aivet.work | Vite + React + TS |
| `TinyAnts/raj-portfolio` | raj.aivet.work | Vite + React + TS |
