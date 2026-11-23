import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Default / Stored Firebase Config
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDemoPlaceholderKeyForAliAndFatemeh",
  authDomain: "duo-lingo-love.firebaseapp.com",
  projectId: "duo-lingo-love",
  storageBucket: "duo-lingo-love.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Retrieve user-provided Firebase config from localStorage if set
export const getActiveFirebaseConfig = () => {
  try {
    const saved = localStorage.getItem('duolove_firebase_config');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Error reading stored Firebase config', e);
  }
  return DEFAULT_FIREBASE_CONFIG;
};

export const saveFirebaseConfig = (config) => {
  localStorage.setItem('duolove_firebase_config', JSON.stringify(config));
  window.location.reload();
};

let app, db, auth, messaging;
let isFirebaseConnected = false;

try {
  const cfg = getActiveFirebaseConfig();
  if (cfg && cfg.apiKey && !cfg.apiKey.includes('Placeholder')) {
    if (!getApps().length) {
      app = initializeApp(cfg);
    } else {
      app = getApps()[0];
    }
    db = getFirestore(app);
    auth = getAuth(app);
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        messaging = getMessaging(app);
      } catch (err) {
        console.log('Messaging not initialized in current environment:', err);
      }
    }
    isFirebaseConnected = true;
  }
} catch (err) {
  console.log('Firebase running in local-sync mode:', err.message);
  isFirebaseConnected = false;
}

export { app, db, auth, messaging, isFirebaseConnected };

// Real-time synchronization helper
// If Firebase is configured, uses Firestore 'couples/ali_and_fatemeh'
// Otherwise uses BroadcastChannel + LocalStorage for multi-window/device sync
const broadcast = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('duolove_channel')
  : null;

export const syncStateToCloud = async (state) => {
  // Broadcast locally immediately
  if (broadcast) {
    broadcast.postMessage({ type: 'STATE_UPDATE', payload: state });
  }
  localStorage.setItem('duolove_state_backup', JSON.stringify(state));

  // Sync to Firestore if connected
  if (db) {
    try {
      const coupleRef = doc(db, 'couples', 'ali_and_fatemeh');
      await setDoc(coupleRef, { ...state, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn('Firestore sync note:', e.message);
    }
  }
};

export const listenToCloudSync = (onRemoteStateReceived) => {
  // 1. Listen to Local Broadcast
  if (broadcast) {
    broadcast.onmessage = (event) => {
      if (event.data?.type === 'STATE_UPDATE' && event.data.payload) {
        onRemoteStateReceived(event.data.payload);
      }
    };
  }

  // 2. Listen to Firestore real-time snapshot if connected
  if (db) {
    try {
      const coupleRef = doc(db, 'couples', 'ali_and_fatemeh');
      return onSnapshot(coupleRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          onRemoteStateReceived(data);
        }
      });
    } catch (e) {
      console.warn('Firestore listener note:', e.message);
    }
  }

  return () => { };
  مرح
};

// Request Push Notification permission & FCM token
export const requestPushPermission = async () => {
  if (!('Notification' in window)) {
    return { granted: false, reason: 'مرورگر از اعلان پشتیبانی نمی‌کند.' };
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    if (messaging) {
      try {
        const token = await getToken(messaging, {
          vapidKey: 'BMD-DEMO-VAPID-KEY-ALI-FATEMEH'
        });
        return { granted: true, token };
      } catch (err) {
        return { granted: true, token: null, note: 'اجازه داده شد (لوکال)' };
      }
    }
    return { granted: true, token: null };
  }

  return { granted: false, reason: 'دسترسی رد شد.' };
};

