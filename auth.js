// Hooper's Path — Authentication
// Handles Firebase Auth with Apple Sign In
// Exposes window.HOOPERS_AUTH with methods the app uses

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore,
  initializeFirestore,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

if (!window.FIREBASE_CONFIG) {
  console.error('FIREBASE_CONFIG not loaded — auth will not work');
}

const app = initializeApp(window.FIREBASE_CONFIG);

// Firestore with long polling auto-detect (more reliable on iOS Safari + PWA + corp networks)
let db;
try {
  db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
} catch (e) {
  // Already initialized (hot reload edge case)
  db = getFirestore(app);
}

const auth = getAuth(app);

// Apple provider
const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

// Session state, exposed for the app
const session = {
  user: null,              // Firebase user object (uid, email, displayName, photoURL)
  loading: true,           // true while checking initial session state
  error: null,             // last auth error, if any
  listeners: new Set(),    // callbacks for state changes
};

function notify() {
  for (const fn of session.listeners) {
    try { fn(session); } catch (e) { console.error('Auth listener error:', e); }
  }
}

// Handle redirect result (if we came back from an Apple auth redirect)
getRedirectResult(auth).then(result => {
  if (result && result.user) {
    console.log('Signed in via redirect as', result.user.uid);
  }
}).catch(err => {
  console.error('Redirect result error:', err);
  session.error = err.message || String(err);
  notify();
});

// Watch for auth state changes
onAuthStateChanged(auth, (user) => {
  session.user = user;
  session.loading = false;
  session.error = null;
  notify();
});

// Sign in: tries popup first, falls back to redirect (popups are often blocked on iOS)
async function signInWithApple() {
  try {
    // On iOS Safari, popup often fails silently. Use redirect for reliability.
    // Detect iOS: UA includes "iPhone" or "iPad", or Mac with touch (iPad)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 1);
    if (isIOS) {
      await signInWithRedirect(auth, appleProvider);
      // Page will navigate away; getRedirectResult handles return
      return { pending: true };
    } else {
      const result = await signInWithPopup(auth, appleProvider);
      return { user: result.user };
    }
  } catch (err) {
    console.error('Apple sign in error:', err);
    session.error = err.message || String(err);
    notify();
    return { error: err };
  }
}

async function signOutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (err) {
    console.error('Sign out error:', err);
    return { error: err };
  }
}

function subscribe(callback) {
  session.listeners.add(callback);
  // Fire immediately with current state
  try { callback(session); } catch (e) {}
  return () => session.listeners.delete(callback);
}

function getSession() {
  return session;
}

// Expose for the app
window.HOOPERS_AUTH = {
  signInWithApple,
  signOut: signOutUser,
  subscribe,
  getSession,
  _db: db,  // exposed for sync.js to use
  _app: app,
};

// Mark as loaded
window.HOOPERS_AUTH_READY = true;
document.dispatchEvent(new CustomEvent('hoopers-auth-ready'));
