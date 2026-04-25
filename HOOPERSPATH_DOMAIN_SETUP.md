# Connecting hooperspath.com to your GitHub Pages app

You bought hooperspath.com. Right now your app lives at
`nickeldurrant-dev.github.io/Hoopers-Path/`. Let's point your domain there.

## Time required: 30-60 minutes (most of it waiting for DNS)

## Step 1: Add a CNAME file to your repo

In the GitHub web UI:
1. Open https://github.com/nickeldurrant-dev/Hoopers-Path
2. Click "Add file" → "Create new file"
3. Filename: `CNAME` (exactly that, no extension, all caps)
4. Content: `hooperspath.com` (just the domain, no https, no www, no slash)
5. Click "Commit new file"

This tells GitHub Pages your custom domain.

## Step 2: Configure DNS at your domain registrar

You'll do this where you bought the domain (Namecheap, GoDaddy, Cloudflare,
etc.). Look for "DNS" or "DNS Settings" or "Manage DNS."

Add these records:

### Apex domain (hooperspath.com)
Add **four A records** pointing to GitHub's IPs:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

(`@` means the apex/root domain. Some registrars use `hooperspath.com` instead
of `@` — both mean the same thing.)

### www subdomain (www.hooperspath.com)
Add **one CNAME record**:

| Type | Host | Value |
|------|------|-------|
| CNAME | www | nickeldurrant-dev.github.io |

(Note: some registrars want `nickeldurrant-dev.github.io.` with a trailing
dot. Both work usually.)

### Save and wait

DNS changes propagate in 5 minutes to a few hours. Usually under an hour.

## Step 3: Configure custom domain in GitHub Pages

1. Open your repo on github.com
2. Settings → Pages
3. Under "Custom domain" enter: `hooperspath.com`
4. Click Save
5. GitHub will check DNS. If it says "DNS check successful," good.
   If it errors, wait a bit longer and refresh.

## Step 4: Enable HTTPS

Once GitHub confirms DNS:
1. Same Pages settings page
2. Check the box: **"Enforce HTTPS"**

This usually takes another 15-60 minutes for GitHub to issue a Let's Encrypt
cert. It says "Certificate not yet created" while it works on it.

## Step 5: Update Firebase and Apple configs (CRITICAL)

Now your app is at `hooperspath.com`. The auth setup must include this domain
or sign-in will break for anyone arriving via the new URL.

### Firebase
1. Console → Authentication → Settings → Authorized domains
2. Add: `hooperspath.com`
3. Add: `www.hooperspath.com` (so both work)
4. Keep `nickeldurrant-dev.github.io` in the list during transition

### Google Cloud Console (API key restrictions)
1. console.cloud.google.com → APIs & Services → Credentials
2. Click your API key
3. Under HTTP referrers, add:
   - `hooperspath.com/*`
   - `www.hooperspath.com/*`
4. Save

### Apple Services ID
1. developer.apple.com → Identifiers → Services IDs → com.hooperspath.web
2. Configure → Domains and Subdomains: add `hooperspath.com`
3. Done → Continue → Save

## Step 6: Test

In Safari on your phone:
1. Visit `https://hooperspath.com` — should load your app
2. Try sign-in flow — should work end to end
3. Visit `https://www.hooperspath.com` — should also work
4. Visit old `https://nickeldurrant-dev.github.io/Hoopers-Path/` — should still work too

## Troubleshooting

### "Site not found" or DNS error
- DNS hasn't propagated. Wait 30-60 min, try again.
- Tool to check: https://dnschecker.org/#A/hooperspath.com — should show all 4 GitHub IPs.

### "Certificate error" or "Not secure" warning
- GitHub still issuing cert. Wait up to 24h.
- If it's been more than 24h, in Pages settings: uncheck Enforce HTTPS,
  remove custom domain, save, wait 5 min, re-add custom domain, save,
  re-check Enforce HTTPS.

### Sign-in fails on the new domain
- You missed one of the auth config updates in Step 5. Each provider
  (Firebase, Google Cloud, Apple) needs the new domain added separately.

### Old GitHub URL stops working
- That's fine — it now redirects to hooperspath.com. Update your bookmarks.

## After this is done

Your app is officially branded. Time to validate.

**Validation checklist** (do over the next few weeks):
- [ ] Show app to 5 high schoolers. Watch them use it. Take notes.
- [ ] Get them to add it to home screen.
- [ ] Check back in 7 days — are they still using it?
- [ ] Get one parent to look at it. Would they pay for it?
- [ ] Find one coach to give feedback.

Do not start building v2 until you have signal that v1 is being used.
