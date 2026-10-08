    # Pre-Production Deployment Checklist

Deploying **Dr Hashim & Associates Dental Clinic** to **Vercel**, with the real domain `drhashimandassociates.com`.

This document is the checklist to work through on the day.

> Previously written for a Hostinger VPS with Nginx, PM2 and Certbot. That path is no longer used — Vercel handles the build, the TLS certificate and the CDN. The one instruction from the old version that must **not** be carried over is the API-key IP restriction; see step 5.

---

## 0. What Vercel does and does not handle

| Concern | Handled by |
|---|---|
| Build and deploy | Vercel — on every push to the production branch |
| TLS certificate and renewal | Vercel, automatically |
| CDN and edge caching | Vercel |
| `next/image` optimisation | Vercel (uses `sharp`, already a dependency of Next) |
| ISR revalidation for `/` and `/reviews` | Vercel's cache, `revalidate: 3600` |
| `sitemap.xml` / `robots.txt` | Generated **at build time** — see step 2 |
| GoDaddy/registrar DNS | **You** — one-time setup in step 4 |

Node is pinned to `22.x` through `engines.node` in `package.json`. Next.js 16 requires ≥ 20.9.0; the pin stops a future Vercel default change from breaking a build silently.

---

## 1. Before you start

- [ ] **Domain** — `drhashimandassociates.com`, with DNS access
- [ ] **Google Places API key** — in the current `.env.local`
- [ ] **Google Places Place ID** — `ChIJ8zBMenhKz2cRBnRXb0-JHtI`
- [ ] **GitHub repo** — `thedentalos/dr-hashim-and-associates`
- [ ] **Vercel account on the Pro plan** — Hobby is for non-commercial projects only, and a clinic's booking site is commercial use
- [ ] **Content sign-off** — see step 10. Some photography is still placeholder.

**Canonical hostname is the apex**, `drhashimandassociates.com`, and `www` will redirect to it. This is already reflected in `SITE_URL`; changing it later means changing `SITE_URL` and rebuilding, plus re-verifying in Search Console.

> **Never commit the API key.** `.env.local` is gitignored and stays that way. On Vercel the key lives only in the project's environment variables.

### If the site was previously deployed to a different Vercel account

A domain can only belong to **one** Vercel project across the whole platform. If the old project still has `drhashimandassociates.com` attached, adding it to the new project fails with *"domain is already in use"* — and creating the new project first will not work around it.

- [ ] Get the domain **removed from the old project** (old project → Settings → Domains → Remove) before step 4. If you no longer have access to that account, whoever does must do it.
- [ ] If you *can* get access to the old account, prefer **Settings → General → Transfer Project** over rebuilding: the environment variables and the domain move with it, so steps 2 and 4 become unnecessary.
- [ ] **Web Analytics does not migrate** — re-enable it on the new project (step 6).
- [ ] Delete or repoint the old project so it stops serving the domain.

Nothing in the repository is tied to a particular Vercel project — there is no `.vercel` link and `vercel.json` is generic — so no code changes are needed either way.

---

## 2. Environment variables

Vercel **ignores `.env.local` entirely** — it exists for local development only. All three variables must be added in the Vercel dashboard.

**Project → Settings → Environment Variables.** Add each one to **all three** scopes:

| Variable | Production | Preview | Development |
|---|---|---|---|
| `SITE_URL` | ✅ | ✅ | ✅ |
| `GOOGLE_PLACES_API_KEY` | ✅ | ✅ | ✅ |
| `GOOGLE_PLACES_PLACE_ID` | ✅ | ✅ | ✅ |

```
SITE_URL=https://drhashimandassociates.com
GOOGLE_PLACES_API_KEY=<paste the real key>
GOOGLE_PLACES_PLACE_ID=ChIJ8zBMenhKz2cRBnRXb0-JHtI
```

### Why all three scopes for `SITE_URL`

`SITE_URL` is read **at build time**. The build now **fails outright** if it is missing, rather than shipping an empty sitemap — so a preview deployment without it will fail rather than pass quietly. Pointing previews at the production origin is also the correct SEO behaviour: a preview URL then carries the production canonical instead of self-canonicalising, so previews can never compete with the live site in search.

### Why each variable matters

| Variable | Effect if missing |
|---|---|
| `SITE_URL` | **The build fails.** (Deliberate — see above.) |
| `GOOGLE_PLACES_API_KEY` | The reviews section renders its empty state. No error reaches visitors. |
| `GOOGLE_PLACES_PLACE_ID` | Falls back to the clinic's ID in code, so it is optional — but set it so it is not invisible. |

### ⚠️ Changing `SITE_URL` requires a rebuild

`sitemap.xml` and `robots.txt` are statically generated at build time. Changing the variable and redeploying is not enough — you must **trigger a new build** (push a commit, or Deployments → ⋯ → Redeploy with "use existing build cache" **unchecked**).

---

## 3. Deploy

1. Vercel → **Add New → Project → Import Git Repository** → `thedentalos/dr-hashim-and-associates`.
2. Framework preset should auto-detect as **Next.js**. `vercel.json` already sets `framework` and `buildCommand`.
3. Set the **Production Branch** (currently `main`).
4. Add the environment variables from step 2 **before** the first build, or it will fail.
5. Deploy.

Confirm the build log lists these routes. Note that `/` and `/reviews` are **static with 1-hour revalidation**, not dynamic — they no longer render per request:

```
┌ ○ /                                  1h
├ ○ /reviews                           1h
├ ○ /sitemap.xml
├ ○ /robots.txt
├ ○ /opengraph-image
└ ● /team/[slug]  (4 prerendered profiles)
```

---

## 4. Domain and DNS

1. Project → **Settings → Domains** → **Add Domain** → `drhashimandassociates.com`. Vercel will offer to add the `www` prefix at the same time; accept it.
2. Add `www.drhashimandassociates.com` as well, then set **`drhashimandassociates.com` as the primary**. Vercel issues the certificate for both and redirects the other to it.

   > Do not skip the redirect. Serving both hostnames without one splits your search signals across two URLs.

3. **Copy the DNS values from the Domains panel — do not copy them from this document or from another project.**

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | the IP shown for *this* project (Vercel has used both `76.76.21.21` and `216.198.79.1`) |
   | CNAME | `www` | the project-specific target shown, of the form `<hash>.vercel-dns-0xx.com` |

   The `www` target is **unique per project** — the older generic `cname.vercel-dns.com` is no longer what the dashboard hands out for new projects. Using a stale value is the usual cause of an "Invalid Configuration" warning.

   Alternatively, point the domain's nameservers at Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) and it manages both records for you. If you do that, **copy any existing MX and TXT records across first**, or clinic email will stop.

4. **If Vercel says the domain is in use by another account**, it offers a **TXT verification** instead of blocking you. That lets you use the domain without moving it, and does not require the other account's cooperation. Prefer this over chasing the old project.

5. Wait for the certificate to show **Valid** before continuing.

```bash
dig +short drhashimandassociates.com                     # should return the IP from step 3
curl -sI https://drhashimandassociates.com | head -1     # expect HTTP/2 200
curl -sI https://www.drhashimandassociates.com | head -1 # expect 308
```

---

## 5. Restrict the Google API key

> **This is where the old VPS instructions must not be followed.** They said to restrict the key to the server's IP address. Vercel's functions have **no fixed egress IP**, so an IP restriction will cause Google to reject every request and the reviews section will quietly fall back to its empty state. An IP-restricted key is worse than an unrestricted one here.

In **Google Cloud Console → APIs & Services → Credentials → (your key)**:

- [ ] **Application restrictions** — leave as **None**. Do not set IP addresses. Do not set HTTP referrers; server-side requests send no referrer, so that restriction would also break the call.
- [ ] **API restrictions** — restrict the key to **Places API (New)** only. This is the control that matters: a leaked key can then only read place data.
- [ ] **Billing → Budgets & alerts** — set a budget with an alert, so unexpected usage is noticed rather than discovered on an invoice.
- [ ] **Quotas** — set a daily request cap on Places API (New). The site makes at most one call per hour per deploy, so a low cap is safe and bounds the damage from any leak.

The key is used only in `app/google-reviews.ts` and never reaches the browser, which is what makes "no application restriction" acceptable here.

---

## 6. Analytics and Search Console

### Vercel Web Analytics

`<Analytics />` is already wired into `app/layout.tsx`. It defaults to collecting nothing until it is switched on:

- [ ] Project → **Analytics** → **Web Analytics** → **Enable**.

If this is not enabled, the script is never injected and the dashboard stays empty. It sets no cookies and does no cross-site tracking, so the site needs no consent banner.

Consider enabling **Speed Insights** on the same page for real Core Web Vitals from actual visitors.

### Google Search Console

Not a substitute for analytics, and not optional — this is the only place you will see which searches bring people in, and whether pages are indexed at all.

- [ ] Add `drhashimandassociates.com` as a **Domain** property (DNS verification).
- [ ] Submit `https://drhashimandassociates.com/sitemap.xml`.
- [ ] Use **URL Inspection → Request indexing** for the homepage and `/services`.
- [ ] Confirm the Google Business Profile is live and its hours and address match the site — the reviews section and local search both depend on it.

---

## 7. Post-deployment verification

Run every one of these against the live domain.

```bash
curl -s https://drhashimandassociates.com/sitemap.xml | grep -c '<loc>'
curl -s https://drhashimandassociates.com/robots.txt
curl -s https://drhashimandassociates.com/ | grep -o '<link rel="canonical"[^>]*>'
curl -sI https://www.drhashimandassociates.com | head -1
```

- [ ] `sitemap.xml` lists **12 `<url>` entries** — homepage, about, team, four clinician profiles, services, cases, reviews, booking, contact. Not an empty `<urlset>`.
- [ ] `robots.txt` contains both a `Host:` and a `Sitemap:` line, both on the real domain.
- [ ] Every page has `<link rel="canonical">` pointing at the real domain — **not** a relative path and **not** a `*.vercel.app` URL.
- [ ] `www` returns **308** to the apex.
- [ ] Pasting the homepage URL into WhatsApp shows the **share card image**, not a bare text row.
- [ ] **Google Reviews load** on the homepage and `/reviews`, with star rating and review count.
- [ ] Favicon appears in the browser tab (hard-refresh; favicons cache aggressively).
- [ ] WhatsApp button opens a chat with the clinic's number.
- [ ] Booking form submits.
- [ ] Homepage hero: the word types through and settles on "everyone".
- [ ] The **Urdu tagline appears within about a second** and renders in Nastaliq, not a fallback serif.
- [ ] The team page's "How we work" section shows its three paragraphs — if the rules are there but the text is not, the scroll-reveal has regressed.
- [ ] With JavaScript disabled, the page is still fully readable (browser settings → disable JS, reload).
- [ ] No horizontal scrolling on a real phone.
- [ ] All five smile-journey stages switch when tapped, on phone and desktop.
- [ ] Open a clinician profile (e.g. `/team/dr-baryal-khan`) and check the case credits link back correctly.
- [ ] Test on a real iOS device and a real Android device, not just a resized browser.

---

## 8. Shipping future updates

Vercel builds and deploys automatically on push to the production branch:

```bash
git push origin main
```

Watch the deployment in the Vercel dashboard. A failed build leaves the previous deployment serving — there is no downtime window, unlike the old VPS flow.

**Preview deployments** are created for every other branch and pull request. Vercel marks them `noindex` and they carry the production canonical, so they cannot be indexed.

### Rollback

Vercel → **Deployments** → pick the last good one → **⋯ → Promote to Production**. Instant, and it does not require a rebuild.

### Before pushing

```bash
npx tsc --noEmit     # typecheck
npm run build        # catches build-time failures locally
npm audit            # should report 0 vulnerabilities
```

---

## 9. Known limitations to accept at launch

- **One case image is soft.** `case-zirconia-veneers.webp` is 500×500 while its siblings are 1083–1280², so it looks noticeably softer in the lightbox. No higher-resolution original exists; it needs a re-shoot or a re-export from the original file.
- **Opening hours carry no days in structured data.** The clinic publishes a single daily range (10:00 AM – 8:30 PM) with no day breakdown, so `dayOfWeek` is deliberately omitted rather than asserting seven-day opening. Add it once the practice confirms which days it is closed.
- **No doctor photographs.** All four profiles and cards use initials monograms by design.
- **The clinic email is published as `drhahsimandassociates@gmail.com`** — confirmed as intended by the practice, despite the spelling.

---

## 10. Content that must be signed off before launch

- [ ] **Doctor photographs** — all four are initials monograms right now
- [ ] **Clinic interior photography** — verify the current selection in `public/media/` is final
- [ ] **Clinical case images** — the six existing before/after images were confirmed as approved for publication, with patient consent recorded
- [ ] Confirm **clinic hours** (10:00 AM – 8:30 PM) and the **WhatsApp number** (0300 855 7144) are current
- [ ] Confirm the **Google Business Profile** is live
- [ ] Confirm the **promotional offer** terms are still current: free consultation plus 30% off general dental procedures, excluding orthodontics, implants, cosmetic treatment and laboratory fees

---

## 11. Notes and loose ends

- **`dist/` is dead weight.** Leftover files from the pre-Next static site are staged for deletion. Commit that removal.
- **`.env.local` is gitignored, but a plain `.env` is not.** Add `.env` to `.gitignore` before anyone creates one.
- **The Google reviews cache is 1 hour.** `/` and `/reviews` revalidate hourly, which is well inside the 30-day limit the Places terms place on caching place data. If reviews ever look stale, that is the number to look at — not a bug.
- **Monitoring.** Nothing currently alerts if the site goes down. Consider an uptime monitor pointed at the homepage; Vercel's own dashboard shows build failures but not availability from a visitor's perspective.
- **Node version drift** is handled by `engines.node` in `package.json`. Do not remove it.
