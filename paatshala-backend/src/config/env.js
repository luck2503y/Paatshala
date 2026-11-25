require('dotenv').config();

const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Clerk configuration
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || '',
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
  
  // Exact Two-User Allowlist
  ADMIN_CLERK_USER_ID: process.env.ADMIN_CLERK_USER_ID || '',
  FRIEND_CLERK_USER_ID: process.env.FRIEND_CLERK_USER_ID || '',

  // Firebase configuration (Phase 7C)
  FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'paatshala-app',

  // Allowed CORS Origins
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : [
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:8081',
        'http://127.0.0.1:8081',
        'http://localhost:19006',
      ],
};

function checkConfigStatus() {
  const missing = [];
  if (!env.CLERK_SECRET_KEY) missing.push('CLERK_SECRET_KEY');
  if (!env.ADMIN_CLERK_USER_ID) missing.push('ADMIN_CLERK_USER_ID');
  if (!env.FRIEND_CLERK_USER_ID) missing.push('FRIEND_CLERK_USER_ID');

  return {
    isFullyConfigured: missing.length === 0,
    missingKeys: missing,
  };
}

module.exports = {
  env,
  checkConfigStatus,
};
