# Pre-Launch Checklist

Run through this before texting anyone. Each item takes 1-5 minutes.

## CRITICAL — must do before sending any invite

- [ ] **Set up hooperspath.com** (instructions in HOOPERSPATH_DOMAIN_SETUP.md)
  - Add CNAME file to repo
  - Configure DNS A records and CNAME
  - Add custom domain in GitHub Pages settings
  - Wait for HTTPS cert
  - Test that https://hooperspath.com loads your app

- [ ] **Update Firebase + Apple + Google Cloud auth configs** for the new domain
  (per HOOPERSPATH_DOMAIN_SETUP.md Step 5). Without this, sign-in breaks
  for anyone arriving via hooperspath.com.

- [ ] **Set your real feedback email in the app**
  - Open `index.html`, find `YOUR_EMAIL_HERE@gmail.com`
  - Replace with your actual email (Gmail or whatever you check daily)
  - Commit + redeploy

- [ ] **Bump service worker so testers get the updated app**
  - Already on v12. Anyone visiting fresh will get current code.

- [ ] **Test the full flow end-to-end on YOUR phone**
  - Visit https://hooperspath.com (private/incognito tab)
  - Sign in with Apple — succeeds, no errors
  - Create profile — name, age 13+, color
  - Do morning check-in (try all the toggles, including Game Today/Tomorrow)
  - Pick environment, start workout
  - Open a drill, see the diagram
  - Mark some drills complete
  - Log a game (Today → Log Game)
  - Check Stats tab — see your data
  - Check Trophy tab — see badges
  - Settings → Send Feedback — opens email with your address pre-filled
  - Settings → Sign Out — works
  - Sign back in — your data is still there (this confirms cloud sync works)

- [ ] **Test on a SECOND device** (your iPad, your wife's phone, anything)
  - Sign in with same Apple ID
  - Should see your data sync down from cloud

## RECOMMENDED — don't skip these

- [ ] **Take screenshots** of the polished app for showing to people
  - Sign-in screen
  - Today tab with a workout in progress
  - Drill detail with diagram
  - Stats tab with some data
  - These help when texting someone "check this out"

- [ ] **Write your own intro message** to send testers
  - TESTER_INVITES.md has templates — pick one and personalize it
  - Don't blast 20 people at once — send to 3-5 first, see what breaks

- [ ] **Have a way to track who's been invited and who's responded**
  - Spreadsheet, Notes app, anything
  - Columns: Name, sent date, signed up?, last seen, feedback

## NICE TO HAVE — can do after first invites go out

- [ ] **Set up a feedback email forwarder**
  - Buy email forwarding from your domain registrar (~$20/year)
  - feedback@hooperspath.com → forwards to your real inbox
  - Update the app feedback email to use this when ready

- [ ] **Make a simple "What's Next" list** of features you'll build based on feedback
  - Calendar tab
  - Training Buddies
  - Coach dashboard
  - Whatever testers ask for most

## DON'T do these yet

- [ ] ~~Stripe / payments~~ (validate first, monetize later)
- [ ] ~~App Store submission~~ (PWA is fine for testing)
- [ ] ~~Marketing site / landing page~~ (the app itself is the landing page)
- [ ] ~~Multi-sport features~~ (one sport at a time)
- [ ] ~~AI features~~ (not until basics are loved)

## How to know if testing is going well

After 1 week, check:
- How many people actually signed up?
- How many opened the app more than once?
- How many are still active after 7 days?
- What feedback are you getting?

Honest signals:
- **Very good:** 50%+ are still using it after a week, asking for features
- **OK:** 30-50% are using it, mixed feedback
- **Bad signal:** Less than 25% return, complaints about basic UX

If signal is bad, don't push forward to v2 yet — fix what they didn't like first.
