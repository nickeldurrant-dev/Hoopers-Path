// Hooper's Path — Cloud Sync
// Local-first: all data saves locally first, cloud sync is best-effort in background.
// On app load for a signed-in user, we hydrate from the cloud (cloud is source of truth
// for cross-device), falling back to local if cloud is empty.

import {
  doc, getDoc, setDoc, deleteDoc, collection, getDocs, addDoc, query, where, writeBatch, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const db = window.HOOPERS_AUTH && window.HOOPERS_AUTH._db;

function getUid() {
  const s = window.HOOPERS_AUTH && window.HOOPERS_AUTH.getSession();
  return s && s.user ? s.user.uid : null;
}

// =============================================================
// HYDRATE — pull all user data from Firestore into local storage
// =============================================================
async function hydrateFromCloud() {
  const uid = getUid();
  if (!uid || !db) return { ok: false, reason: 'not-signed-in' };

  try {
    const base = `users/${uid}`;
    const [prsSnap, badgesSnap, settingsSnap, workoutsSnap, checkinsSnap, gamesSnap] = await Promise.all([
      getDoc(doc(db, `${base}/prs/current`)),
      getDoc(doc(db, `${base}/badges/current`)),
      getDoc(doc(db, `${base}/settings/current`)),
      getDocs(collection(db, `${base}/workouts`)),
      getDocs(collection(db, `${base}/checkins`)),
      getDocs(collection(db, `${base}/games`)),
    ]);

    const result = {
      prs: prsSnap.exists() ? prsSnap.data() : null,
      badges: badgesSnap.exists() ? badgesSnap.data() : null,
      settings: settingsSnap.exists() ? settingsSnap.data() : null,
      workouts: workoutsSnap.docs.map(d => ({ ...d.data(), date: d.id })),
      checkins: checkinsSnap.docs.map(d => ({ ...d.data(), date: d.id })),
      games: gamesSnap.docs.map(d => ({ ...d.data(), id: d.id })),
    };

    return { ok: true, data: result };
  } catch (err) {
    console.error('Hydrate error:', err);
    return { ok: false, reason: err.message || String(err) };
  }
}

// =============================================================
// PUSH LOCAL TO CLOUD — one-time "upload everything" used on first sign-in
// =============================================================
async function pushLocalToCloud(local) {
  const uid = getUid();
  if (!uid || !db) return { ok: false, reason: 'not-signed-in' };

  try {
    const base = `users/${uid}`;
    const batch = writeBatch(db);

    if (local.prs) batch.set(doc(db, `${base}/prs/current`), local.prs);
    if (local.badges) batch.set(doc(db, `${base}/badges/current`), local.badges);
    if (local.settings) batch.set(doc(db, `${base}/settings/current`), local.settings);

    (local.workouts || []).forEach(w => {
      if (!w.date) return;
      const payload = { ...w };
      delete payload.key;     // local-only key
      delete payload.profile; // local-only profile scope
      batch.set(doc(db, `${base}/workouts/${w.date}`), payload);
    });

    (local.checkins || []).forEach(c => {
      if (!c.date) return;
      const payload = { ...c };
      delete payload.key;
      delete payload.profile;
      batch.set(doc(db, `${base}/checkins/${c.date}`), payload);
    });

    await batch.commit();

    // Games are addDoc (auto-ID), not set — but since we already have local IDs, just copy data
    for (const g of (local.games || [])) {
      const payload = { ...g };
      delete payload.id;
      delete payload.profile;
      await addDoc(collection(db, `${base}/games`), payload);
    }

    return { ok: true };
  } catch (err) {
    console.error('Push to cloud error:', err);
    return { ok: false, reason: err.message || String(err) };
  }
}

// =============================================================
// INCREMENTAL SYNCS — called after a new save lands locally
// Fire-and-forget — never blocks the UI
// =============================================================
async function syncWorkout(workout) {
  const uid = getUid();
  if (!uid || !db || !workout.date) return;
  try {
    const payload = { ...workout };
    delete payload.key;
    delete payload.profile;
    await setDoc(doc(db, `users/${uid}/workouts/${workout.date}`), payload);
  } catch (err) {
    console.warn('Workout sync failed (will retry on next open):', err);
  }
}

async function syncCheckin(checkin) {
  const uid = getUid();
  if (!uid || !db || !checkin.date) return;
  try {
    const payload = { ...checkin };
    delete payload.key;
    delete payload.profile;
    await setDoc(doc(db, `users/${uid}/checkins/${checkin.date}`), payload);
  } catch (err) {
    console.warn('Checkin sync failed:', err);
  }
}

async function syncGame(game) {
  const uid = getUid();
  if (!uid || !db) return;
  try {
    const payload = { ...game };
    delete payload.id;
    delete payload.profile;
    await addDoc(collection(db, `users/${uid}/games`), payload);
  } catch (err) {
    console.warn('Game sync failed:', err);
  }
}

async function syncPRs(prs) {
  const uid = getUid();
  if (!uid || !db) return;
  try {
    await setDoc(doc(db, `users/${uid}/prs/current`), prs);
  } catch (err) {
    console.warn('PRs sync failed:', err);
  }
}

async function syncBadges(badges) {
  const uid = getUid();
  if (!uid || !db) return;
  try {
    await setDoc(doc(db, `users/${uid}/badges/current`), badges);
  } catch (err) {
    console.warn('Badges sync failed:', err);
  }
}

async function syncSettings(settings) {
  const uid = getUid();
  if (!uid || !db) return;
  try {
    await setDoc(doc(db, `users/${uid}/settings/current`), settings);
  } catch (err) {
    console.warn('Settings sync failed:', err);
  }
}

async function syncProfile(profile) {
  const uid = getUid();
  if (!uid || !db || !profile) return;
  try {
    await setDoc(doc(db, `users/${uid}/profile/current`), {
      name: profile.name,
      color: profile.color,
      createdAt: profile.createdAt,
    });
  } catch (err) {
    console.warn('Profile sync failed:', err);
  }
}

async function fetchCloudProfile() {
  const uid = getUid();
  if (!uid || !db) return null;
  try {
    const snap = await getDoc(doc(db, `users/${uid}/profile/current`));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.warn('Profile fetch failed:', err);
    return null;
  }
}

// =============================================================
// TEAM OPERATIONS
// =============================================================
async function createTeam(teamName, coachName) {
  const uid = getUid();
  if (!uid || !db) throw new Error('Must be signed in');

  // Generate a short, memorable 6-char code (avoiding confusing chars)
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const code = Array.from({length: 6}, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');

  // Check code doesn't exist already (extremely unlikely but guard)
  const codeDoc = await getDoc(doc(db, `teamCodes/${code}`));
  if (codeDoc.exists()) {
    return createTeam(teamName, coachName); // recurse with new code
  }

  const teamRef = doc(collection(db, 'teams'));
  const teamId = teamRef.id;

  const batch = writeBatch(db);
  batch.set(teamRef, {
    name: teamName,
    coachUid: uid,
    coachName: coachName,
    code: code,
    createdAt: serverTimestamp(),
    archived: false,
  });
  batch.set(doc(db, `teamCodes/${code}`), {
    teamId: teamId,
    coachUid: uid,
    createdAt: serverTimestamp(),
  });
  batch.set(doc(db, `teams/${teamId}/members/${uid}`), {
    role: 'coach',
    name: coachName,
    approved: true,
    joinedAt: serverTimestamp(),
  });
  await batch.commit();

  return { teamId, code };
}

async function joinTeamByCode(code, playerName) {
  const uid = getUid();
  if (!uid || !db) throw new Error('Must be signed in');

  const normalized = code.trim().toUpperCase();
  const codeDoc = await getDoc(doc(db, `teamCodes/${normalized}`));
  if (!codeDoc.exists()) {
    throw new Error('Team code not found. Double-check with your coach.');
  }
  const { teamId } = codeDoc.data();

  // Create a pending member record — coach must approve
  await setDoc(doc(db, `teams/${teamId}/members/${uid}`), {
    role: 'player',
    name: playerName,
    approved: false,
    joinedAt: serverTimestamp(),
  });

  return { teamId, pending: true };
}

async function getMyTeams() {
  const uid = getUid();
  if (!uid || !db) return [];

  // Query all teams where I'm a member
  // Firestore doesn't have a direct "where I'm in subcollection" query.
  // Simplest: store team memberships on user settings.
  // Hybrid: user's settings.teamIds array, kept in sync when joining/leaving.
  try {
    const settingsSnap = await getDoc(doc(db, `users/${uid}/settings/current`));
    if (!settingsSnap.exists()) return [];
    const teamIds = settingsSnap.data().teamIds || [];
    const teams = await Promise.all(teamIds.map(async tid => {
      const s = await getDoc(doc(db, `teams/${tid}`));
      return s.exists() ? { id: tid, ...s.data() } : null;
    }));
    return teams.filter(Boolean);
  } catch (err) {
    console.warn('getMyTeams failed:', err);
    return [];
  }
}

// =============================================================
// CLOUD CLEANUP — one-time dedupe of duplicate game documents in Firestore
// Runs once per user (tracked via localStorage flag).
// =============================================================
async function dedupeCloudGames() {
  const uid = getUid();
  if (!uid || !db) return { ok: false, reason: 'not-signed-in' };

  try {
    const snap = await getDocs(collection(db, `users/${uid}/games`));
    const games = snap.docs.map(d => ({ docId: d.id, ...d.data() }));
    const fingerprint = (g) => [g.date, g.opponent || '', g.points || 0, g.rebounds || 0, g.assists || 0].join('|');

    const seen = new Map();  // fp -> first docId (kept)
    const toDelete = [];
    for (const g of games) {
      const fp = fingerprint(g);
      if (seen.has(fp)) {
        toDelete.push(g.docId);
      } else {
        seen.set(fp, g.docId);
      }
    }

    if (toDelete.length === 0) return { ok: true, deleted: 0 };

    // Delete in batches to avoid Firestore limits
    for (const docId of toDelete) {
      await deleteDoc(doc(db, `users/${uid}/games/${docId}`));
    }
    return { ok: true, deleted: toDelete.length };
  } catch (err) {
    console.error('Cloud dedupe error:', err);
    return { ok: false, reason: err.message || String(err) };
  }
}

window.HOOPERS_SYNC = {
  hydrateFromCloud,
  pushLocalToCloud,
  syncWorkout,
  syncCheckin,
  syncGame,
  syncPRs,
  syncBadges,
  syncSettings,
  syncProfile,
  fetchCloudProfile,
  createTeam,
  joinTeamByCode,
  getMyTeams,
  dedupeCloudGames,
};

window.HOOPERS_SYNC_READY = true;
document.dispatchEvent(new CustomEvent('hoopers-sync-ready'));
