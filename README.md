# Verve marketing site

Static multi-page site (built by `build.py`) with Cloudflare Pages Functions and D1 for lead capture.

- Build: `python3 build.py` regenerates the HTML pages. Output is committed.
- `POST /api/lead` stores enquiries in D1 (`leads` table; honeypot, validation, per-IP hourly limit).
- `/admin/` shows stored leads. Needs the `LEADS_KEY` secret (Pages env var). Not linked anywhere.

## Asset sources and licences (all supplied by the site owner)
- Verve logo, client logos, website mockups, social graphics, stock photos, testimonial avatars, testimonial text, contact details, pricing ranges, copy: from the live verve.buzz.
- Portfolio graphics (brand identities, social, print, packaging, web, mobile apps, editorial): from portfolio documents supplied by the site owner as their own work.
- Client logos in the marquee (round): cropped from the supplied company profile deck.
- People & Perspectives guest photos, behind-the-scenes videos (muted), channel avatars, media and press logos, certification badges: reused from the People & Perspectives site (cybicco/people-and-perspectives-site).
- Fonts: Sora and Plus Jakarta Sans via Google Fonts (SIL Open Font License).

## Items needing owner confirmation
- Certification badges in the footer are the People & Perspectives set; confirm they apply to Verve or replace with Verve's own files.
- Press and distribution logos are shown as distribution channels via People & Perspectives; confirm the wording.
- AI-driven positioning copy: confirm the tooling described.
- Podcast platform link points to the pages.dev address until peopleandperspectives.in is live.
