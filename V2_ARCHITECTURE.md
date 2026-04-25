# Hooper's Path — v2 Architecture Spec

A reference document for hiring a developer to rebuild the v1 prototype as a
production SaaS. Hand this to a senior dev and they should have everything they
need to scope the work.

## Status of v1

- Prototype, single-file Preact app via CDN imports (htm + esm.sh)
- Firebase Auth (Sign in with Apple) + Firestore for sync
- ~115KB index.html, ~120KB diagrams.js, monolithic
- Works on iOS Safari as a PWA
- ~5 active testers (early validation)
- Known limitations: no tests, no error tracking, no analytics, brittle auth flow

## Goal of v2

A multi-sport athlete training SaaS, web-first PWA with a future iOS/Android
app via React Native or native shell. Tiered Free / Pro pricing via Stripe.
Coach + parent + athlete user types. Multi-team support. Goal: support 1k–10k
active users in year one.

## Recommended tech stack

### Frontend
- **Framework:** Next.js 14+ (App Router) or Remix
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS, design system in shadcn/ui or custom tokens
- **State:** TanStack Query for server state; Zustand or Jotai for client
- **Forms:** React Hook Form + Zod
- **Date/time:** date-fns or Temporal polyfill
- **Charts:** Recharts (consistent with v1)
- **PWA:** next-pwa or workbox manually configured

### Backend
- **Auth + database:** Firebase Auth + Firestore (keep what works) OR migrate
  to Supabase if SQL/Postgres is preferred. Recommend keeping Firebase for
  v2 to reduce migration risk; revisit in v3.
- **Server functions:** Firebase Cloud Functions (Node.js, TypeScript) for
  privileged operations (Stripe webhooks, admin actions, cron jobs).
- **Hosting:** Vercel (frontend) + Firebase (data/auth/functions). Custom
  domain on Vercel: hooperspath.com.

### Payments
- **Stripe** with Stripe Billing for subscriptions
- Webhook handler in Cloud Functions to provision Pro tier
- RevenueCat optional but adds cost; direct Stripe integration is fine for web-first

### Infrastructure
- **Error tracking:** Sentry (free tier covers ~5k events/mo)
- **Analytics:** PostHog (open source, self-hosted optional) or Plausible
- **Customer support:** Crisp or Intercom; or simply support@hooperspath.com
- **Email:** Resend or Postmark for transactional
- **CI/CD:** GitHub Actions → Vercel preview deploys
- **Testing:** Vitest (unit), Playwright (e2e) on critical user paths

## Data model (proposed)

Firestore collections, redesigned for multi-tenancy:

```
/users/{uid}
  email, displayName, photoURL, age, sport, role, createdAt, lastSeen
  subscription: { tier, stripeCustomerId, status, expiresAt }

/users/{uid}/profile/current
  name, color, primarySport, secondarySports[], height, weight, position

/users/{uid}/workouts/{date}
  date, sport, type, env, drills[], stats, completed, durationMin

/users/{uid}/checkins/{date}
  date, sleep, soreness, energy, nutrition, gameToday, gameTomorrow, ...

/users/{uid}/games/{gameId}
  date, sport, opponent, location, stats, coachNotes, scheduledFromCalendar

/users/{uid}/scheduledEvents/{eventId}
  date, type (game|practice|tournament), opponent, location, notes

/teams/{teamId}
  name, sport, season, coachUid, code, archived, createdAt
  config: { ageRange, allowParentView, autoApproveMembers }

/teams/{teamId}/members/{uid}
  role (player|coach|parent), status (pending|approved|removed),
  joinedAt, removedAt, displayName

/teams/{teamId}/announcements/{id}     # coach-to-team broadcasts
  text, fromUid, createdAt, readBy[]

/teamCodes/{code}                       # public lookup
  teamId, coachUid, expiresAt

/buddies/{uid}/connections/{otherUid}   # mutual follows
  since, encouragementCount

/encouragements/{id}                    # buddy-to-buddy messages
  fromUid, toUid, text, emoji, createdAt, read

/sports/{sportId}                       # static config
  name, drillCategories, defaultTemplate, icon

/sports/{sportId}/drills/{drillId}      # drill library per sport
  name, category, baseReps, description, why, diagramSvg, envs[]
```

Move drills out of bundled JS into Firestore so coaches can eventually customize.

## Security rules

Stricter than v1. Templates exist in v1 firestore.rules; refine for:
- Coaches can read team members' workouts (opt-in by player)
- Parents can read only their child's data, after verified link
- Approved team members only see roster, not each other's full data unless opt-in
- Buddy connections require mutual approval before either can read the other's stats
- Audit log on all write operations to user data by non-owner

## User types and flows

### Athlete (player)
- Sign up → choose sport → demographic info (age 13+) → first workout
- Daily: check in → workout → log game (if applicable)
- Optionally: join team, add buddies

### Coach
- Sign up → "I'm a coach" → create team → share code with players
- Approve pending members
- Dashboard: see team-wide stats, individual player drilldown
- Send announcements to team
- Mark games (creates them on every player's calendar)

### Parent
- Sign up → "I'm a parent" → enter child's email or scan QR from child's phone
- Child approves → parent gets read-only view of child's data
- Notifications when child completes/skips workouts (opt-in)

## Key features by tier

### Free
- 1 sport, 1 profile
- Daily workout, drill library
- Basic stats
- Last 30 days of history
- Community drill library only

### Pro ($X.XX/mo, $XX/yr)
- Multi-sport, multiple profiles
- Full history, exports
- Calendar with planning, .ics export
- Game-aware workout adjustments
- Training Buddies + encouragement
- Priority support
- AI suggestions (when built)

### Team add-on
- Coach dashboard
- Roster up to 25 players
- Team announcements
- Team leaderboards (opt-in by players)

## Performance targets

- LCP < 2.5s on 4G
- TTI < 5s
- 60fps scrolling on iPhone 12+
- Offline-capable for core features (workouts, drills, check-ins)
- Background sync on reconnect

## Compliance

- COPPA: gate signup at 13+, no exceptions in v2
- GDPR: data export and deletion endpoints (legally required for EU users)
- CCPA: similar for California users
- Stripe handles PCI compliance
- Privacy Policy + Terms of Service: use Termly or hire a startup lawyer ($500-2k)
- Apple Developer Program agreement compliance if/when shipping native app

## Hiring guidance

### What to look for
- 5+ years TypeScript + React production experience
- Has shipped a SaaS product before (at least one with paying customers)
- Comfort with Firebase or willingness to learn it
- Can show production code on GitHub
- Good written communication (you're remote)

### What this v2 should cost
- **Solo senior dev:** $30-60k for MVP (3-5 months part-time)
- **Small dev shop (3-person team):** $60-120k for MVP (2-3 months)
- **Maintenance after MVP:** $1.5-3k/mo for bug fixes and small features

### Red flags when hiring
- Wants to use a totally different stack you didn't ask for
- Can't explain Firestore security rules
- No portfolio of completed SaaS work
- Estimates feel suspiciously low ($5k for the whole thing — it's not real)

### How to manage the dev
- Weekly demo calls (30 min)
- Linear or GitHub Projects for tasks
- Don't write tickets in chat — use the issue tracker
- Approve milestones before paying — never pay 100% upfront
- Get the code in a GitHub repo YOU own, not theirs

## Migration plan v1 → v2

1. v2 deployed to staging on a subdomain (e.g., app.hooperspath.com)
2. Existing v1 users tested on staging by invitation
3. Migration script copies v1 Firestore data into v2 schema
4. v1 redirects to v2 for migrated users; remains accessible briefly for unmigrated
5. After 30 days, v1 is decommissioned

Plan for ~10% of users not migrating cleanly. Have a manual support process.

## Things explicitly out of scope for v2 MVP

- Video upload / analysis (huge feature, v3)
- Live coaching during workouts (v3)
- Social feed / posts (v3 — can become time sink)
- AI workout generation (v3)
- Native iOS app via Swift (v3 — PWA wrapped via Capacitor first)
- Multi-language (v3)

## Estimated v1 → v2 timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Hire dev + onboard | 2-4 weeks | Dev set up with access |
| Architecture review | 1 week | Approved data model + tech choices |
| Auth + core schema | 2-3 weeks | Sign-in works, data writes |
| Workouts + drills | 2-3 weeks | Daily workout flow |
| Stats + games | 1-2 weeks | Tracking complete |
| Calendar | 2 weeks | Schedule + .ics |
| Teams (read-only) | 2 weeks | Coaches see roster |
| Teams (read-write) | 2 weeks | Coaches manage team |
| Buddies + encouragement | 2 weeks | Social opt-in |
| Stripe + billing | 1-2 weeks | Subscriptions work |
| Polish + bug fixes | 2 weeks | Ready for limited launch |
| **Total** | **~4-5 months** | **MVP ready** |

That's part-time pace with a single dev. Compress with more devs but
coordination overhead increases.

## Open questions for the new dev

When you hire, have them answer these in writing before starting:
1. How would they handle offline-first sync conflicts?
2. Firestore vs Postgres — what's their recommendation and why?
3. How would they architect the multi-sport drill library?
4. Strategy for Stripe webhook reliability (network issues, retries)
5. How would they test critical flows (auth, payments, sync)?
6. What does their typical sprint and review cadence look like?
