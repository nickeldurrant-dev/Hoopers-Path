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
  setPersistence,
  browserLocalPersistence,
  indexedDBLocalPersistence,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore,
  initializeFirestore,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// DEBUG: Log every auth event visibly to a debug overlay so we can diagnose silent failures
function debugLog(msg) {
  console.log('[AUTH]', msg);
  let el = document.getElementById('debug-display');
  if (!el) {
    el = document.createElement('div');
    el.id = 'debug-display';
    el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:rgba(0,255,0,0.85);color:#000;padding:8px;font:11px monospace;z-index:99999;max-height:40vh;overflow:auto;white-space:pre-wrap;border-top:2px solid #000';
    document.body.appendChild(el);
    el.onclick = () => { el.style.display = 'none'; };
  }
  el.textContent = (el.textContent || '') + new Date().toISOString().slice(11,19) + ' ' + msg + '\n';
  el.scrollTop = el.scrollHeight;
}

debugLog('auth.js loaded');
debugLog('URL: ' + location.href);
debugLog('UA: ' + navigator.userAgent.slice(0, 80));

if (!window.FIREBASE_CONFIG) {
  debugLog('FATAL: FIREBASE_CONFIG missing');
  throw new Error('Firebase config not loaded');
}
debugLog('Config OK projectId=' + window.FIREBASE_CONFIG.projectId);

const app = initializeApp(window.FIREBASE_CONFIG);
debugLog('Firebase app initialized');

// Firestore with long polling auto-detect (more reliable on iOS Safari + PWA + corp networks)
let db;
try {
  db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
} catch (e) {
  // Already initialized (hot reload edge case)
  db = getFirestore(app);
}

const auth = getAuth(app);

// Force persistent auth on iOS PWA — try IndexedDB first, fall back to localStorage
// Without this, sign-in bounces back immediately in PWA mode on iOS
(async () => {
  try {
    await setPersistence(auth, indexedDBLocalPersistence);
    debugLog('Persistence: IndexedDB OK');
  } catch (e1) {
    debugLog('IDB persistence failed: ' + (e1.code || e1.message));
    try {
      await setPersistence(auth, browserLocalPersistence);
      debugLog('Persistence: localStorage OK (fallback)');
    } catch (e2) {
      debugLog('All persistence failed: ' + (e2.code || e2.message));
    }
  }
})();

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
debugLog('Checking for redirect result...');
getRedirectResult(auth).then(result => {
  if (result && result.user) {
    debugLog('Redirect SUCCESS uid=' + result.user.uid.slice(0, 8));
  } else if (result === null) {
    debugLog('Redirect result null (no pending sign-in)');
  } else {
    debugLog('Redirect result: ' + JSON.stringify(result).slice(0, 200));
  }
}).catch(err => {
  debugLog('REDIRECT ERROR: ' + (err.code || '') + ' - ' + (err.message || String(err)).slice(0, 200));
  console.error('Redirect result error:', err);
  session.error = err.message || String(err);
  notify();
  // Also show in the big error display
  const el = document.getElementById('error-display');
  if (el) {
    el.style.display = 'block';
    el.textContent = 'SIGN-IN ERROR:\n\n' + (err.code || '') + '\n\n' + (err.message || String(err)) +
      '\n\nTap to dismiss.';
    el.onclick = () => { el.style.display = 'none'; el.onclick = null; };
  }
});

// Watch for auth state changes
onAuthStateChanged(auth, (user) => {
  debugLog('Auth state: ' + (user ? 'signed in uid=' + user.uid.slice(0,8) : 'signed out'));
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
    debugLog('signInWithApple called, isIOS=' + isIOS);
    if (isIOS) {
      debugLog('Calling signInWithRedirect...');
      await signInWithRedirect(auth, appleProvider);
      debugLog('Redirect issued (you should be navigating to Apple now)');
      // Page will navigate away; getRedirectResult handles return
      return { pending: true };
    } else {
      debugLog('Calling signInWithPopup...');
      const result = await signInWithPopup(auth, appleProvider);
      debugLog('Popup SUCCESS uid=' + result.user.uid.slice(0,8));
      return { user: result.user };
    }
  } catch (err) {
    debugLog('signIn ERROR: ' + (err.code || '') + ' - ' + (err.message || String(err)).slice(0, 200));
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
