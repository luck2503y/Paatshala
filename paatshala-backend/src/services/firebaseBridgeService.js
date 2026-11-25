const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const { env } = require('../config/env');

let firebaseApp = null;

function initializeFirebaseAdmin() {
  if (firebaseApp) return firebaseApp;

  try {
    let credential = null;

    if (env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Check if it is a JSON file path
      const filePath = path.resolve(env.FIREBASE_SERVICE_ACCOUNT_KEY);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        credential = admin.credential.cert(JSON.parse(fileContent));
      } else {
        // Attempt parsing as inline JSON
        try {
          const parsed = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_KEY);
          credential = admin.credential.cert(parsed);
        } catch (e) {
          console.warn('[FirebaseAdmin] Could not parse FIREBASE_SERVICE_ACCOUNT_KEY as file or JSON.');
        }
      }
    }

    if (credential) {
      firebaseApp = admin.initializeApp({
        credential,
        projectId: env.FIREBASE_PROJECT_ID,
      });
      console.log('[FirebaseAdmin] Initialized successfully for project:', env.FIREBASE_PROJECT_ID);
    } else {
      console.warn('[FirebaseAdmin] No service account key found. Custom token generation will be enabled when serviceAccountKey is configured in Phase 7C.');
    }
  } catch (err) {
    console.error('[FirebaseAdmin] Initialization error:', err.message);
  }

  return firebaseApp;
}

/**
 * Creates a Firebase custom authentication token for an allowlisted participant.
 * @param {string} clerkUserId
 * @param {'A' | 'D'} role
 * @returns {Promise<{ customToken: string, firebaseUid: string, role: string }>}
 */
async function generateFirebaseCustomToken(clerkUserId, role) {
  const app = initializeFirebaseAdmin();
  if (!app) {
    throw new Error('Firebase Admin is not configured. Please add FIREBASE_SERVICE_ACCOUNT_KEY in backend environment.');
  }

  // Stable Firebase UID mapping for the two participants
  const firebaseUid = role === 'A' ? 'paatshala_admin_A' : 'paatshala_friend_D';

  const customClaims = {
    role,
    clerkUserId,
    authorized: true,
  };

  const customToken = await admin.auth().createCustomToken(firebaseUid, customClaims);

  return {
    customToken,
    firebaseUid,
    role,
  };
}

module.exports = {
  initializeFirebaseAdmin,
  generateFirebaseCustomToken,
};
