// Hooper's Path — Feature Flags
// Central place to gate features by user tier.
//
// FUTURE: when monetization is added, replace `enabled` checks with checks against the user's tier.
// For now, every flag is enabled for everyone — the structure is in place so we don't have to
// rewrite features when we go to a freemium model.
//
// Usage in app code:
//   if (window.HOOPERS_FLAGS.canUse('feature-name')) { showFeature(); }
//
// Flag tiers:
//   'free'     — available to all users
//   'pro'      — paid tier (currently unused — defaults to enabled for all)
//   'coach'    — coach-only feature (currently unused)
//   'beta'     — internal testing flag

(function() {
  // CURRENT TIER for the active user.
  // Hardcoded to 'pro' so all features work for early users.
  // Later: read from user.subscription or similar.
  const CURRENT_TIER = 'pro';

  const FLAGS = {
    // Core (all users always)
    'daily-workout':         { tier: 'free', enabled: true },
    'drill-library':         { tier: 'free', enabled: true },
    'basic-stats':           { tier: 'free', enabled: true },
    'environments':          { tier: 'free', enabled: true },
    'profiles':              { tier: 'free', enabled: true },
    'badges':                { tier: 'free', enabled: true },
    'cloud-sync':            { tier: 'free', enabled: true },

    // Mid-tier features (free now, will be Pro later)
    'game-aware-workouts':   { tier: 'pro', enabled: true },
    'check-in-recovery':     { tier: 'pro', enabled: true },
    'pr-tracking':           { tier: 'pro', enabled: true },
    'data-export':           { tier: 'pro', enabled: true },
    'data-import':           { tier: 'pro', enabled: true },

    // Premium features (planned)
    'calendar-tab':          { tier: 'pro', enabled: false }, // not built yet
    'ics-export':            { tier: 'pro', enabled: false }, // not built yet
    'ai-suggestions':        { tier: 'pro', enabled: false },
    'video-analysis':        { tier: 'pro', enabled: false },

    // Team / social (currently disabled - needs Phase 2B work)
    'team-create':           { tier: 'coach', enabled: true },
    'team-join':             { tier: 'free', enabled: true },
    'coach-dashboard':       { tier: 'coach', enabled: false },  // not built
    'training-buddies':      { tier: 'pro', enabled: false },    // not built
    'team-leaderboard':      { tier: 'pro', enabled: false },    // not built

    // Multi-sport (future)
    'multi-sport':           { tier: 'pro', enabled: false },

    // Beta flags
    'debug-mode':            { tier: 'beta', enabled: false },
  };

  // Tier hierarchy: pro > coach >= free
  function tierAllows(userTier, requiredTier) {
    if (requiredTier === 'free') return true;
    if (requiredTier === 'coach') return userTier === 'coach' || userTier === 'pro';
    if (requiredTier === 'pro') return userTier === 'pro';
    if (requiredTier === 'beta') return userTier === 'pro';
    return false;
  }

  function canUse(flagName) {
    const flag = FLAGS[flagName];
    if (!flag) {
      console.warn('Unknown feature flag:', flagName);
      return false;
    }
    if (!flag.enabled) return false;
    return tierAllows(CURRENT_TIER, flag.tier);
  }

  function listAll() {
    return Object.keys(FLAGS).map(k => ({ name: k, ...FLAGS[k], available: canUse(k) }));
  }

  window.HOOPERS_FLAGS = {
    canUse,
    listAll,
    currentTier: () => CURRENT_TIER,
  };
})();
