# Hooper's Path 🏀

A basketball + strength training PWA for a high-school freshman working toward JV. Runs entirely in the browser. Installs to the iPhone home screen like a native app. All data lives locally on the device — no accounts, no cloud, no App Store.

## What's inside

- **Daily workouts** that rotate across a week built around Sat/Sun games:
  - **Mon** — Heavy legs + light handling
  - **Tue** — Shooting + upper body
  - **Wed** — Active recovery (mobility, core, light shooting)
  - **Thu** — Full body + skills + conditioning
  - **Fri** — Pre-game prep (legs stay fresh)
  - **Sat/Sun** — Game day (pre-game warm-up + post-game log + recovery checklist)
- **70+ drills** with YouTube video demos from reputable coaches
- **Morning check-in** that auto-adjusts the workout (high soreness = swap strength for mobility, tired legs = upper-only day)
- **Streak tracking** that counts rest days if recovery is logged — rewards consistency, doesn't punish needed rest
- **24 badges** for streaks, milestones, and recovery habits
- **Personal best tracking** (FT%, 3PT%, max push-ups, max pull-ups, vertical, mile, plank)
- **Game logging** with points/rebounds/assists/minutes + post-game recovery checklist
- **Progress dashboard** with 7-day load view and PR trend charts
- **Forced rest day** after 6 consecutive training days (overtraining protection)
- **Data export** to JSON (backup everything to a file)

## File structure

```
hoopers-path/
├── index.html        ← the app (open this)
├── drills-data.js    ← all drill definitions + video URLs + weekly template
├── manifest.json     ← PWA manifest (home screen icon, name, theme)
├── sw.js             ← service worker (offline caching)
└── README.md
```

**To edit drills or add new ones**, open `drills-data.js` and add entries to `BASKETBALL_DRILLS` or `STRENGTH_DRILLS`. Each drill needs an `id`, `category`, `name`, `description`, `baseReps`, `difficulty` (1–3), `why`, and `video` (YouTube embed URL — use the `embed/VIDEO_ID` format, not `watch?v=`).

**To edit the weekly template**, modify `WEEKLY_TEMPLATE` in `drills-data.js`.

## Running it

### Option A — open locally (simplest)

Just double-click `index.html`. Works in Chrome, Safari, Edge.

**Caveat:** service worker and "Add to Home Screen" need HTTPS or `localhost`. For local-only testing, double-clicking works fine for everything except the PWA install.

### Option B — run on your computer with a quick dev server

From the `hoopers-path` directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in the browser.

### Option C — host it so he can install it on his phone (recommended)

You need to put these files somewhere reachable over HTTPS. Free options:

1. **GitHub Pages** — create a repo, push the files, enable Pages in repo settings. Gets you a `https://yourusername.github.io/hoopers-path/` URL.
2. **Netlify Drop** — go to https://app.netlify.com/drop and drag the folder. Free, instant URL.
3. **Cloudflare Pages** — similar to Netlify, free, fast.
4. **Vercel** — drag-and-drop deploy at https://vercel.com.

Any of these take under 5 minutes. Netlify Drop is the fastest for a one-shot setup.

## Installing on his iPhone

1. Open the hosted URL in **Safari** (not Chrome — iOS only supports PWA install from Safari).
2. Tap the **Share** button at the bottom (square with up arrow).
3. Scroll down, tap **"Add to Home Screen"**.
4. Name it "Hoopers" (or whatever) and tap **Add**.
5. The icon will appear on his home screen. Tapping it opens the app full-screen like a real app — no Safari UI, no URL bar.
6. From here on, it works offline (except drill video playback, which needs internet).

## Installing on Android

Similar, but easier — open in Chrome, it'll prompt "Add to Home screen" automatically, or use the three-dot menu → "Install app".

## Data & privacy

Everything is stored in the browser's IndexedDB and localStorage on the device. Nothing gets sent anywhere. If he clears Safari's data or uninstalls the home-screen app, the history is gone — use the **Export Backup** button in Settings periodically to save a JSON file.

## A note to parents

The app is designed for consistency and motivation. It's not a substitute for a coach watching his form. Before he starts the strength program, a 10-minute check-in with his basketball coach or PE teacher about the lifting plan is worth it — he's 14/15 and still growing, and form matters more than load at this age.

Also, the summer league game-day assumption is baked in (Sat/Sun off for games). If his schedule changes, edit `WEEKLY_TEMPLATE` in `drills-data.js` — the `type: "gameday"` days are where game-day logic kicks in.

---

Built to help him outwork the other kids trying out for JV. Let's get it. 🔥
